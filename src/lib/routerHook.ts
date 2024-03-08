import { useEffect, useState } from "react";
import { Route, RouteParams, Routes } from "./types";
import { APP_URL, PAGE_LIMIT } from "./constants";

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

    console.log("Route: ", route, search);

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
