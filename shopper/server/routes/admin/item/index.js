const express = require("express");

const ItemService = require("../../../services/ItemService");

module.exports = () => {
  const router = express.Router();

  router.get("/:itemId?", async (req, res, next) => {
    try {
      const items = await ItemService.getAll();
      let item = null;

      if (req.params.itemId) {
        item = await ItemService.getOne(req.params.itemId);
      }

      return res.render("admin/item", {
        items,
        item,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", async (req, res) => {
    const sku = req.body.sku.trim();
    const name = req.body.name.trim();
    const price = req.body.price.trim();

    if (!sku || !name || !price) {
      req.session.messages.push({
        type: "warning",
        text: "Please enter SKU, name and price!",
      });
      return res.redirect("/admin/item");
    }

    try {
      if (!req.body.itemId) {
        await ItemService.create({ sku, name, price });
      } else {
        const itemData = {
          sku,
          name,
          price,
        };
        await ItemService.update(req.body.itemId, itemData);
      }
      req.session.messages.push({
        type: "success",
        text: `The item was ${
            req.body.itemId ? "updated" : "created"
        } successfully!`,
      });
      return res.redirect("/admin/item");
    } catch (err) {
      req.session.messages.push({
        type: "danger",
        text: "There was an error while saving the item!",
      });
      console.error(err);
      return res.redirect("/admin/item");
    }
  });

  router.get("/delete/:itemId", async (req, res) => {
    try {
      await ItemService.remove(req.params.itemId);
    } catch (err) {
      // Error handling
      req.session.messages.push({
        type: "danger",
        text: "There was an error while deleting the item!",
      });
      console.error(err);
      return res.redirect("/admin/item");
    }
    // Let the item knows that everything went fine
    req.session.messages.push({
      type: "success",
      text: "The item was successfully deleted!",
    });
    return res.redirect("/admin/item");
  });
  return router;
};