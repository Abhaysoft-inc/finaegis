import React from 'react';
import { useBank } from '../context/BankContext';
import { HiCheck } from 'react-icons/hi2';

export default function Settings() {
  const { settings, setSettings, addToast } = useBank();

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Banking automation policies & threshold limits successfully updated.", "success");
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900">Agent Policy & Autonomy Rules Engine</h1>
          <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200">
            Policy Config
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure straight-through processing thresholds and human review triggers
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        
        {/* Section 1: AI Confidence & Auto-Approval Thresholds */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-4 shadow-xs">
          <div className="border-b border-slate-100 pb-2.5">
            <h2 className="font-semibold text-xs text-slate-900 uppercase tracking-wider font-mono">
              Confidence & Review Thresholds
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-medium text-slate-800">
                  Minimum AI Confidence for Straight-Through Auto-Approval
                </span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {settings.autoApprovalThreshold}%
                </span>
              </div>
              <input
                type="range"
                min="85"
                max="99"
                value={settings.autoApprovalThreshold}
                onChange={(e) => setSettings({ ...settings, autoApprovalThreshold: Number(e.target.value) })}
                className="w-full accent-slate-900 bg-slate-200 cursor-pointer h-1.5 rounded"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Applications with confidence scores above this threshold bypass manual officer review unless flagged by watchlists.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-medium text-slate-800">
                  Risk Score Threshold for Mandatory Officer Sign-off
                </span>
                <span className="font-mono font-bold text-amber-800 text-sm">
                  {settings.riskThresholdForManualReview} / 100
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                value={settings.riskThresholdForManualReview}
                onChange={(e) => setSettings({ ...settings, riskThresholdForManualReview: Number(e.target.value) })}
                className="w-full accent-amber-600 bg-slate-200 cursor-pointer h-1.5 rounded"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Any case with risk score strictly above this number is intercepted and queued in the worklist.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Account Closure Rules */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
          <div className="border-b border-slate-100 pb-2.5">
            <h2 className="font-semibold text-xs text-slate-900 uppercase tracking-wider font-mono">
              Account Closure Protocols
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoRevokeStandingOrders}
                onChange={(e) => setSettings({ ...settings, autoRevokeStandingOrders: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-0"
              />
              <div>
                <span className="font-medium text-slate-800 block">
                  Autonomous Standing Order & Mandate Interception
                </span>
                <span className="text-[11px] text-slate-500">
                  Automatically generate cancellation notices to recurring merchants (Netflix, Gyms, Utilities) upon ledger zeroization.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifyCustomerInstantSms}
                onChange={(e) => setSettings({ ...settings, notifyCustomerInstantSms: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-0"
              />
              <div>
                <span className="font-medium text-slate-800 block">
                  Automated Customer Notice Dispatch
                </span>
                <span className="text-[11px] text-slate-500">
                  Transmit account opening welcome package or closure liquidation statement immediately upon officer sign-off.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <HiCheck className="w-4 h-4" />
            <span>Save Policies</span>
          </button>
        </div>

      </form>

    </div>
  );
}
