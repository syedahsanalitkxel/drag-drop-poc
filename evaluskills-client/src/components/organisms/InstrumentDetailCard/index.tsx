import React, { Fragment, useState } from 'react';
import InstrumentCard from '../../molecules/InstrumentCard';
import ParticipantInterface from '../../../interfaces/Participant';
import AddEvaluator from '../../pages/AddEvaluator';

interface ListCardProps {
  participants: ParticipantInterface[];
  titleKey: string;
  view?: (evaluationId: string) => void;
  actionHandler?: (values?: any, evaluationId?: string, action?: string, token?: string) => void;
}

const InstrumentListCard: React.FunctionComponent<ListCardProps> = ({
  titleKey,
  participants,
  view,
  actionHandler,
}) => {
  const [evaluatorModalVisible, setEvaluatorModalVisible] = useState(false);
  const [evaluator, setEvaluator] = useState({});
  const [token, setToken] = useState('');

  const addEvaluator = (id: string, action: string, evalToken?: string) => {
    if (action === 'add' && actionHandler && evalToken) {
      setEvaluatorModalVisible(true);
      setToken(evalToken);
    } else if (action === 'remove' && actionHandler) {
      actionHandler({}, id, action, evalToken);
    }
  };

  const toggleAddEvaluatorModal = () => {
    setEvaluatorModalVisible(!evaluatorModalVisible);
  };

  function submitHandler(values: any) {
    if (actionHandler) {
      setEvaluatorModalVisible(false);
      actionHandler(values, '', 'add', token);
    }
  }

  function cancelHandler() {
    setEvaluatorModalVisible(false);
  }

  return (
    <React.Fragment>
      <div className="ibox ">
        <div className="ibox-content p-0">
          <table className="table panel-group" id="accordions">
            <thead>
              <tr>
                <th>Participants</th>
                <th>Email</th>
                <th>No. of Evaluators</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Individual Results</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {participants &&
                participants.map((list, index) => (
                  <InstrumentCard key={index} item={list} view={view} addEvaluator={addEvaluator} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <React.Fragment>
        <AddEvaluator
          visible={evaluatorModalVisible}
          toggle={toggleAddEvaluatorModal}
          name="Add"
          FormValues={evaluator}
          submitHandler={submitHandler}
          cancelHandler={cancelHandler}
        />
      </React.Fragment>
    </React.Fragment>
  );
};

export default InstrumentListCard;
