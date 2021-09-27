const cart = require("./../database/model/cart");
const { db } = require("./../database/model/cart");

exports.addToCart = async (req, res, next) => {
    try {

        const pid = req.params.pid;
        const userId = req.userData.userId;
        const carts = new cart({
            userId: userId,
            productId: pid,
            status: true
        });
        const savedCart = await carts.save();
        res.status(201).json({
            message: "add to cart",
            carts: savedCart
        })
    } catch (error) {
        res.status(500).json({
            message: "error occured",
            err: error
        })
    }

}




exports.showcart = async (req, res, next) => {
    try {
        const allCart = await cart.find();
        const carts = await db.collection('carts').aggregate([
            {
                $lookup:
                {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productdetail'
                }
            },
            {
                "$unwind": "$productdetail"
            },
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userdetail'
                }
            },
            {
                "$unwind": "$userdetail"
            },
            {
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "productId": 1,
                    "qty":1,
                    "productdetail._id": 1,
                    "productdetail._id": 1,
                    "productdetail.p_name": 1,
                    "productdetail.p_image": 1,
                    "productdetail.p_qty": 1,
                    "productdetail.p_price": 1,
                    "productdetail.p_qty": 1,
                    "userdetail._id": 1,
                    "userdetail.u_name": 1,

                }
            }

        ]).toArray();
        console.log(carts);
        res.status(200).json({
            message: 'cart fetched',
            product: carts
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: "error"
        })
    }
}




exports.removeToCart = async (req, res, next) => {
    try {

    } catch (error) {
        res.status(401).json({
            message: "chalbe"
        })
    }
}