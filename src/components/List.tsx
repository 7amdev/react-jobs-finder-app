import { PAGE_LIMIT } from "../lib/constants";
import { JobResume } from "../lib/types";
import JobItem from "./JobItem";

type ListProps = {
  jobs: JobResume[];
  jobActive: number;
  bookmarks: JobResume[];
  itemsTotal: number;
  itemsPerPage: number;
  itemsSelectFirst: boolean;
  bookmarksToggle: (job: JobResume) => void;
};

export default function List({
  jobs,
  jobActive,
  bookmarks,
  itemsTotal,
  itemsPerPage,
  itemsSelectFirst,
  bookmarksToggle,
}: ListProps) {
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
