export interface FinancialData {
  currentSavings: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  investmentReturns: number;
}

export interface Scenario {
  name: string;
  description: string;
  monthlyDelta: number;
  yearlyGrowth: number;
}