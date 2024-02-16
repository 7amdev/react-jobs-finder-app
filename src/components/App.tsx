import { useEffect, useState } from "react";
import JobSearch from "./JobSearch";
import { Job, JobResume, Search } from "../lib/types";
import { API_URL, PAGE_LIMIT } from "../lib/constants";
import JobList from "./JobList";
import Pagination from "./Pagination";
import JobDetails from "./JobDetails";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [jobId, setJobId] = useState("");
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [search, setSearch] = useState<Search>({
    jobs: [],
    query: "",
    page: 1,
    total: 0,
  });

  const { jobs } = search;

  useEffect(
    function () {
      const fetchCall = async function () {
        const response = await fetch(
          `${API_URL}?q=${query}&_page=${page}&_limit=${PAGE_LIMIT}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();

        setSearch({
          ...search,
          query,
          jobs: data,
          page,
          total: Number(response.headers.get("X-Total-Count")) || 0,
        });
      };

      fetchCall();
    },
    [query, page]
  );

  useEffect(
    function () {
      if (!jobId) return;
      const fetchJobById = async function () {
        const response = await fetch(`${API_URL}/${jobId}`);
        const data = await response.json();
        setJob(data);
      };
      fetchJobById();
    },
    [jobId]
  );

  useEffect(function () {
    const onHashChangeHandler = function () {
      const url = new URL(location.hash.slice(1), API_URL);
      const { searchParams: search } = url;
      const id = search.get("id");

      if (id) {
        setJobId(id);
      }
      console.log("Job: ", id);
    };

    window.addEventListener("hashchange", onHashChangeHandler);
    onHashChangeHandler();

    return function () {
      window.removeEventListener("hashchange", () => onHashChangeHandler());
    };
  }, []);

  console.log("Rendering App: ", job);

  return (
    <>
      <header className="header">
        <div className="header__top">
          <a href="/" className="logo">
            <svg
              className="logo__icon"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            jobs<span className="fw-700 fs-italic">finder</span>
          </a>
          <span className="header__separator">|</span>
          <div className="bookmark">
            <button className="bookmark__button">
              bookmarks
              <svg
                className="bookmark__icon"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
              </svg>
            </button>
            <ul className="bookmark__list ">
              <li className="bookmark__item">
                <a href="#" className="job-item bookmark__link">
                  <div className="job-item__badge-letter">AS</div>
                  <section className="job-item__info">
                    <p className="job-item__title">
                      Front-end Developer - React
                    </p>
                    <p className="job-item__company">AT Security</p>
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
                    <p className="job-item__age">4d</p>
                  </div>
                </a>
              </li>
              <li className="bookmark__item">
                <a href="#" className="job-item bookmark__link">
                  <div className="job-item__badge-letter">AS</div>
                  <section className="job-item__info">
                    <p className="job-item__title">
                      Front-end Developer - React
                    </p>
                    <p className="job-item__company">AT Security</p>
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
                    <p className="job-item__age">4d</p>
                  </div>
                </a>
              </li>
              <li className="bookmark__item">
                <a href="#" className="job-item bookmark__link">
                  <div className="job-item__badge-letter">AS</div>
                  <section className="job-item__info">
                    <p className="job-item__title">
                      Front-end Developer - React
                    </p>
                    <p className="job-item__company">AT Security</p>
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
                    <p className="job-item__age">4d</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <JobSearch setQuery={setQuery} />
      </header>
      <main>
        <section className="jobs">
          <div className="jobs__header">
            <h1 className="jobs__title">
              Bookmarks <span className="fw-400 fs-23px ">(5)</span>
            </h1>
          </div>
        </section>
        <section className="jobs">
          <div className="jobs__header">
            <h1 className="jobs__title">
              Jobs <span className="fw-400 fs-23px ">(41)</span>
            </h1>
            <section className="jobs-sort">
              <svg
                className="jobs-sort__icon"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <button className="jobs-sort__button jobs-sort__button--relevant">
                Relevant
              </button>
              <button className="jobs-sort__button jobs-sort__button--recent">
                Recent
              </button>
            </section>
          </div>
          <section className="jobs__body">
            <Pagination setPage={setPage} totalPage={search.total}>
              <JobList jobs={jobs} />
            </Pagination>
          </section>
        </section>
        {job && <JobDetails job={job} />}
      </main>
    </>
  );
}
