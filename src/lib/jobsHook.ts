import { useEffect, useState } from "react";
import { Job, Jobs } from "./types";
import { API_URL } from "./constants";

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
