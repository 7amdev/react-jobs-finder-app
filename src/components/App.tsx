import { useEffect, useState } from "react";
import JobSearch from "./JobSearch";
import {
  Job,
  JobQuery,
  JobResume,
  JobsQueryProps,
  Route,
  RouteCache,
  RouteParams,
} from "../lib/types";
import {
  API_URL,
  APP_URL,
  DEFAULT_ROUTE,
  PAGE_LIMIT,
  ROUTES,
} from "../lib/constants";
import Pagination from "./Pagination";
import JobDetails from "./JobDetails";
import BookmarksDropdown from "./BookmarksDropdown";
import JobList from "./JobList";
import Sort from "./Sort";

export default function App() {
  const [route, setRoute] = useState<Route>({
    path: "",
    params: {},
    search: {},
  });
  const [routeCache, setRouteCache] = useState<RouteCache>({});
  const [jobQuery, setJobQuery] = useState<JobQuery>({
    jobs: [],
    totalCount: 0,
  });
  const [bookmarks, setBookmarks] = useState<JobResume[]>([]);

  const jobsQuery = async function (props: JobsQueryProps): Promise<JobQuery> {
    const { query, page = 1, limit = PAGE_LIMIT, sortBy } = props;
    const sort = sortBy === "relevant" ? "relevanceScore" : "daysAgo";
    const response = await fetch(
      `${API_URL}?title_like=${query}&_page=${page}&_limit=${limit}&_sort=${sort}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    const totalCount = Number(response.headers.get("X-Total-Count")) || 0;

    return {
      jobs: data,
      totalCount,
    };
  };

  const jobsGetById = async function (id: number): Promise<Job | undefined> {
    if (!id) return undefined;
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data as Job;
  };

  const routeGoTo = function (r: Route) {
    let url = `/#${r.path}`;
    const searchKeys = Object.keys(r.search);

    if (searchKeys.length > 0) url += `?`;

    searchKeys.forEach(function (searchKey, index, arr) {
      url += `${searchKey}=${r.search[searchKey]}`;
      if (index < arr.length - 1) {
        url += `&`;
      }
    });

    location.href = url;
  };

  const routeSearchAppend = function (key: string, value: string): string {
    let url = `/#${route.path}`;
    const searchKeys = Object.keys(route.search);

    if (!key || !value) return url;

    url += `?`;

    searchKeys.forEach(function (searchKey, index, arr) {
      if (key === searchKey) {
        return;
      }

      url += `${searchKey}=${route.search[searchKey]}`;

      if (index < arr.length - 1) {
        url += `&`;
      }
    });

    if (searchKeys.length > 0) url += `&`;

    url += `${key}=${value}`;

    return url;
  };

  const bookmarksGet = function (): JobResume[] {
    const page = +route.search.page || 1;
    const end = page * PAGE_LIMIT;
    const start = end - PAGE_LIMIT;

    return bookmarks.slice(start, end);
  };

  const jobIdAppCheck = function (): number {
    if (+route.params.jobId) return +route.params.jobId;
    if (+route.search.select) return +route.search.select;
    if (route.path === "/jobs" && jobQuery.jobs.length > 0)
      return jobQuery.jobs[0].id;
    if (route.path === "/bookmarks" && bookmarks.length > 0)
      return bookmarks[0].id;

    return -1;
  };

  useEffect(
    function () {
      setRouteCache({ ...routeCache, [route.path]: structuredClone(route) });
      // TODO add new property on the route that describes route
      //      in a general way: instead of '/jobs/32412342...' it should be
      //      'if (route.name === jobsFilterById) {....}'
      if (route.path === "/jobs") {
        jobsQuery({
          query: route.search.q || "",
          page: route.search.page,
          sortBy: route.search.sort,
        }).then(function (data) {
          setJobQuery(data);
        });
      } else if (route.path === "/jobs/32412342141234") {
        console.log("/jobs/id");
      } else if (route.path === "/bookmarks") {
        // TODO: clear any state not relevant to this route
        console.log("bookmarks");
        // setJobQuery({ jobs: [], totalCount: 0 });
      }
    },
    [route]
  );

  useEffect(function () {
    const onHashChangeHandler = function () {
      if (!location.hash) {
        location.href = DEFAULT_ROUTE;
        return;
      }

      const url = new URL(location.hash.slice(1), APP_URL);
      const search = Object.fromEntries(url.searchParams);
      const params: RouteParams = {};

      let i = 0,
        routeMatch,
        routeParams;

      for (; i < ROUTES.length; i++) {
        const [_, routeParser] = ROUTES[i];
        routeMatch = routeParser.exec(url.pathname);
        routeParser.lastIndex = 0;

        if (routeMatch) {
          routeMatch.shift();
          break;
        }
      }

      if (routeMatch) {
        const [routePath] = ROUTES[i];
        routeParams = [...routePath.matchAll(/(?:\/:([A-Za-z]+))/g)].map(
          function ([_, param]) {
            return param;
          }
        );

        for (let j = 0; j < routeParams.length; j++) {
          params[routeParams[j]] = routeMatch[j];
        }

        setRoute({
          path: url.pathname,
          params,
          search,
        });
      } else {
        location.href = DEFAULT_ROUTE;
      }
    };

    window.addEventListener("hashchange", onHashChangeHandler);
    onHashChangeHandler();

    return function () {
      window.removeEventListener("hashchange", onHashChangeHandler);
    };
  }, []);

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
        <JobSearch key={route.search.q} route={route} routeGoTo={routeGoTo} />
      </header>
      <main>
        {/* <Bookmarks bookmarks={bookmarks} routePath={route.path}>
          <Pagination
            itemsTotal={bookmarks.length}
            itemsPerPage={PAGE_LIMIT}
            route={route}
            routeCache={routeCache}
            routeGoTo={routeGoTo}
          >
            <JobList
              jobs={bookmarks}
              jobActive={+route.params.jobId || +route.search.select}
              bookmarks={bookmarks}
              itemsTotal={bookmarks.length}
              itemsPerPage={PAGE_LIMIT}
              itemsSelectFirst={false}
              routeSearchAppend={routeSearchAppend}
              setBookmarks={setBookmarks}
            />
          </Pagination>
        </Bookmarks> */}
        <section className="jobs">
          <div className="jobs__header">
            <a href="#/jobs" className="jobs__link">
              <h1
                className={`jobs__title ${
                  route.path === "/jobs" ? "jobs__title--active" : ""
                }`}
              >
                Jobs{" "}
                {jobQuery.totalCount > 0 && (
                  <span className="fw-400 fs-23px ">
                    ({(+route.search.page || 1) * PAGE_LIMIT} of{" "}
                    {jobQuery.totalCount})
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
            <Sort route={route} routeGoTo={routeGoTo} />
          </div>
          <section className="jobs__body">
            {/* {(jobQuery.jobs.length > 0 || bookmarks.length > 0) && ( */}
            <Pagination
              itemsTotal={
                route.path === "/jobs" ? jobQuery.totalCount : bookmarks.length
              }
              itemsPerPage={PAGE_LIMIT}
              route={route}
              routeCache={routeCache}
              routeGoTo={routeGoTo}
            >
              <JobList
                jobs={route.path === "/jobs" ? jobQuery.jobs : bookmarksGet()}
                jobActive={+route.params.jobId || +route.search.select}
                bookmarks={bookmarks}
                itemsTotal={
                  route.path === "/jobs"
                    ? jobQuery.totalCount
                    : bookmarks.length
                }
                itemsPerPage={PAGE_LIMIT}
                itemsSelectFirst={true}
                routeSearchAppend={routeSearchAppend}
                setBookmarks={setBookmarks}
              />
            </Pagination>
            {/* )} */}
          </section>
        </section>
        {route && (
          <JobDetails jobId={jobIdAppCheck()} jobsGetById={jobsGetById} />
        )}
      </main>
    </>
  );
}
