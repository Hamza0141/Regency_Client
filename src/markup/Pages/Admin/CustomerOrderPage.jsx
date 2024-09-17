import React from "react";
import OrderDetail from "../../components/Admin/OrderDetail/OrderDetail";
import { useParams } from "react-router-dom";
function CustomerOrderPage() {
        const { hash } = useParams();
 return (
   <div>
     <div className="container-fluid admin-pages">
           <OrderDetail id={hash} />
     </div>
   </div>
 );
}

export default CustomerOrderPage;
