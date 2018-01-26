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
    clearButton = () => {
      this.setState((oldState) => {
        return { counter : 0 }
      });
    }
    render() {
      return (
        <div>
          <div>Count: { this.state.counter }</div>
          <button onClick= { this.addButton}> + </button>
          <button onClick= { this.substractButton}> - </button>
          <button onClick= { this.clearButton}> 0 </button>
        </div>
      );
    }
  }

/*const WeatherCard = (props) => {
  //deconstruct the object from the parent props
  const { city,country } = props.apiFetch;
  console.log(city);
  
  return(
      <div>
      <h1> hola { city }</h1>
    </div>
  )
}  */


class WeatherApi extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
                  //initialize state properties
                  name:'',
                  country:'',
                  temp: '',
                  temp_min: '',
                  temp_max: '',
                  humidity: '',
                  main: '',
                  description: '',
                  icon : '',
                  wind: '',
                  sunrise:'',
                  sunset: '',            
                 };              
  }
  componentDidMount() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=helsinki&units=metric&appid=';
   // let weatherID =''
    const apiKey = '6f40aab6d9af7d3a45f27cd41b7c0803';
    
    axios.get(url+apiKey)
    .then(response => {
      console.log(response)
      this.setState({ 
       
        name: response.data.name,
        country: response.data.sys.country,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        temp : response.data.main.temp,
        temp_min : response.data.main.temp_min,
        temp_max : response.data.main.temp_max,
        humidity : response.data.main.humidity,
        main : response.data.weather[0].main,
        description : response.data.weather[0].description,
        icon : "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png",
        wind : response.data.wind.speed,
     
        
        //console.log(weather);
      })
      
    })
    .catch(error => {
      console.log(error, 'failed to catch data')
    });

}
    render() {
    //change time format from UNIX to UTC
    const date = new Date();
    let sunRise = new Date( this.state.sunrise * 1000);
    let sunSet = new Date( this.state.sunset * 1000);
      /* Get suitable icon for weather */

      return (        
        <div>
          <h1>Todays Weather</h1>
          <img src={this.state.icon} alt="img" className="center-block"></img>
          <h2> {this.state.temp} &deg; </h2>
          <h1>{ this.state.description }</h1>
          <h2>{this.state.name} , {this.state.country} </h2>
          
          <h3>Max {this.state.temp_max} &deg;C Min {this.state.temp_min}&deg;C</h3>
          <h3>Sunrise {sunRise.toLocaleTimeString()}</h3>
          <h3>Sunset {sunSet.toLocaleTimeString()} </h3> 
        </div>        
      ); 
  }
}

class App extends React.Component{
  render(){
    return (
      <div className="responsive-fluid center">
        <WeatherApi />
      </div>
    )
  }
}

ReactDOM.render(
  <div>
    <App />
  </div> ,
  document.getElementById('root')
);
