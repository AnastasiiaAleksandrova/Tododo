


import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import EditIcon from '@material-ui/icons/Edit';
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
    <Card className={classes.card} >
      <CardContent>
        <Typography variant="body2" component="p">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.onDeleteClick}><DeleteIcon />Delete</Button>
      </CardActions>
    </Card>
  );
}

