import React, { Component } from "react";
import "./App.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import Popup from "react-popup";
import "./Popup.css";
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
      movies: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findGame = this.findGame.bind(this);
  }

  findGame(e) {

    const query = `/findgame?name=${this.game.value}`;
    console.log(query);
    e.preventDefault();

    axios.get(query).then(result => {

      this.setState({ movies: result.data });
      //console.log(this.state.movies);

    }).catch(error => {

      console.log(error);
    })

  };

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

  handleSubmit(e) {
    const query = `/create?id=${this.input.value}`;

    console.log(query);
    e.preventDefault();
    axios
      .get(query)
      .then(result => {
        console.log(result);
        if (result.data === "Not found") {
          Popup.alert("Movie Not Found");
        }
        this.getAllMovies();
      })
      .catch(error => {
        alert("Error: ", this.input.value);
      });
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
    var data = this.state.movies;
    data = data.reverse();

    return (
      <div className="App">
        <div className="jumbotron text-center header">
          <h1>Games</h1>
          <p>Search for games</p>
        </div>
        <div className="container search">
          <div className="col-sm-6">
            <p />
            <form onSubmit={this.handleSubmit}>
              <label>Enter movie title:</label>
              <input
                type="text"
                class="form-control"
                ref={input => (this.input = input)}
              />
              <p />
              <input type="submit" value="Submit" />
            </form>
            <p />
          </div>

          <div className="col-sm-6">
            <p />
            <form onSubmit={this.findGame}>
              <label>Find Game title:</label>
              <input
                type="text"
                class="form-control"
                ref={input => (this.game = input)}
              />
              <p />
              <input type="submit" value="Submit" />
            </form>
            <p />
          </div>

          <div>
            <Popup />
          </div>
        </div>

        <div className="container">
          <div className="col-sm-12">
            <p />
            <ReactTable
              data={data}
              columns={[
                {
                  Header: "ID",
                  accessor: "id"
                },
                {
                  Header: "Name",
                  accessor: "name"
                },{
                  Header: "Delete",
                  accessor: "id",

                  Cell: ({value}) => (
                    <a
                    onClick={() => {
                      this.deleteRecord(value);
                    }}
                  >
                    Delete
                  </a>
                  )
                }

              ]}
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;