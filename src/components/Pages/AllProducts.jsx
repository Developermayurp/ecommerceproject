import React, { useState, useEffect } from "react";
import { getAllCategories, getAllProducts } from "../http/getAPI";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addWishlist, deleteWishlist } from "../redux/slice/WishlistSlice";
import { addCart } from "../../redux/slice/CartSlice";

function AllProducts() {
  // Track wishlist status for individual products using a Set
  const [wishlist, setWishlist] = useState(new Set());
  const dispatch = useDispatch();

  // Local state for categories and products
  const [productCategory, setProductCategory] = useState([]);
  const [productCategoryIsLoading, setProductCategoryIsLoading] =
    useState(true);
  const [productData, setProductData] = useState([]);
  const [productDataIsLoading, setProductDataIsLoading] = useState(true);

  useEffect(() => {
    setProductCategoryIsLoading(true);
    getAllCategories()
      .then((res) => {
        setProductCategory(res?.data || []);
      })
      .finally(() => setProductCategoryIsLoading(false));
  }, []);

  useEffect(() => {
    setProductDataIsLoading(true);
    getAllProducts()
      .then((res) => {
        setProductData(res?.data || []);
      })
      .finally(() => setProductDataIsLoading(false));
  }, []);

  const handleWishlist = (product, product_id, e) => {
    e.stopPropagation(); // Prevent navigation when clicking the wishlist icon
    setWishlist((prevWishlist) => {
      const updatedWishlist = new Set(prevWishlist);
      if (updatedWishlist.has(product_id)) {
        updatedWishlist.delete(product_id);
        dispatch(deleteWishlist({ product_id }));
      } else {
        updatedWishlist.add(product_id);
        dispatch(addWishlist({ product, product_id }));
      }
      return updatedWishlist;
    });
  };

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);

    dispatch(addCart({ product, product_id: product.id, quantity: 1 }));
  };

  return (
    <div className="lg:mx-24 my-2">
      <div className="flex justify-evenly bg-gray-200 mb-4">
        {productCategoryIsLoading ? (
          <p>Loading categories...</p>
        ) : (
          productCategory?.map((category) => (
            <Link to={`/product/filter?categories=${category}`} key={category}>
              <p className="text-lg p-1 lg:p-3 cursor-pointer">{category}</p>
            </Link>
          ))
        )}
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        {productDataIsLoading ? (
          <p>Loading products...</p>
        ) : (
          productData?.map((product) => (
            <div
              key={product.id}
              className="rounded-lg overflow-hidden transform transition-all duration-300 bg-white shadow-lg relative"
            >
              <div className="absolute top-2 right-2">
                <button onClick={(e) => handleWishlist(product, product.id, e)}>
                  {wishlist.has(product.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>

              <Link to={`/product/details/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="lg:mx-3 mt-3 lg:w-56 lg:h-56 object-contain transition-transform duration-300"
                />
                <p className="text-md mx-2">
                  {product.title.length > 30
                    ? product.title.substring(0, 30) + "..."
                    : product.title}
                </p>
              </Link>

              <div className="justify-center mx-2">
                <p className="mb-2 text-2xl space-x-2 text-customRed font-bold">
                  <span>{`$${product.price.toFixed(2)}`}</span>
                </p>
                <button
                  className="bg-customRed text-white px-4 py-1 rounded bg-red-700 hover:bg-red-700 transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllProducts;
