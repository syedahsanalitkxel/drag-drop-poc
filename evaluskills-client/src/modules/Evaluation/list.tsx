import React from 'react';
import GuestTemplate from '../../components/templates/GuestTemplate';

const EvaluatorList = () => {
  return (
    <GuestTemplate>
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="invite-container">
          <span className="invite-title">Hey Robby,</span>
          <h1 className="font-bold mt-1 mb-4">Your Evaluations</h1>
          <div className="row mb-4">
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                All 20
              </button>
              <button type="submit" className="btn btn-white">
                In Progress 05
              </button>
              <button type="submit" className="btn btn-white">
                Pending 05
              </button>
              <button type="submit" className="btn btn-white">
                Completed 10
              </button>
            </div>
          </div>
        </div>
        <table className="table bg-white">
          <thead>
            <tr>
              <th>Participants</th>
              <th>Participant Role</th>
              <th>Assessments</th>
              <th>Date Received</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-bold">Jasmine Rassol</td>
              <td>Manager</td>
              <td className="font-bold">360 Leadership Program</td>
              <td className="font-bold">28-02-2019</td>
              <td>
                <div className="progress">
                  <div style={{ width: '50%' }} className="progress-bar">
                    50%
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-warning">In Progress</span>
              </td>
              <td>
                <button type="button" className="btn btn-outline btn-primary">
                  Continue
                </button>
              </td>
            </tr>
            <tr>
              <td className="font-bold">Lavendire Amaar</td>
              <td>Designer</td>
              <td className="font-bold">360 Leadership Program</td>
              <td className="font-bold">28-02-2019</td>
              <td>
                <div className="progress">
                  <div style={{ width: '40%' }} className="progress-bar">
                    40%
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-warning">In Progress</span>
              </td>
              <td>
                <button type="button" className="btn btn-outline btn-primary">
                  Continue
                </button>
              </td>
            </tr>
            <tr>
              <td className="font-bold">Sejal Kumar</td>
              <td>Manager</td>
              <td className="font-bold">360 Leadership Program</td>
              <td className="font-bold">28-02-2019</td>
              <td>
                <div className="progress">
                  <div style={{ width: '20%' }} className="progress-bar">
                    20%
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-warning">In Progress</span>
              </td>
              <td>
                <button type="button" className="btn btn-outline btn-primary">
                  Continue
                </button>
              </td>
            </tr>
            <tr>
              <td className="font-bold">Amanda Rachel</td>
              <td>Lead</td>
              <td className="font-bold">360 Leadership Program</td>
              <td className="font-bold">28-02-2019</td>
              <td>
                <div className="progress">
                  <div style={{ width: '100%' }} className="progress-bar">
                    100%
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-primary">Completed</span>
              </td>
              <td>
                <a href="#" className="btn color-white btn-primary">
                  View Results
                </a>
              </td>
            </tr>
            <tr>
              <td className="font-bold">Nika Erculij</td>
              <td>Manager</td>
              <td className="font-bold">360 Leadership Program</td>
              <td className="font-bold">28-02-2019</td>
              <td>
                <div className="progress">
                  <div style={{ width: '50%' }} className="progress-bar">
                    50%
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-warning">In Progress</span>
              </td>
              <td>
                <button type="button" className="btn btn-outline btn-primary">
                  Continue
                </button>
              </td>
            </tr>
            <tr>
              <td className="font-bold">Ellie June</td>
              <td>Manager</td>
              <td className="font-bold">360 Leadership Program</td>
              <td className="font-bold">28-02-2019</td>
              <td>
                <div className="progress">
                  <div style={{ width: '50%' }} className="progress-bar">
                    50%
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-warning">In Progress</span>
              </td>
              <td>
                <button type="button" className="btn btn-outline btn-primary">
                  Continue
                </button>
              </td>
            </tr>
            <tr>
              <td className="font-bold">Acacia Sina</td>
              <td>Manager</td>
              <td className="font-bold">360 Leadership Program</td>
              <td className="font-bold">28-02-2019</td>
              <td>
                <div className="progress">
                  <div style={{ width: '50%' }} className="progress-bar">
                    50%
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-warning">In Progress</span>
              </td>
              <td>
                <button type="button" className="btn btn-outline btn-primary">
                  Continue
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </GuestTemplate>
  );
};
export default EvaluatorList;
