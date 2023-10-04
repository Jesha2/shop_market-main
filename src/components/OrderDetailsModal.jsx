import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderDetailsModal.css"; // Import your CSS for styling

const OrderDetailsModal = ({ orderId, closeModal, orderDate }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Fetch order details based on orderId
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/orderDetails/${orderId}`);
        console.log(response.data)
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="order-details-modal">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
        <h2>Order Details</h2>
        {orderDetails ? (
          <div>
            <p>Order ID: {orderId}</p>
            <p>Order Date: {orderDate}</p>
            <p>Status: {orderDetails[0].order.status}</p>
            <p>Total Amount: ${orderDetails[0].order.total}</p>
            <h3>Products:</h3>
            <ul>
              {orderDetails.map((detail) => (
                <li key={detail.id}>
                  <img src={detail.product.imageUrl} alt={detail.product.productName} />
                  <div className="product_details">
                          <p>{detail.product.productName}</p> 
                          <p>Quantity: {detail.quantity}</p>
                          <p>Price: ${detail.product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading order details...</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsModal;
