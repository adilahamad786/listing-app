const router = require("express").Router();
const auth = require("../middlewares/auth");
const uploadFile = require("../middlewares/uploadFile");
const { getItems, getItemImage, createItem, updateItem, deleteItem } = require("../controllers/itemControllers");

// Get items
router.post("/get-items", auth, getItems);

// Get item image
router.get("/image/:itemId", getItemImage);

// Create item
router.post("/create", auth, uploadFile.single("image"), createItem);

// Update item
router.patch("/update/:itemId", auth, uploadFile.single("image"), updateItem);

// Delete item
router.delete("/delete/:itemId", auth, deleteItem);

module.exports = router;