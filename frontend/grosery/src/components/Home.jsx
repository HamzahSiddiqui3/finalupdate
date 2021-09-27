import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
  import cartServices from "../services/cart.services";

const Home = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    UserService.getProducts().then(
      (response) => {
        console.log(response.data.product);
        setContent(response.data.product);
      },
      (error) => {
        console.log(error);
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);


  const addToCart=(id)=>{
    console.log(id)
    cartServices
    .addToCart(id).then(res=>{
      console.log(res.data)
    }).catch(e=>{
      console.log(e);
    })
  }
  return (
    <div className="container">
      <div className="row">
        {(content && !!content.length) > 0 ? (
            content.map((p,index) => {
          return (
            <>
              <div className="col-md-4" key={index}>
                <div className="card shadow" style={{ width: "18rem" }}>
                <img src="https://picsum.photos/200/300"  style={{maxWidth:"250px",maxHeight:"200px"}} class="card-img-top " alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-center">{p.p_name}</h5>
                    <ol class="list-group list-group-numbered">
                      <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                          <div class="fw-bold">qty</div>
                        </div>
                        <span class="badge bg-primary rounded-pill">
                          {p.p_qty}
                        </span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                          <div class="fw-bold">soldQty</div>
                        </div>
                        <span class="badge bg-primary rounded-pill">
                          {p.p_qtySold}
                        </span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                          <div class="fw-bold">status</div>
                        </div>
                        <span class="badge bg-primary rounded-pill">
                          {p.p_status ? "avaiable" : "not avaiable"}
                        </span>
                      </li>
                    </ol>
                    <div className="row">
                      <div className="col-md-12 mt-2 ">
                        <button className="btn btn-primary mx-auto d-block" onClick={()=>{addToCart(p._id)}} >
                          <i className="fa fa-shopping-cart"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })):<p className="text-center font-weight-bold">No Record Found</p>}
      </div>
    </div>
  );
};

export default Home;
