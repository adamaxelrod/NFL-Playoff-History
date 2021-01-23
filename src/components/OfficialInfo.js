import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Assignments from './Assignments';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class OfficialInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			officialInfo: []
		};
	}
	
	rowBgFormat = (cell, row) => {    
		return { backgroundColor: '#1F456E', color: 'white', fontWeight: 'bold', width: '10' };
	};

	rowSelectFormat = (cell, row) => {    
		return { backgroundColor: 'green' };
	};

	assignmentFormatter = (cell, row) => {  
		return <Assignments officialId={row.number+"-"+row.lastName}></Assignments>;
	};

	positions = ['R', 'U', 'DJ', 'LJ', 'FJ', 'SJ', 'BJ'];

	columns = [
		{
			text: 'Id',
			dataField: 'id',
			style: this.rowBgFormat,
			hidden: true
		},
		{
			text: 'Position',
			dataField: 'position',
			style: this.rowBgFormat,
			sort: true,
			filter: textFilter()
		},
		{
			text: '#',
			dataField: 'number',
			sort: true,
			style: this.rowBgFormat,
			filter: textFilter()
		},		
		{
			text: 'First Name',
			dataField: 'firstName',
			sort: true,
			style: this.rowBgFormat,
			filter: textFilter()
		},
		{
			text: 'Last Name',
			dataField: 'lastName',
			sort: true,
			style: this.rowBgFormat,
			filter: textFilter()
		}
/* 	
		{
			text: 'Assignments',
			dataField: 'assignments',
			formatter: assignmentFormatter,
			dataSort: true,
			filter: textFilter()
		} 
*/
	];

	expandRow = {
		renderer: row => (
			<Assignments officialId={row.number + "-" + row.lastName}></Assignments>
		),
		showExpandColumn: false,
		onExpand: (row, isExpand, rowIndex, e) => {
			this.rowSelectFormat(row, row)
		}
	};

	defaultSorted = [{
		dataField: 'position',
		order: 'asc'
	}];

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
			this.setState({officialInfo: data})
		})
	}

	componentDidMount() {
		this.fetchOfficials(this.state.officialInfo);
	}

	render() {
		return (
			<BootstrapTable		
				bootstrap4
				striped
				hover
				search	
				defaultSorted={this.defaultSorted} 
				keyField="id"
				columns={this.columns}
				data={this.state.officialInfo}
				filter={filterFactory()}
				expandRow={this.expandRow}
			/>
		);
	}
};

export default OfficialInfo;
