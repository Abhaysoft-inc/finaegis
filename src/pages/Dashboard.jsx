import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBank } from '../context/BankContext';
import {
  HiMagnifyingGlass,
  HiArrowRight,
  HiSparkles,
  HiCheckCircle,
  HiClock,
  HiShieldCheck,
  HiPlay
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
  const approvedCount = cases.filter((c) => c.status === 'approved_by_human' || c.status === 'auto_approved').length;
  const flaggedCount = cases.filter((c) => c.status === 'escalated' || c.status === 'rejected' || c.status === 'resubmission_requested').length;

  const getCustomerInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`;
    return name.slice(0, 2).toUpperCase();
  };

  const getWorkflowBadgeColor = (type) => {
    switch (type) {
      case 'account_closure':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200/80';
      case 'loan_audit':
        return 'bg-purple-50 text-purple-700 border border-purple-200/80';
      default:
        return 'bg-sky-50 text-sky-700 border border-sky-200/80';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* ============================================================== */}
      {/* TOP 3 OPERATIONS CARDS (SOFT FINTECH THEME & FEEL)             */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: NEEDS OFFICER SIGN-OFF */}
        <div className="soft-card soft-card-hover p-6 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                NEEDS OFFICER SIGN-OFF
              </span>
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
            </div>
            
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {pendingCount}
              </span>
              <span className="text-amber-600 font-bold text-sm">
                Pending action
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Awaiting 1-click human verification
            </span>
            <button
              onClick={() => setActiveTab('needs_review')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700"
            >
              Filter &darr;
            </button>
          </div>
        </div>

        {/* CARD 2: STRAIGHT-THROUGH RATE (STP) */}
        <div className="soft-card soft-card-hover p-6 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                STRAIGHT-THROUGH RATE (STP)
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {metrics.avgProcessTime} avg time
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {metrics.stpRate}%
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                Direct execution
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Resolved autonomously without manual touch</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, metrics.stpRate)}%` }}
              />
            </div>
          </div>
        </div>

        {/* CARD 3: LABOR HOURS SAVED TODAY */}
        <div className="soft-card soft-card-hover p-6 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                LABOR HOURS SAVED TODAY
              </span>
              <span className="text-xs font-semibold text-sky-500 bg-sky-50 px-2 py-0.5 rounded-full">
                +94% yield
              </span>
            </div>

            <div className="flex items-baseline gap-1.5 mt-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {metrics.hoursSaved} hrs
              </span>
              <span className="text-xs text-slate-400 font-medium">
                across {cases.length} cases
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400">
              Down from 45 min baseline per task
            </span>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* MAIN REVIEW WORKLIST TABLE (SOFT FINTECH THEME & FEEL)         */}
      {/* ============================================================== */}
      <div className="soft-card rounded-3xl p-6 bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
        
        {/* Table Filter Header */}
        <div className="space-y-4 pb-2 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Filter Tabs matching Soft Theme */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-50 rounded-2xl border border-slate-100">
              <button
                onClick={() => setActiveTab('needs_review')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'needs_review'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Needs Review ({pendingCount})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                All Tasks ({cases.length})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'approved'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Approved ({approvedCount})
              </button>
              <button
                onClick={() => setActiveTab('flagged')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'flagged'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Flagged / MLRO ({flaggedCount})
              </button>
            </div>

            {/* Workflow dropdown filter */}
            <select
              value={workflowFilter}
              onChange={(e) => setWorkflowFilter(e.target.value)}
              className="px-3.5 py-2 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="all">All Workflows</option>
              <option value="account_opening">Account Opening (KYC)</option>
              <option value="account_closure">Account Closure & Liquidation</option>
              <option value="loan_audit">Commercial Loan Audit</option>
            </select>
          </div>

          {/* Search bar */}
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by customer name, case ID, or document type..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200/80 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto pt-1">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider font-mono">
                <th className="py-3 px-4 font-semibold">Customer & Case</th>
                <th className="py-3 px-3 font-semibold">Workflow</th>
                <th className="py-3 px-3 font-semibold">AI Confidence</th>
                <th className="py-3 px-3 font-semibold">Key Finding / Status</th>
                <th className="py-3 pr-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((item) => {
                const isNeedsReview = item.status === 'needs_review';
                const isApproved = item.status === 'approved_by_human' || item.status === 'auto_approved';
                const isFlagged = item.status === 'escalated' || item.status === 'rejected' || item.status === 'resubmission_requested';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center font-mono shadow-xs shrink-0">
                          {getCustomerInitials(item.customerName)}
                        </div>
                        <div>
                          <Link 
                            to={`/verify/${item.id}`} 
                            className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors block text-xs"
                          >
                            {item.customerName}
                          </Link>
                          <span className="text-[11px] font-mono text-slate-400">
                            {item.id} &bull; {item.createdAt}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="space-y-0.5">
                        <span className="capitalize text-slate-900 font-semibold block">
                          {item.type.replace('_', ' ')}
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          {item.accountType}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-mono">
                      <div className="flex items-baseline gap-1">
                        <span className="font-bold text-slate-900">{item.aiConfidence}%</span>
                      </div>
                      <span className={`text-[10px] font-bold block ${
                        item.riskScore < 20 ? 'text-emerald-600' : item.riskScore < 60 ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        Risk {item.riskScore}/100
                      </span>
                    </td>

                    <td className="py-3.5 px-3 max-w-sm">
                      <div className="flex items-center gap-1.5 mb-1">
                        {isNeedsReview && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            Needs Review
                          </span>
                        )}
                        {item.status === 'auto_approved' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Auto-Approved
                          </span>
                        )}
                        {item.status === 'approved_by_human' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                            Officer Approved
                          </span>
                        )}
                        {isFlagged && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                            {item.status.replace(/_/g, ' ')}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 truncate text-[11px]">
                        {item.recommendation?.summary}
                      </p>
                    </td>

                    <td className="py-3.5 pr-4 text-right">
                      <Link
                        to={`/verify/${item.id}`}
                        className="px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs inline-flex items-center gap-1.5 shadow-xs transition-all active:scale-[0.98]"
                      >
                        <span>Inspect</span>
                        <HiArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
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
