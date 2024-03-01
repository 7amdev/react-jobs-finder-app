import { Route, RouteCache } from "../lib/types";

type PaginationProps = {
  itemsTotal: number;
  itemsPerPage: number;
  route: Route;
  routeCache: RouteCache;
  routeGoTo: (r: Route) => void;
  children: React.ReactNode;
};

export default function Pagination({
  itemsTotal,
  itemsPerPage,
  route,
  routeCache,
  routeGoTo,
  children,
}: PaginationProps) {
  let totalPage: number = Math.floor(itemsTotal / itemsPerPage);
  const currentPage: number = +route.search.page || 1;

  if (itemsTotal % itemsPerPage > 0) totalPage += 1;

  const onPreviousPageHandler = function () {
    if (route.path !== "/jobs") {
      route.search = routeCache["/jobs"].search;
      route.path = "/jobs";
    }
    let prevPage = +(route.search.page || 1) - 1;

    if (prevPage < 1) prevPage = 1;
    route.search.page = String(prevPage);
    delete route.search.select;

    routeGoTo(route);
  };

  const onNextPageHandler = function () {
    if (route.path !== "/jobs") {
      route.search = routeCache["/jobs"].search;
      route.path = "/jobs";
    }
    let nextPage = +(route.search.page || 1) + 1;

    if (nextPage > totalPage) nextPage = totalPage;
    route.search.page = String(nextPage);
    delete route.search.select;

    routeGoTo(route);
  };

  return (
    <>
      {/* {currentPage > 1 && ( */}
      <button
        onClick={() => onPreviousPageHandler()}
        className={`jobs__button jobs__button--previous ${
          currentPage > 1 ? "visible" : "invisible"
        } `}
      >
        <svg
          className="jobs__icon"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <path
            d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {/* )} */}

      {children}

      {/* {currentPage < totalPage && ( */}
      <button
        onClick={() => onNextPageHandler()}
        className={`jobs__button jobs__next ${
          currentPage < totalPage ? "visible" : "invisible"
        } `}
      >
        <svg
          className="jobs__icon"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <path
            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {/* )} */}
    </>
  );
}
