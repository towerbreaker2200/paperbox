import { dbService, storageSurvice } from "fbase";
import React, { useState } from "react";

const Flying = ({ flyingObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newFlying, setNewFlying] = useState(flyingObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this flying?");
    if (ok) {
      await dbService.doc(`flyings/${flyingObj.id}`).delete();
      await storageSurvice.refFromURL(flyingObj.attachmentURL).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (event) => {
    event.preventDefault();
    dbService.doc(`flyings/${flyingObj.id}`).update({
      text: newFlying,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewFlying(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your flying"
              value={newFlying}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Flying" />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          <h4>{flyingObj.text}</h4>
          {flyingObj.attachmentURL && (
            <img src={flyingObj.attachmentURL} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Flying</button>
              <button onClick={toggleEditing}>Edit Flying</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Flying;
