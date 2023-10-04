// OrderCard.js

import React ,{useState} from "react";
//import { Link } from "react-router-dom";
import "./OrderCard.css"; 
import OrderDetailsModal from './OrderDetailsModal'

const formatOrderDate = (orderDate) => {
    const date = new Date(orderDate);
  
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
  
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  
    const formattedDate = `${month}/${day}/${year}`;
    const formattedTime = `${formattedHours}:${minutes} ${amOrPm}`;
  
    return `${formattedDate} at ${formattedTime}`;
  };
  
  

const OrderCard = ({ order }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const orderDate = formatOrderDate(order.orderDate);
  return (
    <div className="order-card">
      <h3>Order ID: {order.id}</h3>
      <button onClick={toggleModal} className="order-link">
        View Details
      </button>
      <p>Order Date: {orderDate}</p>
      <p>Status: {order.status}</p>
      <p>Total: ${order.total}</p>
      {isModalOpen && (
        <OrderDetailsModal
          orderId={order.id} orderDate={orderDate} // Pass the orderId prop to the modal
          closeModal={toggleModal}
        />
      )}
    </div>
  );
};

export default OrderCard;
