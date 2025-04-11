import { useState } from 'react';
import { Clock, Lightbulb } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import FinancialForm from './components/FinancialForm';
import ScenarioCard from './components/ScenarioCard';
import ProjectionChart from './components/ProjectionChart';
import CollatedDashboard from './components/CollatedDashboard';
import type { FinancialData, Scenario } from './types';
import { Toaster, toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';

const scenarios: Scenario[] = [
  {
    name: 'Career Switch to Tech',
    description: 'Transition to a software development role after bootcamp',
    monthlyDelta: 2000,
    yearlyGrowth: 10,
  },
  {
    name: 'Start a Business',
    description: 'Launch an e-commerce business with initial investment',
    monthlyDelta: -1000,
    yearlyGrowth: 15,
  },
  {
    name: 'Real Estate Investment',
    description: 'Purchase a rental property with mortgage',
    monthlyDelta: 800,
    yearlyGrowth: 8,
  },
  {
    name: 'Minimize Expenses',
    description: 'Optimize spending and increase savings rate',
    monthlyDelta: 500,
    yearlyGrowth: 7,
  },
];

function PlannerApp() {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  // On financial data submission, show toast and confetti
  const handlePlanSubmit = (data: FinancialData) => {
    setFinancialData(data);
    toast.success('Financial Plan Generated 🎉');
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold">Financial Time Machine</h1>
          </div>
          {/* <button
            onClick={toggleTheme}
            className="flex items-center space-x-1 text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded"
          >
          </button> */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Your Financial Data</h2>
              <FinancialForm onSubmit={handlePlanSubmit} selectedScenario={selectedScenario} />
            </div>
          </div>

          <div className="lg:col-span-2">
            {financialData ? (
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Financial Projection</h2>
                  <ProjectionChart
                    financialData={financialData}
                    selectedScenario={selectedScenario}
                  />
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <h2 className="text-lg font-semibold">"What If" Scenarios</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scenarios.map((scenario) => (
                      <ScenarioCard
                        key={scenario.name}
                        scenario={scenario}
                        selected={selectedScenario?.name === scenario.name}
                        onClick={() =>
                          setSelectedScenario(
                            selectedScenario?.name === scenario.name ? null : scenario
                          )
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    to="/dashboard"
                    className="inline-block mt-4 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    📊 View Collated Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-300 text-center">
                  Enter your financial data to see projections and explore scenarios
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Toaster position="top-center" />
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PlannerApp />} />
        <Route path="/dashboard" element={<motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <CollatedDashboard />
        </motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
