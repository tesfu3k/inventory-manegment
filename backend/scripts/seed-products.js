// scripts/seed-products.js
import mongoose from "mongoose";
import { productModel } from "../src/models/product.model.js"; // adjust path if needed
import dotenv from "dotenv";
dotenv.config();

// ---------------- 1) Base products ----------------
const baseProducts = [
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with USB receiver",
    unitPrice: 350,
    category: "Electronics",
    lowStockThreshed: 10,
    stockQuantity: 25,
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB backlit keyboard with blue switches",
    unitPrice: 1200,
    category: "Electronics",
    lowStockThreshed: 10,
    stockQuantity: 8,
  },
  {
    name: "USB-C Charger",
    description: "Fast charging USB-C 65W power adapter",
    unitPrice: 650,
    category: "Accessories",
    lowStockThreshed: 15,
    stockQuantity: 3,
  },
  {
    name: "Office Chair",
    description: "Adjustable office chair with lumbar support",
    unitPrice: 5200,
    category: "Furniture",
    lowStockThreshed: 5,
    stockQuantity: 12,
  },
  {
    name: "Notebook A5",
    description: "A5 size ruled notebook (100 pages)",
    unitPrice: 45,
    category: "Stationery",
    lowStockThreshed: 20,
    stockQuantity: 60,
  },
  {
    name: "Desk Lamp",
    description: "LED desk lamp with brightness control",
    unitPrice: 850,
    category: "Electronics",
    lowStockThreshed: 8,
    stockQuantity: 5,
  },
];

// ---------------- 2) Random product generation ----------------
const categories = [
  "Electronics",
  "Furniture",
  "Accessories",
  "Stationery",
  "Home Appliance",
  "Tools",
  "Sports",
  "Toys",
  "Groceries",
  "Clothing",
];

const adjectives = [
  "Smart",
  "Compact",
  "Durable",
  "Premium",
  "Eco-Friendly",
  "Portable",
  "Wireless",
  "Waterproof",
  "Rechargeable",
  "Foldable",
];

const productNames = [
  "Speaker",
  "Headphones",
  "Watch",
  "Fan",
  "Blender",
  "Power Bank",
  "Vacuum Cleaner",
  "Drill",
  "Bag",
  "Shoes",
];

// 👇 Generate 194 random products (for total = 200)
for (let i = 0; i < 194; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const item = productNames[Math.floor(Math.random() * productNames.length)];

  const name = `${adjective} ${item}`;
  const description = `${adjective} ${item} in ${category} category`;
  const unitPrice = Math.floor(100 + Math.random() * 5000);
  const lowStockThreshed = Math.floor(5 + Math.random() * 20);
  const stockQuantity = Math.floor(Math.random() * 60);

  baseProducts.push({
    name,
    description,
    unitPrice,
    category,
    lowStockThreshed,
    stockQuantity,
  });
}

// ---------------- 3) Helpers ----------------
function normalizeText(value) {
  if (!value || typeof value !== "string") return "";
  return value.trim();
}

function toProductDoc(raw) {
  return {
    name: normalizeText(raw.name),
    description: normalizeText(raw.description),
    unitPrice: Number(raw.unitPrice) || 0,
    category: normalizeText(raw.category),
    lowStockThreshed: Number(raw.lowStockThreshed) || 10,
    stockQuantity: Number(raw.stockQuantity) || 0,
  };
}

// ---------------- 4) Main seeding logic ----------------
async function run() {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    console.error("❌ MONGO_URL not set. Please add it in your .env file.");
    process.exit(1);
  }

  await mongoose.connect(uri, {});
  await productModel.init();

  if (process.env.RESET === "true") {
    const del = await productModel.deleteMany({});
    console.log(`🧹 Cleared products: ${del.deletedCount}`);
  }

  const docs = baseProducts.map(toProductDoc);
  const overwrite = process.env.OVERWRITE === "true";

  const ops = docs.map((doc) =>
    overwrite
      ? {
          updateOne: {
            filter: { name: doc.name },
            update: { $set: doc },
            upsert: true,
          },
        }
      : {
          updateOne: {
            filter: { name: doc.name },
            update: { $setOnInsert: doc },
            upsert: true,
          },
        }
  );

  const result = await productModel.bulkWrite(ops, { ordered: false });
  console.log("✅ Product seeding complete:");
  console.log(`  Total inserted/upserted: ${baseProducts.length} products`);
  console.log(
    `  Upserted: ${result.upsertedCount ?? 0}, Matched: ${
      result.matchedCount ?? 0
    }`
  );

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(async (err) => {
  console.error("❌ Seeding error:", err?.message || err);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
