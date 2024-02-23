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

export type JobQuery = {
  jobs: Job[];
  totalCount: number;
  totalPage: number;
};

export type Search = {
  jobs: JobResume[];
  query: string;
  page: number;
  total: number;
};

export type RouteConfig = [string, RegExp];
export type Routes = RouteConfig[];

export type RouteProps = {
  params: { [key: string]: string };
  search: { [key: string]: string };
};

export type RouteTypes = "jobs" | "comments";
export type RouteParams = { [key: string]: string };
export type Route = {
  path: string;
  params: RouteParams;
  search: { [key: string]: string };
};
export type RouteCache = { [key: string]: Route };

export type JobsQueryProps = {
  query: string;
  page?: string;
  limit?: number;
  sortBy?: string;
};
