import { Product, Purchased } from "../model/productModel.js";

export const addProduct = async (req, res) => {
    // const {productName, price, quantity, image, category, addBy, productOrigin, details, tags} = req.body
    const reqProduct = req.body
    try {
        const newProduct = new Product(reqProduct)

        await newProduct.save()
        res.status(200).send({success:true, message: "Product added", product:newProduct})
    } catch (error) {
        console.log("Error at add product", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const allProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.send(products)
    } catch (error) {
        console.log("Error at all product", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const singleProduct = async (req, res) => {
    const {id} = req.params
    try {
        const product = await Product.findById({_id:id})
        res.send(product)
    } catch (error) {
        console.log("Error at single product", error.message);
        res.status(500).json({ message: error.message });
    }
    
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {productName, price, quantity, image, category, productOrigin, details, purchased} = req.body
    try {
        const product = await Product.findByIdAndUpdate({_id:id},{
            productName,
            price,
            quantity,
            image,
            category,
            purchased,
            productOrigin,
            details
        })
    res.status(200).send({success:true, message: "Product updated", product})
    } catch (error) {
        console.log("Error at update product", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params
    try {
        await Product.findByIdAndDelete({_id:id})
        res.send({message:"Product deleted"})

    } catch (error) {
        console.log("Error at update product", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const getSortedProducts = async (req, res) => {
    const { limit, sortBy, order } = req.query;
    
    try {
        let query = Product.find();
        
        // Apply sorting
        if (sortBy && order) {
            query = query.sort({ [sortBy]: order === 'dsc' ? -1 : 1 });
        }

        // Apply limit if provided
        if (limit) {
            query = query.limit(parseInt(limit));
        }

        const products = await query;

        res.status(200).json(products);
    } catch (error) {
        console.error('Error in getSortedProducts:', error.message);
        res.status(500).json({ message: error.message });
    }
};


//?qs
export const getProductsByUser = async (req, res) => {
    const {email} = req.body
    try {
        
        const products = await Product.find({userEmail:email})
        
        res.send(products)
    } catch (error) {
        console.log("Error at getProductsByUser", error.message);
        res.status(500).json({ message: error.message });
    }
}


// Purchased related api 
export const addPurchase = async (req, res) => {
    const {foodOwner, productName, price, image, quantity, buyerName, buyerEmail, buyingDate} = req.body;
    try {
        const newPurchase = new Purchased({
            productName,
            price,
            quantity,
            image,
            buyerName,
            buyerEmail,
            foodOwner,
            buyingDate
        })
        const purchased = await newPurchase.save()
        res.status(200).send({success:true, message: "Purchased successfully", purchased})
    } catch (error) {
        console.log("Error at add purchase product", error.message);
        res.status(500).json({ message: error.message });
    }
}
//?qs
export const getPurchasedFood = async (req, res) => {
    const {email} = req.body
    try {
        const purchasedFood = await Purchased.find({buyerEmail:email})
        res.send(purchasedFood)
        
    } catch (error) {
        console.log("Error at getPurchasedFood product", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const deletePurchasedProduct = async (req, res) => {
    const {id} = req.params
    try {
        const deleted = await Purchased.findByIdAndDelete({_id:id})
        res.send(deleted)
    } catch (error) {
        console.log("Error at deletePurchasedProduct", error.message);
        res.status(500).json({ message: error.message });
    }
}

//! search api
export const getSearchProducts = async (req, res) => {
    const {query} = req.query
    try {
    const result = await Product.find({
        productName: {$regex:query, $options:'i'}
    })
    res.send(result)
    
    } catch (error) {
        console.log("Error at getSearchProducts", error.message);
        res.status(500).json({ message: error.message });
    }
}

//!category wise product api
export const getCategoryProduct = async (req, res) => {
    const {category} = req.query
    try {
        const categoryProduct = await Product.find({category:category})
        res.send(categoryProduct)
    } catch (error) {
        
    }
}