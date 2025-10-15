
import React, { useState, useCallback } from 'react';
import { runPrompt } from '../services/geminiService';
import { ApiResult } from '../types';
import { TestStatus } from '../types';
import Header from './Header';
import PromptInput from './PromptInput';
import ResultDisplay from './ResultDisplay';
import ApiKeyInput from './ApiKeyInput';

const ApiKeyTester = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('Why is the sky blue? Answer in one sentence.');
  const [result, setResult] = useState<ApiResult>({ status: TestStatus.IDLE, message: null });

  const handleTestPrompt = useCallback(async () => {
    if (!apiKey.trim()) {
      setResult({ status: TestStatus.ERROR, message: 'API Key cannot be empty.' });
      return;
    }
    if (!prompt.trim()) {
      setResult({ status: TestStatus.ERROR, message: 'Prompt cannot be empty.' });
      return;
    }
    setResult({ status: TestStatus.LOADING, message: null });
    try {
      const responseText = await runPrompt(prompt, apiKey);
      setResult({ status: TestStatus.SUCCESS, message: responseText });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setResult({ status: TestStatus.ERROR, message });
    }
  }, [prompt, apiKey]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl shadow-indigo-900/50 border border-slate-700 overflow-hidden">
      <div className="p-6 md:p-8">
        <Header />
        <p className="mt-2 text-slate-400 text-center">
          Enter your Gemini API Key and a test prompt to verify your connection.
        </p>
        <div className="mt-8 space-y-6">
          <ApiKeyInput
            apiKey={apiKey}
            setApiKey={setApiKey}
            isLoading={result.status === TestStatus.LOADING}
          />
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleTestPrompt}
            isLoading={result.status === TestStatus.LOADING}
          />
        </div>
        <div className="mt-6 min-h-[100px]">
          <ResultDisplay result={result} />
        </div>
      </div>
    </div>
  );
};

export default ApiKeyTester;