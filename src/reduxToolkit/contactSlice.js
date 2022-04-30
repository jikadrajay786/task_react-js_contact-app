import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
  },
  reducers: {
    addContact: (state, action) => {
      if (action.payload.data === null) {
        return undefined;
      } else if (action.payload.type === "localStorage") {
        state.contacts = [...state.contacts, ...action.payload.data];
      } else if (action.payload.type === "import") {
        state.contacts = [...state.contacts, ...action.payload.data];
      } else {
        state.contacts = [...state.contacts, action.payload.data];
      }
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (element) => element.userId !== action.payload
      );
    },
    updateContact: (state, action) => {
      state.contacts = state.contacts.map((el) =>
        el.userId === action.payload.id ? action.payload.data : el
      );
    },
  },
});

export const { addContact, deleteContact, updateContact } = contactSlice.actions;
export default contactSlice.reducer;
