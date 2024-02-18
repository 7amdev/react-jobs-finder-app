import { JobResume } from "../lib/types";

type JobItemProps = {
  job: JobResume;
  index: number;
  selected: string;
};
export default function JobItem({ job, index, selected }: JobItemProps) {
  return (
    <li key={job.id} className={`jobs__item self-center `}>
      <a
        href={`#/jobs/${job.id}`}
        className={`job-item ${job.id === +selected && "job-item--active"}`}
      >
        <div className="job-item__badge-letter">{job.badgeLetters}</div>
        <section className="job-item__info">
          <p className="job-item__title">{job.title}</p>
          <p className="job-item__company">{job.company}</p>
        </section>
        <div className="job-item__col">
          <button className="job-item__bookmark">
            <svg
              className="job-item__icon"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M3.5 2C3.22386 2 3 2.22386 3 2.5V13.5C3 13.6818 3.09864 13.8492 3.25762 13.9373C3.41659 14.0254 3.61087 14.0203 3.765 13.924L7.5 11.5896L11.235 13.924C11.3891 14.0203 11.5834 14.0254 11.7424 13.9373C11.9014 13.8492 12 13.6818 12 13.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <p className="job-item__age">{job.daysAgo + "d"}</p>
        </div>
      </a>
    </li>
  );
}