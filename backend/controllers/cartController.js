import userModel from "../models/userModel.js"


//add product to user cart
const addToCart = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log entire request body

        const { userId, itemId, size } = req.body;
        console.log("Received userId:", userId); // Log userId
        
        // Validate received userId
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }
        
        const userData = await userModel.findById(userId);
        // Check if userData exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        

        let cartData = userData.cartData || {};
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        // Update user's cart data
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//update user cart

const updateCart = async(req,res)=>{
    
    try {
        const {userId,itemId,size,quantity} = req.body;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Cart Updated"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//get user cart data
const getUserCart = async(req,res)=>{
    
    try {
        const { userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


export { addToCart,updateCart,getUserCart}