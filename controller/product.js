const { log } = require("npmlog");
const product = require("./../database/model/product");

exports.addProduct = async (req, res, next) => {
    try {
        const { p_name, p_qty, p_qtySold, p_status, p_category, p_price } = req.body;
        const p_image = "images/" + req.file.filename;
        const products = new product({
            p_name,
            p_qty,
            p_qtySold,
            p_status,
            p_category,
            p_price,
            p_image
        })
            const savedProduct = await products.save();
            res.status(201).json({
                message: "product Saved",
                body: products
            })
     

    } catch (error) {
        console.log(error)
    }

}


exports.showProducts = async (req, res, next) => {
    try {
        
            const allProducts = await product.find();
            res.status(200).json({
                message: 'product fetched',
                product: allProducts
            })

    } catch (error) {
        res.status(401).json({
            message: "Failed to fetch"
        })
    }
}


exports.getProducts = async (req, res, next) => {
    try {
        const id = req.params.id;
        const getProducts = await product.findById({ _id: id });
        res.status(200).json({
            message: "productFetched",
            product: getProducts
        })
    } catch (error) {
        res.status(401).json({
            message: "Failed to fetch"
        })
    }
}


exports.editProducts = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (req.file !== undefined) {
            console.log("hiii");
            const p_image = "images/" + req.file.filename;
            const { p_name, p_qty, p_qtySold, p_status, p_category, p_price } = req.body;
            const updated = await product.updateOne({ _id: id }, { $set: { p_name: p_name, p_qty: p_qty, p_qtySold: p_qtySold, p_status: p_status, p_category: p_category, p_price: p_price,p_image:p_image } });
            console.log(updated)
           return  res.status(201).json({
                message: "updated Product",
                updatedproduct: updated
            })
        } else {
            console.log("hello")
            const { p_name, p_qty, p_qtySold, p_status, p_category, p_price } = req.body;
            console.log(p_name);
            const updated = await product.updateOne({ _id: id }, { $set: { p_name: p_name, p_qty: p_qty, p_qtySold: p_qtySold, p_status: p_status, p_category: p_category, p_price: p_price } });
            console.log(updated, 'asdasdasd')
            return  res.status(201).json({
                message: "updated Product",
                updatedproduct: updated
            })
        }


        res.status(201).json({
            message: "updated Product",
            updatedproduct: updated
        })
    } catch (error) {
        res.json(error)
    }
}


exports.deleteProducts = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedProducts = await product.deleteOne({ _id: id });
        res.status(200).json({
            "message": "product Deleted",
            "deletedProduct": deletedProducts
        })
    } catch (error) {
        res.json({
            messahe: "Unathorised"
        })
    }

}