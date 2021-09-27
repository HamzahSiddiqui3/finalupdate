import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartServices from "../services/cart.services";
import { Redirect } from 'react-router-dom';
import { history } from "../helpers/history";

export default function Orders() {
  const [user, setUser] = useState({});

  const [uname, setUname] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [address, setAddress] = useState("")
  const [landmark, setLandmark] = useState("")
  const [credit, setCredit] = useState("")
  const [comments, setComments] = useState("")
  const [total, setTotal] = useState("")


  let data = localStorage.getItem("orders");
  data = JSON.parse(data);
  console.log(data.orderItems)
  useEffect(() => {
    cartServices
      .userDetail(data.userId)
      .then((res) => {
        console.log(res.data)
        setUser(res.data.users);
        setTotal(data.total);
        setUname(res.data.users.u_name)
        setEmail(res.data.users.u_email)
        setMobile(res.data.users.u_mobile)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [])
  //   cartServices.userDetail()
  // const { user: currentUser } = useSelector((state) => state.auth);
  // console.log(currentUser.username)
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user, email, mobile, address, landmark, comments)
    const datas = {
      userId:data.userId,
      exp_date:data.exp_date,
      act_date:data.act_date,
      uname,
      email,
      mobile,
      address,
      landmark,
      credit,
      comments,
      total,
      orderItem:data.orderItems
    }
    cartServices.orders(datas).then((res)=>{
      console.log(res.data)
      history.push("/success")
      
    }).catch(e=>{
      console.log(e)
    })
  }


  return (
    <div>
      <div className="row">
        <h1 className="text-center">Book orders</h1>
        <div className="col-md-6 m-auto">
          <form onClick={onSubmit}>
            <div className="form-group">
              <label htmlFor="">Total price</label>
              <input type="text" name="" className="form-control" disabled value={data.total} id="" />
            </div>
            <div className="form-group ">
              <label htmlFor="">Name</label>
              <input type="text" name="name" value={user.u_name} onChange={(e) => { setUname(e.target.value) }} className="form-control" id="" />
            </div>
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input type="email" name="" id="" value={user.u_email} className="form-control" onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div className="form-group">
              <label htmlFor="">Order Address</label>
              <input type="text" name="" onChange={(e) => { setAddress(e.target.value) }} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="">Mobile</label>
              <input type="number" name="" value={user.u_mobile} onChange={(e) => { setMobile(e.target.value) }} className="form-control" id="" />
            </div>
            <div className="form-group">
              <label htmlFor="">Land Marks</label>
              <input type="text" name="" id="" onChange={(e) => { setLandmark(e.target.value) }} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="">Credit Card</label>
              <input type="text" name="" id="" onChange={(e) => { setCredit(e.target.value) }} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="">Comments</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="form-control"
                onChange={(e) => { setComments(e.target.value) }}
              ></textarea>
            </div>
            <button type="submit" className=" btn mt-3  mx-auto d-block btn-primary">
              Placed Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
