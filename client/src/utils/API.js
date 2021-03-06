import axios from "axios";
import { API_URL } from "../config";
import moment from 'moment';

export default {

  getRandomRecipe: function () {
    return axios.get(`${API_URL}/api/recipes/random/`, {
      withCredentials: true
    });
  },

  getRecipes: function (query) {
    return axios.get(`${API_URL}/api/recipes/byDish/${query}`, {
      withCredentials: true
    });
  },

  addMeal: function (meal) {
    return axios.post(`${API_URL}/api/users/mealPlan/`, meal, {
      withCredentials: true
    });
  },

  getMeals: function (week) {
    return axios.get(`${API_URL}/api/users/mealPlan/${moment(week).utc().format("YYYY-MM-DD")}`, {
      withCredentials: true
    });
  },

  getShoppingList: function (week) {
    return axios.get(`${API_URL}/api/users/shoppingList/${moment(week).utc().format("YYYY-MM-DD")}`, {
      withCredentials: true
    });
  },

  getIngredients: function (id) {
    return axios.get(`${API_URL}/api/users/mealplans/ingredients`)
  },

  //-----------------------------------------------------------------------------------------------------------------------//    
  // Deletes the user with the given id
  deleteUser: function (id) {
    return axios.delete(`${API_URL}/api/users/${id}`, {
      withCredentials: true
    });
  },
  // Saves user info to the database
  saveUser: function (userData) {
    return axios.post(`${API_URL}/api/users/`, userData, {
      withCredentials: true
    });
  },
  loginLocal: function (credentials) {
    return axios.get(`${API_URL}/auth/local?username=${credentials.username}&password=${credentials.password}`, credentials, {
      withCredentials: true
    });
  },
  logout: function () {
    return axios.post(`${API_URL}/api/users/logout`, undefined, {
      withCredentials: true
    });
  },

  //-----------------------------------------------------------------------------------------------------------------------//    
  getSession: function () {
    return axios.get(`${API_URL}/auth/session/`, {
      withCredentials: true
    });
  },

  getBlog: function () {
    return axios.get(`${API_URL}/api/blog/`, {
      withCredentials: true
    });
  }
};