import React, { createContext, useContext, useState, useMemo } from 'react';
import { initialCases, simulationPresets } from '../data/mockCases';

const BankContext = createContext();

export function BankProvider({ children }) {
  const [cases, setCases] = useState(initialCases);
  const [auditLogs, setAuditLogs] = useState([
    {
      id: "log-1",
      timestamp: "Today, 10:14 AM",
      officer: "AI Autonomy Engine",
      action: "AUTO_APPROVAL_STP",
      caseId: "CASE-107",
      customer: "Chloe Bennet",
      details: "Straight-Through Processing completed with 99.6% confidence. Virtual debit card provisioned.",
      type: "success"
    },
    {
      id: "log-2",
      timestamp: "Today, 11:05 AM",
      officer: "Sarah Jenkins (Sr. Officer)",
      action: "HUMAN_ESCALATION",
      caseId: "CASE-106",
      customer: "Nikolai Volkov",
      details: "Referred to Money Laundering Reporting Officer (MLRO) following Tier 2 PEP hit.",
      type: "warning"
    },
    {
      id: "log-3",
      timestamp: "Today, 11:32 AM",
      officer: "AI Autonomy Engine",
      action: "ANOMALY_FLAG",
      caseId: "CASE-105",
      customer: "Elena Vance (Apex Logistics)",
      details: "Discovered $4,850/mo undisclosed Merchant Cash Advance obligation in bank statement parsing.",
      type: "danger"
    }
  ]);

  const [toasts, setToasts] = useState([]);
  const [simulationState, setSimulationState] = useState({
    isRunning: false,
    progress: 0,
    currentStep: "",
    logs: [],
    caseData: null,
  });

  const [settings, setSettings] = useState({
    autoApprovalThreshold: 95,
    riskThresholdForManualReview: 30,
    autoRevokeStandingOrders: true,
    simulationSpeed: "normal", // 'fast' | 'normal'
    notifyCustomerInstantSms: true,
  });

  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Human In The Loop Resolution
  const resolveCase = (caseId, decision, comments = "", fieldOverrides = null) => {
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id !== caseId) return c;

        let newStatus = "approved_by_human";
        let toastMsg = "";
        let toastType = "success";

        if (decision === "APPROVE" || decision === "APPROVE_CLOSURE") {
          newStatus = "approved_by_human";
          toastMsg = `Approved ${c.type === 'account_closure' ? 'account closure' : 'account opening'} for ${c.customerName}. Notification dispatched.`;
          toastType = "success";
        } else if (decision === "REQUEST_RESUBMISSION") {
          newStatus = "resubmission_requested";
          toastMsg = `Resubmission request sent to ${c.customerName} with AI diagnostic instructions.`;
          toastType = "warning";
        } else if (decision === "REJECT") {
          newStatus = "rejected";
          toastMsg = `Application rejected for ${c.customerName}. Regulatory reason code logged.`;
          toastType = "danger";
        } else if (decision === "ESCALATE") {
          newStatus = "escalated";
          toastMsg = `Case ${c.id} escalated to Chief Compliance Officer / MLRO.`;
          toastType = "danger";
        } else if (decision === "APPLY_ESCROW_BUFFER") {
          newStatus = "approved_by_human";
          toastMsg = `Approved closure for ${c.customerName} with $100 escrow buffer applied. Cashier cheque issued.`;
          toastType = "success";
        }

        addToast(toastMsg, toastType);

        // Append to audit trail
        setAuditLogs((prevLogs) => [
          {
            id: `log-${Date.now()}`,
            timestamp: "Just now",
            officer: "Sarah Jenkins (Officer ID #8491)",
            action: decision,
            caseId: c.id,
            customer: c.customerName,
            details: comments || `Officer confirmed AI resolution recommendation (${decision}).`,
            type: toastType,
          },
          ...prevLogs,
        ]);

        return {
          ...c,
          status: newStatus,
          humanOfficerReview: {
            officerId: "EMP-8491",
            officerName: "Sarah Jenkins",
            reviewedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            decision,
            comments,
            fieldOverrides,
          },
        };
      })
    );
  };

  // Override specific extracted field value
  const overrideField = (caseId, docId, fieldKey, newValue) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const updatedDocs = c.documents.map((doc) => {
          if (doc.id !== docId) return doc;
          return {
            ...doc,
            extractedFields: {
              ...doc.extractedFields,
              [fieldKey]: {
                ...doc.extractedFields[fieldKey],
                value: newValue,
                overriddenByHuman: true,
              },
            },
          };
        });
        return { ...c, documents: updatedDocs };
      })
    );
    addToast(`Field '${fieldKey}' updated manually by officer.`, "info");
  };

  // Run live simulation of autonomous AI agent
  const runSimulation = (presetId = "preset-kyc-clean") => {
    const preset = simulationPresets.find((p) => p.id === presetId) || simulationPresets[0];
    const generatedId = `SIM-${Math.floor(1000 + Math.random() * 9000)}`;

    const simulatedTarget = {
      id: generatedId,
      customerName: preset.customerName,
      customerEmail: `${preset.customerName.toLowerCase().replace(' ', '.')}@simulation-demo.com`,
      customerPhone: "+1 (555) 890-4412",
      type: preset.type,
      title: `${preset.name} - Automated Inflow`,
      accountType: preset.type === 'account_closure' ? 'Commercial Checking' : 'Global Premier Checking',
      depositAmount: "$25,000",
      priority: preset.riskCategory.includes("High") ? "Urgent" : "Medium",
      status: "needs_review",
      aiConfidence: preset.riskCategory.includes("High") ? 61.5 : 98.2,
      riskScore: preset.riskCategory.includes("High") ? 82 : 9,
      createdAt: "Just now",
      timestamp: Date.now(),
      channel: "Digital Branch Simulation Inflow",
      timeSavedMinutes: 28,
      stpEligible: !preset.riskCategory.includes("High"),
      documents: [
        {
          id: "sim-doc-1",
          title: "Primary Identification Document (National ID / Passport)",
          type: "passport",
          status: preset.riskCategory.includes("High") ? "flagged" : "verified",
          confidence: preset.riskCategory.includes("High") ? 68.0 : 99.1,
          extractedFields: {
            fullName: { value: preset.customerName.toUpperCase(), confidence: 99.2, status: "matched" },
            docNumber: { value: `ID-${Math.floor(10000000 + Math.random() * 90000000)}`, confidence: 98.4, status: "matched" },
            validityStatus: { value: "Active / Non-expired", confidence: 99.0, status: "matched" },
            fraudScan: {
              value: preset.riskCategory.includes("High") ? "TAMPER ALERT: Microprint and font kerning inconsistencies found" : "Passed 14 security hologram checks",
              confidence: 96.0,
              status: preset.riskCategory.includes("High") ? "flagged" : "matched"
            }
          },
          boundingBoxes: [
            { label: "Full Name", top: 32, left: 25, width: 45, height: 10, fieldKey: "fullName" },
            { label: "ID No.", top: 46, left: 25, width: 35, height: 8, fieldKey: "docNumber" },
          ],
          badge: preset.riskCategory.includes("High") ? "Security Flag Raised" : "Govt Registry Authenticated",
          issuedBy: "National Identity Authority",
        },
        {
          id: "sim-doc-2",
          title: preset.type === 'account_closure' ? "Automated Ledger & Direct Debit Schedule" : "Proof of Address & Financial Proof",
          type: "utility_bill",
          status: "verified",
          confidence: 97.0,
          extractedFields: {
            holder: { value: preset.customerName, confidence: 98.5, status: "matched" },
            addressStatus: { value: "Verified against Postal Registry", confidence: 97.2, status: "matched" },
          },
          boundingBoxes: [
            { label: "Customer Name", top: 25, left: 15, width: 40, height: 10, fieldKey: "holder" }
          ],
          badge: "Registry Matched",
          issuedBy: "Municipal Utility Services",
        }
      ],
      aiChecks: [
        { name: "Synthetic ID & Tamper Detection", result: preset.riskCategory.includes("High") ? "FLAGGED" : "PASS", score: preset.riskCategory.includes("High") ? 42 : 99, detail: preset.description },
        { name: "AML / Global Watchlist", result: "PASS", score: 99.5, detail: "0 matches on FinCEN / OFAC / Interpol databases" },
        { name: "Core Banking Ledger Consistency", result: "PASS", score: 98.0, detail: "All ledger rules validated" },
      ],
      aiReasoning: [
        `Step 1: Document OCR ingested package for ${preset.customerName}.`,
        `Step 2: Authenticity neural net evaluated micro-textures and security features.`,
        preset.riskCategory.includes("High")
          ? `Step 3: ANOMALY DETECTED: ${preset.description}. AI confidence lowered.`
          : `Step 3: Identity, Address, and Income all matched with >98% precision.`,
        `Step 4: AI Decision Engine prepared Human-In-The-Loop review cockpit.`,
      ],
      recommendation: {
        action: preset.riskCategory.includes("High") ? "REQUEST_RESUBMISSION" : "APPROVE",
        summary: preset.expectedResult,
        nextStep: preset.riskCategory.includes("High") ? "Officer review required due to anomaly flags." : "Ready for instant 1-click authorization.",
      },
      suggestedEmail: {
        subject: `Update regarding your AegisBank application — ${preset.customerName}`,
        body: `Dear ${preset.customerName},\n\nOur automated verification system has processed your submission.\n\nStatus: ${preset.expectedResult}\n\nAegisBank Operations Team`
      }
    };

    setSimulationState({
      isRunning: true,
      progress: 5,
      currentStep: "Ingesting multi-modal documents & digital artifacts...",
      logs: [{ time: "00:00", step: "Ingesting document stream", type: "INFO", message: `Received new incoming submission for ${preset.customerName}` }],
      caseData: simulatedTarget,
    });

    const delay = settings.simulationSpeed === "fast" ? 400 : 900;

    const timeline = [
      { progress: 25, step: "Executing OCR & Named Entity Extraction...", message: "Extracted name, ID serial, issue date, and MRZ checksums." },
      { progress: 50, step: "Running Document Forensics & Tamper Neural Net...", message: preset.riskCategory.includes("High") ? "⚠️ Anomaly discovered: Inconsistent typographic kerning and digital compression artifacts." : "Passed all 14 physical security watermarks and hologram models." },
      { progress: 75, step: "Querying AML Watchlists & Core Banking Ledger...", message: "Queried OFAC, FinCEN, Interpol, and internal negative database." },
      { progress: 90, step: "Computing Confidence Vectors & Risk Score...", message: `Computed risk score: ${simulatedTarget.riskScore}/100. Confidence: ${simulatedTarget.aiConfidence}%.` },
      { progress: 100, step: "Generating Human-in-the-Loop Cockpit & Audit Memo...", message: "Task package finalized. Dispatched to Bank Employee Work Queue!" }
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < timeline.length) {
        const item = timeline[currentIdx];
        setSimulationState((prev) => ({
          ...prev,
          progress: item.progress,
          currentStep: item.step,
          logs: [
            ...prev.logs,
            {
              time: `00:0${currentIdx + 1}`,
              step: item.step,
              type: item.message.includes("⚠️") ? "WARN" : "SUCCESS",
              message: item.message,
            }
          ]
        }));
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCases((prev) => [simulatedTarget, ...prev]);
          setSimulationState((prev) => ({ ...prev, isRunning: false }));
          addToast(`Simulation Complete: New task for ${simulatedTarget.customerName} added to your queue!`, "success");
        }, delay);
      }
    }, delay);
  };

  // Metrics computation
  const metrics = useMemo(() => {
    const total = cases.length;
    const pendingReview = cases.filter((c) => c.status === "needs_review").length;
    const autoApproved = cases.filter((c) => c.status === "auto_approved").length;
    const humanResolved = cases.filter((c) => c.status === "approved_by_human").length;
    const escalated = cases.filter((c) => c.status === "escalated" || c.status === "rejected").length;
    const stpRate = Math.round(((autoApproved + humanResolved) / (total || 1)) * 100);
    const totalMinutesSaved = cases.reduce((acc, c) => acc + (c.timeSavedMinutes || 20), 0);
    const hoursSaved = (totalMinutesSaved / 60).toFixed(1);

    return {
      total,
      pendingReview,
      autoApproved,
      humanResolved,
      escalated,
      stpRate,
      hoursSaved,
      avgProcessTime: "1.4 mins", // vs 45 mins manual
      accuracyRate: "99.8%",
    };
  }, [cases]);

  return (
    <BankContext.Provider
      value={{
        cases,
        setCases,
        auditLogs,
        metrics,
        simulationState,
        runSimulation,
        resolveCase,
        overrideField,
        toasts,
        addToast,
        removeToast,
        settings,
        setSettings,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}

export function useBank() {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error("useBank must be used within a BankProvider");
  }
  return context;
}
