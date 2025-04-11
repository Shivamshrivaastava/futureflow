import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

export default function CollatedDashboard() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('financialData');
    const ai = localStorage.getItem('aiSuggestion');
    const level = localStorage.getItem('planningLevel');
    const scenarioName = localStorage.getItem('scenarioName');

    if (saved) {
      const parsed = JSON.parse(saved);
      setData({
        ...parsed,
        aiSuggestion: ai || '',
        planningLevel: level || '',
        scenarioName: scenarioName || 'Adjusted Plan',
        scenarioMonthlyDelta: parseFloat(localStorage.getItem('scenarioMonthlyDelta') || '0'),
        scenarioGrowth: parseFloat(localStorage.getItem('scenarioGrowth') || parsed.investmentReturns),
      });
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 10000); // 🔁 Auto-redirect after 10 seconds
    return () => clearTimeout(timeout);
  }, [navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!data) {
    return (
      <div className="p-6 text-center text-gray-600">
        No financial data yet. Please use the planner first.
      </div>
    );
  }

  const generateProjectionData = () => {
    const {
      currentSavings,
      monthlyIncome,
      monthlyExpenses,
      investmentReturns,
      scenarioMonthlyDelta,
      scenarioGrowth,
    } = data;

    const monthlyNet = monthlyIncome - monthlyExpenses;
    const projection = [];

    for (let year = 0; year <= 10; year++) {
      const baseline = currentSavings + monthlyNet * 12 * year * Math.pow(1 + investmentReturns / 100, year);
      const scenarioNet = monthlyNet + scenarioMonthlyDelta;
      const scenario = currentSavings + scenarioNet * 12 * year * Math.pow(1 + scenarioGrowth / 100, year);

      projection.push({
        year,
        baseline: Math.round(baseline),
        scenario: Math.round(scenario),
      });
    }

    return projection;
  };

  const chartData = generateProjectionData();

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-700">📊 Collated Financial Dashboard</h2>
        <button
          onClick={handleBack}
          className="text-sm px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded"
        >
          ← Back to Planner
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-4 shadow rounded-lg border">
          <h4 className="text-sm font-medium text-gray-500">Current Savings</h4>
          <p className="text-xl font-semibold text-gray-800">${data.currentSavings}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg border">
          <h4 className="text-sm font-medium text-gray-500">Monthly Income</h4>
          <p className="text-xl font-semibold text-gray-800">${data.monthlyIncome}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg border">
          <h4 className="text-sm font-medium text-gray-500">Monthly Expenses</h4>
          <p className="text-xl font-semibold text-gray-800">${data.monthlyExpenses}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg border">
          <h4 className="text-sm font-medium text-gray-500">Expected Returns</h4>
          <p className="text-xl font-semibold text-gray-800">{data.investmentReturns}%</p>
        </div>
      </div>

      <div className="bg-blue-50 p-5 border border-blue-200 rounded-lg">
        <h4 className="font-bold text-blue-700 mb-2">🧠 GeminiAI Advice</h4>
        <p className="text-sm whitespace-pre-line text-blue-900">{data.aiSuggestion}</p>
        {data.planningLevel && (
          <div className="mt-3 text-sm font-medium">
            {data.planningLevel === 'good' && (
              <p className="text-green-600">✅ Planning Status: <strong>Good</strong> 🎉</p>
            )}
            {data.planningLevel === 'average' && (
              <p className="text-yellow-600">⚠️ Planning Status: <strong>Average</strong> 😐</p>
            )}
            {data.planningLevel === 'bad' && (
              <p className="text-red-600">❌ Planning Status: <strong>Bad</strong> 😟</p>
            )}
          </div>
        )}
      </div>

      <div className="bg-white border p-6 rounded-xl shadow-sm">
        <h4 className="text-lg font-bold mb-4 text-gray-700">📈 10-Year Growth Projection</h4>
        <div className="h-[400px] w-full">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#d1d5db" />
              <XAxis
                dataKey="year"
                label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                stroke="#6b7280"
              />
              <YAxis
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                label={{
                  value: 'Net Worth',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10,
                }}
                width={80}
                stroke="#6b7280"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f9fafb',
                  borderRadius: 8,
                  border: '1px solid #d1d5db',
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="baseline"
                name="Current Plan"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="scenario"
                name={data.scenarioName || 'Alternative Plan'}
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-center text-sm text-gray-400 italic">
        ⏳ Redirecting back to the planner in 10 seconds...
      </p>
    </motion.div>
  );
}
