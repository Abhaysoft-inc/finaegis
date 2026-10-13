import React from 'react';
import { Link } from 'react-router-dom';
import { useBank } from '../context/BankContext';
import { 
  HiPlay,
  HiArrowPath
} from 'react-icons/hi2';

export default function Navbar({ onOpenSimulateModal }) {
  const { metrics, simulationState } = useBank();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        
        {/* Brand & System Status */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/aegis-logo.png" 
              alt="AEGIS" 
              className="h-5 sm:h-5.5 w-auto object-contain transition-opacity group-hover:opacity-80" 
            />
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Operations
              </span>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                PROD v4.2
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
            <span>AI Verification Engine Online (38ms)</span>
          </div>
        </div>

        {/* Center / Action: Live Simulation CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSimulateModal}
            disabled={simulationState.isRunning}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
              simulationState.isRunning
                ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-slate-800 text-white border-transparent'
            }`}
          >
            {simulationState.isRunning ? (
              <>
                <HiArrowPath className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating... ({simulationState.progress}%)</span>
              </>
            ) : (
              <>
                <HiPlay className="w-3.5 h-3.5" />
                <span>Simulate Inflow</span>
              </>
            )}
          </button>

          {/* Officer Profile */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-medium text-slate-900">Sarah Jenkins</span>
              <span className="text-[10px] text-slate-500 font-mono">Officer #8491</span>
            </div>
            <div className="h-7 w-7 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-mono text-xs text-slate-700 font-semibold">
              SJ
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
