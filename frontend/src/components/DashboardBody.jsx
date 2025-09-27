import { useState } from "react";

// Mock data - in a real app, this would come from an API
const mockData = {
  todaySales: { count: 42, amount: 12540.75 },
  monthToDate: 89456.25,
  lowStock: 8,
  pendingOrders: 12,
  newCustomers: 15,
  pendingEmployees: 3,

  lowStockItems: [
    { id: 1, name: "Wireless Mouse", currentQty: 5, threshold: 10 },
    { id: 2, name: "Mechanical Keyboard", currentQty: 3, threshold: 15 },
    { id: 3, name: '27" Monitor', currentQty: 2, threshold: 8 },
    { id: 4, name: "USB-C Cable", currentQty: 7, threshold: 20 },
  ],

  unpaidInvoices: [
    {
      id: 1,
      supplier: "Tech Supplies Inc",
      amount: 2450.0,
      dueDate: "2024-01-15",
    },
    {
      id: 2,
      supplier: "Component World",
      amount: 1875.5,
      dueDate: "2024-01-18",
    },
    {
      id: 3,
      supplier: "Global Electronics",
      amount: 3200.0,
      dueDate: "2024-01-20",
    },
  ],

  recentSales: [
    { id: 1, customer: "John Smith", amount: 450.0, date: "2024-01-10" },
    { id: 2, customer: "Sarah Johnson", amount: 890.5, date: "2024-01-10" },
    { id: 3, customer: "Mike Wilson", amount: 275.25, date: "2024-01-10" },
    { id: 4, customer: "Emily Davis", amount: 1250.0, date: "2024-01-09" },
    { id: 5, customer: "David Brown", amount: 680.75, date: "2024-01-09" },
  ],

  recentPurchases: [
    {
      id: 1,
      supplier: "Tech Supplies Inc",
      amount: 2200.0,
      date: "2024-01-09",
    },
    { id: 2, supplier: "Component World", amount: 1500.0, date: "2024-01-08" },
    {
      id: 3,
      supplier: "Global Electronics",
      amount: 3800.0,
      date: "2024-01-07",
    },
    { id: 4, supplier: "Hardware Pro", amount: 925.5, date: "2024-01-06" },
    {
      id: 5,
      supplier: "Tech Supplies Inc",
      amount: 1100.25,
      date: "2024-01-05",
    },
  ],
};

const DashboardBody = () => {
  const [data] = useState(mockData);
  const [copied, setCopied] = useState(false);

  const handleInviteEmployee = () => {
    const inviteLink = "https://app.example.com/invite/abc123xyz";
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const StatCard = ({ title, value, subtitle, icon, color = "blue" }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full bg-${color}-100`}>{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const QuickActionButton = ({ icon, label, onClick, color = "blue" }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-${color}-300`}
    >
      <div className={`text-2xl text-${color}-600 mb-2`}>{icon}</div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's your business overview.
          </p>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Today's Sales"
            value={`$${data.todaySales.amount.toLocaleString()}`}
            subtitle={`${data.todaySales.count} transactions`}
            icon="💰"
            color="green"
          />
          <StatCard
            title="Month-to-Date Revenue"
            value={`$${data.monthToDate.toLocaleString()}`}
            icon="📈"
            color="blue"
          />
          <StatCard
            title="Products Low in Stock"
            value={data.lowStock}
            icon="📦"
            color="red"
          />
          <StatCard
            title="Pending Purchase Orders"
            value={data.pendingOrders}
            icon="📋"
            color="yellow"
          />
          <StatCard
            title="New Customers This Week"
            value={data.newCustomers}
            icon="👥"
            color="green"
          />
          <StatCard
            title="Employees Pending Approval"
            value={data.pendingEmployees}
            icon="👤"
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Alerts & Tasks Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Low Stock List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Low Stock Alerts
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {data.lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Current: {item.currentQty} | Threshold: {item.threshold}
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Create Purchase
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Unpaid Supplier Invoices */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Unpaid Supplier Invoices
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {data.unpaidInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {invoice.supplier}
                      </p>
                      <p className="text-sm text-gray-600">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">
                        ${invoice.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Amount Due</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Sidebar */}
          <div className="space-y-6">
            {/* Recent Sales */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Sales
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {data.recentSales.map((sale) => (
                  <div key={sale.id} className="p-4">
                    <p className="font-medium text-gray-900">{sale.customer}</p>
                    <p className="text-sm text-gray-600">
                      ${sale.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{sale.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Purchases */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Purchases
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {data.recentPurchases.map((purchase) => (
                  <div key={purchase.id} className="p-4">
                    <p className="font-medium text-gray-900">
                      {purchase.supplier}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${purchase.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{purchase.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <QuickActionButton
              icon="🛒"
              label="New Sale"
              onClick={() => console.log("New Sale clicked")}
              color="green"
            />
            <QuickActionButton
              icon="📦"
              label="New Purchase"
              onClick={() => console.log("New Purchase clicked")}
              color="blue"
            />
            <QuickActionButton
              icon="📱"
              label="New Product"
              onClick={() => console.log("New Product clicked")}
              color="purple"
            />
            <QuickActionButton
              icon="👤"
              label="Invite Employee"
              onClick={handleInviteEmployee}
              color="yellow"
            />
            <QuickActionButton
              icon="👥"
              label="New Customer"
              onClick={() => console.log("New Customer clicked")}
              color="green"
            />
            <QuickActionButton
              icon="🏢"
              label="New Supplier"
              onClick={() => console.log("New Supplier clicked")}
              color="blue"
            />
          </div>
          {copied && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 text-sm rounded text-center">
              Invite link copied to clipboard!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
