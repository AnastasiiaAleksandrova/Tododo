import React, {useState, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import TextField from './textField';
import Card from './Card/Card';
import BackToTop from './nav&scroll';
import './App.css';

const DEV_URL = 'http://localhost:3030';

function App() {
  
  const styleBut = {
    margin: '0.5rem 0 0 1rem'
  }
  const [list, setList] = useState([]);
  const [newItem, setNew] = useState('');
  const [editableIndex, setIndex] = useState(null);
  const [editableValue, setValue] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let response = await fetch(`${DEV_URL}/items`);
      response = await response.json();
      setList(response);
    } catch(err) {
      console.log(err);
    }
  }

  async function add() {
    if (newItem) {
      try {
        await fetch(`${DEV_URL}/items`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({name: newItem})
          });
        setNew('');
        fetchData();
      } catch(e) {
        console.log(e);
      }
    }
  }

  async function patch(id) {
    try {
      await fetch(`${DEV_URL}/item/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify({name: editableValue})
        });
      fetchData();
    } catch(e) {
      console.log(e);
    }
  }
  
  async function deleteItem(id) {
    try {
      await fetch(`${DEV_URL}/item/${id}`, {method: 'DELETE'});
      fetchData();
    } catch(e) {
      console.log(e);
    }
  }

  function makeEditable(index) {
    setIndex(index);
    setValue(list[index].name);
  }

  function handleEditInput(event) {
    setValue(event.target.value);
    return true;
  }

  function handleBlur(id) {
    patch(id);
    setIndex(null);
    setValue(null);
  }

  function handleCreateInput(event) {
    setNew(event.target.value);
  }


  return(
    <div>
      <BackToTop />
      
      <TextField onChange={handleCreateInput} value={newItem} autoFocus={false} />
      <Button size="small" onClick={add} style={styleBut}><AddIcon />Add a new item</Button>
      
     
      {list.map((el, index) =>
        <Card key={el.id}
              index={index}
              content={
                index === editableIndex ?
                <TextField onChange={handleEditInput}
                           value={editableValue}
                           onBlur={() => handleBlur(el.id)}
                           autoFocus={true} /> 
                : el.name
                } 
              onDeleteClick={() => deleteItem(el.id)} 
              onDoubleClick={() => makeEditable(index)} 
              />)
              }
    </div>
  )
}

export default App;
