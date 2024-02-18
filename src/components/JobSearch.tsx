import { useEffect, useState } from "react";
import { Route } from "../lib/types";

type JobSearchProps = {
  setRoute: React.Dispatch<React.SetStateAction<Route>>;
};

export default function JobSearch({ setRoute }: JobSearchProps) {
  const [value, setValue] = useState<string>("");

  const isActive = value ? true : false;

  const onChangeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  };

  useEffect(
    function () {
      const interval = setTimeout(function () {
        setRoute(function (prevState: Route) {
          // prevState.jobs.search.set("q", value);
          const newState = structuredClone(prevState);

          // newState.jobs.search["q"] = value;
          // console.log(JSON.stringify(prevState), JSON.stringify(newState));
          return prevState;
        });
      }, 500);

      return function () {
        clearInterval(interval);
      };
    },
    [value]
  );

  return (
    <form
      className="search-form"
      action="#"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="search-form__content">
        <input
          type="text"
          className={`search-form__input ${
            isActive && "search-form__input--active"
          }`}
          placeholder="Find remote developer jobs..."
          value={value}
          onChange={onChangeHandler}
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
