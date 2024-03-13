import { API_URL, PAGE_LIMIT } from "../lib/constants";
import { useRouterContext } from "../lib/routerContext";
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
  const { route } = useRouterContext();

  return (
    <Pagination itemsTotal={jobs.totalCount} itemsPerPage={PAGE_LIMIT}>
      <List
        data={jobs.data}
        bookmarks={bookmarks}
        itemsActive={+route.params.jobId || +route.search.select}
        itemsTotal={jobs.totalCount}
        itemsPerPage={PAGE_LIMIT}
        itemsSelectFirst={true}
        bookmarksToggle={bookmarksToggle}
      />
    </Pagination>
  );
}
