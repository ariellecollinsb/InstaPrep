const router = require("express").Router();
const savedRecipesController = require("../../controllers/savedRecipesController");

router.route("/")
  .post(savedRecipesController.createSavedRecipe);

router.route("/:id")
  .get(savedRecipesController.findAllSavedRecipes)
  .delete(savedRecipesController.deleteSavedRecipe);

module.exports = router;