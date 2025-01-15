import React from "react";
import { Link } from "react-router-dom";

const Purchase: React.FC = () => {
  return (
    <div>
      <h1 className="font-semibold">Purchase Page</h1>
      <Link to="/purchase/purchase-order">Go to Purchase Order</Link>
    </div>
  );
};

export default Purchase;
