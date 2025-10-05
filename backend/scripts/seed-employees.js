// scripts/seed-employees.js
import mongoose from "mongoose";
import employeeModel from "../src/models/employee.model.js";

// ---------------- 1) Mock data (now includes gender) ----------------
const rawEmployees = [
  {
    id: 1,
    name: "Abebe Bekele",
    gender: "Male",
    position: "Senior Developer",
    department: "Engineering",
    phone: "+251 911 123 456",
    email: "abebe.bekele@company.et",
    salary: 95000,
    isActive: true,
    pendingApproval: false, // Active
    startDate: "2024-02-15",
    address: "Addis Ababa, Bole",
  },
  {
    id: 2,
    name: "Mekdes Alemu",
    gender: "Female",
    position: "Product Manager",
    department: "Product",
    phone: "+251 922 234 567",
    email: "mekdes.alemu@company.et",
    salary: 110000,
    isActive: true,
    pendingApproval: false, // Active
    startDate: "2023-11-01",
    address: "Addis Ababa, Yeka",
  },
  {
    id: 3,
    name: "Samuel Tadesse",
    gender: "Male",
    position: "UX Designer",
    department: "Design",
    phone: "+251 933 345 678",
    email: "samuel.tadesse@company.et",
    salary: 78000,
    isActive: true,
    pendingApproval: false, // Active
    startDate: "2024-06-10",
    address: "Addis Ababa, Gullele",
  },
  {
    id: 4,
    name: "Hanna Getachew",
    gender: "Female",
    position: "DevOps Engineer",
    department: "Engineering",
    phone: "+251 944 456 789",
    email: "hanna.getachew@company.et",
    salary: 88000,
    isActive: false,
    pendingApproval: true, // Pending
    startDate: "2025-09-01",
    address: "Addis Ababa, Nifas Silk",
  },
  {
    id: 5,
    name: "Saron Fikre",
    gender: "Female",
    position: "HR Manager",
    department: "Human Resources",
    phone: "+251 955 567 890",
    email: "saron.fikre@company.et",
    salary: 85000,
    isActive: false,
    pendingApproval: false, // Inactive
    startDate: "2022-03-01",
    address: "Addis Ababa, Kirkos",
  },
  {
    id: 6,
    name: "Yonas Gebremariam",
    gender: "Male",
    position: "Marketing Specialist",
    department: "Marketing",
    phone: "+251 966 678 901",
    email: "yonas.gebremariam@company.et",
    salary: 65000,
    isActive: false,
    pendingApproval: true, // Pending
    startDate: "2025-08-20",
    address: "Addis Ababa, Arada",
  },
  {
    id: 7,
    name: "Selamawit Dawit",
    gender: "Female",
    position: "Finance Director",
    department: "Finance",
    phone: "+251 977 789 012",
    email: "selamawit.dawit@company.et",
    salary: 125000,
    isActive: false,
    pendingApproval: false, // Inactive
    startDate: "2021-07-12",
    address: "Addis Ababa, Lideta",
  },
  {
    id: 8,
    name: "Bereket Tesfaye",
    gender: "Male",
    position: "Junior Developer",
    department: "Engineering",
    phone: "+251 988 890 123",
    email: "bereket.tesfaye@company.et",
    salary: 70000,
    isActive: true,
    pendingApproval: false, // Active
    startDate: "2024-12-01",
    address: "Addis Ababa, Akaki",
  },
];

// ---------------- 2) Helpers ----------------
function splitName(full) {
  if (!full || typeof full !== "string") return { firstName: "", lastName: "" };
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  const lastName = parts.pop();
  const firstName = parts.join(" ");
  return { firstName, lastName };
}

function normalizeStatusFlags(isActive, pendingApproval) {
  // Pending wins: force isActive=false
  if (pendingApproval === true)
    return { isActive: false, pendingApproval: true };
  // Active if explicitly active and not pending
  if (isActive === true) return { isActive: true, pendingApproval: false };
  // Otherwise inactive
  return { isActive: false, pendingApproval: false };
}

function normalizeGender(g) {
  const v = (g || "").trim();
  if (v === "Male" || v === "Female") return v;
  // Fallback to a valid enum value if missing/wrong
  return "Male";
}

function toEmployeeDoc(raw) {
  const { firstName, lastName } = splitName(raw.name);
  const email = (raw.email || "").trim().toLowerCase();
  const { isActive, pendingApproval } = normalizeStatusFlags(
    raw.isActive,
    raw.pendingApproval
  );

  return {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email,
    gender: normalizeGender(raw.gender),
    salary: Number(raw.salary) || 0,
    startDate: new Date(raw.startDate),
    department: raw.department?.trim() || "",
    position: raw.position?.trim() || "",
    phone: raw.phone?.trim() || "",
    address: raw.address?.trim() || "",
    isActive,
    pendingApproval,
  };
}

// ---------------- 3) Main ----------------
async function run() {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    console.error("❌ MONGO_URL not set. Put it in your .env");
    process.exit(1);
  }

  await mongoose.connect(uri, {});

  // Ensure indexes (unique email, etc.)
  await employeeModel.init();

  if (process.env.RESET === "true") {
    const del = await employeeModel.deleteMany({});
    console.log(`🧹 Cleared employees: ${del.deletedCount}`);
  }

  const docs = rawEmployees.map(toEmployeeDoc);

  // Choose upsert behavior
  const overwrite = process.env.OVERWRITE === "true";

  const ops = docs.map((doc) =>
    overwrite
      ? {
          updateOne: {
            filter: { email: doc.email },
            update: { $set: doc },
            upsert: true,
          },
        }
      : {
          updateOne: {
            filter: { email: doc.email },
            update: { $setOnInsert: doc },
            upsert: true,
          },
        }
  );

  const result = await employeeModel.bulkWrite(ops, { ordered: false });
  console.log("✅ Seed complete:");
  console.log(
    `  upserts: ${result.upsertedCount ?? 0}, matched: ${
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
