import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCart, updateQuantity } from "../../redux/slice/CartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart?.cart || []);
  const dispatch = useDispatch();
  console.log("Cart items:", cart);

  const handleQuantityChange = (product_id, value) => {
    const quantity = Number(value);
    if (quantity > 0) {
      dispatch(updateQuantity({ product_id, quantity }));
    }
  };

  const handleRemove = (product_id) => {
    dispatch(removeCart({ product_id }));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="lg:mx-24 my-4">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.product_id}
              className="flex items-center bg-white shadow rounded p-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain mr-4"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-customRed font-bold">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  <label className="mr-2">Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.product_id, e.target.value)
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                </div>
              </div>
              <button
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => handleRemove(item.product_id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right font-bold text-xl mt-4">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
