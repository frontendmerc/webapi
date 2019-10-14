import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import GameCard from "./GameCard";
import {
    Jumbotron,
    Alert,
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
  } from 'reactstrap';

class App extends Component {
    constructor() {
        super();
        this.state = {
            alertVisible: false,
            title: '',
            movies: [{ screenshot: '', name: 'hello', id: 1 }]
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    //for popup
    onDismiss() {
        this.setState({ alertVisible: false });
    }

    //for form
    onSubmit = e => {
        e.preventDefault();
        this.setState({ alertVisible: false });
        //console.log(this.state.title);

        const query = `/create?id=${this.state.title}`;
        console.log(this.state.title);

        console.log(query);

        axios
            .get(query)
            .then(result => {
                console.log(result.data);
                if (result.data === 'Not found') {
                    this.setState({ alertVisible: true });
                }
                this.getAllMovies();
            })
            .catch(error => {
                alert('Error: ', error);
            });
    };

    // for form field
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    getAllMovies = () => {
        axios
            .get("/games")
            .then(result => {
                this.setState({ movies: result.data });
                console.log(this.state.movies);
            })
            .catch(error => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.getAllMovies();
    }

    deleteRecord = value => {
        console.log("to delete: ", value);
        const query = `/delete?id=${value}`;
        axios
            .get(query)
            .then(result => {
                this.getAllMovies();
            })
            .catch(error => {
                alert("Error: ", error);
            });
    };

    //https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y
    //todo add buttons to delete rows
    //https://codepen.io/aaronschwartz/pen/awOyQq?editors=0010
    //https://github.com/react-tools/react-table/issues/324
    render() {

        let gameCards = this.state.movies.map(games => {

            return (
                <Col xs="4">
                    <GameCard
                        removeGame={this.deleteRecord.bind(this)}
                        games={games}
                    />
                </Col>

            )
        });

        return (
            <div className="App">
                <Container>
                    <Jumbotron>
                        <h1 className="display-4">Movie Search</h1>
                        <p className="lead">Search for movies</p>
                    </Jumbotron>
                    <Row>
                        <Col>
                            <Alert
                                color="danger"
                                isOpen={this.state.alertVisible}
                                toggle={this.onDismiss}
                            >
                                Game not found
                            </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="title">Enter Game title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="enter game title..."
                                        onChange={this.onChange}
                                    />
                                </FormGroup>
                                <Button color="primary">Submit</Button>
                            </Form>
                        </Col>

                    </Row>                    
                    <Row>
                        {gameCards}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;