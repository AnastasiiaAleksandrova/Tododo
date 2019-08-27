import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import TextField from './textField';
import Card from './card';
import BackToTop from './nav&scroll';


import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    // this.myRef = React.forwardRef();
    this.state = {
      list: [],
      new: '',
      // edit: ''
    }

    this.fetchData = this.fetchData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    // this.handleEdit = this.handleEdit.bind(this);
    
  }
  render() {
      const styleBut = {
        margin: '0.5rem 0 0 1rem'
      }
      

      return(
        <div>
          <BackToTop />
          <TextField onChange={this.handleInputChange} value={this.state.new} />
          <Button size="small" onClick={this.handleAdd} style={styleBut}><AddIcon />Add a new item</Button>
         
          {this.state.list.map(el =>
          <Card key={el.id} content={el.name} onDeleteClick={() => this.handleDelete(el.id)} onEditClick={this.handleEdit}/>)}
          
        </div>
      )
    
  } 

  componentDidMount() {
    this.fetchData();
  }


  handleInputChange(event) {
    this.setState({new: event.target.value});
  }

  async handleDelete(id) {
    try {
      await fetch(`http://localhost:3030/item/${id}`, {method: 'DELETE'});
      this.fetchData();
    } catch(e) {
      console.log(e);
    }
  }

  async handleEdit() {
    // const node = this.myRef.current;
    // console.log(node);
  }


  async handleAdd() {
    if (this.state.new) {
      try {
        await fetch(`http://localhost:3030/items`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({name: this.state.new})
          });
          this.setState({new: ""})
        this.fetchData();
      } catch(e) {
        console.log(e);
      }
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
