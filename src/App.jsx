import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BankProvider } from './context/BankContext';
import TopHeader from './components/TopHeader';
import Sidebar from './components/Sidebar';
import ToastContainer from './components/ToastContainer';
import SimulateCaseModal from './components/SimulateCaseModal';
import { HiBars3, HiXMark } from 'react-icons/hi2';

// Pages
import Dashboard from './pages/Dashboard';
import TaskQueue from './pages/TaskQueue';
import VerificationDetail from './pages/VerificationDetail';
import AgentSimulator from './pages/AgentSimulator';
import AuditLog from './pages/AuditLog';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function AppContent() {
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-800 flex flex-col md:flex-row font-sans selection:bg-slate-900 selection:text-white">
      {/* Mobile Top Header (only on < md screens) */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-50">
        <img src="/aegis-logo.png" alt="AEGIS" className="h-5 w-auto object-contain" />
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 rounded-lg hover:bg-slate-100"
        >
          {isMobileMenuOpen ? <HiXMark className="w-5 h-5" /> : <HiBars3 className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs flex">
          <div className="w-64 bg-[#f6f8fb] h-full p-4 overflow-y-auto">
            <Sidebar onOpenSimulateModal={() => { setIsSimulateModalOpen(true); setIsMobileMenuOpen(false); }} />
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* Desktop Persistent Left Sidebar */}
      <Sidebar onOpenSimulateModal={() => setIsSimulateModalOpen(true)} />

      {/* Main Right Content Layout */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Modern Top Header (Greeting, Search, Bell, Profile) */}
        <TopHeader onOpenSimulateModal={() => setIsSimulateModalOpen(true)} />

        {/* Content View */}
        <main className="flex-1 px-6 sm:px-8 pb-10">
          <Routes>
            <Route path="/" element={<Dashboard onOpenSimulateModal={() => setIsSimulateModalOpen(true)} />} />
            <Route path="/queue" element={<TaskQueue onOpenSimulateModal={() => setIsSimulateModalOpen(true)} />} />
            <Route path="/verify/:id" element={<VerificationDetail />} />
            <Route path="/simulator" element={<AgentSimulator />} />
            <Route path="/audit" element={<AuditLog />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/transfers" element={<TaskQueue onOpenSimulateModal={() => setIsSimulateModalOpen(true)} />} />
            <Route path="/bills" element={<Dashboard onOpenSimulateModal={() => setIsSimulateModalOpen(true)} />} />
            <Route path="/recipients" element={<TaskQueue onOpenSimulateModal={() => setIsSimulateModalOpen(true)} />} />
            <Route path="/help" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <SimulateCaseModal
        isOpen={isSimulateModalOpen}
        onClose={() => setIsSimulateModalOpen(false)}
      />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <BankProvider>
      <Router>
        <AppContent />
      </Router>
    </BankProvider>
  );
}
