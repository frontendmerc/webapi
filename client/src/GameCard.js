import React, { Component } from 'react';
import {

    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Row,
    Col
} from 'reactstrap';

import {

    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import { testFunction, editText, mousein, mouseout } from './control'

export class GameCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            nested: false,
            close: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleNested = () => {

        this.setState({
            nested: !this.state.nested,
            close: false
        });
    }

    toggleAll = () => {
        this.setState({
            nested: !this.state.nested,
            close: true
        });
    }

    delete = () => {

        this.setState({
            nested: !this.state.nested,
            close: false
        });

        this.props.removeGame(this.props.games.id);
    }

    edit = () => {

        console.log(this.props);
        var resultArray = testFunction();
        console.log(resultArray);
        this.props.editGame(this.props.games.id, resultArray[0], resultArray[1], resultArray[2]);
    }

    openEdit = () => {

        editText();
    }

    handleHover = () => {
        mousein(this.props.games.id);
    }    
    
    handleHoverOut = () => {
        mouseout(this.props.games.id);
    }


    render() {

        function PlatformList(props) {
            const numbers = props.platform;
            const listItems = numbers.map((number) =>
                <li>{number}</li>
            );
            return (
                <ul>{listItems}</ul>
            );
        }

        function TimeStamp(props) {

            // Months array
            var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            // Convert timestamp to milliseconds
            var date = new Date(props.timeStamp * 1000);
            // Year
            var year = date.getFullYear();
            // Month
            var month = months_arr[date.getMonth()];
            // Day
            var day = date.getDate();

            // Display date time in MM-dd-yyyy format
            var formattedTime = day + '-' + month + '-' + year;

            return (
                <p>{formattedTime}</p>
            );
        }

        function GenresList(props) {

            const numbers = props.genres;
            const listItems = numbers.map((number) =>
                <li>{number}</li>
            );
            return (
                <ul>{listItems}</ul>
            );
        }

        return (

            <div>
                <Card onMouseOver={this.handleHover} onMouseOut={this.handleHoverOut} id={"a"+this.props.games.id}>
                    <CardImg class="cardImage" onClick={this.toggle} top width="20%" src={this.props.games.cover} alt="Card image cap" />
                    <p class="cardtitle"> {this.props.games.name}</p>
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modaltest">
                            <ModalHeader toggle={this.toggle}>{this.props.games.name}</ModalHeader>

                            <ModalBody>

                                <Row>

                                    <Col>
                                        <img src={this.props.games.cover} width="100%" />
                                        <br />
                                        <Button color="danger" onClick={this.toggleNested}>Delete</Button>
                                        <Button color="primary" onClick={this.openEdit}>Edit</Button>
                                        <br />
                                    </Col>

                                    <Col>
                                        <h5>Summary</h5>
                                        <textarea id="textarea" disabled  >{this.props.games.summary}</textarea>
                                        <br />

                                        <div>
                                            <h5>Platform</h5>
                                            <div id="platformDiv">
                                                <PlatformList platform={this.props.games.platform} />
                                            </div>
                                            <div id="editPlatformDiv">
                                                <input id="platformInput" type="text" name="plattform" defaultValue={this.props.games.platform}></input>
                                            </div>

                                        </div>

                                        <h5>Release Date</h5>
                                        <TimeStamp timeStamp={this.props.games.first_release_date} />

                                        <div>
                                            <h5>Genres</h5>
                                            <div id="genresDiv">
                                                <GenresList genres={this.props.games.genres} />
                                            </div>
                                            <div id="editGenresDiv">
                                                <input id="genresInput" type="text" name="genres" defaultValue={this.props.games.genres}></input>
                                            </div>
                                        </div>

                                        <Modal isOpen={this.state.nested} toggle={this.toggleNested} onClosed={this.state.close ? this.toggle : undefined}>
                                            <ModalHeader>Delete</ModalHeader>
                                            <ModalBody>Do you want to delete this?</ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.delete}>Done</Button>{' '}
                                            </ModalFooter>
                                        </Modal>
                                    </Col>

                                </Row>

                            </ModalBody>
                            <ModalFooter>
                                <Button id="saveBtn" color="success" onClick={this.edit}>Save</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </Card>
            </div>

        );
    }
}

export default GameCard;



