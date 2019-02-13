import React from 'react';
import List from './list';
import Details from './details';
import peopleData from '../../contacts';

const Book = () => {
  return (
    <div id="book">
      <div id="list">
        <List peopleData={peopleData}/>
      </div>
      <div id="details">
        <Details person={peopleData[0]}/>
      </div>
    </div>
  );
};

export default Book;
