import { useEffect, useRef, useState } from "react";
import { Route, Search } from "../lib/types";

type JobSearchProps = {
  route: Route;
  routeGoTo: (r: Route) => void;
};

export default function JobSearch({ route, routeGoTo }: JobSearchProps) {
  const [value, setValue] = useState<string>(route.search.q || "");
  const inputEl = useRef<HTMLInputElement>(null);

  const isActive = value ? true : false;

  const onChangeHandler = function (inputValue: string) {
    setValue(inputValue);
  };

  useEffect(
    function () {
      const interval = setTimeout(function () {
        if (!route.path) return;

        delete route.search.select;
        delete route.search.page;

        if (value === "") {
          delete route.search.q;
          routeGoTo(route);
          return;
        }

        route.path = "/jobs";
        route.search.q = value;

        routeGoTo(route);
      }, 500);

      return function () {
        clearInterval(interval);
      };
    },
    [value]
  );

  useEffect(function () {
    inputEl.current?.focus();
  }, []);

  return (
    <form
      className="search-form"
      action="#"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="search-form__content">
        <input
          ref={inputEl}
          type="text"
          className={`search-form__input ${
            isActive && "search-form__input--active"
          }`}
          placeholder="Find remote developer jobs..."
          value={value}
          onChange={(e) => onChangeHandler(e.target.value)}
          spellCheck={false}
        />
        <button type="submit" className="search-form__button">
          <svg
            className="search-form__icon"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  );
}
