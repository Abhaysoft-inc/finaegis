import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import {
  HiMagnifyingGlass,
  HiBell,
  HiPlay,
  HiArrowPath,
  HiCheckCircle,
  HiExclamationTriangle
} from 'react-icons/hi2';

export default function TopHeader({ onOpenSimulateModal }) {
  const { simulationState, auditLogs } = useBank();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const recentAlerts = auditLogs.slice(0, 4);

  return (
    <header className="w-full bg-[#f6f8fb] px-6 sm:px-8 pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left: Operations Header & Live AI Engine Status */}
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Operations Overview
          </h1>

        </div>
        <p className="text-xs text-slate-400 mt-1">
          AI document verification, account closure liquidation, and officer review queue.
        </p>
      </div>

      {/* Right: Search, Simulate Inflow CTA, Notification Bell & Officer Profile */}
      <div className="flex items-center gap-3">
        {/* Search Bar with ⌘ K */}
        <div className="relative hidden sm:flex items-center">
          <HiMagnifyingGlass className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search cases, customers..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-56 lg:w-64 pl-9 pr-12 py-2 text-xs bg-white border border-slate-200/80 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all"
          />
          <div className="absolute right-3 flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>

        {/* Simulate Case Action CTA */}
        <button
          onClick={onOpenSimulateModal}
          disabled={simulationState.isRunning}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold transition-all shadow-xs ${simulationState.isRunning
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              : 'bg-slate-900 hover:bg-slate-800 text-white border border-transparent shadow-sm hover:shadow active:scale-[0.98]'
            }`}
        >
          {simulationState.isRunning ? (
            <>
              <HiArrowPath className="w-3.5 h-3.5 animate-spin text-sky-400" />
              <span>Simulating... ({simulationState.progress}%)</span>
            </>
          ) : (
            <>
              <HiPlay className="w-3.5 h-3.5 text-sky-400" />
              <span>Simulate Incoming Case</span>
            </>
          )}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-9 w-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs transition-all relative"
            title="Notifications"
          >
            <HiBell className="w-4 h-4 text-slate-500" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-xl border border-slate-100 p-4 z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Live AI Diagnostics</span>
                <span className="text-[10px] font-mono text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full font-semibold">
                  3 Real-time
                </span>
              </div>
              <div className="space-y-2">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 transition-colors text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 text-[11px]">{alert.customer}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{alert.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{alert.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Officer Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200/70">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-bold text-slate-900">Sarah Jenkins</span>
            <span className="text-[10px] text-slate-400 font-mono">Officer #8491</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 text-white font-bold text-xs ring-2 ring-white shadow-xs flex items-center justify-center font-mono">
            SJ
          </div>
        </div>
      </div>
    </header>
  );
}
