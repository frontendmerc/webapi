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

export class GameCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let {id} = this.props.games.id;
        return (

            <div>
                <Card>
                    <CardImg top width="20%" src={this.props.games.screenshot} alt="Card image cap" />
                    <CardBody>

                        <CardTitle>{this.props.games.name}</CardTitle>
                        <CardText>{this.props.games.id}</CardText>

                        <Button
                            color="primary"
                            onClick={() => this.props.removeGame(this.props.games.id)}
                        >
                            Delete
                        </Button>

                    </CardBody>
                </Card>
            </div>

        );
    }
}

export default GameCard;



