import React from 'react';
import { Alert } from 'reactstrap';


function Err(props) {

	return (
		<div style={ { height: "300px",  display: "flex", alignItems: "center", justifyContent: "center"} }>
			<Alert color="danger">
				Внимание! Возникла ошибка при запросе данных!
			</Alert>
		</div>
	);
}

export default Err;
