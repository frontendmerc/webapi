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

import {

    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

class App extends Component {
    constructor() {
        super();
        this.state = {
            alertVisible: false,
            title: '',
            movies: [{ screenshot: '', name: 'hello', id: 1 }],
            modal: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFindGame = this.onFindGame.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    //for popup
    onDismiss() {
        this.setState({ alertVisible: false });
    }

    //for form
    onSubmit = e => {
        e.preventDefault();
        this.setState({ alertVisible: false });

        const query = `/create?name=${this.state.title}`;

        axios
            .get(query)
            .then(result => {
                console.log(result.data);
                if (result.data === 'Not found') {
                    this.setState({ alertVisible: true });
                }else if(result.data === 'This game already exist in the database'){
                    alert(result.data);
                }
                this.getAllMovies();
            })
            .catch(error => {
                alert('Error: ', error);
            });
    };

    onFindGame = e => {

        e.preventDefault();
        this.setState({ alertVisible: false });

        const query = `/findgame?name=${e.target.value}`;
        console.log(query);

        axios.get(query).
            then(result => {

                this.setState({ movies: result.data });
                console.log(result.state.movies);
            }).catch(err => {
                console.log(err);
            });

    }

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

    editRecord = (id, value, platform, genres) => {

        const query = `/update?id=${id}&text=${value}&platform=${platform}&genres=${genres}`;
        console.log(query);
        axios
            .get(query)
            .then(result => {
                this.getAllMovies();
                console.log("updated");
            }).catch(error => {

                alert("Error:" + error);
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
                        editGame ={this.editRecord.bind(this)}
                        games={games}
                    />
                </Col>

            )
        });

        return (
            <div className="App">
                <Container>
                    <Jumbotron>
                        <h1 className="display-4">Game Search</h1>
                        <p className="lead">Search for game</p>
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

                            <Label for="title">Find Game</Label>
                            <Input
                                type="text"
                                name="title"
                                id="findGame"
                                placeholder="enter game title..."
                                onChange={this.onFindGame}
                            />
                        </Col>

                        <Col>
                            <div>
                                <Button color="danger" onClick={this.toggle}>Request a game</Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modaltest">
                                    <ModalHeader toggle={this.toggle}>Request a game</ModalHeader>
                                    <ModalBody>

                                        <Form onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <Label for="title">Add a Game</Label>
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

                                    </ModalBody>
                                </Modal>
                            </div>

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
