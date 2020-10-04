import * as types from "./actionTypes";
import axios from "../../axios-orders";

const initIngredients = (data) => {
  return {
    type: types.INIT_INGREDIENTS,
    data: data,
  };
};

const ingredientError = () => {
  return {
    type: types.INGREDIENTS_ERROR,
  };
};

export const addIngredients = (ingredientName) => {
  return {
    type: types.ADD_INGREDIENTS,
    ingredientName: ingredientName,
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: types.REMOVE_INGREDIENTS,
    ingredientName: ingredientName,
  };
};

export const initilizeIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        return dispatch(initIngredients(response.data));
      })
      .catch((error) => {
        console.log(error);
        return dispatch(ingredientError());
      });
  };
};
