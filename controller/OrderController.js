const Order = require('../model/OrderModel');
const User = require('../model/UserModel');
const Cart = require('../model/CartModel');
const Product = require('../model/ProductModel');

const createOrder = async (req, res) => {
  try {
    const { name, address, phoneno } = req.body;
    const userId = req.user; 

    
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ userid: userId });

    
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: 'User not found' });
    }
    if (!cart) {
      console.log("Cart not found for user ID:", userId);
      return res.status(404).json({ message: 'Cart not found' });
    }

    
    if (!Array.isArray(cart.products)) {
      console.log("Cart products is not an array for user ID:", userId);
      return res.status(400).json({ message: 'Cart products is not an array' });
    }

   
    let totalAmt = 0;
    for (const item of cart.products) {
      console.log("Processing cart item:", item);

      
      const product = await Product.findOne({ id: item.productid });
      if (!product) {
        console.log(`Product with ID ${item.productid} not found`);
        return res.status(404).json({ message: `Product with ID ${item.productid} not found` });
      }
      totalAmt += product.price * item.quantity; 
    }

    
    const newOrder = new Order({
      userid: userId,
      name: name || user.name,
      email: user.email,
      address: address || user.address,
      phoneno: phoneno || user.phoneno,
      products: cart.products,
      totalamount: totalAmt,
      orderdate: new Date(),
      estimatedate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    });

    
    await newOrder.save();
    await Cart.findOneAndDelete({ userid: userId });

    res.status(201).send({msg : " order placed successfully " });
  } 
  catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { createOrder };
