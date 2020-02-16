/*
 * @Author: your name
 * @Date: 2020-02-15 16:29:05
 * @LastEditTime: 2020-02-16 18:43:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /webpack-learning/src/mywebpack/src/index.js
 */
import squareArea from "./square.js";
import circleArea from "./circle.js";

import { createElement, render } from "preact";
import "./style.css";
export const PI = 3.141;

render(
  createElement(
    "p",
    {},
    createElement("p", { class: "square" }, "area of square: " + squareArea(5)),
    createElement("p", { class: "circle" }, "area of circle: " + circleArea(5))
  ),
  document.getElementById("root")
);
