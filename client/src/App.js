import React, {Component} from 'react';




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
        {this.state.list.map(el =>
          <div key={this.state.list.indexOf(el)}>{el.name}</div>)}
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
