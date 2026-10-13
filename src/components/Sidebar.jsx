import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useBank } from '../context/BankContext';
import {
  HiSquares2X2,
  HiInboxStack,
  HiClipboardDocumentCheck,
  HiChartBar,
  HiCpuChip,
  HiAdjustmentsHorizontal,
  HiQuestionMarkCircle,
  HiArrowRightOnRectangle,
  HiViewColumns,
  HiSparkles,
  HiShieldCheck
} from 'react-icons/hi2';

export default function Sidebar({ onOpenSimulateModal }) {
  const { metrics } = useBank();

  const mainNav = [
    {
      to: "/",
      label: "Dashboard",
      icon: HiSquares2X2,
      badge: null
    },
    {
      to: "/queue",
      label: "Review Queue",
      icon: HiInboxStack,
      badge: metrics.pendingReview > 0 ? metrics.pendingReview : null
    },
    {
      to: "/simulator",
      label: "Agent Simulator",
      icon: HiCpuChip,
      badge: null
    },
    {
      to: "/audit",
      label: "Audit Ledger",
      icon: HiClipboardDocumentCheck,
      badge: null
    },
    {
      to: "/analytics",
      label: "Operations ROI",
      icon: HiChartBar,
      badge: null
    },
    {
      to: "/settings",
      label: "Policy Engine",
      icon: HiAdjustmentsHorizontal,
      badge: null
    }
  ];

  const bottomNav = [
    {
      to: "/help",
      label: "Help & Rules",
      icon: HiQuestionMarkCircle
    },
    {
      to: "/logout",
      label: "Sign Out",
      icon: HiArrowRightOnRectangle
    }
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#f6f8fb] border-r border-slate-200/70 flex flex-col justify-between hidden md:flex h-screen sticky top-0 px-4 py-6 select-none overflow-y-auto">
      <div className="space-y-6">
        
        {/* Brand Row with AEGIS Logo and Window Toggle */}
        <div className="flex items-center justify-between px-2">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="/aegis-logo.png" 
              alt="AEGIS" 
              className="h-5.5 w-auto object-contain transition-opacity group-hover:opacity-85" 
            />
          </Link>
          <button 
            type="button" 
            className="h-8 w-8 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 flex items-center justify-center transition-colors"
            title="Toggle Sidebar"
          >
            <HiViewColumns className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200/60'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/40'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-sky-100 text-sky-800">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Secondary / Bottom Utilities */}
        <div className="pt-2 border-t border-slate-200/60 space-y-1">
          {bottomNav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.label === 'Sign Out' ? () => alert('Signed in as Senior Officer Sarah Jenkins (ID #8491). Session active.') : undefined}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-2xl text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-200/40 transition-all text-left"
              >
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Upgrade / Simulation Card at Bottom of Sidebar */}
      <div className="mt-6 p-4 rounded-3xl bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900">Aegis Autonomy</h4>
            <span className="text-[10px] font-mono font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded">
              v4.2 PROD
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Autonomous STP verification & escrow liquidation engine active.
          </p>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>Direct STP Target:</span>
            <span className="font-semibold text-slate-700">{metrics.stpRate}% / 95%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, metrics.stpRate)}%` }}
            />
          </div>
        </div>

        <button 
          onClick={onOpenSimulateModal}
          className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-700 hover:to-sky-500 rounded-2xl shadow-md shadow-blue-500/25 transition-all transform active:scale-[0.98] flex items-center justify-center gap-1.5"
        >
          <HiSparkles className="w-3.5 h-3.5" />
          <span>Simulate Case Inflow</span>
        </button>
      </div>

      {/* Compliance Seal */}
      <div className="pt-3 px-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/50">
        <div className="flex items-center gap-1.5">
          <HiShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>SOC2 & FedRAMP Verified</span>
        </div>
      </div>

    </aside>
  );
}
