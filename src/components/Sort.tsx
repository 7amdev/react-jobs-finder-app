import { Route } from "../lib/types";

type SortProps = {
  route: Route;
  routeGoTo: (r: Route) => void;
};

export default function Sort({ route, routeGoTo }: SortProps) {
  return (
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
      <button
        className={`jobs-sort__button jobs-sort__button--relevant ${
          route.search._sort === "relevanceScore"
            ? "jobs-sort__button--active"
            : ""
        }`}
        onClick={(e) => {
          e.currentTarget.blur();

          route.search._sort = "relevanceScore";
          delete route.search.select;
          routeGoTo(route);
        }}
      >
        Relevant
      </button>
      <button
        className={`jobs-sort__button jobs-sort__button--recent ${
          route.search._sort === "daysAgo" ? "jobs-sort__button--active" : ""
        }`}
        onClick={(e) => {
          e.currentTarget.blur();
          route.search._sort = "daysAgo";
          delete route.search.select;
          routeGoTo(route);
        }}
      >
        Recent
      </button>
    </section>
  );
}
