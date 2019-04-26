import React, { useState } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Collapse } from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  item: any;
  view?: (evaluationId: string) => void;
}

const InstrumentCard: React.FunctionComponent<Props> = ({ item, view }) => {
  console.log(item.evaluators);
  const [collapse, setCollapse] = useState(false);

  const mouseEvent = (event: any) => {
    const value: boolean = !collapse;
    setCollapse(value);
  };

  const actionHandler = (evaluationId: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.currentTarget.name === 'view') {
      if (view) {
        view(evaluationId);
      }
    }
  };

  const StyleFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-right: 15px;
    margin-top: 12px;
  `;
  const pStyle = {
    width: item.progress,
  };

  const calculateEvaluatorsProgress = (items: any) => {
    if (items.totalEvaluationsCount > 0) {
      return {
        width: ((items.completedEevaluationItemsCount / items.totalEvaluationItemsCount) * 100).toString().concat('%'),
      };
    } else {
      return {
        width: '0%',
      };
    }
  };

  const renderContent = (eData: any) => {
    return (
      <React.Fragment key={eData.id}>
        <tr>
          <td className="font-bold">
            {eData.firstName} {eData.lastName}
          </td>
          <td>
            <a href="#">{eData.email}</a>
          </td>
          <td>{eData.roleId}</td>
          <td>
            <div className="progress">
              <div style={calculateEvaluatorsProgress(eData)} className="progress-bar">
                {((eData.completedEevaluationItemsCount / eData.totalEvaluationItemsCount) * 100)
                  .toFixed(2)
                  .toString()
                  .concat('%')}
              </div>
            </div>
            {eData.status === 'InProgress' ? (
              <span>1 Evaluations Received</span>
            ) : eData.status === 'Completed' ? (
              <span>All Evaluations Completed</span>
            ) : (
              <span>Not Started</span>
            )}
          </td>
          <td>
            {' '}
            {eData.status === 'InProgress' ? (
              <span className="badge badge-warning">In Progress</span>
            ) : eData.status === 'Completed' ? (
              <span className="badge  badge-primary">Completed</span>
            ) : (
              <span className="badge badge-warning">Not Started</span>
            )}
          </td>
          <td>
            <button
              id={item.id}
              name="view"
              type="button"
              onClick={actionHandler(item.id)}
              className="btn btn-primary clr-white"
              disabled={eData.status === 'Completed'}
            >
              Send Reminder
            </button>
          </td>
          <td>
            <a data-toggle="collapse" data-parent="#accordion">
              <i className="fa fa-angle-down font-size-30" />
            </a>
          </td>
        </tr>
      </React.Fragment>
    );
  };

  const calculateProgress = (items: any) => {
    if (items.totalEvaluationsCount > 0) {
      return {
        width: ((items.completedEvaluationsCount / items.totalEvaluationsCount) * 100).toString().concat('%'),
      };
    } else {
      return {
        width: '0%',
      };
    }
  };

  return (
    <React.Fragment key={item.id}>
      <tr>
        <td className="font-bold">
          {item.firstName} {item.lastName}
        </td>
        <td>
          <a href="#">{item.email}</a>
        </td>
        <td>{item.evaluators.length}</td>
        <td>
          <div className="progress">
            <div style={calculateProgress(item)} className="progress-bar">
              {((item.completedEvaluationsCount / item.totalEvaluationsCount) * 100)
                .toFixed(2)
                .toString()
                .concat('%')}
            </div>
          </div>
          {item.status === 'InProgress' ? (
            <span>1 Evaluations Received</span>
          ) : item.status === 'Completed' ? (
            <span>All Evaluations Completed</span>
          ) : (
            <span>Not Started</span>
          )}
        </td>
        <td>
          {item.status === 'InProgress' ? (
            <span className="badge badge-warning">In Progress</span>
          ) : item.status === 'Completed' ? (
            <span className="badge  badge-primary">Completed</span>
          ) : (
            <span className="badge badge-warning">Not Started</span>
          )}
        </td>
        <td>
          <button
            id={item.id}
            name="view"
            type="button"
            onClick={actionHandler(item.id)}
            className="btn btn-primary clr-white"
          >
            View Evaluation
          </button>
        </td>
        <td>
          <div id={item.id} onClick={mouseEvent}>
            <button className="btn">
              <StyleFontAwesomeIcon icon={collapse ? faChevronUp : faChevronDown} />
            </button>
          </div>
          <Collapse isOpen={collapse} />
        </td>
      </tr>

      {collapse && (
        <tr>
          <td colSpan={7}>
            <table className="table panel-group" id="accordions">
              <thead>
                <tr>
                  <th>Evaluators</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>{item.evaluators && item.evaluators.map(renderContent)}</tbody>
            </table>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};
export default InstrumentCard;
