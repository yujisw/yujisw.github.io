export interface Article {
  title: string;
  description: string;
  tags?: string[];
  url: string;
}

export const articleData: Article[] = [
  {
    title: "プレイブックに基づく契約書レビューにおけるLLMの性能検証",
    description:
      "A technical article evaluating LLM performance on playbook-based Japanese contract review, including prompt-language and input-order comparisons across frontier models.",
    tags: ["Legal NLP", "LLM Evaluation", "Prompt Engineering"],
    url: "https://tech.legalforce.co.jp/entry/playbook_contractreview_llm",
  },
  {
    title: "ICLR 2026 参加報告：現地参加の感想と研究紹介",
    description:
      "A conference report from ICLR 2026 covering an onsite poster presentation and research trends in model editing, fine-grained VLM perception, and AI agent evaluation.",
    tags: ["ICLR 2026", "VLM", "Model Merging", "AI Agents"],
    url: "https://tech.cierpa.co.jp/entry/2026/06/08/130658",
  },
];
