import { useEffect, useState } from "react";
import { Jobs } from "./types";

export function useJobs(url: string): {
  jobs: Jobs;
  isLoading: boolean;
  error: string;
} {
  const [jobs, setJobs] = useState<Jobs>({
    data: [],
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      if (!url) return;

      // setIsLoading(true);
      let ignore = false; // Flag to avoid race conditions

      fetch(url, {
        method: "GET",
      })
        .then((response) => {
          const totalCount = response.headers.get("x-total-count") || 0;

          return Promise.all([response.json(), +totalCount]);
        })
        .then(([data, totalCount]) => {
          console.log("data: ", data);

          if (!ignore) {
            // setIsLoading(false);
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
        // setIsLoading(false);
      };
    },
    [url]
  );

  return { jobs, isLoading, error };
}
