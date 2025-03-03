export interface Publication {
  year: string;
  conference: string;
  title: string;
  authors: string;
  paperUrl?: string;
  codeUrl?: string;
  bibtex?: string;
  tldr?: string;
  imageUrl?: string;
  award?: string;
}

export const preprintData: Publication[] = [
  // If you don't want to show publications, just make the array empty.
  {
    year: "2024",
    conference: "preprint",
    title: "Augmenting NER datasets with LLMs: towards automated and refined annotation",
    authors: "Yuji Naraki, Ryosuke Yamaki, Yoshikazu Ikeda, Takafumi Horie, Kotaro Yoshida, Ryotaro Shimizu, Hiroki Naganuma",
    paperUrl: "https://arxiv.org/abs/2404.01334",
  },
];

export const publicationData: Publication[] = [
  // If you don't want to show publications, just make the array empty.
  {
    year: "2025",
    conference: "International Conference on Learning Representations (ICLR) 2025",
    title: "Mastering Task Arithmetic: τJp as a Key Indicator for Weight Disentanglement",
    authors: "Kotaro Yoshida, Yuji Naraki, Takafumi Horie, Ryosuke Yamaki, Ryotaro Shimizu, Yuki Saito, Julian McAuley, Hiroki Naganuma",
    paperUrl: "https://openreview.net/forum?id=1VwWi6zbxs",
  },
  {
    year: "2024",
    conference: "NeurIPS 2024 Workshop: <a href='https://sites.google.com/view/neurips2024-ftw/home'>Fine-Tuning in Modern Machine Learning: Principles and Scalability (FITML)</a>",
    title: "Mastering Task Arithmetic: τJp as a Key Indicator for Weight Disentanglement",
    authors: "Kotaro Yoshida, Yuji Naraki, Takafumi Horie, Ryosuke Yamaki, Ryotaro Shimizu, Yuki Saito, Julian McAuley, Hiroki Naganuma",
    paperUrl: "https://openreview.net/forum?id=uvTDEA2z5f",
  },
  {
    year: "2022",
    conference: "The 13th Conference on Language Resources and Evaluation",
    title: "Evaluating the Effects of Embedding with Speaker Identity Information in Dialogue Summarization",
    authors: "Yuji NARAKI, Tetsuya SAKAI, Yoshihiko HAYASHI",
  },
];


export const nonRefereedPublicationData: Publication[] = [
  // If you don't want to show publications, just make the array empty.
  // NLP2024: NER
  // NLP2023: sumtopk
  // NLP2023: 脚本解析
  {
    year: "2021",
    conference: "Forum on Information Technology 2021",
    title: "The Effects of Embedding with Speaker Identity Information in Dialogue Summarization",
    authors: "Yuji NARAKI, Tetsuya SAKAI, Yoshihiko Hayashi",
    award: "FIT Incentive Award",
  },
  {
    year: "2021",
    conference: "The 27th Annual Meeting of The Association for Natural Language Processing",
    title: "Speaker-Aware Dialogue Summarization",
    authors: "Yuji NARAKI, Tetsuya SAKAI",
  },
  {
    year: "2021",
    conference: "The 83rd National Convention of Information Processing Society of Japan 2021",
    title: "Relationship between Consistency Loss Decay and Generalization in Semi-Supervised Learning",
    authors: "Yuji NARAKI, Tetsuya MOTOKAWA, Hiroki NAGANUMA",
  },
  {
    year: "2020",
    conference: "NII Testbeds and Community for Information Access Research 15",
    title: "selt Team's Entity Linking System at the NTCIR-15 QA Lab-PoliInfo2",
    authors: "Yuji NARAKI, Tetsuya SAKAI",
    award: "Got the 2nd best score.",
  },
];
