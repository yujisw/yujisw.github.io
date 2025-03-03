export interface Experience {
  date: string;
  title: string;
  company: string;
  description?: string;
  advisor?: string;
  manager?: string;
  companyUrl?: string;
}

export const experienceData: Experience[] = [
  {
    date: "Apr 2023 - Present",
    title: "ML Research Engineer",
    company: "LegalOn Technologies, Inc. (formerly LegalForce, Inc.)",
    description: `Developed stateless APIs using ML models for legal document analysis.
Developed asynchronous APIs using Cloud PubSub for time-consuming LLM processing.`,
    companyUrl: "https://legalontech.jp/"
  },
  {
    date: "Aug 2021 - Sep 2021",
    title: "Research Internship",
    company: "LegalForce, Inc.",
    description: "Researched on machine translation for texts with technical terms.",
    companyUrl: "https://legalontech.jp/"
  },
  {
    date: "Jul 2021",
    title: "Research Engineering Internship",
    company: "CyberAgent, Inc.",
    description: "Developed a text-generation engine for advertisement using templates.",
    companyUrl: "https://www.cyberagent.co.jp/"
  },
  {
    date: "Mar 2021 - Jun 2021",
    title: "Data Scientist Internship",
    company: "PELORIA, P.B.C.",
    description: "Developed a deep learning model that ran on social networking sites to create a city risk index.",
    companyUrl: "https://peloria.ai/"
  },
  {
    date: "Jun 2019 - Jun 2021",
    title: "Machine Learning Engineer Internship",
    company: "AlgoAge Inc",
    description: `Developed iOS and web applications for attendance & health management.
Developed a web application for image annotation.
Developed algorithms and frameworks for face recognition.
Improved generation of animated characters with face mesh input.
Implemented extraction of images from a 3D camera.`,
    companyUrl: "https://algoage.dmm.com/"
  },
  {
    date: "Mar 2020 - Mar 2021",
    title: "Research Assistant",
    company: "Science Tokyo (formerly Tokyo Institute of Technology)",
    description: `Surveyed NeurIPS 2019 papers in the field of deep learning for language.
Implemented an environment for large-scale experimentation in language model learning.`
  },
  {
    date: "May 2018 - Dec 2019",
    title: "Machine Learning Engineer Internship",
    company: "Logbii Inc",
    description: `Analyzed videos of object detection for labeling.
Developed a SaaS application for machine learning.
Analyzed dynamic dashboard camera for collision detection.`,
    companyUrl: "https://logbii.co.jp/"
  },
];
