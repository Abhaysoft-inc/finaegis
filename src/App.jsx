import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BankProvider } from './context/BankContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ToastContainer from './components/ToastContainer';
import SimulateCaseModal from './components/SimulateCaseModal';

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenSimulateModal={() => setIsSimulateModalOpen(true)} />

      {/* Main Layout Area */}
      <div className="flex flex-1">
        {/* Clean Light Sidebar */}
        <Sidebar />

        {/* Content View */}
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-3.5rem)] bg-slate-50">
          <Routes>
            <Route path="/" element={<Dashboard onOpenSimulateModal={() => setIsSimulateModalOpen(true)} />} />
            <Route path="/queue" element={<TaskQueue onOpenSimulateModal={() => setIsSimulateModalOpen(true)} />} />
            <Route path="/verify/:id" element={<VerificationDetail />} />
            <Route path="/simulator" element={<AgentSimulator />} />
            <Route path="/audit" element={<AuditLog />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
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
