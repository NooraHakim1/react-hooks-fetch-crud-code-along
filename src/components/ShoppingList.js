import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then(r => r.json())
    .then(data => setItems(data))
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleCart(updatedItem) {
    const updatedItems = items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    })
    setItems(updatedItems)
  }

  function handleItemDelete(deletedItem) {
    const updatedItems = items.filter(item => item.id !== deletedItem.id);
    setItems(updatedItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item onItemDelete={handleItemDelete} onUpdateItem={handleCart} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;