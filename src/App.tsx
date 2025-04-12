import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import FinancialForm from './components/FinancialForm';
import ScenarioCard from './components/ScenarioCard';
import ProjectionChart from './components/ProjectionChart';
import CollatedDashboard from './components/CollatedDashboard';
import DashboardLanding from './components/DashboardLanding';
import GeminiAIDashboard from './components/GeminiAIDashboard';
import SignIn from './components/SignIn'; // 👈 NEW SignIn Component
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import type { FinancialData, Scenario } from './types';
import confetti from 'canvas-confetti';
import { Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const handlePlanSubmit = (data: FinancialData) => {
    setFinancialData(data);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition">
      <Navbar />
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
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = !!localStorage.getItem('futureflow-user');
  return isLoggedIn ? children : <Navigate to="/signin" replace />;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><DashboardLanding /></PageWrapper>} />
        <Route path="/signin" element={<PageWrapper><SignIn /></PageWrapper>} />
        <Route path="/planner" element={
          <ProtectedRoute>
            <PageWrapper><PlannerApp /></PageWrapper>
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={<PageWrapper><CollatedDashboard /></PageWrapper>} />
        <Route path="/dashboard-home" element={<PageWrapper><GeminiAIDashboard /></PageWrapper>} />
        <Route path="/launch-dashboard" element={<SignIn />} />

      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: JSX.Element }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
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
