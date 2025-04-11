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
import type { FinancialData, Scenario } from '../types';
import FeatureHighlights from './FeatureHighlights';
import { motion } from 'framer-motion';

interface Props {
  financialData: FinancialData;
  selectedScenario: Scenario | null;
}

export default function ProjectionChart({ financialData, selectedScenario }: Props) {
  const generateProjectionData = () => {
    const data = [];
    const { currentSavings, monthlyIncome, monthlyExpenses, investmentReturns } = financialData;
    const monthlyNet = monthlyIncome - monthlyExpenses;

    for (let year = 0; year <= 10; year++) {
      const baselineValue =
        currentSavings +
        monthlyNet * 12 * year * Math.pow(1 + investmentReturns / 100, year);

      let scenarioValue = baselineValue;
      if (selectedScenario) {
        const scenarioNet = monthlyNet + selectedScenario.monthlyDelta;
        scenarioValue =
          currentSavings +
          scenarioNet * 12 * year * Math.pow(1 + selectedScenario.yearlyGrowth / 100, year);
      }

      data.push({
        year,
        baseline: Math.round(baselineValue),
        scenario: Math.round(scenarioValue),
      });
    }

    return data;
  };

  const data = generateProjectionData();
  const { monthlyIncome, monthlyExpenses, investmentReturns, currentSavings } = financialData;

  const pastImpact = Math.round(
    currentSavings +
      (monthlyIncome - monthlyExpenses) * 12 * 5 * Math.pow(1 + investmentReturns / 100, 5)
  );

  return (
    <div className="space-y-12">
      {/* Chart with Motion Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl mx-auto bg-gradient-to-br from-white/90 to-gray-50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 dark:from-slate-800 dark:to-slate-900"
      >
        <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6 text-center tracking-tight">
          📈 10-Year Financial Projection
        </h3>

        <div className="h-[400px] w-full px-4 sm:px-6">
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="4 4" stroke="#d1d5db" />
              <XAxis
                dataKey="year"
                label={{
                  value: 'Years',
                  position: 'insideBottom',
                  offset: -5,
                  fill: '#6b7280',
                }}
                stroke="#6b7280"
              />
              <YAxis
                type="number"
                domain={['auto', 'auto']}
                width={80}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                label={{
                  value: 'Net Worth',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 20,
                  style: {
                    textAnchor: 'middle',
                    fontSize: 12,
                    fill: '#6b7280',
                  },
                }}
                stroke="#6b7280"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f9fafb',
                  borderRadius: 8,
                  border: '1px solid #d1d5db',
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Legend
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) => (
                  <span className="text-gray-700 dark:text-slate-200 font-medium">{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="baseline"
                name="Current Path"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
                animationDuration={1000}
              />
              {selectedScenario && (
                <Line
                  type="monotone"
                  dataKey="scenario"
                  name={selectedScenario.name}
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Backward Impact Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto mt-8 p-6 rounded-xl bg-yellow-50 border border-yellow-200 shadow-md dark:bg-yellow-100/10 dark:border-yellow-400/20"
      >
        <h4 className="text-lg font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
          📉 Backward Impact Analysis
        </h4>
        <p className="text-sm text-gray-700 dark:text-slate-100">
          If you had consistently invested your net savings over the last 5 years at{' '}
          <span className="font-semibold">{investmentReturns}%</span>, your net worth today
          could be approximately{' '}
          <span className="font-bold text-yellow-900 dark:text-yellow-300">
            ${pastImpact.toLocaleString()}
          </span>.
        </p>
      </motion.div>

      {/* Feature Highlights Section */}
      <FeatureHighlights />
    </div>
  );
}
