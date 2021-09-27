const order = require("./../database/model/order");
const { db } = require("./../database/model/cart");

exports.addOrders = async (req, res, next) => {
    try {
        console.log(req.body)
        const orders=new order({
            order_userId:req.body.userId,
            order_exDelDate:req.body.exp_date,
            order_actDelDate:req.body.act_date,
            order_address:req.body.address,
            name:req.body.uname,
            email:req.body.email,
            mobile:req.body.mobile,
            landmark:req.body.landmark,
            credit:req.body.credit,
            order_comment:req.body.comments,
            order_price:req.body.total,
            order_items:[...req.body.orderItem]
        })
        const orderUser=await orders.save();
        res.status(201).json({
            message: "success",
            data: orderUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error occured",
            err: error
        })
    }

}




exports.showOrders = async (req, res, next) => {
    // try {
    //     const allCart = await cart.find();
    //     const carts = await db.collection('carts').aggregate([
    //         {
    //             $lookup:
    //             {
    //                 from: 'products',
    //                 localField: 'productId',
    //                 foreignField: '_id',
    //                 as: 'productdetail'
    //             }
    //         },
    //         {
    //             "$unwind": "$productdetail"
    //         },
    //         {
    //             $lookup:
    //             {
    //                 from: 'users',
    //                 localField: 'userId',
    //                 foreignField: '_id',
    //                 as: 'userdetail'
    //             }
    //         },
    //         {
    //             "$unwind": "$userdetail"
    //         },
    //         {
    //             $project: {
    //                 "_id": 1,
    //                 "userId": 1,
    //                 "productId": 1,
    //                 "qty":1,
    //                 "productdetail._id": 1,
    //                 "productdetail._id": 1,
    //                 "productdetail.p_name": 1,
    //                 "productdetail.p_image": 1,
    //                 "productdetail.p_qty": 1,
    //                 "productdetail.p_price": 1,
    //                 "productdetail.p_qty": 1,
    //                 "userdetail._id": 1,
    //                 "userdetail.u_name": 1,

    //             }
    //         }

    //     ]).toArray();
    //     console.log(carts);
    //     res.status(200).json({
    //         message: 'cart fetched',
    //         product: carts
    //     })

    // } catch (error) {
    //     console.log(error)
    //     res.status(401).json({
    //         message: "error"
    //     })
    // }
}




exports.removeOrders = async (req, res, next) => {
    // try {

    // } catch (error) {
    //     res.status(401).json({
    //         message: "chalbe"
    //     })
    // }
}