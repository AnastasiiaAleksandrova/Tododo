import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    width: '100%'
  }
}));

const styleDiv = {
  padding: '1rem'
}


export default function TextFields(props) {
  const classes = useStyles();

  return (
    <div style={styleDiv}>
      <TextField label="Type here" multiline className={classes.textField} onChange={props.onChange} value={props.value} />
    </div>
  );
}