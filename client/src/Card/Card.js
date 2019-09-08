
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import './Card.css'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  card: {
    minWidth: 100,
    margin: 20
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}
          onDoubleClick={props.onDoubleClick}
          id={props.id}
          index={props.index}>
      
      <CardContent className="content">{props.content}</CardContent>
       
      <CardActions>
        <Button size="small" onClick={props.onDeleteClick}><DeleteIcon />Delete</Button>
      </CardActions>
    </Card>
  );
}

