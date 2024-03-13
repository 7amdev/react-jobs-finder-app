import { PAGE_LIMIT } from "../lib/constants";
import { JobResume } from "../lib/types";
import JobItem from "./JobItem";

type ListProps = {
  data: JobResume[];
  bookmarks: JobResume[];
  page?: number;
  itemsActive: number;
  itemsTotal: number;
  itemsPerPage: number;
  itemsSelectFirst: boolean;
  bookmarksToggle: (job: JobResume) => void;
};

export default function List({
  data,
  bookmarks,
  page = 1,
  itemsActive,
  itemsTotal,
  itemsPerPage,
  itemsSelectFirst,
  bookmarksToggle,
}: ListProps) {
  let jobActiveId: number = -1;
  let jobFound = data.find(function (job) {
    return job.id === +itemsActive;
  });

  if (jobFound) {
    jobActiveId = jobFound.id;
  } else {
    if (!jobFound && itemsSelectFirst) {
      if (data.length > 0) {
        jobActiveId = data[0].id;
      }
    }
  }

  const end = page * PAGE_LIMIT;
  const start = end - PAGE_LIMIT;

  // TODO: isBookmarked flag

  return (
    <ul className={`jobs__list ${itemsTotal > itemsPerPage ? "mi-auto" : ""}`}>
      {data.slice(start, end).map(function (job: JobResume) {
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
