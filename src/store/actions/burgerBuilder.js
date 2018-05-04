import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const addIngredient = (ingredientName) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName
});

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
  }
};

const initIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredientsAsync = () => {
  return dispatch => {
    axios.get('/ingredients.json').then(res => {
      dispatch(initIngredients(res.data));
    })
    .catch(error => {
      dispatch(fetchIngredientsFailed());
    });
  }
};
