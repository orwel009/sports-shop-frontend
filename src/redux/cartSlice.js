import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if available
const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalAmount: JSON.parse(localStorage.getItem("totalAmount")) || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(i => i._id === item._id);

      if (existItem) {
        existItem.quantity = (existItem.quantity || 1) + 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      state.totalAmount = state.cartItems.reduce(
        (acc, curr) => acc + curr.price * (curr.quantity || 1),
        0
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
      state.totalAmount = state.cartItems.reduce(
        (acc, curr) => acc + curr.price * (curr.quantity || 1),
        0
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalAmount");
    },

    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.cartItems.find(i => i._id === _id);
      if (item) {
        item.quantity = quantity;
        state.totalAmount = state.cartItems.reduce(
          (acc, curr) => acc + curr.price * (curr.quantity || 1),
          0
        );

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;