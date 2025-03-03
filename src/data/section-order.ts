export enum Section {
  Education = "education",
  Experience = "experience",
  Portfolio = "portfolio",
  Publication = "publication",
  Preprint = "preprint",
  NonRefereedPublication = "non_refereed_publication",
  Grant = "grant",
  News = "news",
}

export const sectionOrder = [
  // Section.News,
  Section.Publication,
  Section.Preprint,
  // Section.NonRefereedPublication,
  Section.Experience,
  Section.Education,
  Section.Grant,
  // Section.Portfolio,
];
