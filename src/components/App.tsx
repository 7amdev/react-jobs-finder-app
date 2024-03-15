import JobSearch from "./JobSearch";
import { API_URL, PAGE_LIMIT } from "../lib/constants";
import JobDetails from "./JobDetails";
import BookmarksDropdown from "./BookmarksDropdown";
import JobList from "./JobList";
import Sort from "./Sort";
import useBookmarks from "../lib/bookmarksHook";
import { useJobs } from "../lib/jobsHook";
import Bookmarks from "./Bookmarks";
import { useRouterContext } from "../lib/routerContext";

export default function App() {
  // TODO: refactor search, get a route clone and do updates on it

  const { route, routerLocationHref } = useRouterContext();

  const url =
    route.path === "/jobs" && !route.search.select
      ? `${API_URL}?${new URLSearchParams(route.search)}`
      : "";

  const { jobs, isLoading } = useJobs(url);
  const { bookmarks, bookmarksToggle } = useBookmarks(route);

  const appCurrentJobId = function (): number | undefined {
    if (+route.params.jobId) return +route.params.jobId;
    if (+route.search.select) return +route.search.select;
    if (route.path === "/jobs" && jobs.data.length > 0) return jobs.data[0].id;
    if (route.path === "/bookmarks" && bookmarks.length > 0)
      return bookmarks[0].id;

    return undefined;
  };

  const currentJobId = appCurrentJobId();

  return (
    <>
      <header className="header">
        <div className="header__top">
          <a href="/" className="logo">
            <svg
              className="logo__icon"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            jobs<span className="fw-700 fs-italic">finder</span>
          </a>
          <span className="header__separator">|</span>
          <div className="bookmark">
            <button className="bookmark__button">
              bookmarks
              <svg
                className="bookmark__icon"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
              </svg>
            </button>
            <BookmarksDropdown />
          </div>
        </div>
        <JobSearch
          key={route.search.q}
          route={route}
          routeGoTo={routerLocationHref}
        />
      </header>
      <main>
        <section className="jobs">
          <div className="jobs__header">
            <a href="#/jobs" className="jobs__link">
              <h1
                className={`jobs__title ${
                  route.path === "/jobs" ? "jobs__title--active" : ""
                }`}
              >
                Jobs{" "}
                {jobs.totalCount > 0 && (
                  <span className="fw-400 fs-23px ">
                    (
                    {route.path === "/jobs"
                      ? (+route.search._page || 1) * PAGE_LIMIT
                      : PAGE_LIMIT}{" "}
                    of {jobs.totalCount})
                  </span>
                )}
              </h1>
            </a>
            <a href="#/bookmarks" className="jobs__link">
              <h1
                className={`jobs__title ${
                  route.path === "/bookmarks" ? "jobs__title--active" : ""
                }`}
              >
                Bookmarks{" "}
                <span className="fw-400 fs-23px ">({bookmarks.length})</span>
              </h1>
            </a>
            <Sort />
          </div>
          <section className="jobs__body">
            {(route.path === "/" || route.path === "/jobs") && (
              <JobList
                jobs={jobs}
                bookmarks={bookmarks}
                bookmarksToggle={bookmarksToggle}
              />
            )}
            {route.path === "/bookmarks" && (
              <Bookmarks
                bookmarks={bookmarks}
                bookmarksToggle={bookmarksToggle}
              />
            )}
            {/* {["/", "/jobs", "/bookmarks"].includes(route.path) && (
              <Pagination
                itemsTotal={
                  route.path === "/jobs" ? jobs.totalCount : bookmarks.length
                }
                itemsPerPage={PAGE_LIMIT}
              >
                <JobList
                  jobs={route.path === "/jobs" ? jobs.data : bookmarksGet()}
                  jobActive={+route.params.jobId || +route.search.select}
                  bookmarks={bookmarks}
                  itemsTotal={
                    route.path === "/jobs" ? jobs.totalCount : bookmarks.length
                  }
                  itemsPerPage={PAGE_LIMIT}
                  itemsSelectFirst={true}
                  routeSearchAppend={routerSearchAppend}
                  bookmarksToggle={bookmarksToggle}
                />
              </Pagination>
            )} */}
          </section>
        </section>
        {route && <JobDetails key={currentJobId} jobId={currentJobId} />}
      </main>
    </>
  );
}
