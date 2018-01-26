class HelloComponent extends React.Component {
    render () {
        return <h1>Github API repositories </h1>;
     }
}
     
class Parent extends React.Component {
	constructor (props) {
		super (props);
		this.boo = this.boo.bind(this);
		this.state = {path: '', repo: []};
		
	}

	boo = (event) => {
	 	event.preventDefault();
	 	//alert('it works!');
		let url = 'https://api.github.com/search/repositories?q='+ this.state.path;
		//let parameter = this.state.path;
		//console.log(url);



		axios.get(url)
            .then(response => { 
                //console.log(response.data.items)
                this.setState({
                    repo : response.data.items
                })
            })
	}
	//set the state from the search bar
	searchQuery = (event) => {
		this.setState({ path : event.target.value });
	}


	render() {
		return(
			//call Repositories component and pass the current state as props
			<div>
			
				<form onSubmit={this.boo}>
					<input type="text" onChange={this.searchQuery}  />
					<input type="submit" value="Search"/>
				</form> 
				<Child repo={ this.state.repo }search= { this.state.path } />
			
				{/* <button onClick={this.boo}>fuck</button> */}
			</div>			
		);
	}
}

class Child extends React.Component {
	constructor (props) {
		super (props);
		//this.boo = this.boo.bind(this);
		this.state = ({ repo : [] });
	}
	componentWillReceiveProps(nextProps) {
	  this.setState({
	   repo: nextProps.repo
	  })

	}

	render () {
 
		const titles = this.state.repo.map( (repo) => 
			<tr key={ repo.id }>
			<td> { repo.name }</td>
			<td><a href={repo.html_url}>{repo.html_url}</a></td>
			</tr>
			);


		return (
			<div>
				<table>
					<tbody>
						<tr><th>Name</th><th>URL</th></tr>
						{titles}
					</tbody>
				</table>	
			</div>
		);


	}
}


class App extends React.Component {
	render () {
		return (
		<div>
			<HelloComponent />
			<Parent />
		</div>
		);				
	}
}
ReactDOM.render(<App />, document.getElementById('root'));