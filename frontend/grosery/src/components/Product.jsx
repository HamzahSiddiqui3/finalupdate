import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import userService from "../services/user.service";

export default function Product() {
  const [p_name, setProductName] = useState("");
  const [p_image, setmage] = useState("");
  const [p_qty, setQty] = useState("");
  const [p_qtySold, setQtySold] = useState("");
  const [p_category, setCategory] = useState("");
  const [p_price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [product, setProduct] = useState({});
  console.log(p_image.name);
  const { message } = useSelector((state) => state.message);
  const [successful, setSuccessful] = useState(false);
  const form = useRef();
  const checkBtn = useRef();
  const [edit, setEdit] = useState({});
  const dispatch = useDispatch();

  const [content, setContent] = useState([]);


  useEffect(() => {
    fetchedProduct();
  }, []);

  const fetchedProduct = () => {
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
  };

  const handleImg = (e) => {
    setmage(e.target.files[0]);
  };
  const onChangePname = (e) => {
    const pname = e.target.value;
    setProductName((p) => ({ ...p, pname }));
  };

  const onChangePqty = (e) => {
    const pqty = e.target.value;
    setQty(pqty);
  };

  const onChangePsold = (e) => {
    const sold = e.target.value;
    setQtySold(sold);
  };

  const onChangePcategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };

  const onChangePprice = (e) => {
    const price = e.target.value;
    setPrice(price);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      let data = new FormData();
      data.append("p_name", p_name);
      data.append("image", p_image);
      data.append("p_qty", p_qty);
      data.append("p_qtySold", p_qtySold);
      data.append("p_category", p_category);
      data.append("p_price", p_price);

      UserService.addProducts(data)
        .then((data) => {
          fetchedProduct();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const getProduct = (id) => {
    userService
      .getProduct(id)
      .then((res) => {
        setProduct(res.data.product);
        
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    let data = new FormData();
    data.append("p_name", p_name ? p_name : product.p_name);
    data.append("image", p_image ? p_image : product.p_image);
    data.append("p_qty", p_qty ? p_qty : product.p_qty);
    data.append("p_qtySold", p_qtySold ? p_qtySold : product.p_qtySold);
    data.append("p_category", p_category ? p_category : product.p_category);
    data.append("p_price", p_price ? p_price : product.p_price);
    data.append("id", product._id);

    userService
      .editProduct(data,product._id)
      .then((res) => {
        fetchedProduct();

      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeProduct = (pid) => {
    console.log(pid);
    userService
      .removeProducts(pid)
      .then((data) => {
        console.log(data);
        fetchedProduct();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-3 border-dark border-5  text-center border-bottom  m-auto">
          <h1>All Products</h1>
        </div>
        <div className="w-100"></div>
        <div className="col-md-12">
          <button
            className="btn btn-primary offset-md-10 mt-5"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Product
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">qty</th>
            <th scope="col">Sold</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col ">Operations</th>
          </tr>
        </thead>
        <tbody>
          {(content && !!content.length) > 0 ? (
            content.map((p) => {
              return (
                <>
                  <tr>
                    <th scope="row">
                      <img
                        src={UserService.imageUrl + "/" + p.p_image}
                        style={{ maxWidth: "100px", maxHeight: "80px" }}
                        alt=""
                      />
                    </th>
                    <td>{p.p_name}</td>
                    <td>{p.p_qty}</td>
                    <td> {p.p_qtySold}</td>
                    <td> {p.p_price}</td>
                    <td>
                      {p.p_qty - p.p_qtySold > 0 ? "Available" : "Not Avaible"}
                    </td>
                    <td className="d-flex justify-content-around">
                      <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModals"
                        onClick={() => {
                          getProduct(p._id);
                        }}
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          removeProduct(p._id);
                        }}
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </>
              );
            })
          ) : (
            <td colSpan="10" className="text-center">
              product list is Empty
            </td>
          )}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                  <div>
                    <div class="mb-3">
                      <label for="formFile" class="form-label">
                        Product Image
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        id="formFile"
                        onChange={handleImg}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Product Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={p_name}
                        onChange={onChangePname}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Product Qty</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={p_qty}
                        onChange={onChangePqty}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Product Sold Qty</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={p_qtySold}
                        onChange={onChangePsold}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Product Category</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={p_category}
                        onChange={onChangePcategory}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Product Price</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={p_price}
                        onChange={onChangePprice}
                      />
                    </div>

                    <div className="form-group mt-4">
                      <button className="btn btn-primary btn-block">
                        Add product
                      </button>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModals"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Form onSubmit={handleUpdate} ref={form}>
                {!successful && (
                  <div>
                    <div class="mb-3">
                      <label for="formFile" class="form-label">
                        Product Images
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        id="formFile"
                        onChange={handleImg}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="p_name"
                        defaultValue={product.p_name}
                        onChange={(e) => {
                          const value=e.target.value;
                          setProductName(value);
                        }}


                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Product Qty</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        defaultValue={product.p_qty}
                        // onChange={onChangePqty}

                        onChange={(e) => {
                          const value=e.target.value;
                          setQty(value);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Product Sold Qty</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        defaultValue={product.p_qtySold}
                        // onChange={onChangePsold}


                        onChange={(e) => {
                          const value=e.target.value;
                          setQtySold(value);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Product Category</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        defaultValue={product.p_category}
                        // onChange={onChangePcategory}

                        onChange={(e) => {
                          const value=e.target.value;
                          setCategory(value);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Product Price</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        defaultValue={product.p_price}
                        onChange={onChangePprice}
                      />
                    </div>

                    <div className="form-group mt-4">
                      <button className="btn btn-primary btn-block"
                        data-bs-dismiss="modal">
                        update product
                      </button>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
