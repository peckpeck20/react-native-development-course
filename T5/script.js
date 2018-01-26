class TodoTable extends React.Component {
  render() {

    const entires = this.props.todos.map( (todos,index) => 
          <tr key={ index }>
          <td> { todos.date }</td>
          <td>{todos.description }</td>
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

class App extends React.Component {
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
    //alert('click');
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



  render() {


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

          <TodoTable todos={this.state.todos}/>
        </div>
      </div>    
    );
  }
}



ReactDOM.render(<App />, document.getElementById('root'));