import React from 'react';


const Contact = (props) => {
  let contact = props.contact;
  let onMouseOn = props.onMouseOn;

  return (
    <div class="contact" data-id="{id}" onMouseOver={onMouseOn}>
        <span class="avatar small">&#9787;</span>
        <span class="title">{contact.firstName} {contact.lastName}</span>
    </div>
  )
}

export default Contact;
