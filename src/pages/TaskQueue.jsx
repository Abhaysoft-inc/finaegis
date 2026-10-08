import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBank } from '../context/BankContext';
import {
  HiMagnifyingGlass,
  HiPlay,
  HiViewColumns,
  HiTableCells,
  HiCheck,
  HiArrowRight
} from 'react-icons/hi2';

export default function TaskQueue({ onOpenSimulateModal }) {
  const { cases, resolveCase } = useBank();
  const [activeTab, setActiveTab] = useState('all');
  const [workflowFilter, setWorkflowFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaseIds, setSelectedCaseIds] = useState([]);
  const [viewMode, setViewMode] = useState('table');

  const filteredCases = cases.filter((c) => {
    if (activeTab === 'needs_review' && c.status !== 'needs_review') return false;
    if (activeTab === 'completed' && c.status !== 'approved_by_human' && c.status !== 'auto_approved') return false;
    if (activeTab === 'flagged' && c.status !== 'escalated' && c.status !== 'rejected' && c.status !== 'resubmission_requested') return false;

    if (workflowFilter !== 'all' && c.type !== workflowFilter) return false;
    if (priorityFilter !== 'all' && c.priority.toLowerCase() !== priorityFilter.toLowerCase()) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        c.customerName.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCaseIds(filteredCases.map((c) => c.id));
    } else {
      setSelectedCaseIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedCaseIds.includes(id)) {
      setSelectedCaseIds(selectedCaseIds.filter((item) => item !== id));
    } else {
      setSelectedCaseIds([...selectedCaseIds, id]);
    }
  };

  const handleBulkApprove = () => {
    selectedCaseIds.forEach((id) => {
      resolveCase(id, "APPROVE", "Bulk human authorization executed by lead verification officer.");
    });
    setSelectedCaseIds([]);
  };

  return (
    <div className="p-6 space-y-5 max-w-6xl mx-auto">
      
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Task Review Worklist</h1>
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200">
              {filteredCases.length} tasks
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational human-in-the-loop queue with AI pre-scoring and compliance packages
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded bg-slate-100 border border-slate-200 p-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'table' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table view"
            >
              <HiTableCells className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'kanban' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Kanban view"
            >
              <HiViewColumns className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenSimulateModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
          >
            <HiPlay className="w-3.5 h-3.5" />
            <span>Simulate Case</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-1 text-xs">
            {[
              { id: 'all', label: 'All Tasks' },
              { id: 'needs_review', label: 'Needs Officer Review' },
              { id: 'completed', label: 'Approved' },
              { id: 'flagged', label: 'Flagged / Escalated' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <select
              value={workflowFilter}
              onChange={(e) => setWorkflowFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 focus:outline-none focus:border-slate-400"
            >
              <option value="all">All Workflows</option>
              <option value="account_opening">Account Opening (KYC)</option>
              <option value="account_closure">Account Closure & Liquidation</option>
              <option value="loan_audit">Commercial Loan Audit</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 focus:outline-none focus:border-slate-400"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Search input & Bulk Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name, case ID..."
              className="w-full pl-9 pr-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
            />
          </div>

          {selectedCaseIds.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs">
              <span className="text-slate-700 font-mono">
                {selectedCaseIds.length} selected
              </span>
              <button
                onClick={handleBulkApprove}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors flex items-center gap-1 text-xs"
              >
                <HiCheck className="w-3.5 h-3.5" />
                <span>Bulk 1-Click Approve</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* View: Table */}
      {viewMode === 'table' ? (
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-mono">
                  <th className="py-2.5 px-4 w-8">
                    <input
                      type="checkbox"
                      checked={selectedCaseIds.length === filteredCases.length && filteredCases.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-300 text-slate-900 focus:ring-0"
                    />
                  </th>
                  <th className="py-2.5 px-3 font-medium">Customer / Case</th>
                  <th className="py-2.5 px-3 font-medium">Type</th>
                  <th className="py-2.5 px-3 font-medium">Confidence & Risk</th>
                  <th className="py-2.5 px-3 font-medium">AI Finding</th>
                  <th className="py-2.5 px-3 font-medium">Status</th>
                  <th className="py-2.5 pr-4 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCases.map((item) => {
                  const isSelected = selectedCaseIds.includes(item.id);

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        isSelected ? 'bg-slate-50/90' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(item.id)}
                          className="rounded border-slate-300 text-slate-900 focus:ring-0"
                        />
                      </td>

                      <td className="py-3 px-3">
                        <Link
                          to={`/verify/${item.id}`}
                          className="font-semibold text-slate-900 hover:underline"
                        >
                          {item.customerName}
                        </Link>
                        <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                          <span>{item.id}</span>
                          <span>•</span>
                          <span>{item.createdAt}</span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="capitalize text-slate-800 font-medium">
                          {item.type.replace('_', ' ')}
                        </span>
                        <span className="text-[11px] text-slate-500 block font-mono">
                          {item.accountType}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-mono">
                        <span className="font-bold text-slate-900">{item.aiConfidence}%</span>
                        <span className="text-[10px] text-slate-500 block">
                          Risk {item.riskScore}/100
                        </span>
                      </td>

                      <td className="py-3 px-3 max-w-xs">
                        <p className="text-slate-700 truncate text-[11px]">
                          {item.recommendation?.summary}
                        </p>
                        <span className="text-[10px] font-mono text-slate-500">
                          +{item.timeSavedMinutes}m saved
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                          item.status === 'needs_review'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : item.status === 'auto_approved'
                            ? 'bg-slate-100 text-slate-800 border-slate-200'
                            : item.status === 'approved_by_human'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          {item.status.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td className="py-3 pr-4 text-right">
                        <Link
                          to={`/verify/${item.id}`}
                          className="px-2.5 py-1 rounded border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium transition-colors inline-block"
                        >
                          Inspect
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-semibold text-xs text-slate-700 uppercase">Needs Officer Review</span>
              <span className="font-mono text-xs px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                {cases.filter((c) => c.status === 'needs_review').length}
              </span>
            </div>
            <div className="space-y-2">
              {cases.filter((c) => c.status === 'needs_review').map((c) => (
                <Link
                  key={c.id}
                  to={`/verify/${c.id}`}
                  className="block p-3 rounded bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 text-xs">{c.customerName}</span>
                    <span className="text-[10px] font-mono text-slate-500">{c.aiConfidence}%</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{c.recommendation?.summary}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-semibold text-xs text-slate-700 uppercase">Completed</span>
              <span className="font-mono text-xs px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                {cases.filter((c) => c.status === 'approved_by_human' || c.status === 'auto_approved').length}
              </span>
            </div>
            <div className="space-y-2">
              {cases.filter((c) => c.status === 'approved_by_human' || c.status === 'auto_approved').map((c) => (
                <Link
                  key={c.id}
                  to={`/verify/${c.id}`}
                  className="block p-3 rounded bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 text-xs">{c.customerName}</span>
                    <span className="text-[10px] font-mono text-emerald-700 font-medium">VERIFIED</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{c.recommendation?.summary}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-semibold text-xs text-slate-700 uppercase">Flagged / MLRO</span>
              <span className="font-mono text-xs px-1.5 py-0.2 rounded bg-rose-50 text-rose-800 border border-rose-200 font-bold">
                {cases.filter((c) => c.status === 'escalated' || c.status === 'rejected' || c.status === 'resubmission_requested').length}
              </span>
            </div>
            <div className="space-y-2">
              {cases.filter((c) => c.status === 'escalated' || c.status === 'rejected' || c.status === 'resubmission_requested').map((c) => (
                <Link
                  key={c.id}
                  to={`/verify/${c.id}`}
                  className="block p-3 rounded bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 text-xs">{c.customerName}</span>
                    <span className="text-[10px] font-mono text-rose-700 capitalize">{c.status.replace(/_/g, ' ')}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{c.recommendation?.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
