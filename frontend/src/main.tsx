import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

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
import ProfilePage from "./pages/profilePage/ProfilePage.tsx";
import PrivateRoot from "./components/privateRoot/PrivateRoot.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomePage />} />
      <Route path="/page/:pageNumber" element={<HomePage />} />
      <Route path="/search/:search/page/:pageNumber" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/order/:id" element={<OrderPage />} />

      <Route path="/" element={<PrivateRoot />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
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
    </HelmetProvider>
  </React.StrictMode>
);
