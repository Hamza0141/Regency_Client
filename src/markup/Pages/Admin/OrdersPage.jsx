import React from "react";
// Import the auth hook
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component
import LoginForm from "../../components/LoginForm/LoginForm";
// Import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
// Import the Service component
import Orders from "../../components/Admin/Orders/Orders";

function OrdersPage() {
   const { isLogged, isAdmin } = useAuth();

   if (isLogged) {
     return (
       <div>
         <div className="container-fluid admin-pages">
           <div className="row">
             <div className="col-md-3 admin-left-side">
               <AdminMenu />
             </div>
             <div className="col-md-9 admin-right-side">
               <Orders />
             </div>
           </div>
         </div>
       </div>
     );
   } else {
     return (
       <div>
         <LoginForm />
       </div>
     );
   }
}

export default OrdersPage;
