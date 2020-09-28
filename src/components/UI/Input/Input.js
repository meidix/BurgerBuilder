import React from "react";

import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.inputChanged}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.inputChanged}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.inputChanged}
        >
          {props.elementConfig.options.map((choice) => {
            return (
              <option key={choice.value} value={choice.value}>
                {choice.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input className={classes.InputElement} {...props.elementConfig} />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
