import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Header from './header';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      new: ''
    }

    this.fetchData = this.fetchData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  render() {
    
      return(
        <div>
          <Header />
          <Card border="primary" style={{ margin: '1rem' }}>
              <Card.Body>
                <form>
                  <input placeholder='Type here' onChange={this.handleInputChange}></input>
                  <Card.Link href='#' onClick={this.handleAdd}><i className="fas fa-plus"></i> Add new item</Card.Link>
                </form>
              </Card.Body>
            </Card>
          {this.state.list.map(el =>
            <Card key={el.id} style={{ margin: '1rem' }}>
              <Card.Body>
                <Card.Text>{el.name}</Card.Text>
                <Card.Link href='#'><i className="fas fa-pencil-alt"></i> Edit</Card.Link>
                <Card.Link href='#' onClick={() => this.handleDelete(el.id)}><i className="fas fa-trash-alt"></i> Delete</Card.Link>
              </Card.Body>
            </Card>)}
        </div>
      )
    
  } 

  componentDidMount() {
    this.fetchData();
  }

  async handleDelete(id) {
    try {
      await fetch(`http://localhost:3030/item/${id}`, {method: 'DELETE'});
      this.fetchData();
    } catch(e) {
      console.log(e);
    }
  }

  handleInputChange(event) {
    this.setState({new: event.target.value});
  }

  async handleAdd() {
    try {
      await fetch(`http://localhost:3030/items`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({name: this.state.new})
        });
      this.fetchData();
    } catch(e) {
      console.log(e);
    }
  }

  async fetchData() {
    try {
      let response = await fetch('http://localhost:3030/items');
      let list = await response.json();
      this.setState({
        list: list
      });
      console.log(this.state);
    } catch(e) {
      console.log(e)
    }
  }

}

export default App;
