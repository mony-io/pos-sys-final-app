import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Category from "./pages/Category";
import Sale from "./pages/Sale";
import AddProduct from "./pages/products/AddProduct";
import ListProduct from "./pages/products/ListProduct";
import ProductUnit from "./pages/products/ProductUnit";
import AddCustomer from "./components/customers/AddCustomer";
import ListCustomer from "./components/customers/ListCustomer";
import ProductBrands from "./pages/products/ProductBrands";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PrivateRoutes from "./utls/PrivateRoutes";
import PublicRoute from "./utls/PublicRoute";
import ResetPassword from "./components/login/ResetPassword";
import NewPassword from "./pages/NewPassword";
import AddUser from "./pages/users/AddUser";
import ListUsers from "./pages/users/ListUsers";
import { AuthProvider } from "./utls/auth";

//import RequireAuth from "./components/RequireAuth";
function App() {
  return (
    <AuthProvider>
      <div className="flex selection:bg-[#3333331e]">
        <Sidebar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/dashboard" element={<Home />} /> */}
            <Route path="/category" element={<Category />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/productunit" element={<ProductUnit />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/listproduct" element={<ListProduct />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/listuser" element={<ListUsers />} />
            <Route path="/addcustomer" element={<AddCustomer />} />
            <Route path="/listcustomer" element={<ListCustomer />} />
            <Route path="/product-brands" element={<ProductBrands />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Route>
          <Route
            path="/forgotpassword/:id/:token"
            element={<NewPassword />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
