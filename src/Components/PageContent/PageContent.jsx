import React, { useState } from "react";
import style from "./PageContent.module.scss";
import { gql, useMutation, useQuery } from "@apollo/client";
import Joi from "joi";

export default function PageContent() {
  
  const getCategory = gql`
    query Categories {
      getAllCategory {
        _id
        name
      }
      getAllProducts {
        _id
        title
        price
        description
        quantity
        categoryId {
          _id
          name
        }
      }
    }
  `;


  const productAction = gql`
    mutation Actions(
      $title: String!
      $price: Float!
      $description: String
      $quantity: Int!
      $categoryId: ID!
    ) {
      addproduct(
        title: $title
        price: $price
        description: $description
        categoryId: $categoryId
        quantity: $quantity
      ) {
        title
        price
        description
        quantity
        categoryId {
          _id
          name
        }
      }
    }
  `;

  const deleteActions = gql`
    mutation productRemove($_id: ID!) {
      deleteProduct(_id: $_id) {
        _id
      }
    }
  `;
  let { data } = useQuery(getCategory);
  let [addproduct] = useMutation(productAction);
  let [remove] = useMutation(deleteActions);
console.log(data);
  const [productData, setproductData] = useState({
    title: "",
    quantity: "",
    price: "",
    categoryId: "",
    description: "",
  });
  const [errorList, setErrorList] = useState([]);
     // joi validation
     let validationForm = () => {
      let schema = Joi.object({
        title: Joi.string().required().min(3),
        quantity:Joi.number().required(),
        price:Joi.number().required(),
        description: Joi.string().required().min(5).max(300),
        categoryId:Joi.string().required().min(24).max(24)
      });
      return schema.validate(productData, { abortEarly: false });
    };
  const changeHandler = (e) => {
    let myForm = { ...productData };
    e.target.type === "number"
      ? (myForm[e.target.name] = +e.target.value)
      : (myForm[e.target.name] = e.target.value);
    setproductData(myForm);
  };
  function sendData() {
    let validateResponse = validationForm();
    if (validateResponse.error) {
      setErrorList(validateResponse.error.details);
    } else {
      addproduct({
        variables: { ...productData },
        refetchQueries: [{ query: getCategory }],
      })
      setproductData({
        title: "",
        quantity: "",
        price: "",
        categoryId: "",
        description: "",
      })
    }
  }

const showErrorMessage =(err)=>{
let message = errorList.filter((error)=>error.message.includes(err))
if (message[0] !== undefined) {
  return <span className={`${style.msgAlert} alert alert-danger p-1`}>{message[0].message}</span>;
} else {
  return "";
}
}

  return (
    <div className={`${style.main}`}>
      <div className="container">
        <div className={`${style.mainHead}`}>
          <h3>Products</h3>

          {/* add modal */}
          <div className={`${style.myModal}`}>
            <button
              type="button"
              className={`${style.myBtn} btn btn-primary`}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add New Product
            </button>
            <div
              className={`${style.mainModal} modal fade`}
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className={`${style.contentModal} modal-content`}>
                  <div className={`${style.headerModal} modal-header`}>
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Add Product
                    </h1>
                    <button
                      type="button"
                      className={`${style.closeModal} btn-close`}
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className={`${style.bodyModal} modal-body`}>
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className={`${style.inputData}`}>
                            <input
                              type="text"
                              name="title"
                              className={`${style.inputForm} form-control`}
                              placeholder="Product Name"
                              onChange={changeHandler}
                              value={productData.title}
                            />
                          </div>
                          {showErrorMessage("title")}
                        </div>

                        <div className="col-md-6">
                          <div className={`${style.inputData}  `}>
                            <input
                              type="number"
                              name="quantity"
                              className={`${style.inputForm} form-control`}
                              placeholder="Quantity"
                              onChange={changeHandler}
                              value={productData.quantity}
                            />
                          </div>
                          {showErrorMessage("quantity")}
                        </div>
                        <div className="col-md-12">
                          <div className={`${style.inputData}  `}>
                            <input
                              type="number"
                              name="price"
                              className={`${style.inputForm} form-control my-3`}
                              placeholder="Price"
                              onChange={changeHandler}
                              value={productData.price}
                            />
                          </div>
                          {showErrorMessage("price")}

                          <div className={`${style.inputData}  `}>
                            <select
                              className={`${style.inputForm} form-select`}
                              onChange={changeHandler}
                              name="categoryId"
                              value={productData.categoryId}
                            >
                              <option defaultValue>Select Category</option>
                              {data?.getAllCategory?.map((item) => (
                                <option value={item._id} key={item._id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {showErrorMessage("categoryId")}
                          <div className={`${style.inputData}`}>
                            <textarea
                              name="description"
                              cols="30"
                              rows="8"
                              className={`${style.inputForm} form-control my-3`}
                              placeholder="Description"
                              onChange={changeHandler}
                              value={productData.description}
                            ></textarea>
                          </div>
                          {showErrorMessage("description")}
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className={`${style.modalFooter} modal-footer`}>
                    <button
                      type="button"
                      className={`${style.btnTwo} btn btn-primary`}
                      onClick={sendData}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* table */}
        <div className={`${style.mainBody} my-5`}>
          <table className="table">
            <thead>
              <tr>
                <td>index</td>
                <td>Title</td>
                <td>Price</td>
                <td>Category</td>
                <td>Quantity</td>
                <td>Description</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody className={`${style.tableBody}`}>
              {data?.getAllProducts?.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.categoryId.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      type="button"
                      className={`${style.btnOne} btn btn-danger mx-4`}
                      onClick={() =>
                        remove({
                          variables: { _id: product._id },
                          refetchQueries: [{ query: getCategory }],
                        })
                      }
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
