import React from 'react';
import { StockDataPoint } from '../types';

interface StockChartResponse {
  summary: string;
  data: StockDataPoint[];
  stocks: string[];
}

interface StockChartProps {
  response: StockChartResponse;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F'];

const StockChart: React.FC<StockChartProps> = ({ response }) => {
  const Recharts = (window as any).Recharts;
  const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  if (!Recharts) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-base-200 dark:bg-gray-900 p-4 rounded-lg">
        <p className="text-gray-500 dark:text-dark-text-secondary">Loading chart component...</p>
      </div>
    );
  }
  
  const { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } = Recharts;
  const { summary, data, stocks } = response;
  
  const yAxisDomain = (data: StockDataPoint[]) => {
      let min = Infinity;
      let max = -Infinity;

      data.forEach(point => {
          Object.keys(point).forEach(key => {
              const value = point[key];
              if (key !== 'date' && typeof value === 'number') {
                  if (value < min) min = value;
                  if (value > max) max = value;
              }
          })
      })

      return [Math.floor(min * 0.95), Math.ceil(max * 1.05)];
  }

  const axisColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  const gridColor = theme === 'dark' ? '#374151' : '#E5E7EB';
  const tooltipBackgroundColor = theme === 'dark' ? '#1F2937' : '#FFFFFF';
  const tooltipBorderColor = theme === 'dark' ? '#374151' : '#F3F4F6';
  const legendColor = theme === 'dark' ? '#F9FAFB' : '#1F2937';

  return (
    <div>
      <p className="mb-4 whitespace-pre-wrap">{summary}</p>
      <div className="bg-base-200 dark:bg-gray-900 p-4 rounded-lg" style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="date" stroke={axisColor} />
            <YAxis stroke={axisColor} domain={yAxisDomain(data)} tickFormatter={(value) => `₹${value}`} />
            <Tooltip
              contentStyle={{ backgroundColor: tooltipBackgroundColor, border: `1px solid ${tooltipBorderColor}` }}
              labelStyle={{ color: legendColor }}
            />
            <Legend wrapperStyle={{ color: legendColor }} />
            {stocks.map((stock, index) => (
              <Line
                key={stock}
                type="monotone"
                dataKey={stock}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;