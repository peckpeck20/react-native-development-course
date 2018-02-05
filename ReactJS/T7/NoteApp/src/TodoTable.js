import React, { Component } from 'react';
import './App.css';


class TodoTable extends Component {
	render() {

	  const entires = this.props.todos.map( (todos,index) => 
	        <tr key={ index }>
	        <td> { todos.date }</td>
	        <td>{todos.description }</td>
	        <td><button onClick={ this.props.delete } id={ index }>delete</button></td>
	        </tr>
	        ); 



		return(
			<div>
	          <table>
	            <tbody>
	            <tr><th>Date</th><th>Description</th></tr>
	            {entires}
	          </tbody>
	          </table>
	        </div>  
		); 
	}
}

export default TodoTable;