import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      console.log("Adding to cart:", state, action.payload);

      const { product, product_id, quantity } = action.payload;
      const existing = state.cart.find(
        (item) => item.product_id === product_id
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cart.push({ ...product, product_id, quantity });
      }
    },
    removeCart: (state, action) => {
      const { product_id } = action.payload;
      state.cart = state.cart.filter((item) => item.product_id !== product_id);
    },
    updateQuantity: (state, action) => {
      const { product_id, quantity } = action.payload;
      const item = state.cart.find((item) => item.product_id === product_id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addCart, removeCart, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
