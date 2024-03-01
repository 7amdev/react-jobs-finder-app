import { useEffect, useState } from "react";
import { API_URL, PAGE_LIMIT } from "./constants";
import { Job, JobQuery, Route, Search } from "./types";

export type JobsQueryProps = {
  query: string;
  page?: string;
  limit?: number;
  sortBy?: string;
};

export function useJobs(props: JobsQueryProps) {
  const [jobs, setJobs] = useState<JobQuery>({
    jobs: [],
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { query, page = 1, limit = PAGE_LIMIT, sortBy } = props;
  const sort = sortBy === "relevant" ? "relevanceScore" : "daysAgo";

  useEffect(function () {
    setIsLoading(true);

    fetch(
      `${API_URL}?title_like=${query || ""}&_page=${page}&_limit=${
        limit || PAGE_LIMIT
      }&_sort=${sort}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setJobs({
          jobs: data,
          totalCount: 12,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  return { jobQuery: jobs, isLoading };
}
