import { useEffect, useState } from "react";
import JobSearch from "./JobSearch";
import { Job, JobQuery, Route, RouteParams, Search } from "../lib/types";
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

export default function App() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [route, setRoute] = useState<Route>({
    path: "",
    params: {},
    search: {},
  });
  const [jobQuery, setJobQuery] = useState<JobQuery>({
    jobs: [],
    totalCount: 0,
    totalPage: 0,
  });

  const jobsQuery = async function (
    query: string,
    page: string = "1",
    limit: number = PAGE_LIMIT
  ): Promise<JobQuery> {
    const response = await fetch(
      `${API_URL}?q=${query}&_page=${page}&_limit=${limit}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    const totalCount = Number(response.headers.get("X-Total-Count")) || 0;
    return {
      jobs: data,
      totalCount,
      totalPage: Math.floor(totalCount / PAGE_LIMIT),
    };
  };

  const jobsGetById = async function (id: number): Promise<Job | undefined> {
    if (!id) return undefined;
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data as Job;
  };

  const routeGoTo = function (r: Route) {
    let url = r.path;
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

  useEffect(
    function () {
      if (search === undefined) return;
      console.log("searching...|", route, "|");

      if (!search) {
        location.href = `/#${route.path}`;
        return;
      }

      const searchParams = new URLSearchParams({
        q: search,
        page: "1",
      });
      location.href = `/#/jobs?${searchParams.toString()}`;
    },
    [search]
  );

  useEffect(
    function () {
      console.log("Route: ", route);

      if (route.path === "/jobs") {
        jobsQuery(route.search.q || "", route.search.page).then(function (
          data
        ) {
          setJobQuery(data);
        });
        console.log("/Jobs");
      } else if (route.path === "/jobs/32412342141234") {
        console.log("/jobs/id");
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
        <JobSearch route={route} setSearch={setSearch} />
      </header>
      <main>
        <section className="jobs">
          <div className="jobs__header">
            <h1 className="jobs__title">
              Bookmarks <span className="fw-400 fs-23px ">(5)</span>
            </h1>
          </div>
        </section>
        <section className="jobs">
          <div className="jobs__header">
            <h1 className="jobs__title">
              Jobs{" "}
              {jobQuery.totalCount > 0 && (
                <span className="fw-400 fs-23px ">({jobQuery.totalCount})</span>
              )}
            </h1>
            <section className="jobs-sort">
              <svg
                className="jobs-sort__icon"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <button className="jobs-sort__button jobs-sort__button--relevant">
                Relevant
              </button>
              <button className="jobs-sort__button jobs-sort__button--recent">
                Recent
              </button>
            </section>
          </div>
          <section className="jobs__body">
            {jobQuery.jobs.length > 0 && (
              <Pagination
                totalPage={jobQuery.totalCount}
                route={route}
                routeGoTo={routeGoTo}
              >
                <JobList jobs={jobQuery.jobs} jobActive={+route.params.jobId} />
              </Pagination>
            )}
          </section>
        </section>
        {route && (
          <JobDetails
            // @todo: make jobId: number | undefined and pass as value
            jobId={
              +route.params.jobId ||
              (jobQuery.jobs.length > 0 ? jobQuery.jobs[0].id : 0)
            }
            jobsGetById={jobsGetById}
          />
        )}
      </main>
    </>
  );
}
