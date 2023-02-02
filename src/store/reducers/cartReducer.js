import { createSlice } from "@reduxjs/toolkit";
const cartData = localStorage.getItem("cart");
const cartArray = cartData ? JSON.parse(cartData) : [];
function allItems(data) {
  let items = 0;
  for (let i = 0; i < data.length; i++) {
    items += data[i].qty;
  }
  return items;
}
function calcuateTotal(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i].price * data[i].qty;
  }
  return total;
}
const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: cartArray.length > 0 ? cartArray : [],
    items: cartArray.length > 0 ? allItems(cartArray) : 0,
    total: cartArray.length > 0 ? calcuateTotal(cartArray) : 0,
  },
  reducers: {
    addCart: (state, { payload }) => {
      state.cart.push(payload);
      state.items += payload.qty;
      state.total +=payload.price * payload.qty;
    },
    incQuantity: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find) {
        find.qty += 1;
        state.items += 1;
        state.total += find.price;
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decQuantity: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find && find.qty > 1) {
        find.qty -= 1;
        state.items -= 1;
        state.total -= find.price;
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeItem: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find) {
        const index = state.cart.indexOf(find);
        state.items -= find.qty;
        state.total -= find.price* find.qty;
        state.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    emptyCart: (state) => {
      state.cart = [];
      state.items = 0;
      state.total = 0;
    },
  },
});
export const { addCart,removeItem, incQuantity,decQuantity, emptyCart } =
  cartReducer.actions;
export default cartReducer.reducer;
