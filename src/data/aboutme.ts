export interface AboutMe {
  name: string;
  title: string;
  institution: string;
  description: string;
  email: string;
  imageUrl?: string;
  blogUrl?: string;
  cvUrl?: string;
  googleScholarUrl?: string;
  twitterUsername?: string;
  githubUsername?: string;
  linkedinUsername?: string;
  funDescription?: string; // Gets placed in the left sidebar
  secretDescription?: string; // Gets placed in the bottom
  altName?: string;
  institutionUrl?: string;
}

export const aboutMe: AboutMe = {
  name: "Yuji Naraki",
  title: "Research Engineer in Tokyo, Japan",
  institution: "LegalOn Technologies, Inc.",
  // Note that links work in the description
  description:
    "I'm a Machine Learning Engineer and Researcher based in Tokyo, Japan, with a focus on model editing and natural language processing. I'm passionate about bridging cutting-edge research with real-world applications, and I take pride in owning projects from start to finish. I'm also highly interested in technologies related to Personalized Companion Agents — interactive systems that engage naturally with humans. I thrive in collaborative environments and enjoy continuously learning new technologies and tools to solve complex problems.",
  email: "yuji.1277@gmail.com",
  imageUrl: "/images/masters_graduation.jpg",
  googleScholarUrl: "https://scholar.google.com/citations?user=EF1IHQkAAAAJ",
  githubUsername: "yujisw",
  linkedinUsername: "yujisw",
  twitterUsername: "yuji_research",
  // blogUrl: "https://",
  // cvUrl: "https://",
  institutionUrl: "https://legalontech.jp/",
  // altName: "",
  // secretDescription: "I like dogs.",
};
