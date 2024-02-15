export type Job = {
  id: number;
  title: string;
  description: string;
  badgeLetters: string;
  company: string;
  duration: string;
  salary: string;
  location: string;
  qualifications: string[];
  reviews: string[];
  relevanceScore: number;
  daysAgo: number;
  coverImgUrl: string;
  companyUrl: string;
};

export type JobResume = Pick<
  Job,
  "id" | "title" | "badgeLetters" | "company" | "daysAgo" | "relevanceScore"
>;

export type Search = {
  jobs: JobResume[];
  query: string;
  page: number;
  total: number;
};
