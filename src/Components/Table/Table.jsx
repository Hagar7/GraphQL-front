import React from 'react'
import style from './Table.module.scss'

export default function Table({products,deleteProduct}) {




  return (
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
          <td>Action</td>
        </tr>
      </thead>
      <tbody className={`${style.tableBody}`}>
        {products?.map((product, index) => (
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
                onClick={()=>deleteProduct()}
              >
                <i className="fa fa-trash"></i>
              </button>
              <button
                type="button"
                className={`${style.btnOne} btn btn-danger mx-4`}
              >
                 <i className="fa fa-edit"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
