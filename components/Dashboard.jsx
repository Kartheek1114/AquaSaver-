import { useState, useEffect } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { getWaterInsights } from '../services/geminiService.js';

const MOCK_TIME_SERIES = [
  { time: '00:00', usage: 12 },
  { time: '04:00', usage: 5 },
  { time: '08:00', usage: 45 },
  { time: '12:00', usage: 30 },
  { time: '16:00', usage: 22 },
  { time: '20:00', usage: 55 },
  { time: '23:59', usage: 15 },
];

const Dashboard = () => {
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const fetchAIInsights = async () => {
    try {
      setLoadingInsights(true);
      const res = await getWaterInsights(
        MOCK_TIME_SERIES,
        'Main Household',
        []
      );
      setInsights(res);
    } catch (error) {
      console.error('Failed to fetch AI insights', error);
    } finally {
      setLoadingInsights(false);
    }
  };

  useEffect(() => {
    fetchAIInsights();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Live Usage Dashboard
          </h1>
          <p className="text-slate-500">
            Real-time monitoring for Main Household
          </p>
        </div>

        <span className="bg-[#7AB37C]/15 text-[#7AB37C] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ring-1 ring-[#7AB37C]/30">
          <span className="w-2 h-2 bg-[#7AB37C] rounded-full animate-pulse" />
          SYSTEM ONLINE
        </span>
      </header>

      {/* Chart */}
      <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-white/60 shadow-sm hover:shadow-xl transition-all duration-300">
        <h3 className="text-lg font-bold mb-4">Hourly Usage Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_TIME_SERIES}>
              <defs>
                <linearGradient id="usage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopOpacity={0.3} />
                  <stop offset="95%" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="usage"
                strokeWidth={3}
                fill="url(#usage)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Tips */}
      <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-white/60 shadow-sm hover:shadow-xl transition-all duration-300">
        <h3 className="text-lg font-bold mb-4">AI Conservation Tips</h3>

        {loadingInsights ? (
          <div className="space-y-3">
            <div className="h-4 skeleton-shimmer rounded w-2/3" />
            <div className="h-4 skeleton-shimmer rounded w-11/12" />
            <div className="h-4 skeleton-shimmer rounded w-5/6" />
            <p className="text-slate-400 text-sm">Loading insights...</p>
          </div>
        ) : (
          <>
            <p className="italic text-[#418B7E] mb-4">
              "{insights?.summary}"
            </p>

            {insights?.tips?.map((tip, i) => (
              <p key={i} className="text-sm text-slate-600">
                • {tip}
              </p>
            ))}
          </>
        )}

          <button
           onClick={fetchAIInsights}
          className="mt-4 w-full bg-gradient-to-r from-[#418B7E] to-[#4E977A] text-white py-2.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60"
        >
          Refresh Insights
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
