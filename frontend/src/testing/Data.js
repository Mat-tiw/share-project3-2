import React from "react";
import ReactDOM, { render } from "react-dom";

let items = [
{
    title: "tic tac toe",
    id: 1,
},
{
    title: "bytes",
    id: 2,
},
];

export function getItems() {
return items;
}

export function getItem(id) {
    return items.find((item) => item.id === id);
}