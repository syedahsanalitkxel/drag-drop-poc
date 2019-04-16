import React from 'react';
import Button from './../../atoms/Button';
const FooterGuest = (props: any) => {
  return (
    <div className="bottom-bar fixed-bottom p-10">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-right">
            {props.buttonsConfig.map((item: any, i: number) => {
              return <Button index={i} {...item} />;
            })}
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
