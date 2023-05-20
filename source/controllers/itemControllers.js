const Item = require("../models/item");
const tryCatch = require("../middlewares/tryCatch");
const CustomError = require("../utils/customError");

// get all items
exports.getItems = tryCatch( async (req, res) => {
    const items = await Item.find({ owner: req.user._id }, { image: 0 }).sort({ _id: -1 });
    res.send(items);
});

// get all items
exports.getItemImage = tryCatch( async (req, res) => {
    const item = await Item.findOne({ _id: req.params.itemId }, { image: 1, _id: 0 });

    if (!(item && item.image))
        throw new CustomError(400, "BAD_REQUEST", "Image not found!");

    // Set content-type and response as image buffer
    res.set("Content-Type", item.image.mimetype);
    res.send(item.image.buffer.buffer);
});

// Create item
exports.createItem = tryCatch( async (req, res) => {
    const { itemCode, name, price, quantity, category, available } = req.body;

    if (!(itemCode && name && price && quantity && category && req.file && available))
        throw new CustomError(400, "BAD_REQUEST", "Please enter all information about item!");

    const item = new Item({ owner: req.user._id, ...req.body });

    item.image = req.file;

    item.imageUrl = `/api/item/image/${item._id}`;

    if (!item)
        throw new CustomError(400, "BAD_REQUEST", "Please enter all information about item!");
    
    await item.save();

    res.status(201).send(item);
});

// Update item
exports.updateItem = tryCatch( async (req, res) => {
    const validUpdate = ["itemCode", "name", "price", "quantity", "category", "available"];

    const requestUpdate = Object.keys(req.body);

    const isUpdateValid = requestUpdate.every(value => validUpdate.includes(value));

    if (!isUpdateValid)
        throw new CustomError(400, "BAD_REQUEST", "Invalid update!");

    let item;
    if (req.file)
        item = await Item.findOneAndUpdate({ _id: req.params.itemId, owner: req.user._id }, { image: req.file, ...req.body}, { new: true });
    else
        item = await Item.findOneAndUpdate({ _id: req.params.itemId, owner: req.user._id }, req.body, { new: true });

    if (!item)
        throw new CustomError(400, "BED_REQUEST", "Unable to update!");

    res.send(item);
});

// Delete item
exports.deleteItem = tryCatch( async (req, res) => {
    const item = await Item.findByIdAndDelete({ _id: req.params.itemId });

    if (!item)
        throw new CustomError(401, "BAD_REQUEST", "You can delete only your item!");
    
    res.send({ _id: item._id});
});