import { useState } from "react";

const CategorySelector = ({ onCategoryChange }) => {
  const [category, setCategory] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const productCategories = [
    "Electronics",
    "Clothing & Apparel",
    "Food & Beverages",
    "Home & Garden",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Toys & Games",
    "Books & Media",
    "Automotive",
    "Health & Wellness",
    "Jewelry & Accessories",
    "Office Supplies",
    "Pet Supplies",
    "Baby & Kids",
    "Furniture",
    "Tools & Hardware",
    "Arts & Crafts",
    "Music & Instruments",
    "Groceries",
    "Footwear",
    "Bags & Luggage",
    "Watches",
    "Computers & Tablets",
    "Mobile Phones & Accessories",
    "Camera & Photography",
    "Home Appliances",
    "Kitchen & Dining",
    "Bedding & Bath",
    "Garden & Outdoor",
    "Lighting",
    "Other",
  ];

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);

    if (value === "Other") {
      setShowCustomInput(true);
      onCategoryChange("");
    } else {
      setShowCustomInput(false);
      setCustomCategory("");
      onCategoryChange(value);
    }
  };

  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);
    onCategoryChange(e.target.value);
  };

  return (
    <div className="flex flex-col flex-1">
      <label className="text-md text-cyan-500 font-medium" htmlFor="category">
        Category <span className="text-red-500">*</span>
      </label>

      <select
        name="category"
        id="category"
        value={category}
        onChange={handleCategoryChange}
        className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
      >
        <option value="">Select category</option>
        {productCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {showCustomInput && (
        <input
          type="text"
          placeholder="Enter your custom category"
          value={customCategory}
          onChange={handleCustomCategoryChange}
          className="w-full mt-2 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20 placeholder:text-gray-400"
        />
      )}

      {/* Display selected value for demo purposes */}
      {/* {(category || customCategory) && (
        <div className="mt-3 text-sm text-gray-600">
          Selected:{" "}
          <span className="font-medium text-cyan-600">
            {showCustomInput && customCategory ? customCategory : category}
          </span>
        </div>
      )} */}
    </div>
  );
};

export default CategorySelector;
