const ItemModel = require('../models/mongoose/Item');

class ItemService {

    static async getAll() {
        return ItemModel.find({}).sort({createAt: -1}).exec();
    }

    static async getOne(itemId) {
        return ItemModel.findById(itemId).exec();
    }

    static async create(data) {
        const item = ItemModel(data);
        return item.save();
    }

    static async update(itemId, data) {
        return ItemModel.findByIdAndUpdate(itemId, data).exec();
    }

    static async remove(itemId) {
        return ItemModel.deleteOne({_id: itemId}).exec();
    }
}

module.exports = ItemService;