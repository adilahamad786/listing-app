const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: Object,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    available: {
        type: Date,
        required: true,
    },
    itemCode: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true
});

itemSchema.methods.toJSON = function () {
    const item = this;

    const itemObject = item.toObject();

    delete itemObject.image;

    return itemObject;
}

const itemModel = mongoose.model("Item", itemSchema);

module.exports = itemModel;