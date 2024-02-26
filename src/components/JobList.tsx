import { Job, JobResume } from "../lib/types";
import JobItem from "./JobItem";

type JobListProps = {
  jobs: JobResume[];
  jobActive: number;
  routeAppendQuery: (key: string, value: string) => string;
};

export default function JobList({
  jobs,
  jobActive,
  routeAppendQuery,
}: JobListProps) {
  let activeIndex = jobs.findIndex(function (job) {
    return job.id === +jobActive;
  });

  if (activeIndex === -1) activeIndex = 0;

  return (
    <ul className="jobs__list">
      {jobs.map(function (job: JobResume) {
        return (
          <JobItem
            key={job.id}
            job={job}
            jobActive={jobs[activeIndex].id}
            routeAppendQuery={routeAppendQuery}
          />
        );
      })}
    </ul>
  );
}
