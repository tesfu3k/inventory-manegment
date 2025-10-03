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
    image: "/product.jpg",
  },
  {
    id: 2,
    name: "Office Chair Ergonomic",
    category: "Furniture",
    supplier: "Habesha Office Supply",
    price: 12500,
    stock: 8,
    status: "Low Stock",
    image: "/product.jpg",
  },
  {
    id: 3,
    name: "Samsung Galaxy S23",
    category: "Electronics",
    supplier: "Ethio Mobile",
    price: 78000,
    stock: 25,
    status: "In Stock",
    image: "/product.jpg",
  },
  {
    id: 4,
    name: "Printer HP LaserJet Pro",
    category: "Office Equipment",
    supplier: "Bole Tech Supply",
    price: 35000,
    stock: 4,
    status: "Low Stock",
    image: "/product.jpg",
  },
  {
    id: 5,
    name: "Wooden Desk 120cm",
    category: "Furniture",
    supplier: "Furniture Hub Ethiopia",
    price: 18500,
    stock: 0,
    status: "Out of Stock",
    image: "/product.jpg",
  },
  {
    id: 6,
    name: "LED Monitor 24-inch",
    category: "Electronics",
    supplier: "Addis PC World",
    price: 14500,
    stock: 30,
    status: "In Stock",
    image: "/product.jpg",
  },
  {
    id: 7,
    name: "Whiteboard 90x120cm",
    category: "Office Supplies",
    supplier: "EduMart Ethiopia",
    price: 3200,
    stock: 15,
    status: "In Stock",
    image: "/product.jpg",
  },
  {
    id: 8,
    name: "Canon DSLR Camera",
    category: "Electronics",
    supplier: "PhotoPro Addis",
    price: 105000,
    stock: 6,
    status: "Low Stock",
    image: "/product.jpg",
  },
];

// export const purchaseColumns = [
//   {
//     key: "select",
//     label: "",
//     className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
//   }, // checkbox column
//   {
//     key: "purchaseId",
//     label: "Purchase / Invoice #",
//     className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
//   },
//   {
//     key: "supplier",
//     label: "Supplier",
//     className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
//   },
//   {
//     key: "products",
//     label: "Product(s)",
//     className:
//       "px-4 py-2 text-left font-medium uppercase tracking-wider hidden md:table-cell",
//   },
//   {
//     key: "employee",
//     label: "Employee",
//     className:
//       "px-4 py-2 text-left font-medium uppercase tracking-wider hidden lg:table-cell",
//   },
//   {
//     key: "quantity",
//     label: "Qty",
//     className:
//       "px-4 py-2 text-left font-medium uppercase tracking-wider hidden xl:table-cell",
//   },
//   {
//     key: "total",
//     label: "Total (ETB)",
//     className:
//       "px-4 py-2 text-left font-medium uppercase tracking-wider hidden xl:table-cell",
//   },
//   {
//     key: "date",
//     label: "Date",
//     className:
//       "px-4 py-2 text-left font-medium uppercase tracking-wider hidden 2xl:table-cell",
//   },
//   {
//     key: "status",
//     label: "Status",
//     className:
//       "px-4 py-2 text-left font-medium uppercase tracking-wider hidden 2xl:table-cell",
//   },
//   {
//     key: "actions",
//     label: "Actions",
//     className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
//   },
// ];

export const purchaseColumns = [
  // always on
  {
    key: "select",
    label: "",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider w-10",
  },
  {
    key: "purchaseId",
    label: "Purchase / Invoice #",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider whitespace-nowrap",
  },
  {
    key: "supplier",
    label: "Supplier",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider whitespace-nowrap",
  },

  // md+
  {
    key: "products",
    label: "Product(s)",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden lg:table-cell whitespace-nowrap",
  },

  // xl+
  {
    key: "quantity",
    label: "Qty",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden xl:table-cell whitespace-nowrap",
  },
  {
    key: "total",
    label: "Total (ETB)",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden xl:table-cell whitespace-nowrap",
  },

  // 2xl+
  {
    key: "date",
    label: "Date",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden 2xl:table-cell whitespace-nowrap",
  },
  {
    key: "status",
    label: "Status",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden 2xl:table-cell whitespace-nowrap",
  },

  // always on
  {
    key: "actions",
    label: "Actions",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider whitespace-nowrap",
  },
];

