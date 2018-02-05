import React, { Component,Alert } from 'react';
import './App.css';

import TodoTable from './TodoTable.js'
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [], description: '' , date: '' 
    };
  }

  dateChanged = (event) => {
    this.setState({date: event.target.value});
  }

  descriptionChanged = (event) => {
    this.setState({description: event.target.value});
  }

  addTodo = (event) => {
    event.preventDefault();
    //initialize object
    let addObject = {};
    //insert state properties to said object
    addObject.date = this.state.date
    addObject.description = this.state.description
    //add object to the Todos array
    this.setState({
      todos: [...this.state.todos, addObject]
    });
    
  }

  deleteTodo = (event) => {   
    //get ID of selected element
    const targetId = parseInt(event.target.id);
    //copy the current state of Todos
    const old = this.state.todos
    //new state
    let newArray = old.filter((todo,i) => i !== targetId)
    //todos.splice(targetId,1)
    this.setState({
      todos : newArray
    });
  }


  render() {

      const columns = [
      {
      Header: 'Date',
      accessor : 'date'
      }, {

      Header: "Description",
      accessor : 'description'  
      },
      ]


    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>
        <div>
          <form onSubmit={this.addTodo}>
          <label >Date </label>
          <input  id="date" type="text" onChange={this.dateChanged} value={this.state.date}/>
          <label >Description </label>
          <input type="text" id="description" onChange={this.descriptionChanged} value={this.state.description}/>  
          <input type="submit"  value="Add"/>
          </form>

          <TodoTable todos={this.state.todos} delete={this.deleteTodo} />
          {/*Use 3rd party table component*/}
          {/*<ReactTable data={this.state.todos} delete={this.deleteTodo} columns={columns} />*/}
        </div>
      </div>    
    );
  }
}

export default App;