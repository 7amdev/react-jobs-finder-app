import { useEffect, useState } from "react";
import { JobQuery } from "./types";

export type JobsQueryProps = {
  urlT: string;
  query: string;
  page?: string;
  limit?: number;
  sortBy?: string;
};

export function useJobs(url: string) {
  const [jobs, setJobs] = useState<JobQuery>({
    jobs: [],
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
            console.log("Total", totalCount, " url: ", url);
            setIsLoading(false);
            setJobs({
              jobs: data,
              totalCount: totalCount,
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

  return { jobQuery: jobs, isLoading, error };
}
