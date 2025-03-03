export interface News {
  date: string;
  title: string;
  description: string;
  link?: string;
}

export const newsData: News[] = [
  // If you don't want to show news, just make the array empty.
  // {
  //   date: "Dec 2024",
  //   title: "Paper accepted at ICLR 2025",
  //   description: "Our work on discovering key indicators in task arithmetic has been accepted at ICLR 2025.",
  //   link: "https://openreview.net/forum?id=1VwWi6zbxs",
  // },
];
