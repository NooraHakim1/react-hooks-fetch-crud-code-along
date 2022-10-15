import React from "react";

function Item({ item, onUpdateItem, onItemDelete }) {

function handleAddToCartClick() {
  fetch(`http://localhost:4000/items/${item.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isInCart: !item.isInCart,
    }),
  })
  .then(r => r.json())
  .then(updatedItem => onUpdateItem(updatedItem))
}

function handleDelete() {
  fetch(`http://localhost:4000/items/${item.id}`, {
    method: "DELETE",
  })
  .then(r => r.json())
  .then(() => onItemDelete(item))
}

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDelete} className="remove">Delete</button>
    </li>
  );
}

export default Item;