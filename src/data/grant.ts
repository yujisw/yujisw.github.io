export interface Grant {
  date: string;
  title: string;
  description: string;
  link?: string;
}

export const grantData: Grant[] = [
  // If you don't want to show grants, just make the array empty.
  {
    date: "Apr 2021 - Mar 2022",
    title: "JEES·Softbank AI Scholarship",
    description: "1,000,000 JPY / Apporox 9,000 USD at the time",
    link: "https://www.softbank.jp/corp/news/info/2020/20201016_01/",
  },
];
