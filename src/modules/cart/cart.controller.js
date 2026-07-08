const {
  cartitems,
  getCart,
  increaseQty,
  decreaseQty,
  deleteCartitem,
  clearCart,
} = require("../cart/cart.service");


// =====================
// GET CART (USER BASED)
// =====================
const getcart = async (req, res) => {
  try {
    const items = await getCart(req.user.id); // ✔ fixed naming

    return res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "cart fetch error",
    });
  }
};


// =====================
// ADD TO CART
// =====================
const addTocart = async (req, res) => {
  try {
    const { itemname, image, itemPrice, productId } = req.body;

    if (!itemname || !image || !itemPrice || !productId) {
      return res.status(400).json({
        success: false,
        message: "itemname, image, itemPrice, productId required",
      });
    }

    const cartitem = await cartitems({
      userId: req.user.id,
      productId,
      itemname,
      image,
      itemPrice,
      item_qty: 1,
    });

    return res.status(201).json({
      success: true,
      message: "item added successfully",
      data: cartitem,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================
// INCREASE QTY
// =====================
const increaseCart = async (req, res) => {
  try {
    const item = await increaseQty(req.params.id);

    return res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================
// DECREASE QTY
// =====================
const decreaseCart = async (req, res) => {
  try {
    const item = await decreaseQty(req.params.id);

    return res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================
// DELETE ITEM
// =====================
const deleteitem = async (req, res) => {
  try {
    const item = await deleteCartitem(req.params.id);

    return res.json({
      success: true,
      message: "Item deleted successfully",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================
// CLEAR CART (USER BASED)
// =====================
const clearCartController = async (req, res) => {
  try {
    await clearCart(req.user.id);

    return res.json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getcart,
  addTocart,
  increaseCart,
  decreaseCart,
  deleteitem,
  clearCartController,
};