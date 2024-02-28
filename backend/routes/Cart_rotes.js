import express from 'express'
import { CartModel } from '../model/cart_model.js'

const router = express.Router()

router.post("/cart",async(req,res)=>{
    const{ownerID,cartItems}=req.body
    console.log(cartItems)
    try{
        const newCart=await new CartModel({ownerID,products:cartItems})
       if(newCart)
       {
       await newCart.save()
       return res.json({message:"successfull"})
    }
       else{
        return res.json({message:"cannot add to database"})
       }
    }
    catch(err){
        console.log(err)
    }
})


export { router as CartRouter}
