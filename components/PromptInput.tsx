
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <label htmlFor="prompt" className="block text-sm font-medium text-slate-300">
        Test Prompt
      </label>
      <textarea
        id="prompt"
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a prompt to send to the Gemini API..."
        className="w-full p-3 bg-slate-900/70 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? (
          <>
            <LoadingSpinner className="w-5 h-5 mr-3" />
            Testing...
          </>
        ) : (
          'Test API Key'
        )}
      </button>
       <p className="text-center text-xs text-slate-500">
          Pro-tip: Use Cmd/Ctrl + Enter to submit.
       </p>
    </div>
  );
};

export default PromptInput;
