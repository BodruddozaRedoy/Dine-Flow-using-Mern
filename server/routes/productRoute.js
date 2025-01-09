import express from 'express'
import { addProduct, addPurchase, allProducts, deleteProduct, deletePurchasedProduct, getCategoryProduct, getProductsByUser, getPurchasedFood, getSearchProducts, getSortedProducts, singleProduct, updateProduct } from '../controller/productController.js'
import { privateRoute } from '../middleware/privateRoute.js'

const router = express.Router()

router.post("/add-product",privateRoute, addProduct)
router.get("/all-products", allProducts)
router.get("/product/:id", singleProduct)
router.put("/update-product/:id", privateRoute, updateProduct)
router.delete("/product/:id", privateRoute, deleteProduct),
router.post("/user-product", privateRoute, getProductsByUser)
router.post("/sorted-data", getSortedProducts)
router.get("/category-product", getCategoryProduct)
router.get("/search-products", getSearchProducts)


router.post("/add-purchase", privateRoute, addPurchase)
router.post("/purchased-food", privateRoute, getPurchasedFood)
router.delete("/delete-purchase/:id", privateRoute, deletePurchasedProduct)

export default router