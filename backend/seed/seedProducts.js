import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";

dotenv.config();

const data = [
  {
    bouquet_name: "Red Elegance",
    description: "12 red roses wrapped with white lace and a silk ribbon",
    price: 1200,
    quantity: 10,
    category: "Romance",
    product_image: "red_elegance.jpg",
    added_by: "ricartes"
  },
  {
    bouquet_name: "Sunshine Delight",
    description: "5 sunflowers with mixed greens and rustic burlap wrap",
    price: 950,
    quantity: 8,
    category: "Congratulations",
    product_image: "sunshine_delight.jpg",
    added_by: "ricartes"
  }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(data);
    console.log("✅ Seeded products");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
