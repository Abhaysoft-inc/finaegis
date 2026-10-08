import React from 'react';
import { useBank } from '../context/BankContext';
import { HiCheckCircle, HiExclamationTriangle, HiInformationCircle, HiXMark } from 'react-icons/hi2';

export default function ToastContainer() {
  const { toasts, removeToast } = useBank();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isDanger = toast.type === 'danger';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-2.5 p-3.5 rounded-lg border text-xs shadow-md bg-white ${
              isSuccess
                ? 'border-emerald-300 text-slate-900'
                : isDanger
                ? 'border-rose-300 text-slate-900'
                : isWarning
                ? 'border-amber-300 text-slate-900'
                : 'border-slate-300 text-slate-900'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <HiCheckCircle className="w-4 h-4 text-emerald-600" />}
              {isDanger && <HiExclamationTriangle className="w-4 h-4 text-rose-600" />}
              {isWarning && <HiExclamationTriangle className="w-4 h-4 text-amber-600" />}
              {!isSuccess && !isDanger && !isWarning && <HiInformationCircle className="w-4 h-4 text-slate-600" />}
            </div>
            <div className="flex-1 leading-snug font-medium text-slate-800">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 transition-colors shrink-0"
            >
              <HiXMark className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
