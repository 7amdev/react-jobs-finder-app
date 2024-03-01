import { PAGE_LIMIT } from "../lib/constants";
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
  setBookmarks: React.Dispatch<React.SetStateAction<JobResume[]>>;
};

export default function JobList({
  jobs,
  jobActive,
  bookmarks,
  itemsTotal,
  itemsPerPage,
  itemsSelectFirst,
  routeSearchAppend,
  setBookmarks,
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
            routeSearchAppend={routeSearchAppend}
            setBookmarks={setBookmarks}
            bookmarks={bookmarks}
          />
        );
      })}
    </ul>
  );
}
