import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

import { aboutMe } from "../src/data/aboutme";
import { educationData } from "../src/data/education";
import { experienceData } from "../src/data/experience";
import { grantData } from "../src/data/grant";
import { newsData } from "../src/data/news";
import { portfolioData } from "../src/data/portfolio";
import {
  nonRefereedPublicationData,
  preprintData,
  publicationData,
} from "../src/data/publication";
import { Section, sectionOrder } from "../src/data/section-order";

type SectionLimits = Record<Section, number>;

interface CliOptions {
  output: string;
  maxPages: number;
  sectionLimits: SectionLimits;
}

const DEFAULT_LIMITS: SectionLimits = {
  [Section.Publication]: 5,
  [Section.Preprint]: 2,
  [Section.NonRefereedPublication]: 2,
  [Section.Experience]: 5,
  [Section.Education]: 3,
  [Section.Grant]: 2,
  [Section.News]: 2,
  [Section.Portfolio]: 2,
};

function parsePositiveInt(value: string, optionName: string): number {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${optionName} must be a positive integer. Received: ${value}`);
  }
  return parsed;
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    output: "public/cv.pdf",
    maxPages: 2,
    sectionLimits: { ...DEFAULT_LIMITS },
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--output") {
      const value = argv[i + 1];
      if (!value) {
        throw new Error("--output requires a file path.");
      }
      options.output = value;
      i += 1;
      continue;
    }

    if (arg.startsWith("--output=")) {
      options.output = arg.slice("--output=".length);
      continue;
    }

    if (arg === "--max-pages") {
      const value = argv[i + 1];
      if (!value) {
        throw new Error("--max-pages requires a number.");
      }
      options.maxPages = parsePositiveInt(value, "--max-pages");
      i += 1;
      continue;
    }

    if (arg.startsWith("--max-pages=")) {
      options.maxPages = parsePositiveInt(
        arg.slice("--max-pages=".length),
        "--max-pages",
      );
      continue;
    }

    if (arg === "--publications") {
      const value = argv[i + 1];
      if (!value) {
        throw new Error("--publications requires a number.");
      }
      options.sectionLimits[Section.Publication] = parsePositiveInt(
        value,
        "--publications",
      );
      i += 1;
      continue;
    }

    if (arg.startsWith("--publications=")) {
      options.sectionLimits[Section.Publication] = parsePositiveInt(
        arg.slice("--publications=".length),
        "--publications",
      );
      continue;
    }

    if (arg === "--experience") {
      const value = argv[i + 1];
      if (!value) {
        throw new Error("--experience requires a number.");
      }
      options.sectionLimits[Section.Experience] = parsePositiveInt(
        value,
        "--experience",
      );
      i += 1;
      continue;
    }

    if (arg.startsWith("--experience=")) {
      options.sectionLimits[Section.Experience] = parsePositiveInt(
        arg.slice("--experience=".length),
        "--experience",
      );
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

function compact(value: string | undefined): string {
  if (!value) {
    return "";
  }
  return toPdfSafeText(
    value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim(),
  );
}

function toPdfSafeText(value: string): string {
  return value
    .replace(/τ/g, "tau")
    .replace(/[—–]/g, "-")
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'")
    .replace(/（/g, "(")
    .replace(/）/g, ")")
    .replace(/・|·/g, " - ")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x0A\x20-\x7E]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function splitLines(value: string | undefined): string[] {
  if (!value) {
    return [];
  }
  return value
    .split("\n")
    .map((line) => toPdfSafeText(line))
    .filter((line) => line.length > 0);
}

function limitItems<T>(items: T[], limit: number): { selected: T[]; remaining: number } {
  const selected = items.slice(0, limit);
  const remaining = Math.max(0, items.length - selected.length);
  return { selected, remaining };
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const outputPath = path.resolve(process.cwd(), options.output);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const doc = new PDFDocument({
    size: "A4",
    margin: 48,
    info: {
      Title: `${aboutMe.name} - Curriculum Vitae`,
      Author: aboutMe.name,
      Subject: "Curriculum Vitae",
    },
  });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const fontFiles = {
    regular: "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf",
    bold: "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
    italic: "/usr/share/fonts/truetype/noto/NotoSans-Italic.ttf",
  };
  const canUseNoto = Object.values(fontFiles).every((fontPath) => fs.existsSync(fontPath));
  if (canUseNoto) {
    doc.registerFont("CVRegular", fontFiles.regular);
    doc.registerFont("CVBold", fontFiles.bold);
    doc.registerFont("CVItalic", fontFiles.italic);
  }

  const fonts = canUseNoto
    ? {
        regular: "CVRegular",
        bold: "CVBold",
        italic: "CVItalic",
      }
    : {
        regular: "Helvetica",
        bold: "Helvetica-Bold",
        italic: "Helvetica-Oblique",
      };

  let pageCount = 1;
  doc.on("pageAdded", () => {
    pageCount += 1;
  });

  const pageBottom = (): number => doc.page.height - doc.page.margins.bottom;
  const contentWidth = (): number =>
    doc.page.width - doc.page.margins.left - doc.page.margins.right;

  const canWrite = (heightNeeded: number): boolean => {
    if (doc.y + heightNeeded <= pageBottom()) {
      return true;
    }
    if (pageCount >= options.maxPages) {
      return false;
    }
    doc.addPage();
    return true;
  };

  const writeLine = (
    text: string,
    font: string,
    fontSize: number,
    extra: { gapAfter?: number; indent?: number } = {},
  ): boolean => {
    const safeText = toPdfSafeText(text);
    if (!safeText) {
      return true;
    }
    const width = contentWidth() - (extra.indent ?? 0);
    doc.font(font).fontSize(fontSize);
    const blockHeight = doc.heightOfString(safeText, { width });
    if (!canWrite(blockHeight + (extra.gapAfter ?? 0))) {
      return false;
    }
    doc.text(safeText, doc.page.margins.left + (extra.indent ?? 0), doc.y, {
      width,
    });
    if ((extra.gapAfter ?? 0) > 0) {
      doc.moveDown((extra.gapAfter ?? 0) / fontSize);
    }
    return true;
  };

  const writeSectionTitle = (title: string): boolean => {
    if (!canWrite(26)) {
      return false;
    }
    doc.moveDown(0.6);
    doc.font(fonts.bold).fontSize(12).text(toPdfSafeText(title.toUpperCase()), {
      width: contentWidth(),
    });
    doc.moveDown(0.35);
    return true;
  };

  // Header
  if (!writeLine(aboutMe.name, fonts.bold, 23, { gapAfter: 6 })) {
    throw new Error("Failed to render header.");
  }

  const titleLine = [aboutMe.title, aboutMe.institution].filter(Boolean).join(" | ");
  if (titleLine) {
    writeLine(titleLine, fonts.regular, 11, { gapAfter: 6 });
  }

  const links = [
    `Email: ${aboutMe.email}`,
    aboutMe.googleScholarUrl ? `Scholar: ${aboutMe.googleScholarUrl}` : "",
    aboutMe.githubUsername ? `GitHub: https://github.com/${aboutMe.githubUsername}` : "",
    aboutMe.linkedinUsername
      ? `LinkedIn: https://www.linkedin.com/in/${aboutMe.linkedinUsername}`
      : "",
  ]
    .filter(Boolean)
    .join("  |  ");
  if (links) {
    writeLine(links, fonts.regular, 9, { gapAfter: 10 });
  }

  const summary = compact(aboutMe.description);
  if (summary) {
    writeSectionTitle("Summary");
    writeLine(summary, fonts.regular, 10, { gapAfter: 6 });
  }

  let reachedLimit = false;
  const sectionOrderList = sectionOrder as Section[];

  for (const section of sectionOrderList) {
    if (reachedLimit) {
      break;
    }

    switch (section) {
      case Section.Publication: {
        if (publicationData.length === 0) {
          break;
        }
        const { selected, remaining } = limitItems(
          publicationData,
          options.sectionLimits[Section.Publication],
        );
        if (!writeSectionTitle("Selected Publications")) {
          reachedLimit = true;
          break;
        }
        for (const item of selected) {
          const firstLine = `[${item.year}] ${item.title}`;
          if (!writeLine(`- ${firstLine}`, fonts.bold, 10, { indent: 0 })) {
            reachedLimit = true;
            break;
          }
          writeLine(`${item.authors}`, fonts.regular, 9, { indent: 12 });
          writeLine(`${item.conference}`, fonts.italic, 9, { indent: 12 });
          if (item.paperUrl) {
            writeLine(`${item.paperUrl}`, fonts.regular, 8, { indent: 12, gapAfter: 3 });
          } else {
            doc.moveDown(0.2);
          }
        }
        if (!reachedLimit && remaining > 0) {
          writeLine(
            `...and ${remaining} more publication(s). See website for full list.`,
            fonts.italic,
            9,
            { gapAfter: 4 },
          );
        }
        break;
      }
      case Section.Preprint: {
        if (preprintData.length === 0) {
          break;
        }
        const { selected, remaining } = limitItems(
          preprintData,
          options.sectionLimits[Section.Preprint],
        );
        if (!writeSectionTitle("Preprints")) {
          reachedLimit = true;
          break;
        }
        for (const item of selected) {
          if (!writeLine(`- [${item.year}] ${item.title}`, fonts.bold, 10)) {
            reachedLimit = true;
            break;
          }
          writeLine(`${item.authors}`, fonts.regular, 9, { indent: 12 });
          if (item.paperUrl) {
            writeLine(`${item.paperUrl}`, fonts.regular, 8, { indent: 12, gapAfter: 3 });
          } else {
            doc.moveDown(0.2);
          }
        }
        if (!reachedLimit && remaining > 0) {
          writeLine(
            `...and ${remaining} more preprint(s).`,
            fonts.italic,
            9,
            { gapAfter: 4 },
          );
        }
        break;
      }
      case Section.NonRefereedPublication: {
        if (nonRefereedPublicationData.length === 0) {
          break;
        }
        const { selected, remaining } = limitItems(
          nonRefereedPublicationData,
          options.sectionLimits[Section.NonRefereedPublication],
        );
        if (!writeSectionTitle("Non-Refereed Publications")) {
          reachedLimit = true;
          break;
        }
        for (const item of selected) {
          if (!writeLine(`- [${item.year}] ${item.title}`, fonts.bold, 10)) {
            reachedLimit = true;
            break;
          }
          writeLine(`${item.conference}`, fonts.regular, 9, { indent: 12, gapAfter: 2 });
        }
        if (!reachedLimit && remaining > 0) {
          writeLine(
            `...and ${remaining} more non-refereed publication(s).`,
            fonts.italic,
            9,
            { gapAfter: 4 },
          );
        }
        break;
      }
      case Section.Experience: {
        if (experienceData.length === 0) {
          break;
        }
        const { selected, remaining } = limitItems(
          experienceData,
          options.sectionLimits[Section.Experience],
        );
        if (!writeSectionTitle("Experience")) {
          reachedLimit = true;
          break;
        }
        for (const item of selected) {
          if (
            !writeLine(
              `- ${item.date} | ${item.title}, ${item.company}`,
              fonts.bold,
              10,
            )
          ) {
            reachedLimit = true;
            break;
          }
          for (const line of splitLines(item.description)) {
            if (!writeLine(`- ${line}`, fonts.regular, 9, { indent: 12 })) {
              reachedLimit = true;
              break;
            }
          }
          if (reachedLimit) {
            break;
          }
          if (item.companyUrl) {
            writeLine(item.companyUrl, fonts.regular, 8, { indent: 12, gapAfter: 2 });
          } else {
            doc.moveDown(0.15);
          }
        }
        if (!reachedLimit && remaining > 0) {
          writeLine(
            `...and ${remaining} more experience item(s).`,
            fonts.italic,
            9,
            { gapAfter: 4 },
          );
        }
        break;
      }
      case Section.Education: {
        if (educationData.length === 0) {
          break;
        }
        const { selected, remaining } = limitItems(
          educationData,
          options.sectionLimits[Section.Education],
        );
        if (!writeSectionTitle("Education")) {
          reachedLimit = true;
          break;
        }
        for (const item of selected) {
          if (
            !writeLine(
              `- ${item.year} | ${item.degree}, ${item.institution}`,
              fonts.bold,
              10,
            )
          ) {
            reachedLimit = true;
            break;
          }
          if (item.advisor) {
            writeLine(`Advisor: ${item.advisor}`, fonts.regular, 9, { indent: 12 });
          }
          if (item.thesis) {
            writeLine(`Thesis: ${item.thesis}`, fonts.regular, 9, { indent: 12 });
          }
          if (item.thesisUrl) {
            writeLine(item.thesisUrl, fonts.regular, 8, { indent: 12, gapAfter: 2 });
          } else {
            doc.moveDown(0.15);
          }
        }
        if (!reachedLimit && remaining > 0) {
          writeLine(
            `...and ${remaining} more education item(s).`,
            fonts.italic,
            9,
            { gapAfter: 4 },
          );
        }
        break;
      }
      case Section.Grant: {
        if (grantData.length === 0) {
          break;
        }
        const { selected, remaining } = limitItems(
          grantData,
          options.sectionLimits[Section.Grant],
        );
        if (!writeSectionTitle("Grants")) {
          reachedLimit = true;
          break;
        }
        for (const item of selected) {
          if (!writeLine(`- ${item.date} | ${item.title}`, fonts.bold, 10)) {
            reachedLimit = true;
            break;
          }
          writeLine(item.description, fonts.regular, 9, { indent: 12 });
          if (item.link) {
            writeLine(item.link, fonts.regular, 8, { indent: 12, gapAfter: 2 });
          } else {
            doc.moveDown(0.15);
          }
        }
        if (!reachedLimit && remaining > 0) {
          writeLine(`...and ${remaining} more grant(s).`, fonts.italic, 9, {
            gapAfter: 4,
          });
        }
        break;
      }
      case Section.News: {
        if (newsData.length === 0) {
          break;
        }
        const { selected, remaining } = limitItems(
          newsData,
          options.sectionLimits[Section.News],
        );
        if (!writeSectionTitle("News")) {
          reachedLimit = true;
          break;
        }
        for (const item of selected) {
          if (!writeLine(`- ${item.date} | ${item.title}`, fonts.bold, 10)) {
            reachedLimit = true;
            break;
          }
          writeLine(item.description, fonts.regular, 9, { indent: 12 });
          if (item.link) {
            writeLine(item.link, fonts.regular, 8, { indent: 12, gapAfter: 2 });
          } else {
            doc.moveDown(0.15);
          }
        }
        if (!reachedLimit && remaining > 0) {
          writeLine(`...and ${remaining} more news item(s).`, fonts.italic, 9, {
            gapAfter: 4,
          });
        }
        break;
      }
      case Section.Portfolio: {
        if (portfolioData.length === 0) {
          break;
        }
        const { selected, remaining } = limitItems(
          portfolioData,
          options.sectionLimits[Section.Portfolio],
        );
        if (!writeSectionTitle("Portfolio")) {
          reachedLimit = true;
          break;
        }
        for (const item of selected) {
          if (!writeLine(`- ${item.title}`, fonts.bold, 10)) {
            reachedLimit = true;
            break;
          }
          writeLine(item.description, fonts.regular, 9, { indent: 12 });
          if (item.projectUrl) {
            writeLine(item.projectUrl, fonts.regular, 8, { indent: 12 });
          }
          if (item.codeUrl) {
            writeLine(item.codeUrl, fonts.regular, 8, { indent: 12 });
          }
          doc.moveDown(0.15);
        }
        if (!reachedLimit && remaining > 0) {
          writeLine(
            `...and ${remaining} more portfolio item(s).`,
            fonts.italic,
            9,
            { gapAfter: 4 },
          );
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  if (reachedLimit) {
    if (canWrite(22)) {
      doc.moveDown(0.5);
      doc.font(fonts.italic).fontSize(9).text(
        "Additional details are available on the website.",
        doc.page.margins.left,
        doc.y,
        { width: contentWidth() },
      );
    }
  }

  doc.end();

  await new Promise<void>((resolve, reject) => {
    stream.on("finish", () => resolve());
    stream.on("error", (error) => reject(error));
  });

  // eslint-disable-next-line no-console
  console.log(`CV PDF generated: ${outputPath}`);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
