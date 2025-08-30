
import React from 'react';
import { CategorySpending } from '../types';

const Recharts = (window as any).Recharts;

interface CategoryPieChartProps {
  data: CategorySpending[];
}

const COLORS = ['#0D9488', '#F0B90B', '#3B82F6', '#F43F5E', '#8B5CF6', '#EC4899'];

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => {
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

    if (!Recharts) {
        return (
            <div className="flex items-center justify-center h-[400px] bg-base-200 dark:bg-gray-900/50 p-4 rounded-lg">
                <p className="text-gray-500 dark:text-dark-text-secondary">Loading chart component...</p>
            </div>
        );
    }
    
    const { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } = Recharts;

    const legendColor = theme === 'dark' ? '#F9FAFB' : '#1F2937';

    const CustomTooltip: React.FC<any> = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="p-4 bg-base-100 dark:bg-dark-card shadow-lg rounded-lg border border-base-300 dark:border-dark-border">
                    <p className="font-bold">{`${data.name}: ₹${data.value.toLocaleString('en-IN')}`}</p>
                    <p className="text-sm text-gray-500">{`(${(data.percent * 100).toFixed(2)}%)`}</p>
                </div>
            );
        }
        return null;
    };

  return (
    <div className="bg-base-100 dark:bg-dark-card p-4 rounded-lg shadow-lg" style={{ width: '100%', height: 400 }}>
      {data.length > 0 ? (
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: legendColor }} />
            </PieChart>
        </ResponsiveContainer>
      ) : (
         <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-dark-text-secondary">No expense data available for a category breakdown.</p>
         </div>
      )}
    </div>
  );
};

export default CategoryPieChart;
