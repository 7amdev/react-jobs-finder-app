import { useEffect, useState } from "react";
import JobSearch from "./JobSearch";
import { Job, Search } from "../lib/types";
import { API_URL, PAGE_LIMIT } from "../lib/constants";
import JobList from "./JobList";
import Pagination from "./Pagination";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
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
          query: query,
          jobs: data,
          page: page,
          total: Number(response.headers.get("X-Total-Count")) || 0,
        });
      };

      fetchCall();
    },
    [query, page]
  );

  console.log("App rendering: ", search, page);

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
        <section className="job-details">
          <section className="job-details__header">
            <img
              className="job-details__img"
              src="company-office.jpg"
              alt="A n office open space with employee working"
            />
          </section>
          <section className="job-details__content">
            <section className="job-details__info">
              <div className="flex flex-column">
                <div className="job-details__badge-letter">AT</div>
                <div className="flex justify-between mt-12px">
                  <p className="job-details__age">4d</p>
                  <button className="job-details__bookmark">
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
                </div>
              </div>
              <div className="">
                <h2 className="job-details__title">Front-end React Engineer</h2>
                <p className="job-details__company">9th Tech</p>
                <p className="job-details__description">
                  We are seeking talented and passionate web developers to help
                  build new cloud-based services to accompany our flagship
                  product. You will bring curiosity, craft, and a love of
                  helping customers do their work.
                </p>
                <ul className="job-details__conditions">
                  <li className="flex align-center">
                    <div className="job-details__icon">
                      <svg
                        className=""
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <path
                          d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    Full-Time
                  </li>
                  <li className="flex align-center">
                    <div className="job-details__icon">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <path
                          d="M1 2H14V13H1L1 2ZM0 2C0 1.44772 0.447715 1 1 1H14C14.5523 1 15 1.44772 15 2V13C15 13.5523 14.5523 14 14 14H1C0.447715 14 0 13.5523 0 13V2ZM4.875 7.5C4.875 6.05025 6.05025 4.875 7.5 4.875C8.94975 4.875 10.125 6.05025 10.125 7.5C10.125 8.94975 8.94975 10.125 7.5 10.125C6.05025 10.125 4.875 8.94975 4.875 7.5ZM7.5 3.875C5.49797 3.875 3.875 5.49797 3.875 7.5C3.875 9.50203 5.49797 11.125 7.5 11.125C9.50203 11.125 11.125 9.50203 11.125 7.5C11.125 5.49797 9.50203 3.875 7.5 3.875Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    $80,000+
                  </li>
                  <li className="flex align-center">
                    <div className="job-details__icon">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <path
                          d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                        <path
                          d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                        <path
                          d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                        <path
                          d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    Global
                  </li>
                </ul>
              </div>
            </section>
            <section className="job-details__qualifications">
              <div className="grow-0 basis-200px">
                <h3>Qualifications</h3>
                <p>Other qualifications may apply</p>
              </div>
              <div className="grow-1 basis-0">
                <ul className="job-details__tags">
                  <li className="job-details__tag">HTML/CSS/JS</li>
                  <li className="job-details__tag">React/React native</li>
                  <li className="job-details__tag">Node/Rails</li>
                  <li className="job-details__tag">Apollo client & GraphQL</li>
                  <li className="job-details__tag">Conus: UX/UI</li>
                </ul>
              </div>
            </section>
            <section className="job-details__reviews">
              <div className="grow-0 basis-200px">
                <h3>Company Reviews</h3>
                <p>Recent things people are saying</p>
              </div>
              <div className="grow-1 basis-0">
                <ul className="job-details__quotes">
                  <li className="job-details__quote">
                    Pay & Benefits are awesome.
                  </li>
                  <li className="job-details__quote">
                    Comfortable to work here for sure.
                  </li>
                  <li className="job-details__quote">
                    Nice people that will support you
                  </li>
                  <li className="job-details__quote">All good. Recommended.</li>
                </ul>
              </div>
            </section>
          </section>
          <div className="spinner"></div>
        </section>
      </main>
    </>
  );
}