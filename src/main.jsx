import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import NewHeroSection from "./components/Pages/Carousal/NewHeroSection";
import ProductList from "./components/Product/ProductList";
import ProductDetails from "./components/Product/ProductDetails";
import WishList from "./components/Product/WishList";

const AppLayout = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Header />
      <Outlet />
      <Footer />
    </PersistGate>
  </Provider>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <NewHeroSection /> },
      { path: "/product/filter", element: <ProductList /> },
      { path: "/product/details/:product_id", element: <ProductDetails /> },
      { path: "/product/wishlist", element: <WishList /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
