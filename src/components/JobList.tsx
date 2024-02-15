import { JobResume } from "../lib/types";
import JobItem from "./JobItem";

type JobListProps = {
  jobs: JobResume[];
};

export default function JobList({ jobs }: JobListProps) {
  return (
    <ul className="jobs__list">
      {jobs.map(function (job: JobResume, index) {
        return <JobItem key={job.id} job={job} index={index} />;
      })}
    </ul>
  );
}
