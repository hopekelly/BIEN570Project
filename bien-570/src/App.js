import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: '',
      viscosity: '',
      density: '',
      force: '',
      speed: '',
      shear: '',
      bead: '',
      resolution: '',
    }
  }

  handleRadiusChange = (event) => {
    this.setState({ radius: event.target.value })
  }

  handleViscosityChange = (event) => {
    this.setState({ viscosity: event.target.value })
  }

  handleDensityChange = (event) => {
    this.setState({ density: event.target.value })
  }

  handleForceChange = (event) => {
    this.setState({ force: event.target.value })
  }

  handleSpeedChange = (event) => {
    this.setState({ speed: event.target.value })
  }

  calculateUnknowns = () => {
    let { radius, viscosity, density, force, speed } = this.state 
    let newtonForce = force/Math.pow(10,12)
    let radiusM = radius/100;
    let viscosityD = viscosity/1000;
    let densityT = density*1000;
    let spinAng = speed/9.5492966;
    let speedSquared = Math.pow(spinAng, 3);
    let sqrt = Math.sqrt(densityT*viscosityD*speedSquared);
    let maxShear = 0.8*radiusM*sqrt;
    let beadSize = Math.sqrt(newtonForce/(maxShear*Math.PI));
    let res = force/(radiusM/beadSize);
    let beadNano = beadSize*Math.pow(10,9);
    let shear = maxShear.toFixed(2);
    let bead = beadNano.toFixed(2);
    let resolution = res.toFixed(4);
    this.setState({ shear, bead, resolution })
  }

  render() {
    const { radius, viscosity, density, force, speed, shear, bead, resolution} = this.state
    return (
    <div className="App">
      <header className="App-header">
        <div class="container">
          <h2>
            Known Parameters
        </h2>
          <div class="row">
            <div class="col">Disk Radius (cm)</div>
            <div class="col">
              <input onChange={this.handleRadiusChange} value={radius} placeholder="Disk Radius (cm)"></input>
            </div>
          </div>
          <div class="row">
            <div class="col">Liquid Viscosity (g/mL)</div>
            <div class="col">
              <input onChange={this.handleViscosityChange} value={viscosity} placeholder="Liquid Viscosity (g/mL)"></input>
            </div>
          </div>
          <div class="row">
            <div class="col">Liquid Density (mPa s)</div>
            <div class="col">
              <input onChange={this.handleDensityChange} value={density} placeholder="Liquid Density (mPa s)"></input>
            </div>
          </div>
          <div class="row">
            <div class="col">Maximum Force (pN)</div>
            <div class="col">
              <input onChange={this.handleForceChange} value={force} placeholder="Maximum Force (pN)"></input>
            </div>
          </div>
          <div class="row">
            <div class="col">Rotational Speed (rpm)</div>
            <div class="col">
              <input onChange={this.handleSpeedChange} value={speed} placeholder="Rotational Speed (rpm)"></input>
            </div>
          </div>
          <button onClick={this.calculateUnknowns} id="buttonPadding" className="center">Calculate Unknown Parameters</button>
          <h2>
            Unknown Parameters
        </h2>
          <div class="row">
            <div class="col">Maximum Shear (Pa)</div>
            <div class="col">
              <input placeholder="Maximum Shear (Pa)" value={shear}></input>
            </div>
          </div>
          <div class="row">
            <div class="col">Bead Radius (nm)</div>
            <div class="col">
              <input placeholder="Bead Radius (nm)" value={bead}></input>
            </div>
          </div>
          <div class="row">
            <div class="col">Resolution (pN)</div>
            <div class="col">
              <input placeholder="Resolution (pN)" value={resolution}></input>
            </div>
          </div>
        </div>
      </header>
    </div>
    )}
}

export default App;
