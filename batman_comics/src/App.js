import React from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
} from 'reactstrap';

import Err from './components/err';
import MovieCard from './components/MovieCard';


class App extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			list: [], // список комиксов
			watched: [], // список смотрел / не смотрел
			errState: null, // состояние запроса - есть ошибка / все ок
		}

	}

	componentDidMount() {
		const movies = fetch('https://api.tvmaze.com/search/shows?q=batman');

		movies.then((data) => {

			return data.json();

		}).then((data) => {

			this.setState({
				list: data || [],
			});
			console.log("DATA: ", data);

		}).catch((e) => {
			console.log("REQUEST ERROR: ". e);
			this.setState({errState: e});
		});
	}

	renderCard = () => {

		if (this.state.list.length === 0) {
			return null;
		}

		return this.state.list.map((item) => {

			const {
				id,
				name = "",
				url = "",
				image = {},
				summary,
				premiered,
			} = item.show || {};

			return <MovieCard
				id={id}
				name={ name }
				url={ url }
				image={ image.medium }
				summary={ summary }
				premiered={ premiered }
			/>
		});


	};


	render() {
		console.log("MAIN RND");


		if (this.state.errState !== null) {
			return <Err />
		}

		const styles = { display: "flex", flexWrap: "wrap" };

		return (
			<Container>

				<Row>
					<Col><h1>List of Batman comics</h1></Col>
				</Row>
				<Row>
					<Col sm="12">
						<div style={ styles }>
							{
								this.renderCard()
							}
						</div>
					</Col>
				</Row>
			</Container>

		);

	}

}

export default App;
