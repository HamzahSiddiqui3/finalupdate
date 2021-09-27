import React, { useEffect, useState } from "react";
import cartServices from "../services/cart.services";
import userService from "../services/user.service";
import { Router, Switch, Route, Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const incrmenet = (qty, id) => {
    let arr = [...cart];
    setCart([...arr]);
  };
  const decrement = (qty) => {
    let arr = [...cart];
    setCart([...arr]);
  };

  useEffect(() => {
    add();
  }, []);

  const orders = () => {
    let id = [];
    let userId;
    let total=0;
    cart.forEach((e) => {
      id.push(e._id);
      userId = e.userId;
      total+=e.qty*e.productdetail.p_price
    });
    console.log(total)
    const data = {
      orderItems: id,
      userId: userId,
      exp_date: new Date(),
      act_date: new Date(),
      total:total
    };
    localStorage.setItem("orders", JSON.stringify(data));
  };

  const add = () => {
    cartServices
      .cart()
      .then((res) => {
        setCart(res.data.product);
        console.log(res.data.product);
        console.log(cart);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">p_name</th>
            <th scope="col">p_image</th>
            <th scope="col">p_qty</th>
            <th scope="col">p_price</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((c, index) => {
            return (
              <>
                <tr key={index}>
                  <th scope="row">{c.productdetail.p_name}</th>
                  <td>
                    <img
                      src={
                        userService.imageUrl +
                        "/" +
                        cart[index].productdetail.p_image
                      }
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td className=" d-flex jusitfy-content-around">
                    <div></div>
                    <button
                      onClick={() => {
                        incrmenet(c.qty++, c._id);
                      }}
                    >
                      +
                    </button>
                    <input
                      type="text"
                      name="name"
                      value={c.qty}
                      className="form-control "
                    />
                    <button
                      onClick={() => {
                        decrement(c.qty--);
                      }}
                    >
                      -
                    </button>
                  </td>

                  <td>{c.productdetail.p_price}</td>
                  <td>{c.qty * c.productdetail.p_price}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      <div className="row">
        <div className="col-md-12 m-auto">
          <button
            className="btn btn-primary mx-auto d-block rounded-0"
            onClick={() => {
              orders();
            }}
          >
            <Link  to={"/orders"} className="text-white border-0 text-decoration-none">
              Orders
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
