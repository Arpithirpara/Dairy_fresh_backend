const Cart = require("../cart/cart.model");


// =====================
// ADD TO CART
// =====================
const cartitems = async (data) => {
  try {
    const existing = await Cart.findOne({
      userId: data.userId,
      productId: data.productId,
    });

    if (existing) {
      existing.item_qty += data.item_qty || 1;
      await existing.save();
      return existing;
    }

    const cartitem = await Cart.create({
      userId: data.userId,
      productId: data.productId,
      itemname: data.itemname,
      image: data.image,
      itemPrice: data.itemPrice,
      item_qty: data.item_qty || 1,
    });

    return cartitem;
  } catch (error) {
    throw error;
  }
};


// =====================
// GET CART (USER BASED)
// =====================
const getCart = async (userId) => {
  try {
    return await Cart.find({ userId });
  } catch (error) {
    throw error;
  }
};


// =====================
// INCREASE QTY
// =====================
const increaseQty = async (id) => {
  try {
    const item = await Cart.findById(id);

    if (!item) throw new Error("Item not found");

    item.item_qty += 1;
    await item.save();

    return item;
  } catch (error) {
    throw error;
  }
};


// =====================
// DECREASE QTY
// =====================
const decreaseQty = async (id) => {
  try {
    const item = await Cart.findById(id);

    if (!item) throw new Error("Item not found");

    if (item.item_qty > 1) {
      item.item_qty -= 1;
      await item.save();
      return { deleted: false, item };
    } else {
      await Cart.findByIdAndDelete(id);
      return { deleted: true, item };
    }
  } catch (error) {
    throw error;
  }
};


// =====================
// DELETE SINGLE ITEM
// =====================
const deleteCartitem = async (id) => {
  try {
    const item = await Cart.findByIdAndDelete(id);

    if (!item) {
      throw new Error("Item not found");
    }

    return item;
  } catch (error) {
    throw error;
  }
};


// =====================
// CLEAR CART (USER BASED)
// =====================
const clearCart = async (userId) => {
  try {
    return await Cart.deleteMany({ userId });
  } catch (error) {
    throw error;
  }
};


module.exports = {
  cartitems,
  getCart,
  increaseQty,
  decreaseQty,
  deleteCartitem,
  clearCart,
};