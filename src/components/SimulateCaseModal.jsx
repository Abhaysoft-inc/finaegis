import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { simulationPresets } from '../data/mockCases';
import {
  HiXMark,
  HiPlay,
  HiArrowPath
} from 'react-icons/hi2';

export default function SimulateCaseModal({ isOpen, onClose }) {
  const { simulationState, runSimulation, settings, setSettings } = useBank();
  const [selectedPresetId, setSelectedPresetId] = useState(simulationPresets[0].id);

  if (!isOpen) return null;

  const handleStartSimulation = () => {
    runSimulation(selectedPresetId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-xl rounded-lg bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Simulate Workflow Inflow</h3>
            <p className="text-xs text-slate-500">Inject automated customer verification scenarios</p>
          </div>
          <button
            onClick={onClose}
            disabled={simulationState.isRunning}
            className="p-1 rounded text-slate-400 hover:text-slate-700 transition-colors"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          
          {/* Preset Selector */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2 font-mono">
              Select Banking Scenario
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {simulationPresets.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => !simulationState.isRunning && setSelectedPresetId(preset.id)}
                    className={`p-3 rounded-md border transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300'
                    } ${simulationState.isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-semibold text-xs ${isSelected ? 'text-white' : 'text-slate-900'}`}>{preset.name}</span>
                      <span className={`text-[10px] font-mono px-1 py-0.2 rounded border ${
                        isSelected
                          ? 'bg-slate-800 text-slate-200 border-slate-700'
                          : preset.riskCategory.includes('Low')
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        {preset.riskCategory.split(' ')[0]}
                      </span>
                    </div>
                    <p className={`text-[11px] leading-normal ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                      {preset.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Speed settings */}
          <div className="flex items-center justify-between p-3 rounded-md bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-600">Simulation Speed:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSettings({ ...settings, simulationSpeed: 'normal' })}
                className={`px-2.5 py-1 rounded text-xs transition-colors border ${
                  settings.simulationSpeed === 'normal'
                    ? 'bg-slate-900 text-white border-slate-900 font-medium'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
                }`}
              >
                Standard (900ms)
              </button>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, simulationSpeed: 'fast' })}
                className={`px-2.5 py-1 rounded text-xs transition-colors border ${
                  settings.simulationSpeed === 'fast'
                    ? 'bg-slate-900 text-white border-slate-900 font-medium'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
                }`}
              >
                Fast (400ms)
              </button>
            </div>
          </div>

          {/* Live Autonomous Agent Terminal */}
          {simulationState.isRunning && (
            <div className="rounded-md border border-slate-300 bg-slate-900 text-white p-3.5 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-200">{simulationState.currentStep}</span>
                <span className="font-mono text-white font-bold">{simulationState.progress}%</span>
              </div>

              {/* Progress track */}
              <div className="w-full bg-slate-800 rounded-sm h-1.5 overflow-hidden">
                <div 
                  className="bg-white h-1.5 rounded-sm transition-all duration-200"
                  style={{ width: `${simulationState.progress}%` }}
                />
              </div>

              {/* Terminal Logs */}
              <div className="font-mono text-[11px] text-slate-300 space-y-1 max-h-36 overflow-y-auto pt-1">
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

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            disabled={simulationState.isRunning}
            className="px-3 py-1.5 rounded text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleStartSimulation}
            disabled={simulationState.isRunning}
            className={`px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              simulationState.isRunning
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {simulationState.isRunning ? (
              <>
                <HiArrowPath className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <HiPlay className="w-3.5 h-3.5" />
                <span>Execute Simulation</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
