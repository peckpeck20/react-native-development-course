class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [],description: '', date: '' }
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
    //console.log(addObject);
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

    const entires = this.state.todos.map( (todos,index) => 
      <tr key={ index }>
      <td> { todos.date }</td>
      <td>{todos.description }</td>
      <td><button onClick={ this.deleteTodo } id={ index }>delete</button></td>
      </tr>
      );

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
        </div>

        <div>
          <table>
            <tbody>
            <tr><th>Date</th><th>Description</th></tr>
            {entires}
          </tbody>
          </table>
        </div>          
      </div>    
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));