export const purchaseData = [
  {
    id: 1,
    purchaseId: "PUR-2025-0001",
    supplier: "Addis Tech Supplies",
    products: "3 items (Laptop x2, Mouse x1)",
    quantity: 3,
    total: 158000, // ETB
    date: "2025-09-27",
    status: "Completed", // Pending | Completed | Cancelled
  },
  {
    id: 2,
    purchaseId: "PUR-2025-0002",
    supplier: "Ethio Office Mart",
    products: "2 items (Printer x1, Toner x3)",

    quantity: 4,
    total: 64500,
    date: "2025-09-28",
    status: "Pending",
  },
  {
    id: 3,
    purchaseId: "PUR-2025-0003",
    supplier: "Blue Nile Electronics",
    products: "4 items (Router x2, Switch x2)",

    quantity: 4,
    total: 48990,
    date: "2025-09-28",
    status: "Completed",
  },
  {
    id: 4,
    purchaseId: "PUR-2025-0004",
    supplier: "Habesha Stationery",
    products: "6 items (A4 Paper x5, Staplers x1)",

    quantity: 6,
    total: 12750,
    date: "2025-09-29",
    status: "Completed",
  },
  {
    id: 5,
    purchaseId: "PUR-2025-0005",
    supplier: "Zemen IT Parts",
    products: "2 items (SSD 1TB x2)",

    quantity: 2,
    total: 23000,
    date: "2025-09-29",
    status: "Pending",
  },
  {
    id: 6,
    purchaseId: "PUR-2025-0006",
    supplier: "Sheger Peripherals",
    products: "5 items (Keyboard x3, Mouse x2)",

    quantity: 5,
    total: 15750,
    date: "2025-09-30",
    status: "Completed",
  },
  {
    id: 7,
    purchaseId: "PUR-2025-0007",
    supplier: "Lucy Networking PLC",
    products: "3 items (Cat6 Cable 305m x1, RJ45 x2)",

    quantity: 3,
    total: 21600,
    date: "2025-09-30",
    status: "Completed",
  },
  {
    id: 8,
    purchaseId: "PUR-2025-0008",
    supplier: "Abyssinia Hardware & Tools",
    products: "2 items (UPS 1kVA x1, Power Strip x4)",

    quantity: 5,
    total: 33200,
    date: "2025-09-30",
    status: "Cancelled",
  },
  {
    id: 9,
    purchaseId: "PUR-2025-0009",
    supplier: "Ethio Cloud Licenses",
    products: "1 item (Antivirus Licenses x25)",

    quantity: 25,
    total: 37500,
    date: "2025-10-01",
    status: "Completed",
  },
  {
    id: 10,
    purchaseId: "PUR-2025-0010",
    supplier: "Kality Electronics",
    products: '2 items (Monitor 24" x2)',

    quantity: 2,
    total: 42000,
    date: "2025-10-02",
    status: "Pending",
  },
];

