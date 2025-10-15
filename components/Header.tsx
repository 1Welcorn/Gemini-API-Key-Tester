
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header = () => (
  <div className="flex flex-col items-center">
    <div className="flex items-center space-x-3">
      <SparklesIcon className="w-8 h-8 text-indigo-400" />
      <h1 className="text-3xl font-bold tracking-tight text-slate-100">
        Gemini Prompt Tester
      </h1>
    </div>
  </div>
);

export default Header;
