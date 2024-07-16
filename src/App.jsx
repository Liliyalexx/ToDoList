import React, { useReducer, useState} from 'react'
import './App.css'
import Todo from './Todo.jsx'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
  EDIT_TODO: 'edit-todo',
  SAVE_TODO: 'save-todo',
};

function reducer(todos, action){
switch(action.type){
  case ACTIONS.ADD_TODO:
    return[...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo =>{
     if(todo.id === action.payload.id){
      return {... todo, complete: !todo.complete}
     }
     return todo
    })
  case ACTIONS.DELETE_TODO:
    return todos.filter(todo=> todo.id!==action.payload.id);
    case ACTIONS.EDIT_TODO:
      return todos.map(todo =>{
        if(todo.id === action.payload.id){
          return{... todo, isEditing: true};
        }
        return todo;
      });
      case ACTIONS.SAVE_TODO:
        return todos.map(todo =>{
          if(todo.id === action.payload.id){
            return {... todo, name: action.payload.newName, esEditing:false};
          }
          return todo;
        });
    default:
      return todos

}

}
function newTodo(name){
  return {id: Date.now(), name: name, complete: false, isEditing:false};
}

export default function App  () {
  const [todo, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    dispatch({type: ACTIONS.ADD_TODO, payload : {name: name } })
    setName('')
  }

console.log(todo)

  
  return (
    <>
      {' '}
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>Add Todo</button>
      </form>
      {todo.map((todo) => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </>
  );
}