export const customerColumns = [
  {
    key: "select",
    label: "",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
  }, // checkbox column
  {
    key: "customerId",
    label: "Customer ID",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
  },
  {
    key: "name",
    label: "Name",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
  },
  {
    key: "contact",
    label: "Contact Info",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden md:table-cell",
  },
  {
    key: "address",
    label: "Address",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden lg:table-cell",
  },
  {
    key: "totalPurchases",
    label: "Purchases",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden xl:table-cell",
  },
  {
    key: "balance",
    label: "Balance (ETB)",
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

export const customerData = [
  {
    id: 1,
    customerId: "CUST-1001",
    name: "Kebede Alemayehu",
    phone: "+251 911 321 654",
    email: "kebede.alemayehu@example.et",
    address: "Addis Ababa, Ethiopia",
    totalPurchases: 12,
    balance: 5000,
    status: "Active",
  },
  {
    id: 2,
    customerId: "CUST-1002",
    name: "Lensa Wondimu",
    phone: "+251 922 456 789",
    email: "lensa.wondimu@example.et",
    address: "Adama, Ethiopia",
    totalPurchases: 5,
    balance: 0,
    status: "Active",
  },
  {
    id: 3,
    customerId: "CUST-1003",
    name: "Getahun Bekele",
    phone: "+251 933 987 654",
    email: "getahun.bekele@example.et",
    address: "Bahir Dar, Ethiopia",
    totalPurchases: 8,
    balance: 12000,
    status: "Inactive",
  },
  {
    id: 4,
    customerId: "CUST-1004",
    name: "Mulu Habtamu",
    phone: "+251 944 765 432",
    email: "mulu.habtamu@example.et",
    address: "Mekelle, Ethiopia",
    totalPurchases: 15,
    balance: 3000,
    status: "Active",
  },
  {
    id: 5,
    customerId: "CUST-1005",
    name: "Daniel Tesfaye",
    phone: "+251 955 543 210",
    email: "daniel.tesfaye@example.et",
    address: "Gondar, Ethiopia",
    totalPurchases: 3,
    balance: 0,
    status: "Inactive",
  },
  {
    id: 6,
    customerId: "CUST-1006",
    name: "Almaz Abebe",
    phone: "+251 966 234 567",
    email: "almaz.abebe@example.et",
    address: "Hawassa, Ethiopia",
    totalPurchases: 20,
    balance: 4500,
    status: "Active",
  },
  {
    id: 7,
    customerId: "CUST-1007",
    name: "Tesfahun Yimer",
    phone: "+251 977 876 543",
    email: "tesfahun.yimer@example.et",
    address: "Jimma, Ethiopia",
    totalPurchases: 10,
    balance: 0,
    status: "Active",
  },
  {
    id: 8,
    customerId: "CUST-1008",
    name: "Sofia Girma",
    phone: "+251 988 234 111",
    email: "sofia.girma@example.et",
    address: "Dire Dawa, Ethiopia",
    totalPurchases: 7,
    balance: 8000,
    status: "Inactive",
  },
  {
    id: 9,
    customerId: "CUST-1009",
    name: "Abel Worku",
    phone: "+251 999 432 222",
    email: "abel.worku@example.et",
    address: "Debre Birhan, Ethiopia",
    totalPurchases: 18,
    balance: 2500,
    status: "Active",
  },
  {
    id: 10,
    customerId: "CUST-1010",
    name: "Rahel Mesfin",
    phone: "+251 910 345 678",
    email: "rahel.mesfin@example.et",
    address: "Addis Ababa, Ethiopia",
    totalPurchases: 9,
    balance: 0,
    status: "Active",
  },
];

export const salesColumns = [
  {
    key: "select",
    label: "",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
  }, // checkbox column
  {
    key: "saleId",
    label: "Sale / Invoice #",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
  },
  {
    key: "customer",
    label: "Customer",
    className: "px-4 py-2 text-left font-medium uppercase tracking-wider",
  },
  {
    key: "products",
    label: "Product(s)",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden md:table-cell",
  },

  {
    key: "quantity",
    label: "Qty",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden xl:table-cell",
  },
  {
    key: "total",
    label: "Total (ETB)",
    className:
      "px-4 py-2 text-left font-medium uppercase tracking-wider hidden xl:table-cell",
  },
  {
    key: "date",
    label: "Date",
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

export const salesData = [
  {
    id: 1,
    saleId: "SAL-2025-0001",
    customer: "Kebede Alemayehu",
    products: "2 items (Laptop x1, Mouse x1)",

    quantity: 2,
    total: 95000,
    date: "2025-09-28",
    status: "Paid", // Pending | Paid | Cancelled
  },
  {
    id: 2,
    saleId: "SAL-2025-0002",
    customer: "Lensa Wondimu",
    products: "1 item (Printer x1)",

    quantity: 1,
    total: 35000,
    date: "2025-09-28",
    status: "Pending",
  },
  {
    id: 3,
    saleId: "SAL-2025-0003",
    customer: "Getahun Bekele",
    products: "3 items (Router x2, Switch x1)",

    quantity: 3,
    total: 42000,
    date: "2025-09-29",
    status: "Paid",
  },
  {
    id: 4,
    saleId: "SAL-2025-0004",
    customer: "Mulu Habtamu",
    products: "5 items (A4 Paper x4, Toner x1)",

    quantity: 5,
    total: 7500,
    date: "2025-09-29",
    status: "Paid",
  },
  {
    id: 5,
    saleId: "SAL-2025-0005",
    customer: "Daniel Tesfaye",
    products: "2 items (SSD 1TB x1, Keyboard x1)",

    quantity: 2,
    total: 16000,
    date: "2025-09-30",
    status: "Cancelled",
  },
  {
    id: 6,
    saleId: "SAL-2025-0006",
    customer: "Almaz Abebe",
    products: '3 items (Monitor 24" x2, Mouse x1)',

    quantity: 3,
    total: 68000,
    date: "2025-09-30",
    status: "Paid",
  },
  {
    id: 7,
    saleId: "SAL-2025-0007",
    customer: "Tesfahun Yimer",
    products: "1 item (Office Chair x1)",

    quantity: 1,
    total: 12500,
    date: "2025-10-01",
    status: "Paid",
  },
  {
    id: 8,
    saleId: "SAL-2025-0008",
    customer: "Sofia Girma",
    products: "2 items (UPS 1kVA x1, Power Strip x1)",

    quantity: 2,
    total: 18000,
    date: "2025-10-01",
    status: "Pending",
  },
  {
    id: 9,
    saleId: "SAL-2025-0009",
    customer: "Abel Worku",
    products: "1 item (Cloud License Pack)",

    quantity: 1,
    total: 2500,
    date: "2025-10-02",
    status: "Paid",
  },
  {
    id: 10,
    saleId: "SAL-2025-0010",
    customer: "Rahel Mesfin",
    products: "2 items (Headset x2)",

    quantity: 2,
    total: 7000,
    date: "2025-10-02",
    status: "Pending",
  },
];
