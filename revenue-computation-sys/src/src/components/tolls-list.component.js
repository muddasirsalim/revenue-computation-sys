import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import bgimage from '../image.jpg';
import { Jumbotron, Button } from 'reactstrap';

const Toll = props => (
  <tr>
    <td>{props.toll.username}</td>
    <td>{props.toll.description}</td>
    <td>{props.toll.userid}</td>
    <td>{props.toll.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.toll._id}>edit</Link> | <a href="#" onClick={() => { props.deleteToll(props.toll._id) }}>delete</a>
    </td>
  </tr>
)

export default class TollsList extends Component {
  constructor(props) {
    super(props);

    this.deleteToll = this.deleteToll.bind(this)

    this.state = {tolls: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tolls/')
      .then(response => {
        this.setState({ tolls: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteToll(id) {
    axios.delete('http://localhost:5000/tolls/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      tolls: this.state.tolls.filter(el => el._id !== id)
    })
  }

  tollList() {
    return this.state.tolls.map(currenttoll => {
      return <Toll toll={currenttoll} deleteToll={this.deleteToll} key={currenttoll._id}/>;
    })
  }

  render() {
    return (
      <div>
        <Jumbotron style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }}></Jumbotron>
        <h3>Logged Tolls</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>UserID</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.tollList() }
          </tbody>
        </table>
      </div>
    )
  }
}