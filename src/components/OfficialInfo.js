import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Assignments from './Assignments';

const OfficialInfo = ({ officialInfo, fetchAssignments }) => {	
	const rowBgFormat = (cell, row) => {    
		return { backgroundColor: 'white' };
	};

	const assignmentFormatter = (cell, row) => {  
		return <Assignments officialId={row.number+"-"+row.lastName}></Assignments>;
	};

	const columns = [
		{
			text: 'Position',
			dataField: 'position',
			style: rowBgFormat,
			dataSort: true,
			isKey: true,
			sort: true
		},
		{
			text: '#',
			dataField: 'number',
			style: rowBgFormat,
			dataSort: true,
			isKey: true
		},		
		{
			text: 'First Name',
			dataField: 'firstName',
			style: rowBgFormat,
			dataSort: true
		},
		{
			text: 'Last Name',
			dataField: 'lastName',
			style: rowBgFormat,
			dataSort: true,
			isKey: true
		},
		{
			text: 'Assignments',
			dataField: 'assignments',
			formatter: assignmentFormatter,
			dataSort: true
		}
	];

    const coloptions = {
		defaultSortName: 'Position',  // default sort column name
		defaultSortOrder: 'asc'  // default sort order
	};

	return (
		<BootstrapTable			
			bordered={true}
			keyField="number,lastName,position"
			columns={columns}
			data={officialInfo}
			options={coloptions}
		/>
	);
};

export default OfficialInfo;
