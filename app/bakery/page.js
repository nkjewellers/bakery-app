"use client";
import { useState } from "react";

export default function Bakery() {
  const [items, setItems] = useState([]);
  const [extra, setExtra] = useState({
    electricity: 0,
    gas: 0,
    labour: 0,
    misc: 0,
  });

  const addItem = () => {
    setItems([
      ...items,
      {
        name: "",
        purchaseQty: 1,
        unit: "gm",
        price: 0,
        usedQty: 0,
        usedUnit: "gm",
        cost: 0,
      },
    ]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    const item = newItems[index];

    let purchaseQty = Number(item.purchaseQty);
    let usedQty = Number(item.usedQty);

    if (item.unit === "kg") purchaseQty *= 1000;
    if (item.unit === "ltr") purchaseQty *= 1000;

    if (item.usedUnit === "kg") usedQty *= 1000;
    if (item.usedUnit === "ltr") usedQty *= 1000;

    if (purchaseQty > 0 && item.price > 0 && usedQty > 0) {
      item.cost = (item.price / purchaseQty) * usedQty;
    } else {
      item.cost = 0;
    }

    setItems(newItems);
  };

  const totalCost =
    items.reduce((sum, i) => sum + (i.cost || 0), 0) +
    Number(extra.electricity || 0) +
    Number(extra.gas || 0) +
    Number(extra.labour || 0) +
    Number(extra.misc || 0);

  return (
    <div style={{ padding: 15, fontFamily: "Arial", maxWidth: 500, margin: "auto" }}>

      {/* LOGO */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <img src="/bakery-logo.png" style={{ height: 120 }} />
      </div>

      <h1 style={{ textAlign: "center", fontSize: 22 }}>🍰 Bakery Cost Calculator</h1>

      <div style={{ marginBottom: 20 }}>
        <button
          onClick={addItem}
          style={{
            padding: "14px",
            background: "#8B4513",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            width: "100%",
            fontSize: 16,
          }}
        >
          + Add Ingredient
        </button>
      </div>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 12,
            marginBottom: 15,
            background: "#fff8f0",
          }}
        >
          {/* Item Name */}
          <input
            placeholder="Item Name"
            onChange={(e) => updateItem(i, "name", e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 8, marginBottom: 10 }}
          />

          {/* Purchase */}
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <input
              placeholder="Purchase Qty"
              type="number"
              onChange={(e) => updateItem(i, "purchaseQty", e.target.value)}
              style={{ flex: 1, padding: 10, borderRadius: 8 }}
            />

            <select
              onChange={(e) => updateItem(i, "unit", e.target.value)}
              style={{ flex: 1, padding: 10, borderRadius: 8 }}
            >
              <option value="gm">gm</option>
              <option value="kg">kg</option>
              <option value="ml">ml</option>
              <option value="ltr">ltr</option>
              <option value="pcs">pcs</option>
            </select>
          </div>

          {/* Price */}
          <input
            placeholder="Price ₹"
            type="number"
            onChange={(e) => updateItem(i, "price", e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 8, marginBottom: 10 }}
          />

          {/* Used */}
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <input
              placeholder="Used Qty"
              type="number"
              onChange={(e) => updateItem(i, "usedQty", e.target.value)}
              style={{ flex: 1, padding: 10, borderRadius: 8 }}
            />

            <select
              onChange={(e) => updateItem(i, "usedUnit", e.target.value)}
              style={{ flex: 1, padding: 10, borderRadius: 8 }}
            >
              <option value="gm">gm</option>
              <option value="kg">kg</option>
              <option value="ml">ml</option>
              <option value="ltr">ltr</option>
              <option value="pcs">pcs</option>
            </select>
          </div>

          <p style={{ fontWeight: "bold" }}>
            Cost: ₹ {item.cost.toFixed(2)}
          </p>
        </div>
      ))}

      <h3>Extra Costs</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input placeholder="Electricity" onChange={(e) => setExtra({ ...extra, electricity: e.target.value })} />
        <input placeholder="Gas" onChange={(e) => setExtra({ ...extra, gas: e.target.value })} />
        <input placeholder="Labour" onChange={(e) => setExtra({ ...extra, labour: e.target.value })} />
        <input placeholder="Misc" onChange={(e) => setExtra({ ...extra, misc: e.target.value })} />
      </div>

      <h2 style={{ marginTop: 20 }}>
        Total Cost: ₹ {totalCost.toFixed(2)}
      </h2>
    </div>
  );
}