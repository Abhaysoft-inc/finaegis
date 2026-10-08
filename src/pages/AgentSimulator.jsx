import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { simulationPresets } from '../data/mockCases';
import {
  HiPlay,
  HiCpuChip,
  HiArrowPath
} from 'react-icons/hi2';

export default function AgentSimulator() {
  const { simulationState, runSimulation } = useBank();
  const [selectedPresetId, setSelectedPresetId] = useState(simulationPresets[0].id);

  const agentsFleet = [
    {
      id: "agent-doc-forensics",
      name: "Document Forensics & OCR Agent",
      version: "v4.2.1-prod",
      status: "ONLINE",
      latency: "28ms",
      accuracy: "99.8%",
      tasksHandledToday: 342,
      description: "Extracts key-value entities, verifies holographic microprints, computes photo face cosine vectors, and validates MRZ checksums.",
      capabilities: ["Passport Parser", "Utility Address Normalizer", "Biometric Anti-Spoofing"]
    },
    {
      id: "agent-ledger-liquidation",
      name: "Core Ledger Liquidation Agent",
      version: "v3.1.0-prod",
      status: "ONLINE",
      latency: "14ms",
      accuracy: "100.0%",
      tasksHandledToday: 89,
      description: "Audits zero-balance compliance, pro-rates end-of-cycle interest, identifies active standing orders, and auto-generates NACHA cancellation mandates.",
      capabilities: ["Standing Order Interception", "Wire Settlement Calculation", "Escrow Estimator"]
    },
    {
      id: "agent-cashflow-audit",
      name: "Cash Flow & Hidden Debt Auditor",
      version: "v2.8.4-prod",
      status: "ONLINE",
      latency: "64ms",
      accuracy: "98.4%",
      tasksHandledToday: 116,
      description: "Scans 6-24 months of commercial bank statements, groups recurring debits, discovers undeclared merchant advances, and re-computes DSCR ratios.",
      capabilities: ["Merchant Advance Detector", "DSCR Dynamic Recalculation", "Payroll Verifier"]
    },
    {
      id: "agent-fincen-pep",
      name: "Sanctions & FinCEN Watchlist Sentinel",
      version: "v5.0.2-prod",
      status: "ONLINE",
      latency: "42ms",
      accuracy: "99.9%",
      tasksHandledToday: 512,
      description: "Cross-checks customer entities in real-time across OFAC SDN, EU Consolidated Lists, PEP directories, and adverse media archives.",
      capabilities: ["PEP Tier 1 & 2 Correlation", "Name Transliteration", "SAR Narrative Drafter"]
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                Multi-Agent Orchestrator
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              Autonomous Agent Simulation Lab
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspect active background worker agents, test real-world document ingestion scenarios, and observe step-by-step reasoning outputs.
            </p>
          </div>

          <button
            onClick={() => runSimulation(selectedPresetId)}
            disabled={simulationState.isRunning}
            className={`px-4 py-2 rounded-md font-medium text-xs flex items-center justify-center gap-2 transition-colors ${
              simulationState.isRunning
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-slate-800 text-white font-semibold'
            }`}
          >
            {simulationState.isRunning ? (
              <>
                <HiArrowPath className="w-3.5 h-3.5 animate-spin" />
                <span>Running Pipeline ({simulationState.progress}%)...</span>
              </>
            ) : (
              <>
                <HiPlay className="w-3.5 h-3.5" />
                <span>Execute Scenario</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Scenario Selector Grid */}
      <div className="space-y-2.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 block">
          Select Test Scenario
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {simulationPresets.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => !simulationState.isRunning && setSelectedPresetId(preset.id)}
                className={`p-3.5 rounded-lg border transition-colors cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                } ${simulationState.isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`font-semibold text-xs ${isSelected ? 'text-white' : 'text-slate-900'}`}>{preset.customerName}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                      isSelected
                        ? 'bg-slate-800 text-slate-200 border-slate-700'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {preset.riskCategory.split(' ')[0]}
                    </span>
                  </div>
                  <h4 className={`font-medium text-xs mb-1 ${isSelected ? 'text-slate-200' : 'text-slate-800'}`}>{preset.name}</h4>
                  <p className={`text-[11px] leading-normal mb-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>{preset.description}</p>
                </div>

                <div className={`pt-2 border-t text-[10px] font-mono ${isSelected ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-600'}`}>
                  <span>{preset.expectedResult}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Simulation Engine Box */}
      {simulationState.isRunning && (
        <div className="rounded-lg border border-slate-300 bg-slate-900 text-white p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-200">{simulationState.currentStep}</span>
            <span className="font-mono text-white font-bold">{simulationState.progress}%</span>
          </div>

          <div className="w-full bg-slate-800 rounded-sm h-1.5 overflow-hidden">
            <div
              className="bg-white h-1.5 rounded-sm transition-all duration-200"
              style={{ width: `${simulationState.progress}%` }}
            />
          </div>

          <div className="font-mono text-[11px] text-slate-300 space-y-1 max-h-44 overflow-y-auto pt-1">
            {simulationState.logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-slate-500 shrink-0">[{log.time}]</span>
                <span className={`px-1 py-0.2 rounded text-[9px] font-bold shrink-0 ${
                  log.type === 'WARN' ? 'bg-amber-950 text-amber-300' : 'bg-slate-800 text-slate-300'
                }`}>
                  {log.type}
                </span>
                <span className={log.type === 'WARN' ? 'text-amber-200' : 'text-slate-300'}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agents Fleet */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 block">
          Production Agent Fleet (4 Active Services)
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {agentsFleet.map((agent) => (
            <div
              key={agent.id}
              className="rounded-lg border border-slate-200 bg-white p-4 space-y-3 shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 text-xs">{agent.name}</h3>
                    <span className="text-[10px] font-mono text-slate-400">{agent.version}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{agent.description}</p>
                </div>

                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                  {agent.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">LATENCY</span>
                  <span className="font-mono text-xs font-semibold text-slate-900">{agent.latency}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">ACCURACY</span>
                  <span className="font-mono text-xs font-semibold text-slate-900">{agent.accuracy}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">HANDLED</span>
                  <span className="font-mono text-xs font-semibold text-slate-900">{agent.tasksHandledToday}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {agent.capabilities.map((cap, i) => (
                  <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
