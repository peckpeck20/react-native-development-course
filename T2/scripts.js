class Greeting extends React.Component {

  render () {

    return <h1> Hello from React JS - <i>{ this.props.name }</i> </h1>;

  }

}



class Counter extends React.Component {

    constructor(props) {

      super(props);

      //set initial state

      this.state = { counter: 0 };

    }

    //component function onClick

    addButton = () => {

      this.setState((oldState) => {

        return { counter : oldState.counter + 1 }

      });

    }

    substractButton = () => {

      this.setState((oldState) => {

        return { counter : oldState.counter - 1 }

      });

    }

    render() {

      return (

        <div>

          <div>Count: { this.state.counter }</div>

          <button onClick= { this.addButton}> + </button>

          <button onClick= { this.substractButton}> - </button>

        </div>

      );

    }

  }







ReactDOM.render(

  <div>

    <Greeting name="Codepen User" />

    <Counter />

  </div> ,

  document.getElementById('root')

);