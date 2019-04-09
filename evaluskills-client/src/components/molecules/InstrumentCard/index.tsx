import React, { useState } from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Collapse } from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  item: any;
  evaluatorData: any;
  view?: (evaluationId: string) => void;
}

const InstrumentCard: React.FunctionComponent<Props> = ({ item, evaluatorData, view }) => {
  const [collapse, setCollapse] = useState(false);

  const mouseEvent = (event: any) => {
    const value: boolean = !collapse;
    setCollapse(value);
  };

  const actionHandler = (evaluationId: string) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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

  const renderContent = (eData: any) => {
    return (
      <React.Fragment key={eData.id}>
        <tr>
          <td className="font-bold">{eData.name}</td>
          <td>
            <a href="#">{eData.email}</a>
          </td>
          <td>{eData.role}</td>
          <td>
            <div className="progress">
              <div style={{ width: eData.progress }} className="progress-bar">
                {eData.progress}
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

  return (
    <React.Fragment key={item.id}>
      <tr>
        <td className="font-bold">{item.name}</td>
        <td>
          <a href="#">{item.email}</a>
        </td>
        <td>05</td>
        <td>
          <div className="progress">
            <div style={pStyle} className="progress-bar">
              {item.progress}
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
              <tbody>{evaluatorData && evaluatorData.map(renderContent)}</tbody>
            </table>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};
export default InstrumentCard;
