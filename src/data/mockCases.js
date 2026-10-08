export const initialCases = [
  {
    id: "CASE-101",
    customerName: "Alex Morgan",
    customerEmail: "alex.morgan@techcorp.io",
    customerPhone: "+1 (555) 234-8901",
    type: "account_opening",
    title: "Premier Checking & Wealth Savings Opening",
    accountType: "Premier Checking",
    depositAmount: "$15,000",
    priority: "Medium",
    status: "needs_review", // 'needs_review', 'auto_approved', 'approved_by_human', 'rejected', 'resubmission_requested', 'escalated'
    aiConfidence: 97.4,
    riskScore: 12, // 0-100 (lower is better)
    createdAt: "8 mins ago",
    timestamp: Date.now() - 8 * 60 * 1000,
    channel: "Mobile Onboarding App",
    timeSavedMinutes: 24,
    stpEligible: true,
    documents: [
      {
        id: "doc-1",
        title: "US Electronic Passport",
        type: "passport",
        status: "verified",
        confidence: 99.2,
        extractedFields: {
          fullName: { value: "ALEX MORGAN", confidence: 99.8, status: "matched" },
          docNumber: { value: "P98421094", confidence: 99.5, status: "matched" },
          dateOfBirth: { value: "1989-04-12", confidence: 99.1, status: "matched" },
          nationality: { value: "USA", confidence: 99.9, status: "matched" },
          expiryDate: { value: "2031-08-14", confidence: 98.7, status: "matched" },
          mrzChecksum: { value: "VALID (Line 1 & 2 Checksum OK)", confidence: 100, status: "matched" },
          faceMatch: { value: "98.9% match with live selfie", confidence: 98.9, status: "matched" },
        },
        boundingBoxes: [
          { label: "Full Name", top: 38, left: 34, width: 36, height: 8, fieldKey: "fullName" },
          { label: "Passport No.", top: 22, left: 65, width: 28, height: 7, fieldKey: "docNumber" },
          { label: "DOB", top: 48, left: 34, width: 25, height: 7, fieldKey: "dateOfBirth" },
          { label: "MRZ Code", top: 76, left: 8, width: 84, height: 16, fieldKey: "mrzChecksum" },
        ],
        badge: "Govt ID Verified",
        issuedBy: "U.S. Department of State",
      },
      {
        id: "doc-2",
        title: "ConEdison Utility Statement",
        type: "utility_bill",
        status: "verified",
        confidence: 96.8,
        extractedFields: {
          accountHolder: { value: "Alex Morgan", confidence: 98.2, status: "matched" },
          billingAddress: { value: "742 Evergreen Terrace, Springfield, NY 10001", confidence: 97.4, status: "matched" },
          issueDate: { value: "2026-09-15 (23 days old, < 90-day requirement)", confidence: 99.0, status: "matched" },
          serviceType: { value: "Electric & Gas Residential", confidence: 98.5, status: "matched" },
        },
        boundingBoxes: [
          { label: "Customer Name", top: 20, left: 10, width: 38, height: 8, fieldKey: "accountHolder" },
          { label: "Billing Address", top: 30, left: 10, width: 45, height: 12, fieldKey: "billingAddress" },
          { label: "Bill Date", top: 20, left: 60, width: 30, height: 8, fieldKey: "issueDate" },
        ],
        badge: "Proof of Address OK",
        issuedBy: "ConEdison Utilities LLC",
      },
      {
        id: "doc-3",
        title: "W-2 Tax & Wage Statement",
        type: "tax_form",
        status: "verified",
        confidence: 98.1,
        extractedFields: {
          employer: { value: "OmniTech Solutions Inc.", confidence: 99.0, status: "matched" },
          wages: { value: "$148,500.00 USD", confidence: 98.8, status: "matched" },
          ssnMatch: { value: "XXX-XX-4912 (Matches IRS TIN Check)", confidence: 99.6, status: "matched" },
        },
        boundingBoxes: [
          { label: "Wages", top: 35, left: 50, width: 40, height: 10, fieldKey: "wages" },
          { label: "Employer", top: 22, left: 10, width: 42, height: 8, fieldKey: "employer" },
        ],
        badge: "Income Verified",
        issuedBy: "IRS / Employer Payroll",
      },
      {
        id: "doc-4",
        title: "Digital Signature Specimen",
        type: "signature",
        status: "verified",
        confidence: 97.5,
        extractedFields: {
          similarityIndex: { value: "97.5% vector match vs Passport scan", confidence: 97.5, status: "matched" },
          strokeDwellTime: { value: "Normal dynamic pressure detected (Non-bot)", confidence: 99.1, status: "matched" },
        },
        boundingBoxes: [
          { label: "Specimen", top: 25, left: 20, width: 60, height: 50, fieldKey: "similarityIndex" },
        ],
        badge: "Biometric Signature OK",
        issuedBy: "Secure Onboarding Canvas",
      }
    ],
    aiChecks: [
      { name: "Government Identity Registry", result: "PASS", score: 99.8, detail: "Valid passport serial registered in DHS database" },
      { name: "AML / OFAC Sanctions Screening", result: "PASS", score: 100, detail: "Zero hits across OFAC, EU, UN, and PEP global watchlists" },
      { name: "Address Cross-Consistency", result: "PASS", score: 97.4, detail: "Passport name + ConEd billing address match application 1:1" },
      { name: "Synthetic Identity & Fraud Risk", result: "PASS", score: 98.2, detail: "SSN issuance year matches customer DOB (1989)" },
      { name: "Liveness & Biometric Verification", result: "PASS", score: 98.9, detail: "Anti-spoofing depth map verified; 0.989 facial vector cosine similarity" }
    ],
    aiReasoning: [
      "Step 1: Document classification recognized US Passport and ConEdison Utility Bill.",
      "Step 2: Optical Character Recognition extracted customer metadata with >98% character confidence.",
      "Step 3: Biometric comparison between photo on passport and live camera selfie yielded a 98.9% match with zero spoofing artifacts.",
      "Step 4: Real-time queries to credit bureau and Treasury OFAC watchlists returned clean records.",
      "Step 5: Autonomous Copilot verdict: Low risk profile. Meets all Bank Secrecy Act and FinCEN onboarding standards.",
      "Human-in-the-Loop note: First-time account opening policy requires 1-click bank officer authorization before generating routing numbers."
    ],
    recommendation: {
      action: "APPROVE",
      summary: "Clean application with 97.4% AI confidence. All AML/KYC requirements satisfied.",
      nextStep: "Approve to instantly create Account #4810-9281-002 and trigger welcome SMS.",
    },
    suggestedEmail: {
      subject: "Welcome to AegisBank! Your Premier Account is Approved",
      body: "Dear Alex Morgan,\n\nWe are pleased to inform you that your AegisBank Premier Checking application has been reviewed and verified by our automated compliance system and bank officer.\n\nYour account has been provisioned:\nAccount: 4810-XXXX-002\nRouting: 021000089\n\nYour debit card is currently being manufactured and will arrive in 2-3 business days.\n\nWarm regards,\nAegisBank Operations Team"
    }
  },
  {
    id: "CASE-102",
    customerName: "Sofia Chen",
    customerEmail: "sofia.chen@globaltrade.sg",
    customerPhone: "+65 9123 4567",
    type: "account_opening",
    title: "Cross-Border NRI Account Opening",
    accountType: "Global Multi-Currency Savings",
    depositAmount: "$50,000",
    priority: "High",
    status: "needs_review",
    aiConfidence: 71.5,
    riskScore: 48,
    createdAt: "23 mins ago",
    timestamp: Date.now() - 23 * 60 * 1000,
    channel: "Branch Tablet Kiosk",
    timeSavedMinutes: 19,
    stpEligible: false,
    documents: [
      {
        id: "doc-1",
        title: "Singapore Employment Pass ID",
        type: "id_card",
        status: "verified",
        confidence: 96.2,
        extractedFields: {
          fullName: { value: "SOFIA CHEN JIA-LING", confidence: 98.0, status: "matched" },
          idNumber: { value: "G8294102M", confidence: 97.5, status: "matched" },
          dob: { value: "1994-11-20", confidence: 99.0, status: "matched" },
          expiry: { value: "2028-05-30", confidence: 96.5, status: "matched" },
        },
        boundingBoxes: [
          { label: "Name", top: 28, left: 30, width: 45, height: 10, fieldKey: "fullName" },
          { label: "FIN No.", top: 45, left: 30, width: 30, height: 8, fieldKey: "idNumber" },
        ],
        badge: "National ID Valid",
        issuedBy: "Ministry of Manpower Singapore",
      },
      {
        id: "doc-2",
        title: "Residential Tenancy Agreement",
        type: "utility_bill",
        status: "flagged",
        confidence: 62.4,
        extractedFields: {
          tenantName: { value: "Sofia Chen", confidence: 94.0, status: "matched" },
          propertyAddress: { value: "12 Marina Boulevard, Apt #34B, Singapore 018982", confidence: 91.0, status: "mismatch" },
          applicationAddress: { value: "88 Orchard Road, Singapore 238843", confidence: 100, status: "mismatch" },
          discrepancyNote: { value: "Address mismatch between Tenancy Lease ('12 Marina Blvd') and Online Application ('88 Orchard Rd'). Match score: 41%", confidence: 100, status: "flagged" },
        },
        boundingBoxes: [
          { label: "Tenant Name", top: 24, left: 20, width: 35, height: 8, fieldKey: "tenantName" },
          { label: "Leased Property", top: 38, left: 20, width: 55, height: 14, fieldKey: "propertyAddress" },
        ],
        badge: "Address Mismatch Flagged",
        issuedBy: "Savills Residential Singapore",
      },
      {
        id: "doc-3",
        title: "Foreign Source of Wealth Declaration",
        type: "tax_form",
        status: "verified",
        confidence: 89.0,
        extractedFields: {
          employer: { value: "Starlight Asset Management Asia", confidence: 95.0, status: "matched" },
          annualBonus: { value: "$120,000 SGD", confidence: 91.0, status: "matched" },
        },
        boundingBoxes: [
          { label: "Declaration", top: 30, left: 20, width: 60, height: 15, fieldKey: "employer" }
        ],
        badge: "Wealth Source Documented",
        issuedBy: "Employer Certified Letter",
      }
    ],
    aiChecks: [
      { name: "Government Identity Registry", result: "PASS", score: 96.2, detail: "Valid Singapore MOM FIN verified" },
      { name: "AML / PEP Screening", result: "PASS", score: 99.4, detail: "No international sanctions or PEP links found" },
      { name: "Address Cross-Consistency", result: "FAILED", score: 41.2, detail: "Lease agreement address differs from application domicile" },
      { name: "Name Transliteration Analysis", result: "PASS", score: 94.0, detail: "'Sofia Chen' matches registered name 'Sofia Chen Jia-Ling'" },
    ],
    aiReasoning: [
      "Step 1: ID card validated with authentic holographic security markers.",
      "Step 2: Cross-check against input form uncovered an ADDRESS CONFLICT. Application cites 88 Orchard Rd while submitted lease shows 12 Marina Blvd.",
      "Step 3: Name transliteration resolved successfully (Western preferred name matches full legal name).",
      "Step 4: AML / Sanctions screening: Negative for suspicious activity.",
      "Step 5: Autonomous Copilot recommendation: Halt automatic approval. Prompt employee to request updated utility bill or accept address change with customer confirmation."
    ],
    recommendation: {
      action: "REQUEST_RESUBMISSION",
      summary: "Address discrepancy requires customer clarification or secondary utility bill.",
      nextStep: "Send 1-click resubmission link or override if branch officer verified physically.",
    },
    suggestedEmail: {
      subject: "Clarification required regarding your AegisBank Account Application",
      body: "Dear Sofia Chen,\n\nThank you for applying for an AegisBank Global Multi-Currency Account. During our automated document verification, our system noted a discrepancy between your submitted application address (88 Orchard Rd) and your uploaded Tenancy Agreement (12 Marina Blvd).\n\nTo complete your verification swiftly, please click the secure link below to either confirm your primary residential address or upload a recent utility statement:\nhttps://aegisbank.com/verify/upload-token/72b849\n\nSincerely,\nAegisBank Onboarding Specialist"
    }
  },
  {
    id: "CASE-103",
    customerName: "Marcus Sterling",
    customerEmail: "m.sterling@sterlingarch.com",
    customerPhone: "+1 (555) 782-1920",
    type: "account_closure",
    title: "Classic Checking Account Closure & Liquidation",
    accountNumber: "ACCT-8492-0419",
    accountType: "Business Checking",
    priority: "Medium",
    status: "needs_review",
    aiConfidence: 94.8,
    riskScore: 16,
    createdAt: "35 mins ago",
    timestamp: Date.now() - 35 * 60 * 1000,
    channel: "Online Banking Portal",
    timeSavedMinutes: 32,
    stpEligible: false,
    closureData: {
      ledgerBalance: "$2,450.00",
      pendingCharges: "$0.00 (All 14 debits fully posted)",
      accruedFees: "-$15.00 (Monthly paper statement & maintenance fee)",
      netPayoutDue: "$2,435.00",
      payoutMethod: "ACH Wire to J.P. Morgan Chase (*4829)",
      activeStandingOrders: [
        { merchant: "Netflix Premium", amount: "$22.99 / mo", nextDebit: "In 4 days", actionSuggested: "Auto-Cancel ACH Mandate" },
        { merchant: "Equinox Sports Club", amount: "$280.00 / mo", nextDebit: "In 12 days", actionSuggested: "Auto-Cancel ACH Mandate" },
      ],
      collateralLiens: "None found. No linked credit cards or overdraft debts.",
      taxReportingStatus: "Form 1099-INT interest earned ($4.20) recorded for tax year."
    },
    documents: [
      {
        id: "doc-1",
        title: "Signed Account Closure Authorization",
        type: "closure_mandate",
        status: "verified",
        confidence: 97.8,
        extractedFields: {
          signatory: { value: "Marcus Sterling", confidence: 99.0, status: "matched" },
          closureReason: { value: "Company reorganization & consolidation of banking lines", confidence: 96.0, status: "matched" },
          wireRouting: { value: "021000021 (J.P. Morgan Chase)", confidence: 99.4, status: "matched" },
          wireAccount: { value: "XXXXXXXX4829", confidence: 98.2, status: "matched" },
        },
        boundingBoxes: [
          { label: "Account Holder", top: 25, left: 15, width: 40, height: 8, fieldKey: "signatory" },
          { label: "Disbursement Route", top: 48, left: 15, width: 50, height: 10, fieldKey: "wireRouting" },
        ],
        badge: "Authorization Verified",
        issuedBy: "Customer E-Sign Portal",
      },
      {
        id: "doc-2",
        title: "Automated Liquidation Worksheet & Statement",
        type: "settlement_sheet",
        status: "verified",
        confidence: 99.1,
        extractedFields: {
          finalBalance: { value: "$2,435.00 Net Disbursement", confidence: 100, status: "matched" },
          liensChecked: { value: "0 Active Liens / 0 Court Garnishments", confidence: 100, status: "matched" },
        },
        boundingBoxes: [
          { label: "Net Payout", top: 30, left: 15, width: 45, height: 12, fieldKey: "finalBalance" }
        ],
        badge: "AI Calculated & Zeroed",
        issuedBy: "AegisBank Core Accounting Subsystem",
      }
    ],
    aiChecks: [
      { name: "Zero-Balance Feasibility Audit", result: "PASS", score: 99.0, detail: "No unsettled pending merchant card holds" },
      { name: "Negative Overdraft / Lien Check", result: "PASS", score: 100, detail: "Zero collateral liens or legal restraint orders found" },
      { name: "Standing Orders Interception", result: "ATTENTION", score: 88.0, detail: "2 active recurring debits identified. Mandate revoke ready." },
      { name: "Disbursement Wire Validation", result: "PASS", score: 99.2, detail: "External Chase wire account matches Marcus Sterling entity" }
    ],
    aiReasoning: [
      "Step 1: Ingested closure mandate. Verified customer authentication via 2FA & signature vector.",
      "Step 2: Scanned core ledger. Balance is $2,450.00 positive. Assessed final pro-rated maintenance fee (-$15.00). Net payout calculated: $2,435.00.",
      "Step 3: Identified 2 active automatic debits (Netflix & Equinox). If closed without mandate revoke, rejected debits would incur return fees.",
      "Step 4: AI Copilot auto-generated NACHA/ACH mandate cancellation notices for both merchants.",
      "Step 5: Prepared wire release voucher for external Chase Bank account.",
      "Human-in-the-Loop note: Ready for officer approval to trigger balance zeroization, mandate revocation, and automated wire transfer."
    ],
    recommendation: {
      action: "APPROVE_CLOSURE",
      summary: "Net payout $2,435.00 calculated. 2 standing orders automatically intercepted.",
      nextStep: "Authorize 1-click closure execution to transmit ACH payout and close ledger.",
    },
    suggestedEmail: {
      subject: "Account Closure Confirmation & Final Statement — ACCT-8492-0419",
      body: "Dear Marcus Sterling,\n\nYour request to close Business Checking Account ACCT-8492-0419 has been processed.\n\nSummary of Liquidation:\n- Final Ledger Balance: $2,450.00\n- Final Period Maintenance Fee: -$15.00\n- Net Wire Disbursement: $2,435.00 (Sent to Chase Bank *4829)\n\nWe have also automatically transmitted cancellation notices to your registered recurring merchants to prevent future dishonored debit attempts.\n\nThank you for banking with AegisBank.\n\nSincerely,\nAegisBank Account Services"
    }
  },
  {
    id: "CASE-104",
    customerName: "David K. Patel",
    customerEmail: "d.patel1952@gmail.com",
    customerPhone: "+1 (555) 443-9821",
    type: "account_closure",
    title: "Senior Savings Account Closure - Pending Gas Hold Flag",
    accountNumber: "ACCT-3192-0844",
    accountType: "Senior High-Yield Savings",
    priority: "Urgent",
    status: "needs_review",
    aiConfidence: 68.0,
    riskScore: 54,
    createdAt: "42 mins ago",
    timestamp: Date.now() - 42 * 60 * 1000,
    channel: "Downtown Branch Counter",
    timeSavedMinutes: 18,
    stpEligible: false,
    closureData: {
      ledgerBalance: "$18,505.40",
      pendingCharges: "$85.40 (UNSETTLED: Shell Oil Pay-at-Pump auth from 1.5h ago)",
      accruedFees: "$0.00",
      netPayoutDue: "$18,420.00 (with $100 buffer recommended)",
      payoutMethod: "Cashier's Cheque in branch",
      activeStandingOrders: [],
      collateralLiens: "None",
    },
    documents: [
      {
        id: "doc-1",
        title: "Branch Closure Application Form",
        type: "closure_mandate",
        status: "verified",
        confidence: 95.0,
        extractedFields: {
          signatory: { value: "David K. Patel", confidence: 96.0, status: "matched" },
          branchTeller: { value: "Station #4 (Teller ID 8812)", confidence: 99.0, status: "matched" },
        },
        boundingBoxes: [
          { label: "Signatory", top: 30, left: 20, width: 40, height: 10, fieldKey: "signatory" }
        ],
        badge: "Branch In-Person Request",
        issuedBy: "Branch Operations Downtown",
      },
      {
        id: "doc-2",
        title: "Real-time Visa Authorization Ledger",
        type: "settlement_sheet",
        status: "flagged",
        confidence: 99.4,
        extractedFields: {
          pendingAuth: { value: "SHELL OIL #9218 - $85.40 (POS Auth Code 410982, Pending Batch Settlement)", confidence: 100, status: "flagged" },
        },
        boundingBoxes: [
          { label: "Unsettled Auth", top: 25, left: 10, width: 80, height: 15, fieldKey: "pendingAuth" }
        ],
        badge: "Unsettled Card Auth Detected",
        issuedBy: "Visa Card Network Real-Time Stream",
      }
    ],
    aiChecks: [
      { name: "Real-time Network Authorization Audit", result: "HALTED", score: 50.0, detail: "Unsettled $85.40 POS authorization discovered" },
      { name: "Signature Verification", result: "PASS", score: 95.0, detail: "Signature matches branch signature card on file" },
      { name: "Overdraft Protection Status", result: "PASS", score: 100, detail: "No overdraft protection loans active" }
    ],
    aiReasoning: [
      "Step 1: Scanned ledger for immediate closure eligibility.",
      "Step 2: AI Agent intercepted a pending pre-authorization for $85.40 at Shell Oil initiated 1.5 hours ago.",
      "Step 3: If closed immediately at full ledger balance of $18,505.40, the debit card settlement tonight will bounce or cause negative charge-off.",
      "Step 4: AI Copilot Solution: Option A: Hold $100 escrow buffer and disburse $18,405.40 immediately via Cashier's Check, releasing remainder after midnight batch.",
      "Option B: Instruct branch teller to ask customer to wait until next business day.",
      "Human-in-the-Loop required: Bank officer must choose whether to apply escrow buffer or pause request."
    ],
    recommendation: {
      action: "APPLY_ESCROW_BUFFER",
      summary: "Apply $100 temporary buffer for pending POS charge and disburse $18,405.40.",
      nextStep: "Select 'Disburse with $100 Escrow Buffer' to issue branch Cashier Cheque.",
    },
    suggestedEmail: {
      subject: "Your AegisBank Account Closure Status & Escrow Notice",
      body: "Dear David K. Patel,\n\nWe have initiated your account closure in branch today. Because of a recent card transaction of $85.40 at Shell Oil that is settling through the payment network, our system has disbursed $18,405.40 via Cashier's Cheque today with a temporary $100 balance hold.\n\nOnce the card charge posts overnight, the remaining balance of $14.60 will be sent to your mailing address or deposited to your linked account.\n\nSincerely,\nAegisBank Branch Operations"
    }
  },
  {
    id: "CASE-105",
    customerName: "Elena Vance (Apex Logistics LLC)",
    customerEmail: "elena@apexlogistics.com",
    customerPhone: "+1 (555) 671-8840",
    type: "loan_audit",
    title: "Commercial Credit ($350,000) Pre-Underwriting Audit",
    accountType: "Commercial Working Capital Loan",
    depositAmount: "$350,000",
    priority: "Urgent",
    status: "needs_review",
    aiConfidence: 64.2,
    riskScore: 74,
    createdAt: "1 hour ago",
    timestamp: Date.now() - 60 * 60 * 1000,
    channel: "Commercial Banking Portal",
    timeSavedMinutes: 48,
    stpEligible: false,
    documents: [
      {
        id: "doc-1",
        title: "6-Month Business Bank Statements (Parsed 240 Txns)",
        type: "bank_statement",
        status: "flagged",
        confidence: 91.0,
        extractedFields: {
          declaredMonthlyDebt: { value: "$1,500.00 / mo (Application Form)", confidence: 100, status: "mismatch" },
          discoveredHiddenDebt: { value: "$4,850.00 / mo to 'CapFirst Merchant Advance' (Detected on 1st of each month)", confidence: 97.5, status: "flagged" },
          avgMonthlyRevenue: { value: "$82,400.00 / mo", confidence: 98.2, status: "matched" },
          gamblingHighRiskTxn: { value: "Zero detected", confidence: 99.5, status: "matched" },
        },
        boundingBoxes: [
          { label: "Declared Debt", top: 22, left: 10, width: 40, height: 10, fieldKey: "declaredMonthlyDebt" },
          { label: "Undeclared MCA Debit", top: 52, left: 10, width: 80, height: 18, fieldKey: "discoveredHiddenDebt" },
        ],
        badge: "Hidden Merchant Advance Uncovered",
        issuedBy: "Commercial Statement Ingestion Agent",
      },
      {
        id: "doc-2",
        title: "Financial Ratio Recalculation Memorandum",
        type: "tax_form",
        status: "flagged",
        confidence: 96.0,
        extractedFields: {
          claimedDSCR: { value: "1.85x (Meets policy minimum 1.25x)", confidence: 100, status: "mismatch" },
          recalculatedDSCR: { value: "1.12x (BREACH OF COMMERCIAL LENDING POLICY CP-402)", confidence: 99.0, status: "flagged" },
        },
        boundingBoxes: [
          { label: "Adjusted DSCR", top: 35, left: 20, width: 60, height: 15, fieldKey: "recalculatedDSCR" }
        ],
        badge: "Policy Threshold Breach",
        issuedBy: "Credit Underwriting Copilot",
      }
    ],
    aiChecks: [
      { name: "Debt Service Coverage Ratio Audit", result: "FAILED", score: 45.0, detail: "DSCR 1.12x is below credit committee guidelines of 1.25x" },
      { name: "Hidden Credit Facility Discovery", result: "FLAGGED", score: 32.0, detail: "Found recurring $4,850/mo MCA debt omitted from schedule" },
      { name: "Corporate Entity Good Standing", result: "PASS", score: 98.0, detail: "Delaware Secretary of State active filing confirmed" },
    ],
    aiReasoning: [
      "Step 1: Ingested 180 pages of bank statements across 6 monthly cycles.",
      "Step 2: AI pattern matching mapped payroll, customer collections, and financing debits.",
      "Step 3: DISCOVERY: Line items identified a $4,850 debit on the 1st of May, June, July, August, September to 'CapFirst Merchant Cash Advance LLC'.",
      "Step 4: This recurring facility was NOT declared on the borrower's debt schedule.",
      "Step 5: Adjusted Debt Service Coverage Ratio (DSCR) plummets from 1.85x to 1.12x, violating Bank Policy CP-402.",
      "Human-in-the-Loop recommendation: Credit officer must issue formal query to applicant requesting full Merchant Cash Advance amortization schedule or reduce credit line to $175,000."
    ],
    recommendation: {
      action: "REQUEST_RESUBMISSION",
      summary: "Undeclared $4,850/mo debt discovered in statements. Request explanation or restructure.",
      nextStep: "Trigger credit interview inquiry or counter-offer reduced line of $175,000.",
    },
    suggestedEmail: {
      subject: "AegisBank Commercial Underwriting — Supplementary Schedule Required",
      body: "Dear Elena Vance,\n\nOur credit underwriting team has completed the preliminary digital analysis of your commercial loan application for Apex Logistics LLC.\n\nDuring statement cash flow analysis, our system identified recurring payments of $4,850/month to CapFirst Merchant Cash Advance which was omitted from the liabilities schedule.\n\nTo continue processing your application, please provide:\n1. Copy of the underlying agreement with CapFirst\n2. Current payoff balance statement\n\nSincerely,\nCommercial Lending Committee\nAegisBank"
    }
  },
  {
    id: "CASE-106",
    customerName: "Nikolai Volkov",
    customerEmail: "n.volkov@volkov-enterprises.ch",
    customerPhone: "+41 22 819 0921",
    type: "account_opening",
    title: "Private Wealth Account - Tier 2 PEP Watchlist Match",
    accountType: "Private Wealth Management",
    depositAmount: "$1,250,000",
    priority: "Urgent",
    status: "escalated",
    aiConfidence: 42.0,
    riskScore: 92,
    createdAt: "2 hours ago",
    timestamp: Date.now() - 120 * 60 * 1000,
    channel: "Wealth Advisory Suite",
    timeSavedMinutes: 45,
    stpEligible: false,
    documents: [
      {
        id: "doc-1",
        title: "Swiss Cantonal Passport & Beneficial Owner Filing",
        type: "passport",
        status: "flagged",
        confidence: 88.0,
        extractedFields: {
          fullName: { value: "NIKOLAI PETROVICH VOLKOV", confidence: 99.0, status: "flagged" },
          dob: { value: "1972-03-14", confidence: 99.2, status: "matched" },
          sanctionsAdvisory: { value: "POSSIBLE HIT: 2nd-degree associate of sanctioned energy conglomerate executive", confidence: 85.0, status: "flagged" },
        },
        boundingBoxes: [
          { label: "Subject Name", top: 28, left: 30, width: 50, height: 10, fieldKey: "fullName" },
          { label: "PEP Link", top: 60, left: 20, width: 60, height: 16, fieldKey: "sanctionsAdvisory" },
        ],
        badge: "PEP Screening Alert",
        issuedBy: "Federal Department of Foreign Affairs Switzerland",
      }
    ],
    aiChecks: [
      { name: "Global Watchlist & Sanctions", result: "FAILED", score: 18.0, detail: "Politically Exposed Person (PEP) database correlation found" },
      { name: "Adverse Media Screening", result: "FLAGGED", score: 35.0, detail: "3 news articles linking subject to sanctioned state procurement" },
      { name: "Anti-Money Laundering Dossier", result: "ESCALATED", score: 22.0, detail: "Requires Senior Compliance Officer & MLRO review" },
    ],
    aiReasoning: [
      "Step 1: Automated query across Refinitiv World-Check and FinCEN datasets.",
      "Step 2: Subject matched alias of high-risk PEP associate with 85% probabilistic confidence.",
      "Step 3: Autonomous agent HALTED pipeline immediately per FinCEN Rule 31 CFR 1010.620.",
      "Step 4: Agent compiled full Enhanced Due Diligence (EDD) bundle and drafted Suspicious Activity Report (SAR) narrative.",
      "Human-in-the-Loop status: Forwarded to Chief Compliance Officer for mandatory executive sign-off."
    ],
    recommendation: {
      action: "ESCALATE",
      summary: "PEP watchlist hit. Automatic freeze engaged. Awaiting MLRO executive clearance.",
      nextStep: "Review Enhanced Due Diligence dossier and confirm MLRO decision.",
    },
    suggestedEmail: {
      subject: "Compliance Notice — Enhanced Due Diligence Required",
      body: "Dear Mr. Volkov,\n\nIn compliance with international banking regulations and wealth management compliance standards, your application is undergoing supplementary verification by our senior regulatory committee.\n\nOur compliance officer will contact your designated representative within 48 business hours.\n\nAegisBank Compliance Operations"
    }
  },
  {
    id: "CASE-107",
    customerName: "Chloe Bennet",
    customerEmail: "chloe.b@university.edu",
    customerPhone: "+1 (555) 392-1184",
    type: "account_opening",
    title: "Student Checking Account Opening",
    accountType: "Student Advantage Checking",
    depositAmount: "$250",
    priority: "Low",
    status: "auto_approved",
    aiConfidence: 99.6,
    riskScore: 4,
    createdAt: "3 hours ago",
    timestamp: Date.now() - 180 * 60 * 1000,
    channel: "Mobile App",
    timeSavedMinutes: 20,
    stpEligible: true,
    documents: [
      {
        id: "doc-1",
        title: "California Driver License",
        type: "id_card",
        status: "verified",
        confidence: 99.8,
        extractedFields: {
          fullName: { value: "CHLOE ANNE BENNET", confidence: 99.9, status: "matched" },
          licenseNumber: { value: "D9481029", confidence: 99.7, status: "matched" },
          dob: { value: "2005-08-19", confidence: 99.9, status: "matched" },
        },
        boundingBoxes: [
          { label: "Name", top: 25, left: 30, width: 45, height: 10, fieldKey: "fullName" }
        ],
        badge: "Auto-Verified 99.8%",
        issuedBy: "California DMV",
      }
    ],
    aiChecks: [
      { name: "DMV Barcode & Facial Biometrics", result: "PASS", score: 99.9, detail: "100% genuine DMV PDF417 2D barcode decode" },
      { name: "AML / Watchlist", result: "PASS", score: 100, detail: "Clean records across all bureaus" },
      { name: "Student Enrollment Verification", result: "PASS", score: 98.9, detail: "National Student Clearinghouse confirmed enrollment" }
    ],
    aiReasoning: [
      "Step 1: All documents scanned with 99.8% OCR precision.",
      "Step 2: Biometrics matched mobile selfie with 99.4% confidence.",
      "Step 3: Student enrollment confirmed via university API.",
      "Step 4: Straight-Through Processing (STP) triggered automatically in 6.2 seconds."
    ],
    recommendation: {
      action: "AUTO_APPROVED",
      summary: "Processed autonomously via Straight-Through Processing (STP) pipeline.",
      nextStep: "Completed. Virtual card issued immediately.",
    },
    suggestedEmail: {
      subject: "Welcome to AegisBank! Your Student Account is Live",
      body: "Hi Chloe,\n\nYour Student Advantage Checking account is active and ready to use!\n\nAccount: 7719-XXXX-882\nRouting: 021000089\n\nDownload the app to add your virtual debit card to Apple Wallet or Google Pay.\n\nCheers,\nAegisBank Team"
    }
  }
];

