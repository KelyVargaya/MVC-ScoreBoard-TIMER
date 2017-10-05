
class Model {
  constructor() {
    this.playersVar = [
    {
      name: "Kely Vargaya",
      score: 50,
    },
    {
      name: "Yoselin Vargaya",
      score: 20,
    },
    {
      name: "Fernanda Vargaya",
      score: 31,
    },
];
    this.callback = null;
    this.addPlayer = null;
  }

  subscribe(render) {
    this.callback = render;
  }

  notify() {
    this.callback();
  }

  agregarPlayer(names) {
    this.playersVar.push({
      name: names.value,
      score: 0,
      id: this.playersVar.length + 1
    })
    this.notify();
    names.value = '';
  }

  CounterDis(player) {
    player.score--;
    this.notify();
  }

  CounterMas(player) {
    player.score++;
    this.notify();
  }

  totalPoints() {
    return this.playersVar.map(item => item.score).reduce((total, item) => total + item);
  }
 
}


 const Header = ({model}) => {
  return (
    <div className = "header">
          <table className = "stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{model.playersVar.length}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{model.totalPoints()}</td>
        </tr>
      </tbody>
    </table>
 
      <h1>Scoreboard</h1>
      <Stopwatch />
    </div>
  );
}



class Stopwatch extends React.component {
    constructor(props){
      super(props);

        this.state ={
      running: false,
      previouseTime: 0,
      elapsedTime: 0,
        }
    }

  componentDidMount () {
    this.interval = setInterval(this.onTick);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }


  onStart () {
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  }

  onStop () {
    this.setState({
      running: false,
    });
  }

  onReset() {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    });
  }

  onTick() {
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
        previousTime: Date.now(),
      });
    }
  }

  render () {
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div className="stopwatch" >
        <h2>Stopwatch</h2>
        <div className="stopwatch-time"> {seconds} </div>
        { this.state.running ?
          <button onClick={this.onStop}>Stop</button>
          :
          <button onClick={this.onStart}>Start</button>
        }
        <button onClick={this.onReset}>Reset</button>
      </div>
    )
  }
};



const Counter = ({player}) => {
  return (
    <div className = "player" key = {player.id}>
      <div className = "player-name">
        <a className = "remove-player">✖</a>
        {player.name}
      </div>
      <div className = "player-score counter">
        <button className = "counter-action decrement" 
                onClick = {() => model.CounterDis(player)} >
          -
        </button>

        <span className = "counter-score">{player.score}</span>

        <button className = "counter-action increment" 
                onClick = {() => model.CounterMas(player)} >
          +
        </button>
      </div>
    </div>
  );
}


const PlayerList = ({model}) => {
  return (
    <div>
      {
        model.playersVar.map(player => {
          return <Counter player = {player} />
        })
      }
    </div>
  );
}

const AddPlayerForm = ({model}) => {
  return (
    <div className = "add-player-form">
      <form onSubmit = {e => {
        e.preventDefault();
        model.agregarPlayer(model.addPlayer);
      }}
      >
        <input type = "text"  
               onChange = {e => (model.addPlayer = e.target)} 
               placeholder = "Player Name"
        />
        <input type = "submit" 
               value = "add player" 
               
        />
      </form>
    </div>
  );
}

const Scoreboard = ({model}) => {
  return (
    <div className = "scoreboard">
      <Header model = {model}/>
      <PlayerList model = {model}/>
      <AddPlayerForm model = {model}/>
    </div>
  );
}


  let model = new Model();
  let render = () => {
      ReactDOM.render(
        <Scoreboard title = "ScoreBoardd" model={model} />,
         document.getElementById("container")
     );
   };

  model.subscribe(render);

     render(); 
