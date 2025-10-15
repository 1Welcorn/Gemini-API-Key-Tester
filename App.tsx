
import React from 'react';
import ApiKeyTester from './components/ApiKeyTester';

const App: React.FC = () => {
  return (
    <main className="relative min-h-screen w-full bg-slate-900 text-white flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-slate-900 to-slate-900 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_100%_200px,#1e40af,transparent)] z-10"></div>
      <div className="relative z-20 w-full max-w-2xl">
        <ApiKeyTester />
      </div>
    </main>
  );
};

export default App;
