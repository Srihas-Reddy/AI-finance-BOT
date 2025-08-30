import React from 'react';
import { AnalyticsDataPoint } from '../types';

const Recharts = (window as any).Recharts;

interface AnalyticsChartProps {
  data: AnalyticsDataPoint[];
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  if (!Recharts) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] bg-base-200 dark:bg-gray-900/50 p-4 rounded-lg">
        <p className="text-gray-500 dark:text-dark-text-secondary">Loading chart component...</p>
      </div>
    );
  }

  const { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } = Recharts;

  const axisColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  const gridColor = theme === 'dark' ? '#374151' : '#E5E7EB';
  const tooltipBackgroundColor = theme === 'dark' ? '#1F2937' : '#FFFFFF';
  const tooltipBorderColor = theme === 'dark' ? '#374151' : '#F3F4F6';
  const legendColor = theme === 'dark' ? '#F9FAFB' : '#1F2937';
  
  const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
          return (
              <div className="p-4 bg-base-100 dark:bg-dark-card shadow-lg rounded-lg border border-base-300 dark:border-dark-border">
                  <p className="font-bold mb-2">{label}</p>
                  <p className="text-emerald-500">{`Income: ₹${payload[0].value.toLocaleString('en-IN')}`}</p>
                  <p className="text-rose-500">{`Expense: ₹${payload[1].value.toLocaleString('en-IN')}`}</p>
              </div>
          );
      }
      return null;
  };

  return (
    <div className="bg-base-100 dark:bg-dark-card p-4 rounded-lg shadow-lg" style={{ width: '100%', height: '80%', minHeight: '400px' }}>
      {data.length > 0 ? (
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="date" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}/>
            <Legend wrapperStyle={{ color: legendColor, paddingTop: '20px' }} />
            <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#F43F5E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
         <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-dark-text-secondary">No transaction data available for this period.</p>
         </div>
      )}
    </div>
  );
};

export default AnalyticsChart;