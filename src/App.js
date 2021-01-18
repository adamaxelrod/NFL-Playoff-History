import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import OfficialInfo from './components/OfficialInfo';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			officialList: []
		};
	}

	fetchOfficials() {
		fetch('/officials',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				}
			}
		)
		.then((res) => res.json())
		.then((data) => {
			this.setState({officialList: data})
		})
	}
	
	componentDidMount() {
		this.fetchOfficials();
	}

	render() {
		return (
			<div className='container-fluid'>
				<Alert className="alert-warn"><strong>PLAYOFF ASSIGNMENT HISTORY</strong></Alert>
				<OfficialInfo officialInfo={this.state.officialList}/>
			</div>
		  );
	}
		
}

export default App;
