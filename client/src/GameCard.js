import React, { Component } from 'react';
import {

    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';

import {

    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

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
        this.toggleAll = this .toggleAll.bind(this);

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

    delete = () =>{

        this.setState({
            nested: !this.state.nested,
            close: false
        });

        this.props.removeGame(this.props.games.id);
    }

    render() {

        return (

            <div>
                <Card>
                    <CardImg top width="20%" src={this.props.games.screenshot} alt="Card image cap" />
                    <CardBody>

                        <CardTitle>{this.props.games.name}</CardTitle>
                        <CardText>{this.props.games.id}</CardText>

                        <div>
                            <Button color="danger" onClick={this.toggle}>Modal Test</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className="modaltest">
                                <ModalHeader toggle={this.toggle}>{this.props.games.name}</ModalHeader>
                                <ModalBody>
                                    <img src={this.props.games.screenshot} width="100%" />

                                    <br />

                                    <Button color="danger" onClick={this.toggleNested}>Delete</Button>

                                    <Modal isOpen={this.state.nested} toggle={this.toggleNested} onClosed={this.state.close ? this.toggle : undefined}>
                                        <ModalHeader>Delete</ModalHeader>
                                        <ModalBody>Do you want to delete this?</ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.delete}>Done</Button>{' '}
                                        </ModalFooter>
                                    </Modal>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </div>

                    </CardBody>
                </Card>
            </div>

        );
    }
}

export default GameCard;



