import { PAGE_LIMIT } from "../lib/constants";
import { useRouterContext } from "../lib/routerContext";
import { JobResume } from "../lib/types";
import List from "./List";
import Pagination from "./Pagination";

type Bookmarks = {
  bookmarks: JobResume[];
  bookmarksToggle: (job: JobResume) => void;
};

export default function Bookmarks({ bookmarks, bookmarksToggle }: Bookmarks) {
  const { route } = useRouterContext();

  return (
    <Pagination itemsTotal={bookmarks.length} itemsPerPage={PAGE_LIMIT}>
      <List
        data={bookmarks}
        bookmarks={bookmarks}
        page={+route.search._page || 1}
        itemsActive={+route.params.jobId || +route.search.select}
        itemsTotal={bookmarks.length}
        itemsPerPage={PAGE_LIMIT}
        itemsSelectFirst={true}
        bookmarksToggle={bookmarksToggle}
      />
    </Pagination>
  );
}
