"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface DataPoint {
  name: string;
  total: number;
}

function generateData(): DataPoint[] {
  return Array.from({ length: 12 }, (_, i) => ({
    name: `T${i + 1}`,
    total: Math.floor(Math.random() * 5000) + 1000,
  }));
}

export function Overview() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    setData(generateData());
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `${value/1000}tr`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
} 