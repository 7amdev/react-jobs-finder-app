import { API_URL, PAGE_LIMIT } from "../lib/constants";
import { useRouter } from "../lib/routerHook";
import { JobResume, Jobs } from "../lib/types";
import List from "./List";
import Pagination from "./Pagination";

type JobListProps = {
  jobs: Jobs;
  bookmarks: JobResume[];
  bookmarksToggle: (job: JobResume) => void;
};

export default function JobList({
  jobs,
  bookmarks,
  bookmarksToggle,
}: JobListProps) {
  const { route } = useRouter();

  return (
    <Pagination itemsTotal={jobs.totalCount} itemsPerPage={PAGE_LIMIT}>
      <List
        jobs={jobs.data}
        jobActive={+route.params.jobId || +route.search.select}
        bookmarks={bookmarks}
        itemsTotal={jobs.totalCount}
        itemsPerPage={PAGE_LIMIT}
        itemsSelectFirst={true}
        bookmarksToggle={bookmarksToggle}
      />
    </Pagination>
  );
}
