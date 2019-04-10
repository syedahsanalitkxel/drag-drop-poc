import React, { useState } from 'react';
import GuestTemplate from '../../templates/GuestTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

const EvaluationSummary = () => {
  const [display, setDisplay] = useState(false);
  const toggleComment = (e: any) => {
    e.preventDefault();
    setDisplay(!display);
  };
  return (
    <GuestTemplate>
      <div>
        <div className="row">
          <div className="col-lg-9 col-md-9">
            <h2 className="font-weight-bold">Jasmine Rassol </h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="evaluation-list.html">Assessments</a>
              </li>
              <li className="breadcrumb-item">
                <a href="evaluation-list.html">360° Leadership Instrument</a>
              </li>
              <li className="breadcrumb-item active">
                <strong>Jhon James</strong>
              </li>
            </ol>
          </div>
          <div className="col-sm-3 mt-3">
            <strong className="count">
              Overall Scale <strong className="font-bold">4.5</strong>
            </strong>
          </div>
        </div>
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row mb-2 evo-head">
            <div className="col-md-6">
              <h3>Assessments</h3>
            </div>
            <div className="col-md-6 text-right">
              <div className="created d-inline">
                <span className="date-title inline ml-2">Date Assessed:</span>
                <span className="date inline font-bold ml-2">20-09-2019</span>
              </div>
              <div className="created ml-2 d-inline">
                <span className="date-title inline ml-2">Date Received:</span>
                <span className="date inline font-bold ml-2">20-09-2019</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="ibox collapsed">
                <div className="ibox-title">
                  <h5>
                    Receives feedback from others and uses the feedback to improve performance.
                  </h5>
                  <div className="ibox-tools">
                    <div className="inline number mr-2">3.5</div>
                    <a onClick={toggleComment} className="collapse-link">
                      <FontAwesomeIcon icon={display ? faChevronUp : faChevronDown} />
                    </a>
                  </div>
                </div>
                <div className="ibox-content" style={{ display: display ? 'block' : 'none' }}>
                  <h3>Comments</h3>
                  <ul className="comment-list p-0 m-0">
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Voluptate velit esse cillum dolore eu fugiat nulla pariatur, ut enim ad minim
                      veniam, quis nostrud exercitation ullamco.
                    </li>
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Cillum dolore eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud
                      exercitation ullamco.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ibox collapsed">
                <div className="ibox-title">
                  <h5>
                    Conscious knowledge of one’s own character, feelings, motives, and desires.
                  </h5>
                  <div className="ibox-tools">
                    <div className="inline number mr-2">2.5</div>
                    <a className="collapse-link">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                  </div>
                </div>
                <div className="ibox-content">
                  <h3>Comments</h3>
                  <ul className="comment-list p-0 m-0">
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Voluptate velit esse cillum dolore eu fugiat nulla pariatur, ut enim ad minim
                      veniam, quis nostrud exercitation ullamco.
                    </li>
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Cillum dolore eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud
                      exercitation ullamco.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ibox collapsed">
                <div className="ibox-title">
                  <h5>
                    Observing and directing the execution of tasks, projects, or activities by
                    others.professional environment.
                  </h5>
                  <div className="ibox-tools">
                    <div className="inline number mr-2 bg-blue">4.7</div>
                    <a className="collapse-link">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                  </div>
                </div>
                <div className="ibox-content">
                  <h3>Comments</h3>
                  <ul className="comment-list p-0 m-0">
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Voluptate velit esse cillum dolore eu fugiat nulla pariatur, ut enim ad minim
                      veniam, quis nostrud exercitation ullamco.
                    </li>
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Cillum dolore eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud
                      exercitation ullamco.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ibox collapsed">
                <div className="ibox-title">
                  <h5>
                    Has a set of moral principles used in the job in accordance with the culture of
                    the organization.
                  </h5>
                  <div className="ibox-tools">
                    <div className="inline number mr-2">2.5</div>
                    <a className="collapse-link">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                  </div>
                </div>
                <div className="ibox-content">
                  <h3>Comments</h3>
                  <ul className="comment-list p-0 m-0">
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Voluptate velit esse cillum dolore eu fugiat nulla pariatur, ut enim ad minim
                      veniam, quis nostrud exercitation ullamco.
                    </li>
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Cillum dolore eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud
                      exercitation ullamco.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ibox collapsed">
                <div className="ibox-title">
                  <h5>
                    Pays attention to someone to hear what is being said and understand that it is
                    serious, important, or true.
                  </h5>
                  <div className="ibox-tools">
                    <div className="inline number mr-2">3.7</div>
                    <a className="collapse-link">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                  </div>
                </div>
                <div className="ibox-content">
                  <h3>Comments</h3>
                  <ul className="comment-list p-0 m-0">
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Voluptate velit esse cillum dolore eu fugiat nulla pariatur, ut enim ad minim
                      veniam, quis nostrud exercitation ullamco.
                    </li>
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Cillum dolore eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud
                      exercitation ullamco.
                    </li>
                  </ul>
                  s
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ibox collapsed">
                <div className="ibox-title">
                  <h5>
                    Contributes to and operates within a team to accomplish tasks and complete
                    assignments within a collaborate and professional environment.
                  </h5>
                  <div className="ibox-tools">
                    <div className="inline number mr-2">2.5</div>
                    <a className="collapse-link">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                  </div>
                </div>
                <div className="ibox-content">
                  <h3>Comments</h3>
                  <ul className="comment-list p-0 m-0">
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Voluptate velit esse cillum dolore eu fugiat nulla pariatur, ut enim ad minim
                      veniam, quis nostrud exercitation ullamco.
                    </li>
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Cillum dolore eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud
                      exercitation ullamco.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ibox collapsed">
                <div className="ibox-title">
                  <h5>
                    Pays attention to someone to hear what is being said and understand that it is
                    serious, important, or true.
                  </h5>
                  <div className="ibox-tools">
                    <div className="inline number mr-2 bg-blue">4.7</div>
                    <a className="collapse-link">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                  </div>
                </div>
                <div className="ibox-content">
                  <h3>Comments</h3>
                  <ul className="comment-list p-0 m-0">
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Voluptate velit esse cillum dolore eu fugiat nulla pariatur, ut enim ad minim
                      veniam, quis nostrud exercitation ullamco.
                    </li>
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Cillum dolore eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud
                      exercitation ullamco.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ibox collapsed">
                <div className="ibox-title">
                  <h5>
                    Contributes to and operates within a team to accomplish tasks and complete
                    assignments within a collaborate and professional environment.
                  </h5>
                  <div className="ibox-tools">
                    <div className="inline number mr-2">2.5</div>
                    <a className="collapse-link">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                  </div>
                </div>
                <div className="ibox-content">
                  <h3>Comments</h3>
                  <ul className="comment-list p-0 m-0">
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Voluptate velit esse cillum dolore eu fugiat nulla pariatur, ut enim ad minim
                      veniam, quis nostrud exercitation ullamco.
                    </li>
                    <li>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </li>
                    <li>
                      Cillum dolore eu fugiat nulla pariatur, ut enim ad minim veniam, quis nostrud
                      exercitation ullamco.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="paging_simple_numbers" id="DataTables_Table_0_paginate">
            <ul className="pagination">
              <li className="paginate_button page-item previous" id="DataTables_Table_0_previous">
                <a
                  href="#"
                  aria-controls="DataTables_Table_0"
                  data-dt-idx={0}
                  tabIndex={0}
                  className="page-link"
                >
                  Previous
                </a>
              </li>
              <li className="paginate_button page-item ">
                <a
                  href="#"
                  aria-controls="DataTables_Table_0"
                  data-dt-idx={1}
                  tabIndex={0}
                  className="page-link"
                >
                  1
                </a>
              </li>
              <li className="paginate_button page-item ">
                <a
                  href="#"
                  aria-controls="DataTables_Table_0"
                  data-dt-idx={2}
                  tabIndex={0}
                  className="page-link"
                >
                  2
                </a>
              </li>
              <li className="paginate_button page-item active">
                <a
                  href="#"
                  aria-controls="DataTables_Table_0"
                  data-dt-idx={3}
                  tabIndex={0}
                  className="page-link"
                >
                  3
                </a>
              </li>
              <li className="paginate_button page-item next disabled" id="DataTables_Table_0_next">
                <a
                  href="#"
                  aria-controls="DataTables_Table_0"
                  data-dt-idx={4}
                  tabIndex={0}
                  className="page-link"
                >
                  Next
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GuestTemplate>
  );
};
export default EvaluationSummary;
