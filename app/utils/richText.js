import React from "react";

export function renderRichText(node, key = 0) {

  if (!node) return null;

  if (node.type === "root") {
    return node.children.map((child, i) => renderRichText(child, i));
  }

  if (node.type === "paragraph") {
    return React.createElement(
      "span",
      { key },
      node.children.map((child, i) => renderRichText(child, i))
    );
  }

  if (node.type === "text") {

    if (node.bold) {
      return React.createElement("strong", { key }, node.value);
    }

    return React.createElement("span", { key }, node.value);
  }

  return null;
}