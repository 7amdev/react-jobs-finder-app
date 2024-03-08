import { PAGE_LIMIT } from "../lib/constants";
import { useRouter } from "../lib/routerHook";
import { JobResume } from "../lib/types";
import List from "./List";
import Pagination from "./Pagination";

type Bookmarks = {
  bookmarks: JobResume[];
  bookmarksToggle: (job: JobResume) => void;
};

export default function Bookmarks({ bookmarks, bookmarksToggle }: Bookmarks) {
  const { route } = useRouter();

  return (
    <Pagination itemsTotal={bookmarks.length} itemsPerPage={PAGE_LIMIT}>
      <List
        jobs={bookmarks}
        jobActive={+route.params.jobId || +route.search.select}
        bookmarks={bookmarks}
        itemsTotal={bookmarks.length}
        itemsPerPage={PAGE_LIMIT}
        itemsSelectFirst={true}
        bookmarksToggle={bookmarksToggle}
      />
    </Pagination>
  );
}
