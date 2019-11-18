const axios = require("axios");
const router = require("express").Router();
const UserController = require("../../controllers/user.controller");
//
// Users
//
router.post("/users/logout", UserController.logout);
router.post("/users/mealPlan/:week/:day/:meal", UserController.mealPlan);
router.post("/users/", UserController.create);


//
// Recipes
//
router.get("/recipes/byIngredient/:search/:page?", (req, res) => {
    var page = "";
    if(req.params.page) {
        page = "&p=" + req.params.page
    }

    axios
      .get("http://www.recipepuppy.com/api/?i=" + req.params.search + page)
      .then(({ data: { results } }) => res.json(results))
      .catch(err => res.status(404).json([]))
      .catch(err => res.status(422).json(err));
  });

router.get("/recipes/byDish/:search/:page?", (req, res) => {
    var page = "";
    if(req.params.page) {
        page = "&p=" + req.params.page
    }

    axios
      .get("http://www.recipepuppy.com/api/?q=" + req.params.search + page)
      .then(({ data: { results } }) => res.json(results))
      .catch(err => res.status(404).json([]))
      .catch(err => res.status(422).json(err));
  });

router.get("/recipes/random/", (req, res) => {
  const randomQuery = ["steak", "fish", "pork", "noodles"];
  var query = Math.floor(Math.random() * randomQuery.length).toString();
  var page = "&p=" + Math.ceil(Math.random() * 99).toString()
  axios
    .get("http://www.recipepuppy.com/api/?q=" + query + page)
    .then(({ data: { results } }) => (
        res.json(results)
    ))
    .catch(err => res.status(404).json([]))
    .catch(err => res.status(422).json(err))
  });


module.exports = router;