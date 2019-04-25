import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import ProgressBar from '../../../components/atoms/ProgressBar';
import EvaluationClientHolder from '../../../components/organisms/ClientHolder';
import QuestionItem from './EvaluationQuestionItem';
import FooterGuest from '../../../components/organisms/FooterGuest';
import GuestTemplate from '../../../components/templates/GuestTemplate';
import { QuestionEvaluationInterface } from '../interface';
interface PropsInterface extends RouteComponentProps {
  Questiondata: QuestionEvaluationInterface;
}
const EvaluatorQuestion: React.FunctionComponent<PropsInterface> = ({ Questiondata, history }) => {
  const [State, SetState] = useState(Questiondata);
  const clientHolderObj = {
    name: 'Jasmine Rassol',
    designation: '(Manager) From Tkxel',
  };
  const buttonsConfig = [
    {
      text: 'Skip for now',
      src: '',
      callback: handleNext,
      classes: 'btn btn-dark',
    },
    {
      text: 'Next',
      src: '/img/icons/arrow.svg',
      callback: handleNext,
      classes: 'btn btn-primary',
    },
  ];

  function handleNext() {
    history.push('/evaluation/summary');
  }
  function handleSelect(Elementindex: number, Elementobjectindex: number) {
    let data = State.itemElements;
    data[Elementindex].selectedValue = Elementobjectindex;
    SetState({ ...State, itemElements: data });
  }

  return (
    <GuestTemplate>
      <div>
        <div className="PageHeader pr-0 pl-0">
          <div className="eval-header row">
            <div className="col-sm-6">
              <EvaluationClientHolder {...clientHolderObj} />
            </div>
            <div className="col-sm-6">
              <div className="row mt-3">
                <div className="col-sm-8">
                  <ProgressBar progress={State.progress} />
                </div>
                <div className="col-sm-4 mt-3">
                  <span className="font-bold">
                    Assessment Item <a href="#">{State.currentEvaluationItemNo}</a> of {State.totalNoOfEvaluationItems}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ques-container">
          {State.itemElements.map((item: any, i) => {
            return (
              <div>
                <h2 className="font-bold mb-4">1- {State.itemElements[i].title}</h2>,
                {item.itemElementOptions.map((item2: any, j: number) => {
                  return (
                    <div>
                      <QuestionItem
                        handleSelect={handleSelect}
                        selectedIndex={item.selectedValue}
                        elementIndex={i}
                        key={j}
                        count={j}
                        {...item2}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
          <h2 className="font-bold mb-3">Comments</h2>
          <div className="form-group">
            <textarea className="form-control" placeholder="Add Comments" defaultValue={''} />
          </div>
          <FooterGuest buttonsConfig={buttonsConfig} />
        </div>
      </div>
    </GuestTemplate>
  );
};
export default withRouter(EvaluatorQuestion);
