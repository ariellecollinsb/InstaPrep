import axios from "axios";
import { API_URL } from "../config";

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
    return axios.get(`${API_URL}/local?username=${credentials.username}&password=${credentials.password}`, credentials, {
      withCredentials: true
    });
  },
  logout: function () {
    return axios.post(`${API_URL}/api/users/logout`, undefined, {
      withCredentials: true
    });
  },
  addMeal: function () {
    return axios.post(`${API_URL}/api/users/`, undefined, {
      withCredentials: true
    });
  },
  //-----------------------------------------------------------------------------------------------------------------------//    
  getSession: function () {
    return axios.get(`${API_URL}/session/`, {
      withCredentials: true
    });
  },

  getBlogs: function (req, res) {
    return axios.get(`${API_URL}/api/blog/`, {
      withCredentials: true
    });
  }
};