export const simulationPresets = [
  {
    id: "preset-kyc-clean",
    name: "Standard Account Opening (Clean KYC)",
    customerName: "Julian Vance",
    type: "account_opening",
    description: "Passport + clean utility bill. 98% AI confidence, instant approval recommendation.",
    expectedResult: "Recommended for 1-click Approval",
    riskCategory: "Low (8/100)",
  },
  {
    id: "preset-kyc-fraud",
    name: "Account Opening (Forged Income Statement)",
    customerName: "Arthur Pendelton",
    type: "account_opening",
    description: "Font artifact discrepancy detected on salary slip. Suspected salary inflation.",
    expectedResult: "AI Flags Document Tampering (Fraud Risk 86%)",
    riskCategory: "High (86/100)",
  },
  {
    id: "preset-closure-lien",
    name: "Account Closure (Active Liens & Recurring Debits)",
    customerName: "Seraphina Lin",
    type: "account_closure",
    description: "Closure request with 3 active standing orders and unsettled card authorization.",
    expectedResult: "AI Intercepts Debits & Auto-Drafts Mandate Cancellations",
    riskCategory: "Medium (42/100)",
  },
  {
    id: "preset-loan-hidden-debt",
    name: "Commercial Loan Audit (Undeclared Debt)",
    customerName: "Titan Freight Corp",
    type: "loan_audit",
    description: "Statement parser uncovers $8,200/mo unlisted equipment lease obligation.",
    expectedResult: "Auto-Recalculates DSCR & Flags Credit Officer",
    riskCategory: "High (78/100)",
  }
];
