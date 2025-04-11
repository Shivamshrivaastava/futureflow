import type { Scenario } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  scenario: Scenario;
  selected: boolean;
  onClick: () => void;
}

export default function ScenarioCard({ scenario, selected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-xl cursor-pointer transition-all transform hover:scale-[1.01] ${
        selected
          ? 'bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-500 shadow-lg'
          : 'bg-white border border-gray-200 hover:shadow-md hover:border-blue-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">{scenario.name}</h3>
        {scenario.monthlyDelta >= 0 ? (
          <TrendingUp className="h-5 w-5 text-green-500" />
        ) : (
          <TrendingDown className="h-5 w-5 text-red-500" />
        )}
      </div>
      <p className="text-sm text-gray-600 mt-2">{scenario.description}</p>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Monthly Impact</span>
          <span
            className={`font-semibold ${
              scenario.monthlyDelta >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {scenario.monthlyDelta >= 0 ? '+' : ''}${scenario.monthlyDelta}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Yearly Growth</span>
          <span className="font-semibold text-blue-600">{scenario.yearlyGrowth}%</span>
        </div>
      </div>
    </div>
  );
}
