import React from 'react';
import { NavLink } from 'react-router-dom';
import { useBank } from '../context/BankContext';
import {
  HiSquares2X2,
  HiInboxStack,
  HiCpuChip,
  HiClipboardDocumentCheck,
  HiChartBar,
  HiAdjustmentsHorizontal,
  HiShieldCheck
} from 'react-icons/hi2';

export default function Sidebar() {
  const { metrics } = useBank();

  const navItems = [
    {
      to: "/",
      label: "Overview",
      icon: HiSquares2X2,
      badge: null
    },
    {
      to: "/queue",
      label: "Review Queue",
      icon: HiInboxStack,
      badge: metrics.pendingReview > 0 ? metrics.pendingReview : null,
      badgeColor: "bg-amber-50 text-amber-800 border border-amber-200"
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

  return (
    <aside className="w-56 shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between hidden md:flex h-[calc(100vh-3.5rem)] sticky top-14">
      <div className="p-3 space-y-4">
        
        {/* Navigation list */}
        <div className="space-y-0.5">
          <p className="px-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Efficiency summary box */}
        <div className="rounded border border-slate-200 bg-slate-50/80 p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Hours Saved</span>
            <span className="font-mono font-bold text-slate-900">{metrics.hoursSaved}h</span>
          </div>

          <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 text-[11px]">
            <span className="text-slate-500">STP Direct Rate</span>
            <span className="font-mono font-medium text-slate-700">{metrics.stpRate}%</span>
          </div>
        </div>

      </div>

      {/* Compliance footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <HiShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
          <span>SOC2 & FedRAMP Verified</span>
        </div>
      </div>
    </aside>
  );
}
