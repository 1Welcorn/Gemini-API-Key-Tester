
import React from 'react';
import { ApiResult } from '../types';
import { TestStatus } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { AlertIcon } from './icons/AlertIcon';
import LoadingSpinner from './LoadingSpinner';

interface ResultDisplayProps {
  result: ApiResult;
}

const ResultDisplay = ({ result }: ResultDisplayProps) => {
  switch (result.status) {
    case TestStatus.LOADING:
      return (
        <div className="flex flex-col items-center justify-center text-center p-4 text-slate-400">
          <LoadingSpinner className="w-6 h-6 mb-2" />
          <p>Contacting Gemini API...</p>
        </div>
      );
    case TestStatus.SUCCESS:
      return (
        <div className="p-4 bg-green-900/50 border border-green-700 rounded-lg animate-fade-in">
          <div className="flex items-start space-x-3">
            <CheckIcon className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-green-300">Success!</h3>
              <p className="mt-1 text-sm text-green-200/90">Received response from Gemini API:</p>
              <p className="mt-2 text-sm text-slate-200 bg-slate-900/50 p-3 rounded-md border border-slate-700 font-mono whitespace-pre-wrap">{result.message}</p>
            </div>
          </div>
        </div>
      );
    case TestStatus.ERROR:
      return (
        <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg animate-fade-in">
          <div className="flex items-start space-x-3">
            <AlertIcon className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-red-300">Error</h3>
              <p className="mt-2 text-sm text-red-200/90 whitespace-pre-wrap">{result.message}</p>
            </div>
          </div>
        </div>
      );
    case TestStatus.IDLE:
    default:
      return (
        <div className="flex items-center justify-center h-full text-center p-4 text-slate-500 border-2 border-dashed border-slate-700 rounded-lg">
          <p>The test result will appear here.</p>
        </div>
      );
  }
};

export default ResultDisplay;
