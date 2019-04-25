import React from 'react';
import SelectClientCard from './../../molecules/SelectClientCard';
const selectClientList = () => {
  const clientObj = {
    name: 'Robby Rash',
    src: '/img/logo.svg',
  };
  const clientArray = [clientObj, clientObj, clientObj, clientObj];
  return (
    <form className="form w-100 pl-22">
      <h1 className="font-bold mb-4 mt-0">Select Client</h1>
      {clientArray.map((item, i) => {
        return <SelectClientCard key={i} {...item} />;
      })}
    </form>
  );
};
export default selectClientList;
