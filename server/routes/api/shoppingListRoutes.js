const router = require("express").Router();
const shoppingListController = require("../../controllers/shoppingListController");

router.route("/")
  .post(shoppingListController.createShoppingList);

router.route("/update/:id") 
  .put(shoppingListController.addIngredients);

router.route("/:id")
  .get(shoppingListController.findCurrentList)
  .delete(shoppingListController.deleteList)
  .put(shoppingListController.completeList);

router.route("/current/:id")
  .put(shoppingListController.deleteItem);
  
router.route("/previous/:id")
  .get(shoppingListController.findThreeMostRecent);

router.route("previous/:id/:date")
  .get(shoppingListController.findListByDate);

module.exports = router;