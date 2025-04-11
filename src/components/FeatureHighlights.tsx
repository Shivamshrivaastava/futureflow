
export default function FeatureHighlights() {
  const features = [
    {
      title: '🧠 GeminiAI Financial Advisor',
      desc: 'Smart recommendations tailored to your goals. Get personalized advice to boost your savings and plan smarter.',
      bg: 'from-indigo-100 to-blue-50',
    },
    {
      title: '🔒 Privacy-First by Design',
      desc: 'Your financial data is never sold or shared. Built with your security and trust in mind.',
      bg: 'from-green-100 to-white',
    },
    {
      title: '📉 Backward Impact Analysis',
      desc: 'Visualize how your past decisions influenced your current financial state. Learn and improve.',
      bg: 'from-yellow-100 to-orange-50',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-2xl shadow-md bg-gradient-to-br ${f.bg} border border-gray-200 transition-all hover:shadow-lg`}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{f.title}</h3>
          <p className="text-sm text-gray-600">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
