
import React, { useState } from 'react';
import { EyeIcon } from './icons/EyeIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  isLoading: boolean;
}

const ApiKeyInput = ({ apiKey, setApiKey, isLoading }: ApiKeyInputProps) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor="api-key" className="block text-sm font-medium text-slate-300">
        Gemini API Key
      </label>
      <div className="relative">
        <input
          id="api-key"
          type={showKey ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Gemini API Key here"
          className="w-full p-3 pr-10 bg-slate-900/70 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          disabled={isLoading}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-200 focus:outline-none"
          aria-label={showKey ? 'Hide API Key' : 'Show API Key'}
        >
          {showKey ? (
            <EyeOffIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      </div>
       <p className="text-xs text-slate-500">
          Your API key is only used for this session and is not stored.
       </p>
    </div>
  );
};

export default ApiKeyInput;
