import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBank } from '../context/BankContext';
import {
  HiPlay,
  HiArrowRight,
  HiMagnifyingGlass,
  HiCheckCircle,
  HiClock
} from 'react-icons/hi2';

export default function Dashboard({ onOpenSimulateModal }) {
  const { cases, metrics } = useBank();
  const [activeTab, setActiveTab] = useState('needs_review'); // 'needs_review' | 'all' | 'approved' | 'flagged'
  const [workflowFilter, setWorkflowFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = cases.filter((c) => {
    // Tab filter
    if (activeTab === 'needs_review' && c.status !== 'needs_review') return false;
    if (activeTab === 'approved' && c.status !== 'approved_by_human' && c.status !== 'auto_approved') return false;
    if (activeTab === 'flagged' && c.status !== 'escalated' && c.status !== 'rejected' && c.status !== 'resubmission_requested') return false;

    // Workflow type
    if (workflowFilter !== 'all' && c.type !== workflowFilter) return false;

    // Search query
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

  const pendingCount = cases.filter((c) => c.status === 'needs_review').length;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Operations Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            AI document verification, account closure liquidation, and officer review queue.
          </p>
        </div>

        <button
          onClick={onOpenSimulateModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors self-start sm:self-auto shadow-sm"
        >
          <HiPlay className="w-3.5 h-3.5" />
          <span>Simulate Incoming Case</span>
        </button>
      </div>

      {/* 3 Key Metrics - Clean, Uncluttered, Spaced */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
            Needs Officer Sign-off
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-slate-900">{metrics.pendingReview}</span>
            <span className="text-xs text-amber-700 font-medium">Pending action</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Awaiting 1-click human verification
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
            Straight-Through Rate (STP)
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-slate-900">{metrics.stpRate}%</span>
            <span className="text-xs text-emerald-700 font-medium font-mono">1.4m avg time</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Resolved autonomously without manual touch
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
            Labor Hours Saved Today
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-slate-900">{metrics.hoursSaved} hrs</span>
            <span className="text-xs text-slate-500">across {cases.length} cases</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Down from 45 min baseline per task
          </p>
        </div>
      </div>

      {/* Main Focus: Clean Worklist Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        
        {/* Table Filter Header */}
        <div className="p-4 border-b border-slate-200 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('needs_review')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'needs_review'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Needs Review ({pendingCount})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                All Tasks ({cases.length})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'approved'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setActiveTab('flagged')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'flagged'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Flagged / MLRO
              </button>
            </div>

            {/* Workflow dropdown filter */}
            <select
              value={workflowFilter}
              onChange={(e) => setWorkflowFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-md bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-slate-400"
            >
              <option value="all">All Workflows</option>
              <option value="account_opening">Account Opening (KYC)</option>
              <option value="account_closure">Account Closure & Liquidation</option>
              <option value="loan_audit">Commercial Loan Audit</option>
            </select>
          </div>

          {/* Search bar */}
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by customer name, case ID, or document type..."
              className="w-full pl-9 pr-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-mono">
                <th className="py-2.5 px-4 font-medium">Customer & Case</th>
                <th className="py-2.5 px-3 font-medium">Workflow</th>
                <th className="py-2.5 px-3 font-medium">AI Confidence</th>
                <th className="py-2.5 px-3 font-medium">Key Finding / Status</th>
                <th className="py-2.5 pr-4 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((item) => {
                const isNeedsReview = item.status === 'needs_review';
                const isApproved = item.status === 'approved_by_human' || item.status === 'auto_approved';
                const isFlagged = item.status === 'escalated' || item.status === 'rejected' || item.status === 'resubmission_requested';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <Link to={`/verify/${item.id}`} className="font-semibold text-slate-900 hover:underline block text-xs">
                        {item.customerName}
                      </Link>
                      <span className="text-[11px] font-mono text-slate-500">
                        {item.id} • {item.createdAt}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="capitalize text-slate-800 font-medium">
                        {item.type.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
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
                      <div className="flex items-center gap-1.5 mb-1">
                        {isNeedsReview && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                            Needs Review
                          </span>
                        )}
                        {item.status === 'auto_approved' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-800 border border-slate-200">
                            Auto-Approved
                          </span>
                        )}
                        {item.status === 'approved_by_human' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Officer Approved
                          </span>
                        )}
                        {isFlagged && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-rose-50 text-rose-800 border border-rose-200">
                            {item.status.replace(/_/g, ' ')}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 truncate text-[11px]">
                        {item.recommendation?.summary}
                      </p>
                    </td>

                    <td className="py-3 pr-4 text-right">
                      <Link
                        to={`/verify/${item.id}`}
                        className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium transition-colors text-xs inline-flex items-center gap-1"
                      >
                        <span>Inspect</span>
                        <HiArrowRight className="w-3 h-3 text-slate-400" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
