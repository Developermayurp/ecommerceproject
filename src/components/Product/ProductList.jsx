import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getCategory, getProductsBySearch } from "../http/getAPI";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/slice/CartSlice";

function ProductList() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("categories");
  const search = searchParams.get("search");

  const [productCategory, setProductCategory] = useState(null);
  const [productCategoryIsLoading, setProductCategoryIsLoading] =
    useState(true);
  const [productSearch, setProductSearch] = useState(null);
  const [productSearchIsLoading, setProductSearchIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      setProductCategoryIsLoading(true);
      getCategory(category)
        .then((res) => setProductCategory(res))
        .finally(() => setProductCategoryIsLoading(false));
    }
  }, [category]);

  useEffect(() => {
    if (search) {
      setProductSearchIsLoading(true);
      getProductsBySearch(search)
        .then((res) => setProductSearch(res))
        .finally(() => setProductSearchIsLoading(false));
    }
  }, [search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Choose products to display
  const products =
    productCategory?.data?.length > 0
      ? productCategory.data
      : productSearch || [];

  const handleAddToCart = (product) => {
    dispatch(addCart({ product, product_id: product.id, quantity: 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full p-4">
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <Link to={`/product/details/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain p-4"
                />
                <div className="p-4">
                  <h3 className="text-md font-semibold">
                    {product.title.length > 30
                      ? product.title.substring(0, 30) + "..."
                      : product.title}
                  </h3>
                  <p className="text-xl text-red-500 font-bold mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Rating: {product.rating.rate} / 5
                  </p>
                </div>
              </Link>
              <button
                className="bg-customRed text-white px-4 py-2 m-4 rounded bg-red-700 hover:bg-red-700 transition-colors"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
