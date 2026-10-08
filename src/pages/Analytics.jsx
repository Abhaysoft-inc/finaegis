import React from 'react';
import { useBank } from '../context/BankContext';

export default function Analytics() {
  const { metrics } = useBank();

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900">Operations Velocity & Labor Metrics</h1>
          <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200">
            Internal Production Telemetry
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Comparative performance metrics measuring labor reduction, straight-through processing rates, and audit accuracy
        </p>
      </div>

      {/* Hero ROI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1.5 shadow-xs">
          <span className="text-[10px] uppercase font-mono font-medium text-slate-500">Total Labor Hours Saved</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">{metrics.hoursSaved} hrs</span>
            <span className="text-xs text-emerald-700 font-mono font-semibold">+94%</span>
          </div>
          <p className="text-[11px] text-slate-500">Calculated against manual baseline of 45 mins/task</p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1.5 shadow-xs">
          <span className="text-[10px] uppercase font-mono font-medium text-slate-500">Average Processing Time</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">1.4 min</span>
            <span className="text-xs text-slate-400 line-through font-mono">45.0m</span>
          </div>
          <p className="text-[11px] text-slate-500">96.8% acceleration from submission to approval</p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1.5 shadow-xs">
          <span className="text-[10px] uppercase font-mono font-medium text-slate-500">Labor Cost Avoidance</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-700 font-mono">$18,450</span>
            <span className="text-xs text-slate-500">This Cycle</span>
          </div>
          <p className="text-[11px] text-slate-500">Calculated at $24.80 reviewer cost/hour</p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1.5 shadow-xs">
          <span className="text-[10px] uppercase font-mono font-medium text-slate-500">Audit Discrepancy Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">0.02%</span>
            <span className="text-xs text-slate-400 line-through font-mono">4.8% manual</span>
          </div>
          <p className="text-[11px] text-slate-500">Zero missed sanctions or undeclared debt flags</p>
        </div>

      </div>

      {/* Comparative Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left: Workflow Comparison */}
        <div className="p-5 rounded-lg bg-white border border-slate-200 space-y-4 shadow-xs">
          <h2 className="text-sm font-semibold text-slate-900">Manual Processing vs AI Autonomous Execution</h2>
          
          <div className="space-y-4 text-xs">
            {/* Account Opening */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-slate-800">Account Opening KYC Verification</span>
                <span className="text-emerald-700 font-mono font-semibold">92% faster</span>
              </div>
              <div className="h-3.5 bg-slate-100 rounded-sm overflow-hidden flex">
                <div className="bg-slate-300 h-full flex items-center px-2 text-[9px] text-slate-700 font-mono" style={{ width: '100%' }}>
                  Manual: 45.0 min
                </div>
              </div>
              <div className="h-3.5 bg-slate-100 rounded-sm overflow-hidden flex">
                <div className="bg-slate-900 h-full flex items-center px-1 text-[9px] text-white font-bold font-mono" style={{ width: '10%' }}>
                  AI: 1.4m
                </div>
              </div>
            </div>

            {/* Account Closure */}
            <div className="space-y-1.5 pt-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-slate-800">Account Closure & Direct Debit Interception</span>
                <span className="text-emerald-700 font-mono font-semibold">95% faster</span>
              </div>
              <div className="h-3.5 bg-slate-100 rounded-sm overflow-hidden flex">
                <div className="bg-slate-300 h-full flex items-center px-2 text-[9px] text-slate-700 font-mono" style={{ width: '100%' }}>
                  Manual: 60.0 min
                </div>
              </div>
              <div className="h-3.5 bg-slate-100 rounded-sm overflow-hidden flex">
                <div className="bg-slate-900 h-full flex items-center px-1 text-[9px] text-white font-bold font-mono" style={{ width: '8%' }}>
                  AI: 1.8m
                </div>
              </div>
            </div>

            {/* Loan Statement Audit */}
            <div className="space-y-1.5 pt-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-slate-800">Commercial Bank Statement Audit (240+ Txns)</span>
                <span className="text-emerald-700 font-mono font-semibold">98% faster</span>
              </div>
              <div className="h-3.5 bg-slate-100 rounded-sm overflow-hidden flex">
                <div className="bg-slate-300 h-full flex items-center px-2 text-[9px] text-slate-700 font-mono" style={{ width: '100%' }}>
                  Manual: 180.0 min
                </div>
              </div>
              <div className="h-3.5 bg-slate-100 rounded-sm overflow-hidden flex">
                <div className="bg-slate-900 h-full flex items-center px-1 text-[9px] text-white font-bold font-mono" style={{ width: '6%' }}>
                  AI: 2.2m
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Workload Allocation */}
        <div className="p-5 rounded-lg bg-white border border-slate-200 space-y-4 flex flex-col justify-between shadow-xs">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 mb-1">Workload Allocation: AI vs Human Officers</h2>
            <p className="text-xs text-slate-500 mb-4">
              Autonomous agents execute repetitive verification tasks, reserving human intervention exclusively for regulatory edge-cases.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 block text-[10px] font-mono uppercase">Straight-Through (STP)</span>
                <span className="text-2xl font-bold font-mono text-slate-900">76.4%</span>
                <span className="text-[10px] text-slate-500 block">Zero human touch required</span>
              </div>

              <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 block text-[10px] font-mono uppercase">Human-In-The-Loop</span>
                <span className="text-2xl font-bold font-mono text-amber-800">23.6%</span>
                <span className="text-[10px] text-slate-500 block">1-click verify or edge-case override</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded bg-slate-50 border border-slate-200 text-xs">
            <span className="font-semibold text-slate-800 block mb-0.5">Audit Grade Assessment: A+</span>
            <span className="text-slate-500 text-[11px]">Customer onboarding drop-off reduced from 28% to 3.1%.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
