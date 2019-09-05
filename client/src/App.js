import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import TextField from './textField';
import Card from './Card/Card';
import BackToTop from './nav&scroll';


import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      list: [],
      new: '',
      editableIndex: null,
      editableValue: null
    }

    this.fetchData = this.fetchData.bind(this);
    this.handleCreateInput = this.handleCreateInput.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.makeEditable = this.makeEditable.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
    
    
  }
  render() {
      const styleBut = {
        margin: '0.5rem 0 0 1rem'
      }
      

      return(
        <div>
          <BackToTop />
          
          <TextField onChange={this.handleCreateInput} value={this.state.new} />
          <Button size="small" onClick={this.handleAdd} style={styleBut}><AddIcon />Add a new item</Button>
          
         
          {this.state.list.map((el, index) =>
          <Card key={el.id} id={el.id} index={index} content={
            index === this.state.editableIndex 
              ? <TextField onChange={this.handleEditInput} value={this.state.editableValue} onBlur={this.handleEdit} /> 
              : el.name
          } 
          onDeleteClick={() => this.handleDelete(el.id)} 
          onDoubleClick={ () => this.makeEditable(index) } />)}
          
        </div>
      )
    
  } 

  componentDidMount() {
    this.fetchData();
  }

  makeEditable(index) {
    this.setState({
      editableIndex: index,
      editableValue: this.state.list[index].name
    })
  }

  handleEdit(event) {
    console.log('PUT!!!')
  }

  handleEditInput(event) {
    this.setState({
        editableValue: event.target.value
    })
    return true
  }

  handleCreateInput(event) {
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
