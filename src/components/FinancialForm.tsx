import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import type { FinancialData, Scenario } from '../types';
import { motion } from 'framer-motion';
import { getGeminiSuggestion } from './utils/geminiSuggest';

interface Props {
  onSubmit: (data: FinancialData) => void;
  selectedScenario: Scenario | null;
}

export default function FinancialForm({ onSubmit, selectedScenario }: Props) {
  const [formData, setFormData] = useState<FinancialData>({
    currentSavings: 10000,
    monthlyIncome: 5000,
    monthlyExpenses: 3000,
    investmentReturns: 7,
  });

  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [planningLevel, setPlanningLevel] = useState<'good' | 'average' | 'bad' | ''>('');

  useEffect(() => {
    const saved = localStorage.getItem('financialData');
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('financialData', JSON.stringify(formData));
    onSubmit(formData);

    setLoadingAI(true);
    setAiSuggestion('');
    setPlanningLevel('');

    const prompt = `
User's Financial Data:
- Current Savings: $${formData.currentSavings}
- Monthly Income: $${formData.monthlyIncome}
- Monthly Expenses: $${formData.monthlyExpenses}
- Expected Investment Returns: ${formData.investmentReturns}%
- Scenario Delta: ${selectedScenario?.monthlyDelta || 0}
- Scenario Growth: ${selectedScenario?.yearlyGrowth || formData.investmentReturns}%

Analyze their financial health as: "good", "average", or "bad".
Then give 2–3 practical, plain-language financial suggestions to improve.
End your response with a new line like:
Planning Level: good
`;

    try {
      const suggestion = await getGeminiSuggestion(prompt);
      setAiSuggestion(suggestion);

      const match = suggestion.match(/Planning Level:\s*(good|average|bad)/i);
      if (match) {
        setPlanningLevel(match[1].toLowerCase() as 'good' | 'average' | 'bad');
      }

      // Store AI outputs for dashboard
      localStorage.setItem('aiSuggestion', suggestion);
      localStorage.setItem('planningLevel', match?.[1]?.toLowerCase() || '');
      localStorage.setItem('scenarioName', selectedScenario?.name || 'Adjusted Plan');
      localStorage.setItem('scenarioMonthlyDelta', selectedScenario?.monthlyDelta?.toString() || '0');
      localStorage.setItem('scenarioGrowth', selectedScenario?.yearlyGrowth?.toString() || formData.investmentReturns.toString());
    } catch (error) {
      setAiSuggestion('❌ Failed to fetch advice. Please try again.');
      console.error(error)
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-gray-200 space-y-8"
    >
      <h2 className="text-3xl font-extrabold text-center text-blue-700">📊 Financial Planner</h2>

      <div className="space-y-6">
        {[
          {
            label: 'Current Savings',
            value: formData.currentSavings,
            onChange: (val: number) => setFormData({ ...formData, currentSavings: val }),
          },
          {
            label: 'Monthly Income',
            value: formData.monthlyIncome,
            onChange: (val: number) => setFormData({ ...formData, monthlyIncome: val }),
          },
          {
            label: 'Monthly Expenses',
            value: formData.monthlyExpenses,
            onChange: (val: number) => setFormData({ ...formData, monthlyExpenses: val }),
          },
        ].map(({ label, value, onChange }, idx) => (
          <div key={idx}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="block w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        ))}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Expected Investment Returns (%)
          </label>
          <input
            type="number"
            value={formData.investmentReturns}
            onChange={(e) =>
              setFormData({ ...formData, investmentReturns: Number(e.target.value) })
            }
            className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        🔒 Your financial data stays private and never leaves your browser.
      </div>

      {/* 🧠 Gemini AI Suggestion */}
      <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
        <h4 className="font-bold text-blue-700 text-lg mb-2">🧠 GeminiAI Advice</h4>
        {loadingAI ? (
          <p className="text-sm text-blue-500 italic animate-pulse">Thinking...</p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-blue-900 whitespace-pre-line">{aiSuggestion}</p>

            {planningLevel && (
              <div className="text-sm font-medium">
                {planningLevel === 'good' && (
                  <p className="text-green-600">✅ Your financial planning looks <strong>good</strong>! 🎉</p>
                )}
                {planningLevel === 'average' && (
                  <p className="text-yellow-600">⚠️ Your financial planning is <strong>average</strong> 😐 — here’s how to improve:</p>
                )}
                {planningLevel === 'bad' && (
                  <p className="text-red-600">❌ Your financial planning looks <strong>bad</strong> 😟 — take immediate action:</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
      >
        🚀 Calculate & Get Suggestions
      </button>
    </motion.form>
  );
}
