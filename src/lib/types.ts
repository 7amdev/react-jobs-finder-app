export type Job = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  relevanceScore: number;
  daysAgo: number;
};

export type Search = {
  jobs: Job[];
  query: string;
  page: number;
  total: number;
};
