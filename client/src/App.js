import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Header from './header';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    }
  }
  render() {
    
    if (this.state.list) {
      return(
        <div>
          <Header />
          {this.state.list.map(el =>
            <Card key={el.id} style={{margin:'0,2rem'}}>
              <Card.Body>
                <Card.Text>{el.name}</Card.Text>
                <Card.Link href='#'><i className="fas fa-pencil-alt"></i> Edit</Card.Link>
                <Card.Link href='#' onClick={() => this.handleDelete(el.id)}><i className="fas fa-trash-alt"></i> Delete</Card.Link>
              </Card.Body>
            </Card>)}
        </div>
      )
    } else {
      return(
        <div>Loading data...</div>
      )
    }
    
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
