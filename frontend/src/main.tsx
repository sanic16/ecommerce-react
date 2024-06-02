import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import HomePage from "./pages/homePage/HomePage.tsx";
import store from "./store/store.ts";
import LoginPage from "./pages/loginPage/Login.tsx";
import RegisterPage from "./pages/registerPage/RegisterPage.tsx";
import ProductPage from "./pages/productPage/ProductPage.tsx";
import CartPage from "./pages/cartPage/CartPage.tsx";
import ShippingPage from "./pages/shippingPage/ShippingPage.tsx";
import PaymentPage from "./pages/paymentPage/PaymentPage.tsx";
import PlaceOrder from "./pages/placeOrder/PlaceOrder.tsx";
import OrderPage from "./pages/orderPage/OrderPage.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/shipping" element={<ShippingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/order/:id" element={<OrderPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider
        deferLoading={true}
        options={{
          currency: "USD",
          clientId:
            "AZC524MOkkDcqS8mBmzHCGR1zwQFVGiyyR8QkgGFHIwFTI3ISBBe53LRpiyQBVvpw6mgMrYmWWO8iIv0",
        }}
      >
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
