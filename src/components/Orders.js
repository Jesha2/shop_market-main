import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Orders.css";
import { useParams } from "react-router-dom";
import OrderCard from "./OrderCard"; 

const Orders = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const ordersPerPage = 10; // Number of orders per page

  useEffect(() => {
    // Fetch user's orders based on userId
    const getOrders = async () => {
      try {
        const response = await axios.get(`/orders/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrders();
  }, [userId]);

  // Calculate the orders to display on the current page
  const ordersToDisplay = orders.slice(
    pageNumber * ordersPerPage,
    (pageNumber + 1) * ordersPerPage
  );

  // Handle page change
  const handlePageChange = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };

  return (
    <div className="orders-container">
      <h2> Orders </h2>
      <div className="order-groups">
        {ordersToDisplay.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(orders.length / ordersPerPage)}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Orders;
