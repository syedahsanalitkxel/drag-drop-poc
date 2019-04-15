import React from 'react';
import { NavLink } from 'react-router-dom';
interface Props {
  // buttonsConfig:[{
  //     text:string,
  //     callback:()=>void
  // }]
  // [{
  //     text:string,
  //     handleNext:()=>void
  // }]
  callback: () => void;
}
// const FooterGuest:React.FunctionComponent<Props> = ({buttonsConfig:any}) => {
const FooterGuest = (props: any) => {
  return (
    <div className="bottom-bar fixed-bottom p-10">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-right">
            {props.buttonsConfig.map((item: any, i: number) => {
              return (
                <button key={i} onClick={() => item.callback()} className="btn btn-dark">
                  {item.text}
                </button>
              );
            })}
            <NavLink to="/evaluation/summary" className="btn btn-primary">
              Next <img src="/img/icons/arrow.svg" alt="arrow" />
            </NavLink>
          </div>
        </div>
      </div>
      <a href="#" className="m-10 position-absolute left bottom-logo">
        <img src="/img/icons/main-pas-logo.png" />
      </a>
    </div>
  );
};
export default FooterGuest;
