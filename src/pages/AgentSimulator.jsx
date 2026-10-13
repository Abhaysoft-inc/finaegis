import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBank } from '../context/BankContext';
import { simulationPresets } from '../data/mockCases';
import {
  HiPlay,
  HiCpuChip,
  HiArrowPath,
  HiDocumentText,
  HiEye,
  HiShieldCheck,
  HiCheckCircle,
  HiExclamationTriangle,
  HiSparkles,
  HiArrowRight,
  HiFingerPrint,
  HiScale,
  HiMagnifyingGlass,
  HiClock,
  HiAdjustmentsHorizontal
} from 'react-icons/hi2';

export default function AgentSimulator() {
  const { simulationState, runSimulation } = useBank();
  const [selectedPresetId, setSelectedPresetId] = useState(simulationPresets[0].id);

  const selectedPreset = simulationPresets.find(p => p.id === selectedPresetId) || simulationPresets[0];

  const handleStartSimulation = () => {
    if (simulationState.isRunning) return;
    runSimulation(selectedPresetId);
  };

  // 4 clear visual pipeline stages
  const pipelineStages = [
    {
      id: 1,
      title: "1. Document Ingestion",
      icon: HiDocumentText,
      description: "Secure upload & artifact parsing",
      activeAt: 5,
      completedAt: 25,
    },
    {
      id: 2,
      title: "2. Forensic OCR & Biometrics",
      icon: HiEye,
      description: "MRZ checksums & tamper detection",
      activeAt: 25,
      completedAt: 50,
    },
    {
      id: 3,
      title: "3. Policy & Sanctions Audit",
      icon: HiScale,
      description: "OFAC, AML, and core ledger check",
      activeAt: 50,
      completedAt: 75,
    },
    {
      id: 4,
      title: "4. Autonomous Verdict",
      icon: HiShieldCheck,
      description: "STP auto-approve or officer routing",
      activeAt: 75,
      completedAt: 100,
    },
  ];

  const getStageStatus = (stage) => {
    if (!simulationState.isRunning && simulationState.progress === 0) return 'idle';
    if (simulationState.progress >= stage.completedAt) return 'completed';
    if (simulationState.progress >= stage.activeAt) return 'active';
    return 'pending';
  };

  // Production Agents in Plain English
  const agentsFleet = [
    {
      id: "agent-doc-forensics",
      name: "Document Forensics & OCR Agent",
      role: "Identity & Forgery Verification",
      icon: HiFingerPrint,
      badge: "Govt ID Specialist",
      latency: "28ms",
      accuracy: "99.8%",
      tasksToday: 342,
      plainExplanation: "Scans passports and driver's licenses, extracts name and ID numbers, and checks for Photoshop edits, font tampering, or altered numbers.",
      skills: ["Passport Parser", "Utility Normalizer", "MRZ Checksum"]
    },
    {
      id: "agent-ledger-liquidation",
      name: "Core Ledger Liquidation Agent",
      role: "Account Balances & Wire Payouts",
      icon: HiScale,
      badge: "Accounting Engine",
      latency: "14ms",
      accuracy: "100%",
      tasksToday: 89,
      plainExplanation: "Calculates net payouts for closing accounts, halts recurring direct debits (like gym/Netflix), and sets aside escrow buffers for pending charges.",
      skills: ["Debit Interception", "Wire Settlement", "Escrow Buffer Hold"]
    },
    {
      id: "agent-cashflow-audit",
      name: "Cash Flow & Hidden Debt Auditor",
      role: "Underwriting & Statement Scanner",
      icon: HiDocumentText,
      badge: "Credit Audit",
      latency: "64ms",
      accuracy: "98.4%",
      tasksToday: 116,
      plainExplanation: "Scans bank statements over months to find hidden or undeclared loans and recalculates whether a customer can actually afford a new loan.",
      skills: ["Hidden Debt Detector", "DSCR Dynamic Math", "Income Verifier"]
    },
    {
      id: "agent-fincen-pep",
      name: "Sanctions & FinCEN Sentinel",
      role: "Regulatory Compliance & AML",
      icon: HiShieldCheck,
      badge: "Security Watchdog",
      latency: "42ms",
      accuracy: "99.9%",
      tasksToday: 512,
      plainExplanation: "Instantly screens names against international terrorist watchlists, government sanctions (OFAC), and Politically Exposed Person (PEP) lists.",
      skills: ["Sanctions Cross-Check", "PEP Screening", "Adverse Media Search"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Top Simulator Banner */}
      <div className="soft-card rounded-3xl p-6 bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interactive Simulation Cockpit
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
              Multi-Agent Orchestrator
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            Test AI Decision Making in Real-Time
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Select a customer case below, press <strong>Run Live Simulation</strong>, and watch how our 4 specialized AI agents inspect documents, flag risks, and make instant decisions.
          </p>
        </div>

        {/* Big Action CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleStartSimulation}
            disabled={simulationState.isRunning}
            className={`px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
              simulationState.isRunning
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 via-sky-500 to-sky-400 hover:from-blue-700 hover:to-sky-500 text-white shadow-blue-500/25 active:scale-[0.98]'
            }`}
          >
            {simulationState.isRunning ? (
              <>
                <HiArrowPath className="w-4 h-4 animate-spin text-white" />
                <span>Simulating ({simulationState.progress}%)...</span>
              </>
            ) : (
              <>
                <HiPlay className="w-4 h-4 text-white" />
                <span>Run Live Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>


      {/* ============================================================== */}
      {/* STEP 1: SELECT A TEST SCENARIO (CLEAN TYPOGRAPHY)              */}
      {/* ============================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Step 1: Choose a Test Scenario</h3>
            <p className="text-xs text-slate-400">Pick what type of customer application to simulate</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">4 Scenarios Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {simulationPresets.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            const isHighRisk = preset.riskCategory.includes("High");
            const isMediumRisk = preset.riskCategory.includes("Medium");

            return (
              <div
                key={preset.id}
                onClick={() => !simulationState.isRunning && setSelectedPresetId(preset.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/40 ring-2 ring-sky-500/20 shadow-sm'
                    : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                } ${simulationState.isRunning ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <div className="space-y-3">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full uppercase font-bold bg-white border border-slate-200 text-slate-600 shadow-2xs">
                      {preset.type.replace('_', ' ')}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isHighRisk 
                        ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                        : isMediumRisk
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      Risk: {preset.riskCategory.split(' ')[0]}
                    </span>
                  </div>

                  {/* Customer & Scenario Name */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">{preset.customerName}</h4>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">{preset.name}</p>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>
                </div>

                {/* Expected Outcome */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px]">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Expected AI Decision:</span>
                  <span className={`font-semibold mt-0.5 block ${
                    isHighRisk ? 'text-rose-600' : isMediumRisk ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {preset.expectedResult}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* ============================================================== */}
      {/* STEP 2: LIVE SIMULATION PIPELINE (ANIMATED STAGES)             */}
      {/* ============================================================== */}
      <div className="soft-card rounded-3xl p-6 bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Live AI Decision Pipeline
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulating scenario for: <strong className="text-slate-700">{selectedPreset.customerName}</strong> ({selectedPreset.name})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Pipeline Progress:</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-900">
              {simulationState.progress}%
            </span>
          </div>
        </div>

        {/* 4 Visual Pipeline Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineStages.map((stage) => {
            const status = getStageStatus(stage);
            const Icon = stage.icon;

            return (
              <div
                key={stage.id}
                className={`p-4 rounded-2xl border transition-all relative overflow-hidden ${
                  status === 'completed'
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : status === 'active'
                    ? 'border-sky-500 bg-sky-50/50 ring-2 ring-sky-500/20'
                    : 'border-slate-100 bg-slate-50/50 opacity-70'
                }`}
              >
                {/* Active scan line bar */}
                {status === 'active' && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-sky-400 animate-pulse" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl ${
                    status === 'completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : status === 'active'
                      ? 'bg-sky-500 text-white animate-bounce'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : status === 'active'
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {status === 'completed' ? 'PASSED ✓' : status === 'active' ? 'PROCESSING...' : 'WAITING'}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 tracking-tight">{stage.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">{stage.description}</p>
              </div>
            );
          })}
        </div>

        {/* Real-time Status Card & Document Scanner Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          
          {/* Left: Interactive Document Inspection Visual */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-50 p-5 border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800">Virtual Document Inflow</span>
                <span className="text-[10px] font-semibold text-slate-500">ID: DOC-SIM-8492</span>
              </div>

              {/* Simulated Document Preview Card with Scan Beam */}
              <div className="relative mt-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs overflow-hidden min-h-[140px] flex flex-col justify-between">
                {/* Laser scan animation when simulation is running */}
                {simulationState.isRunning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent shadow-lg shadow-sky-500/50 animate-[scan_2s_ease-in-out_infinite]" />
                )}

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold tracking-wider">
                    <span>UNITED STATES REGISTRY</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-600">ID VALIDATED</span>
                  </div>
                  <p className="text-sm font-extrabold text-slate-900 mt-2 tracking-wide">
                    {selectedPreset.customerName.toUpperCase()}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    ID-89214019 &bull; Issue: 2024 &bull; Exp: 2034
                  </p>
                </div>

                {/* Extracted Entity Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                    Face Vector: 99.1% match
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
                    Microprint OK
                  </span>
                  {selectedPreset.riskCategory.includes("High") && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold">
                      ⚠️ Inconsistent Font
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>OCR Processing Time:</span>
                <span className="font-bold text-slate-700">1.4s (vs 45m manual)</span>
              </div>
              <div className="flex justify-between">
                <span>Automated Extraction Yield:</span>
                <span className="font-bold text-emerald-600">99.8% precision</span>
              </div>
            </div>
          </div>

          {/* Right: Step-by-Step AI Reasoning Feed */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900 text-white p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <HiCpuChip className="w-4 h-4 text-sky-400" />
                  Real-Time Agent Reasoning Trail
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  {simulationState.isRunning ? 'Executing...' : 'Ready'}
                </span>
              </div>

              {/* Log Messages */}
              <div className="mt-3 space-y-2 text-xs max-h-48 overflow-y-auto pr-1">
                {simulationState.logs.length > 0 ? (
                  simulationState.logs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-slate-500 shrink-0 text-[10px] font-mono">[{log.time}]</span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0 ${
                        log.type === 'WARN'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : 'bg-sky-950 text-sky-400 border border-sky-800'
                      }`}>
                        {log.type}
                      </span>
                      <span className={log.type === 'WARN' ? 'text-rose-300 font-medium' : 'text-slate-300 font-normal'}>
                        {log.message}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-slate-500 text-xs">
                    Select a scenario above and click <span className="text-sky-400 font-bold">"Run Live Simulation"</span> to view the step-by-step reasoning trail.
                  </div>
                )}
              </div>
            </div>

            {/* Verdict Output Banner */}
            {simulationState.progress === 100 && (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-200 font-medium">
                    Simulation finished. Case injected into active review queue.
                  </span>
                </div>
                <Link
                  to="/"
                  className="px-3.5 py-1.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shrink-0"
                >
                  View in Dashboard &rarr;
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>


      {/* ============================================================== */}
      {/* STEP 3: THE 4 WORKER AGENTS (EXPLAINED IN PLAIN ENGLISH)       */}
      {/* ============================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Active AI Worker Agents Fleet</h3>
            <p className="text-xs text-slate-400">The 4 autonomous services working under the hood</p>
          </div>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            All 4 Agents Online
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agentsFleet.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className="soft-card soft-card-hover p-5 bg-white rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 tracking-tight">{agent.name}</h4>
                      <p className="text-[11px] text-slate-400 font-medium">{agent.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-200">
                    {agent.badge}
                  </span>
                </div>

                {/* Plain English Description */}
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                  {agent.plainExplanation}
                </p>

                {/* Metric Strip */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Speed</span>
                    <span className="font-bold text-xs text-slate-900">{agent.latency}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Accuracy</span>
                    <span className="font-bold text-xs text-emerald-600">{agent.accuracy}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Handled Today</span>
                    <span className="font-bold text-xs text-slate-900">{agent.tasksToday}</span>
                  </div>
                </div>

                {/* Capability Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {agent.skills.map((skill, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100/80 text-slate-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
