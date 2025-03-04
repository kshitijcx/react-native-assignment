import React, { createContext, useState, ReactNode } from "react";

interface Item {
  id: string;
  name: string;
  rocketName: string;
  date: string;
  success: string;
}

interface MyContextType {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
}

export const FavContext = createContext<MyContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

const FavContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <FavContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </FavContext.Provider>
  );
};
export default FavContextProvider;
