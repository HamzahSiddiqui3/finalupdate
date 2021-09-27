const category = require("./../database/model/category");

exports.addCategory = async(req, res, next) => {
    try {
        const cat_name = req.body.cat_name;
        console.log(cat_name);
        const categories = new category({
            cat_name
        })
        if (req.userData.role === "admin") {
            const savedProduct = await categories.save();
            res.status(201).json({
                message: "product Saved",
                body: savedProduct
            })
        } else {
            res.status(401).json({
                message: "chalbe"
            })
        }

    } catch (error) {
        console.log(error)
    }

}


exports.showCategory = async(req, res, next) => {
    try {
        if (req.userData.role) {
            const allCategory = await category.find();
            res.status(200).json({
                message: 'product fetched',
                product: allCategory
            })
        }
    } catch (error) {
        res.status(401).json({
            message: "chalbe"
        })
    }
}