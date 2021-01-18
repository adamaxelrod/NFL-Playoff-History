import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const AssignmentInfo = ({ assignments }) => {
	const getColor = (value) => {
		return 'black'
	};

	const getFontWeight = (value) => {
		return 'normal'
	};

	const rowStyleFormat = (cell, row) => {    
		return { color: getColor(row),
				 fontWeight:  getFontWeight(row),
				 backgroundColor: row.game === "OFF" ? '#ECECEC' : 'white' };
	  };
	  
	const rowBgFormat = (cell, row) => {    
		return { backgroundColor: row.game === "OFF" ? '#ECECEC' : 'white' };
	};

	const columns = [
		{
			text: 'Game',
			dataField: 'gameId',
			style: rowBgFormat,
		},
		{
			text: 'Round',
			dataField: 'round',
			style: rowStyleFormat,
		},
		{
			text: 'Position',
			dataField: 'pos',
			style: rowStyleFormat,
		}
	];

	return (
			<div class="col-xs-8">
				<BootstrapTable
					condensed
					bordered={true}
					keyField="gameId"
					columns={columns}
					data={assignments}
				/>
			</div>
	);
};

export default AssignmentInfo;
