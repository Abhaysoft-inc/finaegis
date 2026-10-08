import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import {
  HiMagnifyingGlass,
  HiArrowDownTray
} from 'react-icons/hi2';

export default function AuditLog() {
  const { auditLogs, addToast } = useBank();
  const [filterAction, setFilterAction] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter((log) => {
    if (filterAction !== 'all' && log.action !== filterAction) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        log.customer.toLowerCase().includes(q) ||
        log.officer.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.caseId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExport = () => {
    addToast("Exporting immutable compliance audit ledger as SOC2 bundle...", "info");
  };

  return (
    <div className="p-6 space-y-5 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Regulatory Compliance Audit Ledger</h1>
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200">
              SOC 2 / ISO 27001
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable record of AI autonomous recommendations and human officer verifications
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 border border-slate-300 text-xs font-medium text-slate-700 transition-colors self-start sm:self-auto shadow-xs"
        >
          <HiArrowDownTray className="w-3.5 h-3.5" />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer, officer, case ID..."
            className="w-full pl-9 pr-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Filter Event:</span>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-2.5 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 focus:outline-none focus:border-slate-400"
          >
            <option value="all">All Events</option>
            <option value="APPROVE">Officer Approvals</option>
            <option value="AUTO_APPROVAL_STP">AI Auto STP</option>
            <option value="REQUEST_RESUBMISSION">Resubmission Requests</option>
            <option value="HUMAN_ESCALATION">Escalations</option>
            <option value="ANOMALY_FLAG">Anomaly Flags</option>
          </select>
        </div>
      </div>

      {/* Log Feed Table */}
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-mono">
                <th className="py-2.5 px-4 font-medium">Timestamp</th>
                <th className="py-2.5 px-3 font-medium">Actor / Officer</th>
                <th className="py-2.5 px-3 font-medium">Action</th>
                <th className="py-2.5 px-3 font-medium">Case Ref</th>
                <th className="py-2.5 px-3 font-medium">Customer</th>
                <th className="py-2.5 pr-4 font-medium">Details & Regulatory Narrative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  <td className="py-3 px-3 text-slate-800 font-sans font-medium">
                    {log.officer}
                  </td>

                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      log.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : log.type === 'danger'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {log.action}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-slate-700">
                    {log.caseId}
                  </td>

                  <td className="py-3 px-3 text-slate-900 font-sans font-medium">
                    {log.customer}
                  </td>

                  <td className="py-3 pr-4 text-slate-600 text-xs font-sans leading-relaxed max-w-md">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
