import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import OfficialInfo from './components/OfficialInfo';
import GameInfo from './components/GameInfo';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameList: []
		};
	}
	
	render() {
		return (
			<Router>
				<div>				
					<nav>
						<div class="row align-items-start">
							<div class="col">
								<Alert className="alert-primary"><Link to="/"><b>Official List</b></Link></Alert>
							</div>
							<div class="col">
								<Alert className="alert-info"><Link to="/playoffs"><b>Playoff History</b></Link></Alert>
							</div>
							<div class="col">
								<Alert className="alert-danger">Crew History (FUTURE)</Alert>
							</div>
						</div>
					</nav>

					<Switch>
						<Route path="/playoffs">
						<GameInfo/>
						</Route>
						<Route path="/users">
						</Route>
						<Route path="/">
							<OfficialInfo/>
						</Route>
					</Switch>
				</div>
		  </Router>


/* 			<div>
			<div class="row align-items-start">
				<div class="col">
					<Alert className="alert-info" onClick={this.setView}>Playoff History</Alert>
				</div>
				<div class="col">
					<Alert className="alert-info">Playoff Games</Alert>
				</div>
				<div class="col">
					<Alert className="alert-info">Crew History</Alert>
				</div>
			</div>
			<div className='grid-div-background'>
				<Alert className="alert-primary"><b>Playoff Roster</b></Alert>
				<OfficialInfo/>
				<GameInfo/>
			</div>
		</div> */
		  );
	}
		
}

export default App;
