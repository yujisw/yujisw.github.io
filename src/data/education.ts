export interface Education {
  year: string;
  institution: string;
  degree: string;
  advisor?: string;
  thesis?: string;
  thesisUrl?: string;
}

export const educationData: Education[] = [
  // If you don't want to show education, just make the array empty.
  {
    year: "2021—2023",
    institution: "Waseda University",
    degree: "Master of Engineering in Computer Science",
    thesis: "End-to-End Length Controllable Summarization using Soft Information Masking（Original Title: 指定要約長に応じたソフトな内容選択による要約長操作可能なEnd-to-End要約）",
    advisor: "Prof. Yoshihiko Hayashi and Prof. Tetsunori Kobayashi",
  },
  {
    year: "2017—2021",
    institution: "Waseda University",
    degree: "Bachelor of Engineering in Computer Science",
    thesis: "Evaluating the Effects of Embedding with Speaker Identity Information in Dialogue Summarization",
    advisor: "Prof. Tetsuya Sakai",
    thesisUrl: "https://aclanthology.org/2022.lrec-1.31/"
  },
];
