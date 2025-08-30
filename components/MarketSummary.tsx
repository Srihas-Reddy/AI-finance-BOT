
import React from 'react';

const MarketCard: React.FC<{ name: string; value: string; change: string; isPositive: boolean }> = ({ name, value, change, isPositive }) => {
    const changeColor = isPositive ? 'text-emerald-500' : 'text-rose-500';
    const bgColor = isPositive ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-rose-50 dark:bg-rose-900/20';
    const arrow = isPositive ? '▲' : '▼';

    return (
        <div className="bg-base-100 dark:bg-dark-card p-6 rounded-xl shadow-lg border border-base-300 dark:border-dark-border">
            <h3 className="font-semibold text-gray-500 dark:text-dark-text-secondary">{name}</h3>
            <p className="text-2xl font-bold mt-2">{value}</p>
            <div className={`flex items-center text-sm font-semibold mt-1 ${changeColor}`}>
                <span>{arrow} {change}</span>
            </div>
        </div>
    );
};

const MarketSummary: React.FC = () => {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Market Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MarketCard name="NIFTY 50" value="23,557.90" change="58.10 (0.25%)" isPositive={true} />
            <MarketCard name="SENSEX" value="77,337.59" change="-256.10 (0.33%)" isPositive={false} />
            <MarketCard name="NIFTY BANK" value="51,703.95" change="45.90 (0.09%)" isPositive={true} />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">Disclaimer: Market data is for illustrative purposes only.</p>
    </div>
  );
};

export default MarketSummary;
