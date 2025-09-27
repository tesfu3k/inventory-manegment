import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Compact number formatter for the Y-axis (e.g., 12,300 -> 12.3K)
const fmt = new Intl.NumberFormat(undefined, {
  notation: "compact",
  maximumFractionDigits: 1,
});

const data = [
  { month: "Jan", sales: 4000, purchase: 2400 },
  { month: "Feb", sales: 3000, purchase: 1398 },
  { month: "Mar", sales: 2000, purchase: 9800 },
  { month: "Apr", sales: 2780, purchase: 3908 },
  { month: "May", sales: 1890, purchase: 4800 },
  { month: "Jun", sales: 2390, purchase: 3800 },
  { month: "Jul", sales: 3490, purchase: 4300 },
];

const SaleVsPurchase = () => {
  return (
    <div className="w-full h-80 rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold">Sales vs Purchases</h3>
        <span className="text-xs text-gray-500">Amounts (ETB)</span>
      </div>

      {/* Important: the inner wrapper gives the chart real height */}
      <div className="w-full h-[calc(100%-1.75rem)] min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
            barGap={6}
            barCategoryGap="16%"
          >
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickFormatter={(v) => fmt.format(v)}
              tickLine={false}
              axisLine={false}
              width={56}
              label={{
                value: "Amount (ETB)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
              }}
            />
            <Tooltip
              cursor={{ fillOpacity: 0.08 }}
              // NOTE: plain JS params (no :type). name comes from <Bar name="...">
              formatter={(value, name) => [
                `ETB ${Number(value).toLocaleString()}`,
                name,
              ]}
              labelStyle={{ fontWeight: 600 }}
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb" }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 8 }}
            />

            {/* Purchases */}
            <Bar
              name="Purchases"
              dataKey="purchase"
              fill="#6366f1" // indigo
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
              isAnimationActive
              animationDuration={700}
              activeBar={<Rectangle fillOpacity={0.9} stroke="#3730a3" />}
            />

            {/* Sales */}
            <Bar
              name="Sales"
              dataKey="sales"
              fill="#22c55e" // green
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
              isAnimationActive
              animationDuration={700}
              activeBar={<Rectangle fillOpacity={0.9} stroke="#166534" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SaleVsPurchase;
