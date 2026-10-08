import React, { useState } from 'react';
import { 
  HiMagnifyingGlassPlus, 
  HiMagnifyingGlassMinus, 
  HiViewfinderCircle, 
  HiShieldCheck, 
  HiCheckBadge,
  HiIdentification
} from 'react-icons/hi2';

// Clean, bulletproof OCR Field boundary wrapper
function OcrField({ 
  label, 
  fieldKey, 
  isSelected, 
  showBoxes, 
  isFlagged, 
  onClick, 
  children 
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(fieldKey);
      }}
      className={`relative transition-all cursor-pointer inline-block ${
        showBoxes
          ? isSelected
            ? 'ring-2 ring-slate-900 bg-slate-900/10 rounded px-1.5 py-0.5 z-10'
            : isFlagged
            ? 'border-2 border-rose-500 bg-rose-50/70 rounded px-1.5 py-0.5'
            : 'border-2 border-dashed border-slate-400 bg-slate-100/50 hover:border-slate-800 rounded px-1.5 py-0.5'
          : 'p-0'
      }`}
    >
      {showBoxes && (
        <span className={`absolute -top-3 left-0 text-[8px] font-mono font-bold px-1 py-0 rounded leading-tight shadow-xs whitespace-nowrap z-20 ${
          isSelected
            ? 'bg-slate-900 text-white'
            : isFlagged
            ? 'bg-rose-600 text-white'
            : 'bg-slate-700 text-white'
        }`}>
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

export default function DocumentViewer({ 
  document, 
  selectedFieldKey, 
  onSelectField 
}) {
  const [zoom, setZoom] = useState(1);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);

  if (!document) {
    return (
      <div className="h-96 flex items-center justify-center border border-dashed border-slate-300 rounded-lg text-slate-400 text-xs bg-white">
        Select a document to inspect
      </div>
    );
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 1.4));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.8));

  const fields = document.extractedFields || {};

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
      {/* Viewer Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-50 border-b border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900 text-xs">{document.title}</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
            document.status === 'verified'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            {document.badge}
          </span>
        </div>

        {/* Action toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs border font-medium transition-colors ${
              showBoundingBoxes
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-300 hover:text-slate-900'
            }`}
          >
            <HiViewfinderCircle className="w-3.5 h-3.5" />
            <span>{showBoundingBoxes ? 'OCR Boxes: On' : 'OCR Boxes: Off'}</span>
          </button>

          <div className="flex items-center rounded bg-white border border-slate-300 overflow-hidden">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
              title="Zoom out"
            >
              <HiMagnifyingGlassMinus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono text-slate-600 select-none">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
              title="Zoom in"
            >
              <HiMagnifyingGlassPlus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="relative flex-1 p-5 overflow-auto flex items-center justify-center bg-slate-100/60 min-h-[440px]">
        
        {/* Scaled Document Visualizer */}
        <div 
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          className="relative transition-transform duration-150"
        >
          {/* ======================================================== */}
          {/* 1. DOCUMENT TYPE: ID CARD (e.g. Singapore EP or Driver License) */}
          {/* ======================================================== */}
          {document.type === 'id_card' && (
            <div className="w-[500px] h-[320px] rounded-lg bg-white border border-slate-300 p-5 relative select-none text-slate-800 shadow-sm flex flex-col justify-between">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-5 rounded border border-slate-400 flex items-center justify-center text-[9px] font-bold text-slate-700 bg-slate-50">
                    SGP
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 leading-none">
                      Republic of Singapore
                    </h4>
                    <span className="text-[10px] text-slate-500 font-medium">Employment Pass • Ministry of Manpower</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 block font-mono">PASS STATUS</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700">ACTIVE / VALID</span>
                </div>
              </div>

              {/* Card Middle Grid */}
              <div className="grid grid-cols-12 gap-4 items-center py-2">
                {/* Photo Column */}
                <div className="col-span-4 flex flex-col items-center">
                  <div className="w-24 h-32 rounded bg-slate-100 border border-slate-300 flex flex-col items-center justify-end p-2 relative shadow-xs">
                    <div className="w-12 h-12 rounded-full bg-slate-300 mb-1 flex items-center justify-center text-slate-700 font-bold text-sm">
                      SC
                    </div>
                    <div className="w-18 h-8 rounded-t bg-slate-300" />
                    <div className="absolute top-1 left-1 bg-white border border-slate-200 px-1 py-0.2 rounded text-[7px] text-slate-600 font-mono">
                      CHIP
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1">Biometric Pass Verified</span>
                </div>

                {/* Fields Column with Precise OCR Boxes */}
                <div className="col-span-8 space-y-3 text-xs">
                  {/* Name */}
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                      Full Name
                    </span>
                    <OcrField
                      label="Name"
                      fieldKey="fullName"
                      isSelected={selectedFieldKey === 'fullName'}
                      showBoxes={showBoundingBoxes}
                      isFlagged={fields.fullName?.status === 'flagged'}
                      onClick={onSelectField}
                    >
                      <span className="font-bold text-slate-900 text-sm tracking-wide">
                        {fields.fullName?.value || 'SOFIA CHEN JIA-LING'}
                      </span>
                    </OcrField>
                  </div>

                  {/* ID / FIN Number */}
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                      Identification / FIN Number
                    </span>
                    <OcrField
                      label="FIN No."
                      fieldKey="idNumber"
                      isSelected={selectedFieldKey === 'idNumber'}
                      showBoxes={showBoundingBoxes}
                      isFlagged={fields.idNumber?.status === 'flagged'}
                      onClick={onSelectField}
                    >
                      <span className="font-mono font-bold text-slate-900 text-xs">
                        {fields.idNumber?.value || 'G8294102M'}
                      </span>
                    </OcrField>
                  </div>

                  {/* Grid for DOB and Expiry */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                        Date of Birth
                      </span>
                      <OcrField
                        label="DOB"
                        fieldKey="dob"
                        isSelected={selectedFieldKey === 'dob'}
                        showBoxes={showBoundingBoxes}
                        isFlagged={fields.dob?.status === 'flagged'}
                        onClick={onSelectField}
                      >
                        <span className="font-mono text-slate-800 text-xs">
                          {fields.dob?.value || '1994-11-20'}
                        </span>
                      </OcrField>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                        Card Expiry
                      </span>
                      <OcrField
                        label="Expiry"
                        fieldKey="expiry"
                        isSelected={selectedFieldKey === 'expiry'}
                        showBoxes={showBoundingBoxes}
                        isFlagged={fields.expiry?.status === 'flagged'}
                        onClick={onSelectField}
                      >
                        <span className="font-mono text-slate-800 text-xs font-semibold">
                          {fields.expiry?.value || '2028-05-30'}
                        </span>
                      </OcrField>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Security Bar */}
              <div className="border-t border-slate-200 pt-1.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>SECTOR: FINANCIAL / ASSET MGMT</span>
                <span>REGISTRY AUTH: MOM-PASS-092810</span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. DOCUMENT TYPE: PASSPORT */}
          {/* ======================================================== */}
          {document.type === 'passport' && (
            <div className="w-[500px] h-[330px] rounded-lg bg-white border border-slate-300 p-5 relative select-none text-slate-800 shadow-sm flex flex-col justify-between">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-4 rounded border border-slate-400 flex items-center justify-center text-[9px] text-slate-700 font-bold font-mono">
                    USA
                  </div>
                  <span className="font-semibold text-xs tracking-wider uppercase text-slate-700">United States of America</span>
                </div>
                <div className="text-xs font-mono text-slate-900 font-bold">
                  <OcrField
                    label="Passport No."
                    fieldKey="docNumber"
                    isSelected={selectedFieldKey === 'docNumber'}
                    showBoxes={showBoundingBoxes}
                    onClick={onSelectField}
                  >
                    <span>{fields.docNumber?.value || 'P98421094'}</span>
                  </OcrField>
                </div>
              </div>

              {/* Body */}
              <div className="grid grid-cols-12 gap-3 items-center">
                {/* Photo */}
                <div className="col-span-4 flex flex-col items-center">
                  <div className="w-24 h-32 rounded bg-slate-100 border border-slate-300 relative overflow-hidden flex flex-col items-center justify-end p-2 shadow-xs">
                    <div className="w-12 h-12 rounded-full bg-slate-300 mb-1 flex items-center justify-center text-slate-700 font-bold text-sm">
                      AM
                    </div>
                    <div className="w-18 h-8 rounded-t bg-slate-300" />
                    <div className="absolute top-1 right-1 bg-white border border-slate-200 px-1 py-0.2 rounded text-[7px] text-slate-600 font-mono">
                      ICAO
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-700 font-mono">
                    <HiShieldCheck className="w-3.5 h-3.5" />
                    <span>Face Match 98.9%</span>
                  </div>
                </div>

                {/* Fields with Exact OCR Box Wrappers */}
                <div className="col-span-8 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono mb-1">Surname / Given Names</span>
                    <OcrField
                      label="Full Name"
                      fieldKey="fullName"
                      isSelected={selectedFieldKey === 'fullName'}
                      showBoxes={showBoundingBoxes}
                      isFlagged={fields.fullName?.status === 'flagged'}
                      onClick={onSelectField}
                    >
                      <span className="font-bold text-slate-900 text-sm tracking-wide">
                        {fields.fullName?.value || 'ALEX MORGAN'}
                      </span>
                    </OcrField>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono mb-1">Nationality</span>
                      <OcrField
                        label="Nationality"
                        fieldKey="nationality"
                        isSelected={selectedFieldKey === 'nationality'}
                        showBoxes={showBoundingBoxes}
                        onClick={onSelectField}
                      >
                        <span className="font-medium text-slate-800">
                          {fields.nationality?.value || 'UNITED STATES'}
                        </span>
                      </OcrField>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono mb-1">Date of Birth</span>
                      <OcrField
                        label="DOB"
                        fieldKey="dateOfBirth"
                        isSelected={selectedFieldKey === 'dateOfBirth'}
                        showBoxes={showBoundingBoxes}
                        onClick={onSelectField}
                      >
                        <span className="font-mono text-slate-800">
                          {fields.dateOfBirth?.value || '1989-04-12'}
                        </span>
                      </OcrField>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono">Authority</span>
                      <span className="text-slate-600 text-[11px]">US DEPT OF STATE</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono mb-1">Expiration Date</span>
                      <OcrField
                        label="Expiry"
                        fieldKey="expiryDate"
                        isSelected={selectedFieldKey === 'expiryDate'}
                        showBoxes={showBoundingBoxes}
                        onClick={onSelectField}
                      >
                        <span className="font-mono text-slate-800 font-medium">
                          {fields.expiryDate?.value || '2031-08-14'}
                        </span>
                      </OcrField>
                    </div>
                  </div>
                </div>
              </div>

              {/* Machine Readable Zone (MRZ) */}
              <div className="mt-2 bg-slate-50 p-1.5 rounded border border-slate-200 font-mono text-[9.5px] tracking-widest text-slate-600 leading-tight">
                <OcrField
                  label="MRZ Checksum"
                  fieldKey="mrzChecksum"
                  isSelected={selectedFieldKey === 'mrzChecksum'}
                  showBoxes={showBoundingBoxes}
                  onClick={onSelectField}
                >
                  <div>
                    <p>P&lt;USAMORGAN&lt;&lt;ALEX&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
                    <p>P984210940USA8904128M3108144&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;06</p>
                  </div>
                </OcrField>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. DOCUMENT TYPE: UTILITY BILL / TENANCY LEASE */}
          {/* ======================================================== */}
          {document.type === 'utility_bill' && (
            <div className="w-[500px] h-[340px] rounded-lg bg-white border border-slate-300 p-5 relative select-none text-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">
                    {document.title.includes('Tenancy') ? 'Residential Tenancy Agreement' : 'ConEdison Power & Gas'}
                  </h4>
                  <span className="text-[10px] text-slate-500">Official Verification Document</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">ISSUE DATE</span>
                  <OcrField
                    label="Issue Date"
                    fieldKey="issueDate"
                    isSelected={selectedFieldKey === 'issueDate'}
                    showBoxes={showBoundingBoxes}
                    onClick={onSelectField}
                  >
                    <span className="font-mono text-xs font-semibold text-slate-800">
                      {fields.issueDate?.value || '2026-09-15'}
                    </span>
                  </OcrField>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {/* Name */}
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono mb-1">
                    {document.title.includes('Tenancy') ? 'Tenant Name' : 'Account Holder'}
                  </span>
                  <OcrField
                    label="Customer Name"
                    fieldKey={fields.accountHolder ? 'accountHolder' : 'tenantName'}
                    isSelected={selectedFieldKey === 'accountHolder' || selectedFieldKey === 'tenantName'}
                    showBoxes={showBoundingBoxes}
                    onClick={onSelectField}
                  >
                    <span className="font-bold text-slate-900 text-xs">
                      {fields.accountHolder?.value || fields.tenantName?.value || 'Alex Morgan'}
                    </span>
                  </OcrField>
                </div>

                {/* Address with OCR Box */}
                <div className={`p-2.5 rounded border ${
                  fields.propertyAddress?.status === 'mismatch' ? 'bg-rose-50/70 border-rose-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono mb-1">
                    {document.title.includes('Tenancy') ? 'Leased Property Domicile' : 'Service Billing Address'}
                  </span>
                  <OcrField
                    label="Address"
                    fieldKey={fields.billingAddress ? 'billingAddress' : 'propertyAddress'}
                    isSelected={selectedFieldKey === 'billingAddress' || selectedFieldKey === 'propertyAddress'}
                    showBoxes={showBoundingBoxes}
                    isFlagged={fields.propertyAddress?.status === 'mismatch'}
                    onClick={onSelectField}
                  >
                    <span className="font-mono text-slate-900 text-xs font-medium">
                      {fields.billingAddress?.value || fields.propertyAddress?.value || '742 Evergreen Terrace, Springfield, NY 10001'}
                    </span>
                  </OcrField>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <HiCheckBadge className="w-4 h-4 text-emerald-600" />
                  <span>Document Authenticity Verified</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">KYC APPROVED</span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. OTHER DOCUMENTS (Bank statements, Tax forms, Mandates) */}
          {/* ======================================================== */}
          {(document.type === 'bank_statement' || document.type === 'settlement_sheet' || document.type === 'closure_mandate' || document.type === 'tax_form') && (
            <div className="w-[500px] min-h-[330px] rounded-lg bg-white border border-slate-300 p-4 relative select-none text-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2.5">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{document.title}</h4>
                  <span className="text-[10px] text-slate-500">{document.issuedBy}</span>
                </div>
                <span className="font-mono text-xs text-slate-600">CONFIDENCE: {document.confidence}%</span>
              </div>

              <div className="space-y-2.5 text-xs py-1">
                {Object.entries(fields).map(([key, field]) => {
                  const isSelected = selectedFieldKey === key;
                  const isFlagged = field.status === 'flagged' || field.status === 'mismatch';
                  return (
                    <div
                      key={key}
                      className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <div className="flex-1 mr-2">
                        <span className="text-[9px] text-slate-400 uppercase block font-mono mb-0.5">{key}</span>
                        <OcrField
                          label={key}
                          fieldKey={key}
                          isSelected={isSelected}
                          showBoxes={showBoundingBoxes}
                          isFlagged={isFlagged}
                          onClick={onSelectField}
                        >
                          <span className="font-medium text-xs text-slate-900">{field.value}</span>
                        </OcrField>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono shrink-0 ${
                        isFlagged ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {field.confidence}%
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-slate-200 pt-1.5 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>DIGITAL AUDIT ARCHIVE</span>
                <span>STATUS: PARSED OK</span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 5. SIGNATURE SPECIMEN */}
          {/* ======================================================== */}
          {document.type === 'signature' && (
            <div className="w-[500px] h-[310px] rounded-lg bg-white border border-slate-300 p-4 relative select-none flex flex-col justify-between text-slate-800 shadow-sm">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Digital Specimen Authenticator</span>
                <span className="font-bold text-slate-900 text-xs">Vector Stroke Analysis</span>
              </div>

              <div className="relative h-40 rounded bg-slate-50 border border-slate-200 flex items-center justify-center p-4">
                <svg viewBox="0 0 400 120" className="w-full h-full text-slate-900 stroke-current">
                  <path
                    d="M 40 80 Q 90 20 140 60 T 220 50 Q 260 20 280 80 T 360 40"
                    fill="none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 70 85 L 340 78"
                    fill="none"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="text-slate-300"
                  />
                </svg>
                <div className="absolute bottom-2 right-2">
                  <OcrField
                    label="Vector Match"
                    fieldKey="similarityIndex"
                    isSelected={selectedFieldKey === 'similarityIndex'}
                    showBoxes={showBoundingBoxes}
                    onClick={onSelectField}
                  >
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Cosine Match: 97.5%
                    </span>
                  </OcrField>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-between font-mono">
                <span>Timestamp: Verified on Canvas</span>
                <span className="text-slate-700">Hash: #48A90F1</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Viewer Footer */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
        <span>Click any boxed field to cross-verify against database</span>
        <span className="font-mono text-slate-400">300 DPI Optical Inspection</span>
      </div>
    </div>
  );
}
