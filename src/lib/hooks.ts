import { useEffect, useState } from "react";
import { Job, Jobs, Route, RouteParams, Routes } from "./types";
import { API_URL, APP_URL, PAGE_LIMIT } from "./constants";

export function useJobs(url: string): {
  jobs: Jobs;
  jobsGetById: (id: number) => Promise<Job | undefined>;
  isLoading: boolean;
  error: string;
} {
  const [jobs, setJobs] = useState<Jobs>({
    data: [],
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const jobsGetById = async function (id: number): Promise<Job | undefined> {
    if (!id) return undefined;
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      console.error("Error: reponse header status not ok!");
      return;
    }
    const data = await response.json();
    return data as Job;
  };

  useEffect(
    function () {
      setIsLoading(true);
      let ignore = false; // Flag to avoid race conditions

      console.log("Hook running...");
      fetch(url, {
        method: "GET",
      })
        .then((response) => {
          const totalCount = response.headers.get("x-total-count") || 0;

          return Promise.all([response.json(), +totalCount]);
        })
        .then(([data, totalCount]) => {
          if (!ignore) {
            setIsLoading(false);
            setJobs({
              data,
              totalCount,
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.message);
          console.error(error);
        });

      return function () {
        ignore = true;
        setIsLoading(false);
      };
    },
    [url]
  );

  return { jobs, isLoading, error, jobsGetById };
}

export function useRouter() {
  const [route, setRoute] = useState<Route>({
    path: "",
    params: {},
    search: { _page: "1", _limit: "" + PAGE_LIMIT, _sortBy: "relevant" },
  });

  const routerRoutes: Routes = [
    ["/", /^\/$/g],
    ["/jobs", /^\/jobs$/g],
    ["/jobs/:jobId", /^\/jobs\/(\d+)$/g],
    ["/jobs/:jobId/comments/:commentId", /^\/jobs\/(\d+)\/comments\/(\d+)$/g],
    ["/bookmarks", /^\/bookmarks$/g],
    ["/bookmarks/:jobId", /^\/bookmarks\/(\d+)$/g],
  ];
  const routerRedirectPath = "/#/jobs";
  const routerNotFoundPath = "";

  const onHashChangeHandler = function () {
    if (!location.hash) {
      location.href = routerRedirectPath;
      return;
    }

    const url = new URL(location.hash.slice(1), APP_URL);
    const search = {
      ...route.search,
      ...Object.fromEntries(url.searchParams),
    };

    const params: RouteParams = {};

    let i = 0,
      routeMatch,
      routeParams;

    for (; i < routerRoutes.length; i++) {
      const [_, routeParser] = routerRoutes[i];
      routeMatch = routeParser.exec(url.pathname);
      routeParser.lastIndex = 0;

      if (routeMatch) {
        routeMatch.shift();
        break;
      }
    }

    if (!routeMatch) {
      if (routerNotFoundPath) {
        location.href = routerNotFoundPath;
        return;
      } else {
        location.href = routerRedirectPath;
        return;
      }
    }

    const [routePath] = routerRoutes[i];
    routeParams = [...routePath.matchAll(/(?:\/:([A-Za-z]+))/g)].map(function ([
      _,
      param,
    ]) {
      return param;
    });

    for (let j = 0; j < routeParams.length; j++) {
      params[routeParams[j]] = routeMatch[j];
    }

    setRoute({
      ...route,
      path: url.pathname,
      params,
      search,
    });
  };

  const routerLocationHref = function (r: Route) {
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

  const routerSearchAppend = function (key: string, value: string): string {
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

  useEffect(function () {
    window.addEventListener("hashchange", onHashChangeHandler);
    onHashChangeHandler();

    return function () {
      window.removeEventListener("hashchange", onHashChangeHandler);
    };
  }, []);

  return { route, routerLocationHref, routerSearchAppend };
}
