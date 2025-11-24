import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
        state.total += item.price;
      } else {
        state.items.push(item);
        state.total += item.price;
      }
    },

    removeItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity -= 1;
        state.total -= item.price;

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== item.id);
        }
      }
    },
    removeAllItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        state.total -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((i) => i.id !== item.id);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, removeAllItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
