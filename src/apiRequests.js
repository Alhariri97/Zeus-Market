const axios = require("axios");
axios.defaults.baseURL = "https://zeus-market.herokuapp.com/api/";

const getAllItems = (category, searchInput) => {
  return axios
    .get(`items?${category}&search=${searchInput}`)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
  // .then(function () {
  //   // always executed
  // });
};
const getAllCategories = (username) => {
  return axios
    .get(`categories`)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};

const getUserByUsername = (username) => {
  return axios
    .get(`users/${username}`)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};

const createUser = (username, url) => {
  const user = {
    username: username,
    avatar_url: url,
  };

  return axios
    .post(`users`, user)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};

const getProductById = (productId) => {
  return axios
    .get(`items/${productId}`)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};
const orderItem = (username, itemId) => {
  const item = {
    item_id: itemId,
  };
  return axios
    .post(`users/${username}/orders`, item)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};
const sellItem = (itemObject) => {
  return axios
    .post(`items`, itemObject)
    .then(function ({ data }) {
      console.log(data);
      return data;
    })
    .catch(function (error) {
      return error;
    });
};
const createCategory = (categoryName) => {
  const obj = {
    category_name: categoryName,
  };
  return axios
    .post(`categories`, obj)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};

const deleteItemById = (itemId) => {
  return axios
    .delete(`items/${itemId}`)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};

const getAllOrdered = (username) => {
  return axios
    .get(`users/${username}/orders`)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};
const getAllUsers = () => {
  return axios
    .get(`users`)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};

const giveKudo = (obj, username) => {
  return axios
    .patch(`users/${username}`, obj)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};

const addToYourBasket = (username, itemId) => {
  const obj = {
    item_id: itemId,
  };
  return axios
    .post(`users/${username}/basket`, obj)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};

const getAllInBasket = (username) => {
  return axios
    .get(`users/${username}/basket`)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};

const deleteItemFromBasket = (username, item_id) => {
  return axios.delete(`users/${username}/basket/${item_id}`);
};

const requestChangePhoto = (username, newImgUrl) => {
  const obj = {
    avatar_url: newImgUrl,
    kudos_inc: 0,
  };
  return axios
    .patch(`users/${username}`, obj)
    .then(function ({ data }) {
      console.log(data);
      return data;
    })
    .catch(function (error) {
      return error;
    });
};

module.exports = {
  getAllItems,
  getAllCategories,
  getUserByUsername,
  createUser,
  getProductById,
  orderItem,
  sellItem,
  createCategory,
  deleteItemById,
  getAllOrdered,
  getAllUsers,
  giveKudo,
  addToYourBasket,
  getAllInBasket,
  deleteItemFromBasket,
  requestChangePhoto,
};
//
