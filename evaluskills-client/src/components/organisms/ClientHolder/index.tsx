import React from 'react';

interface Props {
  name?: string;
  designation?: string;
  imagePath?: string;
}

const EvaluationClientHolder: React.FunctionComponent<Props> = ({ imagePath, name, designation }) => {
  return (
    <div className="client-holder">
      <div className="inline img-holder mr-4 vertical-align">
        <img
          width="100"
          height="100"
          src={imagePath ? imagePath : 'https://emgroupuk.com/wp-content/uploads/2018/06/profile-icon-9.png'}
          alt="profile"
        />
      </div>
      <div className="inline txt-holder">
        <h2 className="mt-0 font-bold mb-1">{name}</h2>
        <p className="mb-0">{designation}</p>
      </div>
    </div>
  );
};
export default EvaluationClientHolder;
