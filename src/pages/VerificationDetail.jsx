import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBank } from '../context/BankContext';
import DocumentViewer from '../components/DocumentViewer';
import {
  HiArrowLeft,
  HiCheckCircle,
  HiEnvelope,
  HiPencilSquare,
  HiCheck,
  HiDocumentText,
  HiExclamationTriangle,
  HiShieldCheck
} from 'react-icons/hi2';

export default function VerificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cases, resolveCase, overrideField, addToast } = useBank();

  const caseData = cases.find((c) => c.id === id) || cases[0];
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [selectedFieldKey, setSelectedFieldKey] = useState(null);
  const [activeRightTab, setActiveRightTab] = useState('fields'); // 'fields' | 'compliance' | 'reasoning'

  // Field editing state
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Officer note & Communication draft state
  const [officerNote, setOfficerNote] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState(caseData.suggestedEmail?.subject || "");
  const [emailBody, setEmailBody] = useState(caseData.suggestedEmail?.body || "");

  const activeDoc = caseData.documents?.[selectedDocIndex] || caseData.documents?.[0];

  const handleStartEdit = (key, currentVal) => {
    setEditingField(key);
    setEditValue(currentVal);
  };

  const handleSaveEdit = (fieldKey) => {
    if (!activeDoc) return;
    overrideField(caseData.id, activeDoc.id, fieldKey, editValue);
    setEditingField(null);
  };

  const handleDecision = (decisionType) => {
    resolveCase(caseData.id, decisionType, officerNote);
  };

  const isClosure = caseData.type === 'account_closure';

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-5">
      
      {/* Top Header Bar & Decision Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            to="/queue"
            className="p-2 rounded-md bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-500">{caseData.id}</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs uppercase tracking-wider font-mono text-slate-500">
                {caseData.type.replace('_', ' ')}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-mono">
                AI Confidence: <strong className="text-slate-900">{caseData.aiConfidence}%</strong>
              </span>
            </div>
            <h1 className="text-lg font-bold text-slate-900">
              {caseData.customerName}
            </h1>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowEmailModal(true)}
            className="px-3 py-2 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium text-xs transition-colors flex items-center gap-1.5"
          >
            <HiEnvelope className="w-3.5 h-3.5 text-slate-500" />
            <span>Request Info</span>
          </button>

          <button
            type="button"
            onClick={() => handleDecision("ESCALATE")}
            className="px-3 py-2 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium text-xs transition-colors"
          >
            Escalate
          </button>

          <button
            type="button"
            onClick={() => handleDecision("APPROVE")}
            className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <HiCheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{isClosure ? 'Authorize Closure' : 'Approve Application'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio: 2 Clean Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column (7 cols): Document Inspection */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Document Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {caseData.documents?.map((doc, idx) => {
              const isSelected = selectedDocIndex === idx;
              return (
                <button
                  key={doc.id}
                  onClick={() => {
                    setSelectedDocIndex(idx);
                    setSelectedFieldKey(null);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                      : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <HiDocumentText className="w-3.5 h-3.5" />
                  <span>{doc.title}</span>
                  {doc.status === 'flagged' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Document Viewer Container */}
          <div className="h-[490px]">
            <DocumentViewer
              document={activeDoc}
              selectedFieldKey={selectedFieldKey}
              onSelectField={(key) => setSelectedFieldKey(key)}
            />
          </div>

          {/* Account Closure Liquidation Summary (if closure) */}
          {isClosure && caseData.closureData && (
            <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-semibold text-slate-900">
                  Liquidation Ledger Calculation
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {caseData.accountNumber}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Ledger Balance</span>
                  <span className="font-bold text-slate-900">{caseData.closureData.ledgerBalance}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Fee Assessment</span>
                  <span className="font-bold text-slate-700">{caseData.closureData.accruedFees}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Net Payout</span>
                  <span className="font-bold font-mono text-emerald-700">{caseData.closureData.netPayoutDue}</span>
                </div>
              </div>

              {caseData.closureData.activeStandingOrders?.length > 0 && (
                <div className="p-3 rounded bg-amber-50/70 border border-amber-200 text-xs space-y-1.5">
                  <span className="font-semibold text-amber-900 block">
                    Standing Orders Intercepted ({caseData.closureData.activeStandingOrders.length})
                  </span>
                  <p className="text-amber-800 text-[11px]">
                    Automatic cancellation mandates prepared for Netflix & Gym debits upon zeroization.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column (5 cols): AI Findings & Verification Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-4 space-y-4 shadow-xs">
          
          {/* AI Recommendation Summary */}
          <div className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono uppercase font-semibold text-slate-500 block">
              AI Decision Finding
            </span>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">
              {caseData.recommendation?.summary}
            </p>
          </div>

          {/* Right Panel Sub-tabs to reduce clutter */}
          <div className="space-y-3">
            <div className="flex items-center gap-1 border-b border-slate-200 pb-2">
              <button
                onClick={() => setActiveRightTab('fields')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeRightTab === 'fields'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Extracted Fields
              </button>
              <button
                onClick={() => setActiveRightTab('compliance')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeRightTab === 'compliance'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Compliance Checks
              </button>
              <button
                onClick={() => setActiveRightTab('reasoning')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeRightTab === 'reasoning'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Audit Steps
              </button>
            </div>

            {/* Tab 1: Extracted Fields */}
            {activeRightTab === 'fields' && (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {Object.entries(activeDoc?.extractedFields || {}).map(([key, field]) => {
                  const isSelected = selectedFieldKey === key;
                  const isEditing = editingField === key;
                  const isMismatch = field.status === 'mismatch' || field.status === 'flagged';

                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedFieldKey(key)}
                      className={`p-2.5 rounded border transition-colors text-xs ${
                        isSelected
                          ? 'border-slate-900 bg-slate-50'
                          : isMismatch
                          ? 'border-rose-300 bg-rose-50/50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-slate-500 uppercase font-mono">
                          {key}
                        </span>
                        <div className="flex items-center gap-1.5 font-mono">
                          {field.overriddenByHuman && (
                            <span className="text-[9px] px-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              OVERRIDDEN
                            </span>
                          )}
                          <span className="text-[10px] text-slate-500 font-semibold">
                            {field.confidence}%
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEdit(key, field.value);
                            }}
                            className="text-slate-400 hover:text-slate-800 p-0.5"
                            title="Edit value"
                          >
                            <HiPencilSquare className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="flex items-center gap-1.5 mt-1" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-900 focus:outline-none focus:border-slate-500"
                          />
                          <button
                            onClick={() => handleSaveEdit(key)}
                            className="px-2.5 py-1 rounded bg-slate-900 text-white text-xs font-medium hover:bg-slate-800"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <p className="font-semibold text-slate-900 text-[11px] break-words">{field.value}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 2: Compliance Matrix */}
            {activeRightTab === 'compliance' && (
              <div className="space-y-2">
                {caseData.aiChecks?.map((chk, i) => (
                  <div key={i} className="flex items-start justify-between gap-2 p-2.5 rounded bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <span className="font-medium text-slate-900 block">{chk.name}</span>
                      <span className="text-[11px] text-slate-500">{chk.detail}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 border ${
                      chk.result === 'PASS'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : chk.result === 'ATTENTION'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}>
                      {chk.result}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Reasoning Steps */}
            {activeRightTab === 'reasoning' && (
              <div className="space-y-2 text-xs text-slate-700">
                {caseData.aiReasoning?.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 font-mono text-[10px] shrink-0">{idx + 1}.</span>
                    <p className="leading-snug text-[11px]">{reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Simple Officer Note Input */}
          <div className="pt-2 border-t border-slate-100">
            <label className="text-[11px] font-medium text-slate-600 block mb-1">
              Officer Audit Notes (optional)
            </label>
            <input
              type="text"
              value={officerNote}
              onChange={(e) => setOfficerNote(e.target.value)}
              placeholder="Add verification note for compliance ledger..."
              className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 bg-slate-50 focus:bg-white"
            />
          </div>

        </div>

      </div>

      {/* Clean Resubmission Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-lg rounded-lg bg-white border border-slate-200 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-900 text-sm">Customer Notice Draft</span>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-1.5 rounded border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Message Body</label>
                <textarea
                  rows={5}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full p-3 rounded border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed focus:outline-none focus:border-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-3 py-1.5 rounded text-xs text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDecision("REQUEST_RESUBMISSION");
                  setShowEmailModal(false);
                }}
                className="px-4 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
              >
                Transmit Notice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
