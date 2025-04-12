import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_KEY = 'AIzaSyBXhX-Lnvqo6sUgtdi6OJP0hKuQrjEiLZ4';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const financialKeywords = [
  'save', 'budget', 'income', 'expense', 'spend', 'invest', 'loan',
  'finance', 'goal', 'retirement', 'net worth', 'savings', 'portfolio',
  'debt', 'asset', 'emergency fund', 'plan', 'credit', 'interest'
];

export default function GeminiAIDashboard() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const askGemini = async () => {
    if (!input.trim()) return;

    const lower = input.toLowerCase();
    const isRelated = financialKeywords.some((word) => lower.includes(word));
    if (!isRelated) {
      setErrorMsg('⚠️ Your question seems unrelated to financial planning. Please ask a relevant query.');
      setResponse('');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setResponse('');

    try {
      const res = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Suggest a financial strategy for this: ${input}` }] }],
        }),
      });

      const data = await res.json();
      const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No suggestion returned.';
      setResponse(aiReply);
    } catch {
      setResponse('❌ Error fetching suggestion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white px-6 py-12">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🤖 Try AI Planning with Gemini
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left */}
        <motion.div
          className="bg-white/10 border border-white/10 rounded-lg p-6 backdrop-blur-sm text-sm text-gray-200 space-y-3"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-yellow-300">Why use GeminiAI?</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>💡 Personalized money tips</li>
            <li>📊 Scenario-based insights</li>
            <li>🔒 No financial data stored</li>
            <li>⚡ Real-time answers 24/7</li>
          </ul>
        </motion.div>

        {/* Center Input & Output */}
        <motion.div
          className="col-span-1 bg-white/5 p-6 rounded-lg shadow-lg backdrop-blur-sm flex flex-col justify-between h-fit min-h-[300px] w-full max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder="Ask: e.g., How can I invest ₹10K/month safely?"
            className="w-full rounded-lg p-4 text-gray-900 font-medium resize-none shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={askGemini}
              disabled={loading}
              className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-md shadow hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {loading ? 'Thinking...' : 'Get Suggestion'}
            </button>

            <button
              onClick={() => navigate('/planner')}
              className="text-sm underline text-yellow-300 hover:text-yellow-200 transition"
            >
              ← Go to Planner
            </button>
          </div>

          {/* Validation / Error */}
          {errorMsg && (
            <div className="mt-4 bg-red-100 text-red-800 text-sm rounded p-3">
              {errorMsg}
            </div>
          )}

          {/* AI Response */}
          {response && (
            <motion.div
              className="mt-6 bg-white/10 border border-white/20 rounded-lg p-4 text-sm text-gray-100 max-h-60 overflow-y-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-yellow-300 font-semibold mb-2">Gemini Suggests:</h2>
              <p className="whitespace-pre-wrap">{response}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Right */}
        <motion.div
          className="bg-white/10 border border-white/10 rounded-lg p-6 backdrop-blur-sm text-sm text-gray-200 space-y-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-yellow-300">Prompt Suggestions</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Budget ₹30K for side hustle & rent</li>
            <li>Plan for a wedding in 1 year</li>
            <li>Build an emergency fund for 6 months</li>
            <li>Should I take an education loan?</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
