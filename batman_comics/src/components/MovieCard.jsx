import React from 'react';
import * as PropTypes from 'prop-types';
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";

function MovieCard(props) {
	const watched = false;

	const onChange = () => null;
	const onViewMore = () => null;

	const {
		id,
		name = "",
		url = "",
		image = {},
		summary,
		premiered,
	} = props;

	const styles = { width: "30%", margin: "15px"};

	return  (
			<Card style={ styles } color={ watched ? "primary" : ""} >
				<CardImg top width="100%" src={ image } alt={ name } />
				<CardBody>
					<CardTitle>{ name }</CardTitle>
					<CardText>
						<small className="text-muted" dangerouslySetInnerHTML={ { __html: summary } } />
					</CardText>
					<CardText>
						<small className="text-muted">{ premiered }</small> <br />
						<small><a target="_blank" href={ url }>Visit movie page</a></small> <br /> <br/>
					</CardText>
					<Row>
						<Col>
							<Button
								size="sm"
								onClick={ () => { onChange(id) }}
								variant={ watched ? "success" : "outline-secondary" }
							>
								{ watched ? "Смотрел" : "Не смотрел"}
							</Button>
						</Col>
						<Col>
							<Button
								size="sm"
								onClick={ () => { onViewMore(id) }}
								variant="info"
							>
								Детали
							</Button>
						</Col>
					</Row>
				</CardBody>
			</Card>
	)
}

MovieCard.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	url: PropTypes.string,
	image: PropTypes.string,
	summary: PropTypes.string,
	premiered: PropTypes.string,
};

export default MovieCard;
