import React, { useEffect, useState } from "react";
import { APP_URL, PAGE_LIMIT } from "./constants";
import { Route, RouteParams, Routes } from "./types";

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
const routeSearchDefault = {
  _page: "1",
  _limit: "" + PAGE_LIMIT,
  _sortBy: "relevant",
};

function useRouterProviderValue() {
  const [route, setRoute] = useState<Route>({
    path: "",
    params: {},
    search: { _page: "1", _limit: "" + PAGE_LIMIT, _sortBy: "relevant" },
    searchChanges: {},
  });

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

  const routeClone = function (): Route {
    return structuredClone(route);
  };

  const routeUrlGet = function (): string {
    let url = `/#${route.path}`;
    const searchKeys = Object.keys(route.search);
    if (searchKeys.length === 0) {
      return url;
    }

    url += `?`;
    searchKeys.forEach(function (key, index, arr) {
      url += `${key}=${route.search[key]}`;

      if (index < arr.length - 1) {
        url += `&`;
      }
    });

    return url;
  };

  const routeSearchAppend = function (key?: string, value?: string): string {
    if (!key || !value) {
      return routeUrlGet();
    }

    const searchKeys = Object.keys(route.search);
    if (searchKeys.length === 0) {
      return routeUrlGet();
    }

    let url = `/#${route.path}?`;

    searchKeys.forEach(function (searchKey, index, arr) {
      if (key === searchKey) {
        return;
      }

      url += `${searchKey}=${route.search[searchKey]}`;

      if (index < arr.length - 1) {
        url += `&`;
      }
    });

    url += `&`;
    url += `${key}=${value}`;

    return url;
  };

  return {
    route,
    setRoute,
    routerLocationHref,
    routeClone,
    routeSearchAppend,
    routeUrlGet,
  };
}

export function useRouterListenHashChange() {
  const { setRoute } = useRouterContext();
  let isMounted = false;

  useEffect(
    function () {
      isMounted = true;

      const onHashChangeHandler = function () {
        if (!location.hash) {
          location.href = routerRedirectPath;
          return;
        }

        const url = new URL(location.hash.slice(1), APP_URL);
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
        routeParams = [...routePath.matchAll(/(?:\/:([A-Za-z]+))/g)].map(
          function ([_, param]) {
            return param;
          }
        );

        for (let j = 0; j < routeParams.length; j++) {
          params[routeParams[j]] = routeMatch[j];
        }

        if (isMounted) {
          setRoute(function (previousRoute) {
            if (previousRoute.path !== url.pathname) {
              previousRoute.search = routeSearchDefault;
            } else {
              // To prevent http call to /jobs since we are on the same
              // path and on the same page index;
              delete previousRoute.search.select;
              delete previousRoute.search.q;
            }

            const search = {
              ...structuredClone(previousRoute.search),
              ...Object.fromEntries(url.searchParams),
            };

            let newRoute: Route = {
              ...previousRoute,
              path: url.pathname,
              params,
              search,
            };

            const changes = Object.fromEntries(
              Object.entries(newRoute.search).filter(function ([key, value]) {
                return previousRoute.search[key] !== value;
              })
            );

            if (Object.keys(changes).length > 0) {
              newRoute.searchChanges = changes;
            }

            return newRoute;
          });
        }
      };

      window.addEventListener("hashchange", onHashChangeHandler);
      onHashChangeHandler();

      return function () {
        isMounted = false;
        window.removeEventListener("hashchange", onHashChangeHandler);
      };
    },
    [setRoute]
  );
}

export type RouterContextProps = ReturnType<typeof useRouterProviderValue>;

const RouterContext = React.createContext<RouterContextProps | undefined>(
  undefined
);

export function useRouterContext() {
  const context = React.useContext(RouterContext);
  if (context === undefined) {
    throw new Error("useContext must be used within a provider");
  }

  return context;
}

export default function RouterProvider(props: React.PropsWithChildren) {
  const value = useRouterProviderValue();

  return (
    <RouterContext.Provider value={value}>
      <RouterListener />
      {/* <RouterTest /> */}
      {props.children}
    </RouterContext.Provider>
  );
}

export function RouterListener() {
  useRouterListenHashChange();
  return null;
}

// export function RouterTest() {
//   const { route, setPreviousRoute } = useRouterContext();
//   // console.log("r: ", route);
//   // console.log("p: ", previousRoute);

//   useEffect(
//     function () {
//       return function () {
//         setPreviousRoute(route);
//       };
//     },
//     [route]
//   );

//   return null;
// }
