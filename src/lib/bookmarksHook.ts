import { useState } from "react";
import { JobResume } from "./types";
import { PAGE_LIMIT } from "./constants";
import { useRouterContext } from "./routerContext";

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<JobResume[]>(function () {
    return JSON.parse(localStorage.getItem("bookmarks") || "[]");
  });
  const { route } = useRouterContext();

  const bookmarksToggle = function (job: JobResume) {
    const index = bookmarks.findIndex(function (item) {
      return item.id === job.id;
    });

    let bookmarks_update;
    if (index === -1) {
      bookmarks_update = [...bookmarks, job];
    } else {
      bookmarks_update = bookmarks.filter(function (bookmark) {
        return bookmark.id !== job.id;
      });
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks_update));
    setBookmarks(bookmarks_update);
  };

  const bookmarksGet = function (): JobResume[] {
    const page = +route.search._page || 1;
    const end = page * PAGE_LIMIT;
    const start = end - PAGE_LIMIT;

    return bookmarks.slice(start, end);
  };

  return { bookmarks, bookmarksToggle, bookmarksGet };
}
