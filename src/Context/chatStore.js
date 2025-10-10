// zustand context 

import { create } from "zustand";

export const useChatStore = create((set) => ({
  messages: [],
  
  //add new mgs
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  
  // save the  history set (while loading the chat history from backend)
  setMessages: (messages) =>
    set({ messages }),
  
  // clear all the mgs
  clearMessages: () =>
    set({ messages: [] }),
}));


//here we make a function named it create and in this function we pass set as a parameter
//then we export a constant named it useChatStore and in this constant we call the create function
//inside the create function we return an object which contains messages array and addMessage function
//the addMessage function takes a message as a parameter and updates the messages array by adding the new message to the existing array using the set function provided by zustand



//when we click the send button the addMassage function  is called and then the new message is added to the messages array