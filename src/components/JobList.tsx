import { JobResume } from "../lib/types";
import JobItem from "./JobItem";

type JobListProps = {
  jobs: JobResume[];
  selected: string;
};

export default function JobList({ jobs, selected }: JobListProps) {
  return (
    <ul className="jobs__list">
      {jobs.map(function (job: JobResume, index) {
        return (
          <JobItem key={job.id} job={job} selected={selected} index={index} />
        );
      })}
    </ul>
  );
}
