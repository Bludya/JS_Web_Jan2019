import React from 'react';

const CreateForm = (props) => {
  return (
    <div className="create-form">
        <h1>Create game</h1>
        <form onSubmit={(event) => {
          console.log(props.title);
            event.preventDefault();
            let {title, description, imageUrl} = event.target;

            props.createGame({
              title:title.value,
              description: description.value,
              imageUrl: imageUrl.value
            });
            title.value = description.value = imageUrl.value = '';
        }}>
            <label>Title</label>
            <input type="text" id="title" name="title"  />
            <label>Description</label>
            <textarea type="text" id="description" name="description" />
            <label>ImageUrl</label>
            <input type="text" id="imageUrl" name="imageUrl" />
            <input type="submit" value="Create"/>
        </form>
    </div>
  )
};

export default CreateForm;
