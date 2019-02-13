import React from 'react';
import Contact from './contact';
import Details from './details';
import ReactDOM from 'react-dom';

const Contacts = (props) => {
  let contacts = [];
  let peopleData = props.peopleData;

  let rerenderDetails = function (index) {
    return () => {
      console.log(peopleData[index]);
      ReactDOM.render(<Details person={peopleData[index]} />, document.getElementById('details'));
    }
  }

  for(let i = 0; i < peopleData.length; i++){
    let contact = props.peopleData[i];
    contacts.push(<Contact contact={contact} onMouseOn={rerenderDetails(i)}/>);
  }

  return contacts;
}

const List = (props) => {
  return (
    <fragment>
      <h1>Contacts</h1>
      <div class="content">
        <Contacts peopleData={props.peopleData} />
      </div>
    </fragment>
  )
}

export default List;
