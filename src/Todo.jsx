import React, { useState } from 'react';
import { ACTIONS } from './App';

export default function Todo({ todo, dispatch }) {
  const [newName, setNewName] = useState(todo.name);

  return (
    <div>
      {todo.isEditing ? (
        <>
          <input
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.SAVE_TODO,
                payload: { id: todo.id, newName: newName },
              })
            }
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span style={{ color: todo.complete ? '#AAA' : '#000' }}>
            {todo.name}
          </span>
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.TOGGLE_TODO,
                payload: { id: todo.id },
              })
            }
          >
            Toggle
          </button>
          <button
            disabled={!todo.complete}
            onClick={() =>
              dispatch({
                type: ACTIONS.DELETE_TODO,
                payload: { id: todo.id },
              })
            }
          >
            Delete
          </button>
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.EDIT_TODO,
                payload: { id: todo.id },
              })
            }
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}
