import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';


class Assignments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			officialId: this.props.officialId,
			assignmentInfo: []
		};
	}

	dateStyleFormat = (cell, row) => {  
		return { color: 'black', fontWeight: 'bold' };
	};

	cellFormatter = (cell, row) => {    
		let date = cell.split("_");
		return date[0];
	};

	fetchAssignments(officialId) { 
        fetch("/history/" + officialId, {
            method: 'GET'
        })
        .then((res) => {
            if (res.ok && res.status === 200){
                  return res.json();
            }  
        })
		.then((data) => {
			if (data != null && data !== "")	
				this.setState({assignmentInfo: data})
		})
        .catch(console.log)
	}
	
	componentDidMount() {
		this.fetchAssignments(this.state.officialId);
	}

	expandRow = {
		renderer: row => (
		  <div>
			Game: {row.gameId}
		  </div>
		),
		showExpandColumn: true,
		onExpand: (row, isExpand, rowIndex, e) => {
		},
		onExpandAll: (isExpandAll, rows, e) => {
		}
	}

	columns = [
		{
			text: 'Game',
			dataField: 'gameId',
			style: this.dateStyleFormat,
			formatter: this.cellFormatter
		},
		{
			text: 'Round',
			dataField: 'round',
		},
		{
			text: 'Position',
			dataField: 'pos',
		}
	];

	render() {
		return (
			<BootstrapTable
				condensed
				bordered={true}
				keyField="gameId"
				columns={this.columns}
				data={this.state.assignmentInfo}
			/>
		);
	}
		
}

export default Assignments;
