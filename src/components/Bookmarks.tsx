import React from "react";
import { JobResume } from "../lib/types";

type BookmarksProps = {
  bookmarks: JobResume[];
  routePath: string;
  children: React.ReactNode;
};

export default function Bookmarks({
  bookmarks,
  routePath,
  children,
}: BookmarksProps) {
  return (
    <section className="jobs">
      <div className="jobs__header">
        <a href="#/bookmarks" className="jobs__link">
          <h1
            className={`jobs__title ${
              routePath === "/bookmarks" ? "jobs__title--active" : ""
            }`}
          >
            Bookmarks{" "}
            <span className="fw-400 fs-23px ">({bookmarks.length})</span>
          </h1>
        </a>
      </div>
      <section className="jobs__body">
        {bookmarks.length > 0 && routePath === "/bookmarks" && children}
      </section>
    </section>
  );
}
