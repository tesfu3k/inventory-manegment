export const employeeColumns = [
  {
    key: "select",
    label: "",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
  }, // for checkbox column
  {
    key: "employee",
    label: "Employee",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
  },
  {
    key: "position",
    label: "Position",
    className:
      " px-4 py-2 text-left font-medium uppercase tracking-wider hidden md:table-cell ",
  },
  {
    key: "department",
    label: "Department",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden lg:table-cell",
  },
  {
    key: "contact",
    label: "Contact",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden xl:table-cell",
  },
  {
    key: "salary",
    label: "Salary",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden 2xl:table-cell",
  },
  {
    key: "status",
    label: "Status",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden 2xl:table-cell",
  },
  {
    key: "actions",
    label: "Actions",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
  },
];

export const employeeData = [
  {
    id: 1,
    name: "Abebe Bekele",
    position: "Senior Developer",
    department: "Engineering",
    phone: "+251 911 123 456",
    email: "abebe.bekele@company.et",
    salary: 95000, // in ETB
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Mekdes Alemu",
    position: "Product Manager",
    department: "Product",
    phone: "+251 922 234 567",
    email: "mekdes.alemu@company.et",
    salary: 110000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Samuel Tadesse",
    position: "UX Designer",
    department: "Design",
    phone: "+251 933 345 678",
    email: "samuel.tadesse@company.et",
    salary: 78000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15f?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Hanna Getachew",
    position: "DevOps Engineer",
    department: "Engineering",
    phone: "+251 944 456 789",
    email: "hanna.getachew@company.et",
    salary: 88000,
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Saron Fikre",
    position: "HR Manager",
    department: "Human Resources",
    phone: "+251 955 567 890",
    email: "saron.fikre@company.et",
    salary: 85000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Yonas Gebremariam",
    position: "Marketing Specialist",
    department: "Marketing",
    phone: "+251 966 678 901",
    email: "yonas.gebremariam@company.et",
    salary: 65000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "Selamawit Dawit",
    position: "Finance Director",
    department: "Finance",
    phone: "+251 977 789 012",
    email: "selamawit.dawit@company.et",
    salary: 125000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 8,
    name: "Bereket Tesfaye",
    position: "Junior Developer",
    department: "Engineering",
    phone: "+251 988 890 123",
    email: "bereket.tesfaye@company.et",
    salary: 70000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
  },
];

export const productColumns = [
  {
    key: "select",
    label: "",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
  },
  {
    key: "product",
    label: "Product",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
  },
  {
    key: "category",
    label: "Category",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden md:table-cell",
  },
  {
    key: "supplier",
    label: "Supplier",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden lg:table-cell",
  },
  {
    key: "price",
    label: "Price (ETB)",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden xl:table-cell",
  },
  {
    key: "stock",
    label: "Stock",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden xl:table-cell",
  },
  {
    key: "status",
    label: "Status",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden 2xl:table-cell",
  },
  {
    key: "actions",
    label: "Actions",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
  },
];

export const productData = [
  {
    id: 1,
    name: "Dell XPS 13 Laptop",
    category: "Electronics",
    supplier: "TechStore Addis",
    price: 95000,
    stock: 12,
    status: "In Stock",
    image:
      "https://images.unsplash.com/photo-1587202372775-98927f6d08e0?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: 2,
    name: "Office Chair Ergonomic",
    category: "Furniture",
    supplier: "Habesha Office Supply",
    price: 12500,
    stock: 8,
    status: "Low Stock",
    image:
      "https://images.unsplash.com/photo-1628744875121-7c0e6b0d38d5?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: 3,
    name: "Samsung Galaxy S23",
    category: "Electronics",
    supplier: "Ethio Mobile",
    price: 78000,
    stock: 25,
    status: "In Stock",
    image:
      "https://images.unsplash.com/photo-1676036575945-78a709bcd33a?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: 4,
    name: "Printer HP LaserJet Pro",
    category: "Office Equipment",
    supplier: "Bole Tech Supply",
    price: 35000,
    stock: 4,
    status: "Low Stock",
    image:
      "https://images.unsplash.com/photo-1610465299994-3c09a1e237c4?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: 5,
    name: "Wooden Desk 120cm",
    category: "Furniture",
    supplier: "Furniture Hub Ethiopia",
    price: 18500,
    stock: 0,
    status: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1616627563235-d09bfb9fbc7b?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: 6,
    name: "LED Monitor 24-inch",
    category: "Electronics",
    supplier: "Addis PC World",
    price: 14500,
    stock: 30,
    status: "In Stock",
    image:
      "https://images.unsplash.com/photo-1587202372731-fd75c5c7e64b?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: 7,
    name: "Whiteboard 90x120cm",
    category: "Office Supplies",
    supplier: "EduMart Ethiopia",
    price: 3200,
    stock: 15,
    status: "In Stock",
    image:
      "https://images.unsplash.com/photo-1616627452424-b64b6d56a7d7?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: 8,
    name: "Canon DSLR Camera",
    category: "Electronics",
    supplier: "PhotoPro Addis",
    price: 105000,
    stock: 6,
    status: "Low Stock",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=150&h=150&fit=crop&crop=center",
  },
];
