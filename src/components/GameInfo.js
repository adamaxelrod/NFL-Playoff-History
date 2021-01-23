import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class GameInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameInfo: []
		};
	}

	rowBgFormat = (cell, row) => {
		if (row.round === "WILDCARD") {
			return { backgroundColor: '#1F456E', color: 'white', fontWeight: 'bold', width: '10' };
		}
		else if (row.round === "DIVISIONAL") {
			return { backgroundColor: 'green', color: 'white', fontWeight: 'bold', width: '10' };
		}
		else if (row.round === "CHAMPIONSHIP") {
			return { backgroundColor: 'purple', color: 'white', fontWeight: 'bold', width: '10' };
		}
		else if (row.round.startsWith("SUPERBOWL")) {
			return { backgroundColor: 'orange', color: 'black', fontWeight: 'bold', width: '10' };
		}
		else if (row.round.startsWith("PROBOWL")) {
			return { backgroundColor: 'yellow', color: 'black', fontWeight: 'bold', width: '10' };
		}
	};

	cellFormatter = (cell, row) => {    
		let date = cell.split("_");
		return date[1] + "/" + date[2] + "/" + date[0];
	};

	nameFormatter = (cell, row) => {    
		let name = cell.split("-");
		return name[1];
	};

	columns = [
		{
			text: 'Date',
			dataField: 'id',
			style: this.rowBgFormat,
			formatter: this.cellFormatter,
			filter: textFilter()			
		},
		{
			text: 'Away',
			dataField: 'away',
			style: this.rowBgFormat,
			sort: true,
			filter: textFilter()
		},
		{
			text: 'Home',
			dataField: 'home',
			sort: true,
			style: this.rowBgFormat,
			filter: textFilter()
		},		
		{
			text: 'Round Name',
			dataField: 'round',
			sort: true,
			style: this.rowBgFormat,
			filter: textFilter()
		},
		{
			text: 'R',
			dataField: 'R',
			sort: true,
			style: this.rowBgFormat,
			formatter: this.nameFormatter,
			filter: textFilter()
		},
		{
			text: 'U',
			dataField: 'U',
			sort: true,
			style: this.rowBgFormat,
			formatter: this.nameFormatter,
			filter: textFilter()
		},
		{
			text: 'DJ',
			dataField: 'DJ',
			sort: true,
			style: this.rowBgFormat,
			formatter: this.nameFormatter,			
			filter: textFilter()
		},
		{
			text: 'LJ',
			dataField: 'LJ',
			sort: true,
			style: this.rowBgFormat,
			formatter: this.nameFormatter,			
			filter: textFilter()
		},
		{
			text: 'FJ',
			dataField: 'FJ',
			sort: true,
			style: this.rowBgFormat,
			formatter: this.nameFormatter,			
			filter: textFilter()
		},
		{
			text: 'SJ',
			dataField: 'SJ',
			sort: true,
			style: this.rowBgFormat,
			formatter: this.nameFormatter,			
			filter: textFilter()
		},
		{
			text: 'BJ',
			dataField: 'BJ',
			sort: true,
			style: this.rowBgFormat,
			formatter: this.nameFormatter,			
			filter: textFilter()
		},
		{
			text: 'Alternate R',
			dataField: 'ALTR',
			sort: true,
			style: this.rowBgFormat,
			filter: textFilter(),
			hidden: true
		},
		{
			text: 'Alternate U',
			dataField: 'ALTU',
			sort: true,
			style: this.rowBgFormat,
			filter: textFilter(),
			hidden: true
		},
		{
			text: 'Alternate DJ',
			dataField: 'ALTDJ',
			sort: true,
			style: this.rowBgFormat,
			filter: textFilter(),
			hidden: true
		},
		{
			text: 'Alternate LJ',
			dataField: 'ALTLJ',
			sort: true,
			style: this.rowBgFormat,
			filter: textFilter(),
			hidden: true
		},
		{
			text: 'Alternate FJ',
			dataField: 'ALTFJ',
			sort: true,
			style: this.rowBgFormat,
			filter: textFilter(),
			hidden: true
		},
		{
			text: 'Alternate SJ',
			dataField: 'ALTSJ',
			sort: true,
			style: this.rowBgFormat,
			filter: textFilter(),
			hidden: true
		},
		{
			text: 'Alternate BJ',
			dataField: 'ALTBJ',
			sort: true,
			style: this.rowBgFormat,
			filter: textFilter(),
			hidden: true
		}

	];

	getNumber(row) {
		let rowSplit = row.split("-")
		return rowSplit[0]
	}

	getName(row) {
		let rowSplit = row.split("-")
		return rowSplit[1]
	}

	expandRow = {
		renderer: row => (
			<table class="table-dark">
				<thead>
					<tr>
						<th>Position</th>
						<th>Number</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>R</th>
						<td>{this.getNumber(row.R)}</td>
						<td>{this.getName(row.R)}</td>
					</tr>
					<tr>
						<th>U</th>
						<td>{this.getNumber(row.U)}</td>
						<td>{this.getName(row.U)}</td>
					</tr>
					<tr>
						<th>DJ</th>
						<td>{this.getNumber(row.DJ)}</td>
						<td>{this.getName(row.DJ)}</td>
					</tr>
					<tr>
						<th>LJ</th>
						<td>{this.getNumber(row.LJ)}</td>
						<td>{this.getName(row.LJ)}</td>
					</tr>
					<tr>
						<th>FJ</th>
						<td>{this.getNumber(row.FJ)}</td>
						<td>{this.getName(row.FJ)}</td>
					</tr>
					<tr>
						<th>SJ</th>
						<td>{this.getNumber(row.SJ)}</td>
						<td>{this.getName(row.SJ)}</td>
					</tr>
					<tr>
						<th>BJ</th>
						<td>{this.getNumber(row.BJ)}</td>
						<td>{this.getName(row.BJ)}</td>
					</tr>
					<tr>
						<th>Alternate R</th>
						<td>{this.getNumber(row.ALTR)}</td>
						<td>{this.getName(row.ALTR)}</td>
					</tr>
					<tr>
						<th>Alternate U</th>
						<td>{this.getNumber(row.ALTU)}</td>
						<td>{this.getName(row.ALTU)}</td>
					</tr>
					<tr>	
						<th>Alternate DJ</th>
						<td>{this.getNumber(row.ALTDJ)}</td>
						<td>{this.getName(row.ALTDJ)}</td>
					</tr>
					<tr>	
						<th>Alternate LJ</th>
						<td>{this.getNumber(row.ALTLJ)}</td>
						<td>{this.getName(row.ALTLJ)}</td>
					</tr>	
					<tr>	
						<th>Alternate FJ</th>
						<td>{this.getNumber(row.ALTFJ)}</td>
						<td>{this.getName(row.ALTFJ)}</td>
					</tr>	
					<tr>	
						<th>Alternate SJ</th>
						<td>{this.getNumber(row.ALTSJ)}</td>
						<td>{this.getName(row.ALTSJ)}</td>
					</tr>	
					<tr>	
						<th>Alternate BJ</th>
						<td>{this.getNumber(row.ALTBJ)}</td>
						<td>{this.getName(row.ALTBJ)}</td>
					</tr>																																								
				</tbody>
			</table>
		),
		showExpandColumn: false,
		onExpand: (row, isExpand, rowIndex, e) => {
		}
	};

	defaultSorted = [{
		dataField: 'id',
		order: 'asc'
	}];

	fetchGames() {
		fetch('/games',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				}
			}
		)
		.then((res) => res.json())
		.then((data) => {
			this.setState({gameInfo: data})
		})
	}

	componentDidMount() {
		this.fetchGames(this.state.gameInfo);
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
				data={this.state.gameInfo}
				filter={filterFactory()}
				expandRow={this.expandRow}
			/>
		);
	}
}

export default GameInfo;
