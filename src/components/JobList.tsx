import { PAGE_LIMIT } from "../lib/constants";
import { useRouterContext } from "../lib/routerContext";
import { Job, JobResume } from "../lib/types";
import JobItem from "./JobItem";

type JobListProps = {
  jobs: JobResume[];
  jobActive: number;
  bookmarks: JobResume[];
  itemsTotal: number;
  itemsPerPage: number;
  itemsSelectFirst: boolean;
  routeSearchAppend: (key: string, value: string) => string;
  bookmarksToggle: (job: JobResume) => void;
};

export default function JobList({
  jobs,
  jobActive,
  bookmarks,
  itemsTotal,
  itemsPerPage,
  itemsSelectFirst,
  bookmarksToggle,
}: JobListProps) {
  let jobActiveId: number = -1;
  let jobFound = jobs.find(function (job) {
    return job.id === +jobActive;
  });

  if (jobFound) {
    jobActiveId = jobFound.id;
  } else {
    if (!jobFound && itemsSelectFirst) {
      if (jobs.length > 0) {
        jobActiveId = jobs[0].id;
      }
    }
  }

  return (
    <ul className={`jobs__list ${itemsTotal > itemsPerPage ? "mi-auto" : ""}`}>
      {jobs.slice(0, PAGE_LIMIT).map(function (job: JobResume) {
        return (
          <JobItem
            key={job.id}
            job={job}
            jobActive={jobActiveId}
            bookmarksToggle={bookmarksToggle}
            bookmarks={bookmarks}
          />
        );
      })}
    </ul>
  );
}
