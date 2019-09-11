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
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.makeEditable = this.makeEditable.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.patch = this.patch.bind(this);
    
    
  }
  render() {
      const styleBut = {
        margin: '0.5rem 0 0 1rem'
      }
      

      return(
        <div>
          <BackToTop />
          
          <TextField onChange={this.handleCreateInput} value={this.state.new} autoFocus={false} />
          <Button size="small" onClick={this.add} style={styleBut}><AddIcon />Add a new item</Button>
          
         
          {this.state.list.map((el, index) =>
            <Card key={el.id}
                  index={index}
                  content={
                    index === this.state.editableIndex ?
                    <TextField onChange={this.handleEditInput}
                               value={this.state.editableValue}
                               onBlur={() => this.handleBlur(el.id)}
                               autoFocus={true} /> 
                    : el.name
                    } 
                  onDeleteClick={() => this.delete(el.id)} 
                  onDoubleClick={() => this.makeEditable(index)} />)}
          
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

  handleBlur(id) {
    this.patch(id);
    this.setState({
      editableIndex: null,
      editableValue: null
    })
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

  async patch(id) {
    try {
      await fetch(`http://localhost:3030/item/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify({name: this.state.editableValue})
        });
      this.fetchData();
    } catch(e) {
      console.log(e);
    }
  }

  async delete(id) {
    try {
      await fetch(`http://localhost:3030/item/${id}`, {method: 'DELETE'});
      this.fetchData();
    } catch(e) {
      console.log(e);
    }
  }

  async add() {
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
