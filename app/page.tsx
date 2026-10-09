"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Check,
  ChevronDown,
  ClipboardCheck,
  Download,
  ExternalLink,
  FileText,
  HardDrive,
  Link2,
  Menu,
  Microscope,
  Plus,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

type CategoryKey = "web" | "mobile" | "hardware" | "firmware" | "api" | "ai";
type GoalKey = "blueprint" | "learn" | "risk" | "cases";
type LevelKey = "beginner" | "practitioner" | "advanced";

type CategoryOption = {
  key: CategoryKey;
  label: string;
  description: string;
  icon: LucideIcon;
};

type CheckSeed = {
  id: string;
  title: string;
  detail: string;
  why: string;
  source: string;
};

type Blueprint = {
  target: string;
  category: CategoryKey;
  categoryLabel: string;
  goal: GoalKey;
  level: LevelKey;
  summary: string;
  layers: string[];
  checks: CheckSeed[];
  assumptions: string[];
};

const categories: CategoryOption[] = [
  { key: "web", label: "Web", description: "Websites and web apps", icon: ClipboardCheck },
  { key: "mobile", label: "Mobile", description: "iOS and Android apps", icon: Smartphone },
  { key: "hardware", label: "Hardware", description: "Devices and electronics", icon: HardDrive },
  { key: "firmware", label: "Firmware / IoT", description: "Connected systems", icon: Wrench },
  { key: "api", label: "API / Backend", description: "Services and contracts", icon: Boxes },
  { key: "ai", label: "AI / ML", description: "Model-powered features", icon: Sparkles },
];

const goals: Array<{ key: GoalKey; label: string }> = [
  { key: "blueprint", label: "Build a testing plan" },
  { key: "learn", label: "Learn the approach" },
  { key: "risk", label: "Find risky gaps" },
  { key: "cases", label: "Create test cases" },
];

const levels: Array<{ key: LevelKey; label: string; detail: string }> = [
  { key: "beginner", label: "Beginner", detail: "Teach me the fundamentals" },
  { key: "practitioner", label: "Working tester", detail: "Give me a practical workflow" },
  { key: "advanced", label: "Advanced", detail: "Surface depth, risk, and evidence" },
];

const sourceMap = {
  istqb: {
    name: "ISTQB / ASTQB",
    issuer: "Testing foundations and methods",
    scope: "Test design, risk, traceability",
    href: "https://istqb.org/certifications/",
  },
  w3c: {
    name: "W3C WAI",
    issuer: "Web accessibility evaluation",
    scope: "Keyboard, focus, semantics, human review",
    href: "https://www.w3.org/WAI/test-evaluate/",
  },
  owasp: {
    name: "OWASP WSTG",
    issuer: "Web and API security testing",
    scope: "Authorization, input handling, abuse paths",
    href: "https://wstg.owasp.org/stable/",
  },
  nist: {
    name: "NIST IoT",
    issuer: "Connected-device security context",
    scope: "Device capabilities and lifecycle",
    href: "https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-iot-program",
  },
  manufacturer: {
    name: "Manufacturer specification",
    issuer: "Product-specific oracle",
    scope: "Limits, procedures, and safe operation",
    href: "https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-iot-program",
  },
} as const;

const checksByCategory: Record<CategoryKey, CheckSeed[]> = {
  web: [
    { id: "web-journey", title: "Walk the primary journey end to end", detail: "Run the most important user flow with a clean account, a realistic data set, and a deliberate interruption.", why: "A happy-path check establishes whether the system can deliver its core promise before edge cases are layered on.", source: "istqb" },
    { id: "web-boundaries", title: "Probe input and state boundaries", detail: "Try empty, minimum, maximum, malformed, repeated, and out-of-order values. Record the response and preserved state.", why: "Boundary and state-transition thinking finds failures that a single happy path cannot expose.", source: "istqb" },
    { id: "web-accessibility", title: "Evaluate keyboard and assistive-use paths", detail: "Complete the flow without a mouse, inspect focus order and names, and verify that errors are understandable.", why: "Automated tools can help, but human evaluation is needed to determine whether a site is usable.", source: "w3c" },
    { id: "web-security", title: "Verify authorization at every sensitive boundary", detail: "Use two authorized test accounts and confirm that object IDs, roles, sessions, and error responses cannot cross boundaries.", why: "A visible UI restriction is not proof that the server enforces authorization.", source: "owasp" },
  ],
  mobile: [
    { id: "mobile-lifecycle", title: "Test install, update, reset, and resume", detail: "Cover first launch, upgrade from an older state, force-close, background/resume, and a clean reinstall.", why: "Mobile users move through lifecycle states constantly; failures often appear outside a fresh install.", source: "istqb" },
    { id: "mobile-network", title: "Vary connectivity and permission states", detail: "Try offline, slow, switching networks, denied permissions, revoked permissions, and an interrupted request.", why: "The app must make state and recovery visible when the device cannot complete a dependency.", source: "istqb" },
    { id: "mobile-matrix", title: "Build a small device and OS matrix", detail: "Choose representative screen sizes, OS versions, hardware capabilities, and accessibility settings rather than testing one device.", why: "A single device cannot reveal compatibility risk across the supported surface.", source: "istqb" },
    { id: "mobile-evidence", title: "Capture reproducible evidence", detail: "Record build number, device/OS, permissions, network state, steps, logs, and a screen recording when timing matters.", why: "Context is part of the result; without it, a mobile defect is difficult to reproduce or prioritize.", source: "istqb" },
  ],
  hardware: [
    { id: "hardware-power", title: "Map power, charging, and safe states", detail: "Use the manufacturer procedure to check startup, shutdown, charging, low-power, thermal protection, and recovery indicators.", why: "Power behavior crosses hardware, firmware, and user-facing state; never infer limits without a product specification.", source: "manufacturer" },
    { id: "hardware-interfaces", title: "Exercise each user-accessible interface", detail: "List ports, buttons, indicators, sensors, audio, display, and accessories. Test normal use, disconnects, and reconnection.", why: "The system boundary includes physical interfaces and the transitions around them.", source: "istqb" },
    { id: "hardware-recovery", title: "Validate update and recovery paths", detail: "Test the documented firmware/OS update, interrupted update handling, reset, diagnostics, and return to a known state.", why: "Recovery is a product capability, not an afterthought. Follow the approved procedure and record versions.", source: "manufacturer" },
    { id: "hardware-evidence", title: "Capture measurements with context", detail: "Record instrument, probe/setup, firmware, environment, timestamp, and configuration. Stop if the procedure exceeds your training or equipment.", why: "A measurement without setup and an oracle cannot support a reliable pass/fail decision.", source: "manufacturer" },
  ],
  firmware: [
    { id: "iot-onboard", title: "Test onboarding and identity across states", detail: "Cover first pairing, wrong credentials, recovery, account changes, reset, and re-onboarding after a firmware update.", why: "Connected devices combine local, radio, app, and cloud state; identity transitions are high-risk.", source: "nist" },
    { id: "iot-connectivity", title: "Break and restore each dependency", detail: "Disconnect Wi-Fi/Bluetooth/cloud services, vary latency, restart components, and observe what the device tells the user.", why: "Resilience is visible in the system’s recovery behavior and its evidence, not only in a final success.", source: "istqb" },
    { id: "iot-update", title: "Exercise the firmware lifecycle", detail: "Verify version display, update prerequisites, interruption behavior, rollback/recovery, and factory reset using official procedures.", why: "Updates change the test surface and can introduce a new state machine.", source: "manufacturer" },
    { id: "iot-security", title: "Review device capability and privacy boundaries", detail: "Check least privilege, secrets, exposed interfaces, data handling, and the user’s ability to reset or remove access.", why: "IoT risk is distributed across device, app, network, and cloud.", source: "nist" },
  ],
  api: [
    { id: "api-contract", title: "Verify the contract at the boundary", detail: "Check required fields, types, status codes, error shape, idempotency, and version compatibility with valid and invalid requests.", why: "A stable contract makes failures diagnosable for every client that depends on the service.", source: "istqb" },
    { id: "api-auth", title: "Test identity, authorization, and object scope", detail: "Use separate test identities, expired credentials, wrong roles, and adjacent object IDs. Confirm server-side enforcement.", why: "Access control must be tested where the decision is made, not only in a client.", source: "owasp" },
    { id: "api-recovery", title: "Probe retries, duplicates, and dependency failures", detail: "Repeat requests, timeouts, partial responses, downstream failures, and recovery. Check whether state stays consistent.", why: "Distributed systems fail between steps; retry behavior can create duplicates or data loss.", source: "istqb" },
    { id: "api-evidence", title: "Make failures observable", detail: "Capture request ID, safe request shape, response, timing, service version, and relevant logs without exposing secrets.", why: "A result that cannot be investigated is not a useful test result.", source: "istqb" },
  ],
  ai: [
    { id: "ai-success", title: "Define task success before probing the model", detail: "Write representative tasks, acceptable answers, unacceptable behavior, and a human-review rubric before generating examples.", why: "A model response cannot be judged reliably without an explicit oracle.", source: "istqb" },
    { id: "ai-boundaries", title: "Test ambiguity, unsupported requests, and variation", detail: "Use incomplete inputs, conflicting instructions, edge cases, repeated runs, and requests outside the feature’s stated scope.", why: "Robustness includes what the system does when the request is unclear or unsupported.", source: "istqb" },
    { id: "ai-data", title: "Trace data handling and privacy boundaries", detail: "Confirm what is sent, stored, displayed, logged, and used for evaluation. Keep private or employer data out of the beta.", why: "AI quality is inseparable from the data and operational boundaries around the model.", source: "istqb" },
    { id: "ai-monitor", title: "Plan human review and regression evidence", detail: "Keep a small reviewed set, compare versions, record failure categories, and never label generated output as an executed test.", why: "Repeatable evaluation turns anecdotes into evidence of change.", source: "istqb" },
  ],
};

const categoryDescriptions: Record<CategoryKey, string> = {
  web: "A public or internal website, web app, or checkout flow",
  mobile: "An iOS or Android app across devices, permissions, and lifecycle",
  hardware: "A physical device, laptop, accessory, or electronic subsystem",
  firmware: "A connected device, firmware image, or IoT workflow",
  api: "A backend service, API contract, or integration boundary",
  ai: "An AI/ML feature, assistant, evaluator, or model-powered workflow",
};

function buildBlueprint(target: string, category: CategoryKey, goal: GoalKey, level: LevelKey): Blueprint {
  const selectedCategory = categories.find((item) => item.key === category);
  const targetName = target.trim() || categoryDescriptions[category];
  const goalLead: Record<GoalKey, string> = {
    blueprint: "Start with a risk-based map, then turn the highest-value checks into an executable plan.",
    learn: "Use the target as a teaching surface: understand the layers before choosing individual checks.",
    risk: "Prioritize failure modes that could damage trust, access, safety, data, or recovery.",
    cases: "Turn the target’s behaviors and boundaries into reviewable draft cases.",
  };
  const levelLead: Record<LevelKey, string> = {
    beginner: "The language stays explicit and explains why each move matters.",
    practitioner: "The plan assumes test judgment and emphasizes setup, evidence, and coverage gaps.",
    advanced: "The plan emphasizes oracles, system boundaries, observability, and residual risk.",
  };
  const layerSets: Record<CategoryKey, string[]> = {
    web: ["Experience", "Client state", "API boundary", "Identity", "Data & recovery"],
    mobile: ["UI & gestures", "Lifecycle", "Permissions", "Device matrix", "Network"],
    hardware: ["Power & thermal", "Interfaces", "Firmware", "Sensors & output", "Recovery"],
    firmware: ["Device", "Radio", "Companion app", "Cloud", "Update & reset"],
    api: ["Contract", "Identity", "Business rules", "Dependencies", "Observability"],
    ai: ["Task", "Input data", "Model behavior", "Safety", "Evaluation loop"],
  };
  return {
    target: targetName,
    category,
    categoryLabel: selectedCategory?.label ?? "Testing target",
    goal,
    level,
    summary: goalLead[goal] + " " + levelLead[level],
    layers: layerSets[category],
    checks: checksByCategory[category],
    assumptions: [
      "This is a planning draft, not a test execution result.",
      "Product-specific acceptance limits still need to come from requirements, specifications, or an authorized owner.",
      "Use only public, synthetic, or redacted information in this free beta.",
    ],
  };
}

function csvCell(value: string) {
  return '"' + value.replaceAll('"', '""') + '"';
}

export default function Home() {
  const [target, setTarget] = useState("");
  const [category, setCategory] = useState<CategoryKey>("web");
  const [goal, setGoal] = useState<GoalKey>("blueprint");
  const [level, setLevel] = useState<LevelKey>("practitioner");
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [reviewed, setReviewed] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let timeoutId: number | undefined;
    try {
      const saved = window.localStorage.getItem("testing-atlas-draft");
      if (saved) {
        const parsed = JSON.parse(saved) as { blueprint?: Blueprint; reviewed?: Record<string, boolean>; notes?: string };
        timeoutId = window.setTimeout(() => {
          if (parsed.blueprint) {
            setBlueprint(parsed.blueprint);
            setTarget(parsed.blueprint.target);
          }
          if (parsed.reviewed) setReviewed(parsed.reviewed);
          if (parsed.notes) setNotes(parsed.notes);
        }, 0);
      }
    } catch {
      // An optional local draft should never block the app.
    }
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!blueprint) return;
    window.localStorage.setItem("testing-atlas-draft", JSON.stringify({ blueprint, reviewed, notes }));
  }, [blueprint, reviewed, notes]);

  const reviewedCount = blueprint ? blueprint.checks.filter((item) => reviewed[item.id]).length : 0;

  function generateBlueprint(nextTarget = target) {
    const next = buildBlueprint(nextTarget, category, goal, level);
    setBlueprint(next);
    setTarget(next.target);
    setReviewed({});
    setStatus("Blueprint ready. Review the assumptions before using it.");
    window.setTimeout(() => {
      document.getElementById("blueprint-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function loadSample(sampleTarget: string, sampleCategory: CategoryKey) {
    setCategory(sampleCategory);
    setTarget(sampleTarget);
    const next = buildBlueprint(sampleTarget, sampleCategory, goal, level);
    setBlueprint(next);
    setReviewed({});
    setStatus("Sample loaded. Make it yours by editing the target and review notes.");
    window.setTimeout(() => {
      document.getElementById("blueprint-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function resetWorkspace() {
    setBlueprint(null);
    setReviewed({});
    setNotes("");
    setStatus("");
    window.localStorage.removeItem("testing-atlas-draft");
    window.setTimeout(() => {
      document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function downloadFile(content: string, fileName: string, type: string) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function exportPlan(format: "markdown" | "csv") {
    if (!blueprint) return;
    const statusFor = (id: string) => (reviewed[id] ? "Reviewed" : "Draft");
    if (format === "csv") {
      const rows: string[][] = [
        ["Target", blueprint.target],
        ["Category", blueprint.categoryLabel],
        ["Level", levels.find((item) => item.key === blueprint.level)?.label ?? ""],
        [],
        ["ID", "Test idea", "Details", "Why it matters", "Source", "Status"],
        ...blueprint.checks.map((item) => [
          item.id,
          item.title,
          item.detail,
          item.why,
          sourceMap[item.source as keyof typeof sourceMap].name,
          statusFor(item.id),
        ]),
      ];
      downloadFile(rows.map((row) => row.map(csvCell).join(",")).join("\n"), "testing-atlas-plan.csv", "text/csv;charset=utf-8");
      setStatus("CSV plan downloaded.");
      return;
    }
    const lines = [
      "# Testing Blueprint: " + blueprint.target,
      "",
      "- Category: " + blueprint.categoryLabel,
      "- Level: " + (levels.find((item) => item.key === blueprint.level)?.label ?? ""),
      "- Status: Planning draft",
      "",
      "## Summary",
      blueprint.summary,
      "",
      "## System map",
      blueprint.layers.map((layer) => "- " + layer).join("\n"),
      "",
      "## High-value checks",
    ];
    blueprint.checks.forEach((item) => {
      lines.push(
        "### " + item.id + " — " + item.title,
        item.detail,
        "",
        "Why: " + item.why,
        "Source: " + sourceMap[item.source as keyof typeof sourceMap].name,
        "Status: " + statusFor(item.id),
        "",
      );
    });
    lines.push(
      "## Assumptions and limits",
      blueprint.assumptions.map((item) => "- " + item).join("\n"),
      "",
      "## Tester notes",
      notes || "_Add notes in the workspace before exporting again._",
    );
    downloadFile(lines.join("\n"), "testing-atlas-blueprint.md", "text/markdown;charset=utf-8");
    setStatus("Markdown plan downloaded.");
  }

  return (
    <main id="top" className="atlas-shell">
      <aside className={mobileNav ? "atlas-rail is-open" : "atlas-rail"}>
        <div className="rail-brand">
          <div className="brand-mark" aria-hidden="true"><Microscope size={20} strokeWidth={2.2} /></div>
          <div><div className="brand-name">Testing Atlas</div><div className="brand-subtitle">A field guide for QA</div></div>
          <button className="icon-button rail-close" type="button" aria-label="Close navigation" onClick={() => setMobileNav(false)}><X size={18} /></button>
        </div>
        <div className="rail-section-label">Workspace</div>
        <nav className="rail-nav" aria-label="Main navigation">
          <a className="rail-link is-active" href="#top" onClick={() => setMobileNav(false)}><ClipboardCheck size={17} /><span>Blueprint</span></a>
          <a className="rail-link" href="#starter-guides" onClick={() => setMobileNav(false)}><BookOpen size={17} /><span>Guide library</span></a>
          <a className="rail-link" href="#sources" onClick={() => setMobileNav(false)}><Link2 size={17} /><span>Sources</span></a>
        </nav>
        <div className="rail-section-label rail-section-spaced">Test surfaces</div>
        <div className="rail-topics">
          {categories.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <button type="button" className="rail-topic" key={item.key} onClick={() => { setCategory(item.key); setMobileNav(false); document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" }); }}>
                <Icon size={15} /><span>{item.label}</span>
              </button>
            );
          })}
        </div>
        <div className="rail-footer">
          <div className="rail-status"><span className="status-dot" /><span>Free beta · local draft</span></div>
          <p>Source-aware guidance. No API call required for this blueprint.</p>
        </div>
      </aside>

      <div className="atlas-main">
        <header className="topbar">
          <button className="icon-button mobile-menu" type="button" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={20} /></button>
          <div className="topbar-crumb"><span className="crumb-muted">Testing Atlas</span><span className="crumb-slash">/</span><span>{blueprint ? "Blueprint workspace" : "Start a blueprint"}</span></div>
          <div className="topbar-actions">
            <span className="beta-badge"><Sparkles size={13} />Free beta</span>
            <button className="topbar-help" type="button" onClick={() => setStatus("Everything here is a planning draft. Confirm product-specific oracles before execution.")}><span className="help-mark">?</span><span className="help-label">How it works</span></button>
          </div>
        </header>

        <div className="atlas-content">
          {!blueprint ? (
            <>
              <section className="hero-grid" id="intake">
                <div className="hero-copy">
                  <div className="eyebrow"><span className="eyebrow-line" />SOURCE-AWARE TESTING WORKSPACE</div>
                  <h1>Test anything.<br /><span>Start with a better map.</span></h1>
                  <p className="hero-lede">Turn a website, mobile app, device, or AI feature into a focused testing plan you can actually use.</p>
                  <div className="hero-signals">
                    <div><strong>6</strong><span>test surfaces</span></div>
                    <div><strong>3</strong><span>experience levels</span></div>
                    <div><strong>0</strong><span>API calls to start</span></div>
                  </div>
                </div>

                <div className="intake-card">
                  <div className="card-kicker"><span className="step-number">01</span><span>Build your testing blueprint</span><span className="card-kicker-rule" /><span className="card-kicker-end">~2 min</span></div>
                  <div className="field-block">
                    <label htmlFor="target">What are you testing?</label>
                    <textarea id="target" value={target} maxLength={500} onChange={(event) => setTarget(event.target.value)} placeholder="Example: a mobile banking app that lets users transfer money" rows={3} />
                    <div className="field-helper"><span>Describe the target in plain language.</span><span className="char-count">{target.length}/500</span></div>
                  </div>
                  <div className="field-block">
                    <div className="field-label-row"><span className="field-label">Choose a surface</span><span className="optional-label">Required</span></div>
                    <div className="surface-grid">
                      {categories.map((item) => {
                        const Icon = item.icon;
                        const isActive = category === item.key;
                        return <button key={item.key} type="button" className={isActive ? "surface-chip is-active" : "surface-chip"} aria-pressed={isActive} onClick={() => setCategory(item.key)}><Icon size={16} /><span>{item.label}</span>{isActive && <Check size={14} className="chip-check" />}</button>;
                      })}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field-block compact-field"><label htmlFor="goal">Your goal</label><div className="select-wrap"><select id="goal" value={goal} onChange={(event) => setGoal(event.target.value as GoalKey)}>{goals.map((item) => <option value={item.key} key={item.key}>{item.label}</option>)}</select><ChevronDown size={16} /></div></div>
                    <div className="field-block compact-field"><label htmlFor="level">Experience</label><div className="select-wrap"><select id="level" value={level} onChange={(event) => setLevel(event.target.value as LevelKey)}>{levels.map((item) => <option value={item.key} key={item.key}>{item.label}</option>)}</select><ChevronDown size={16} /></div></div>
                  </div>
                  <div className="intake-actions">
                    <button className="primary-button" type="button" onClick={() => generateBlueprint()}>Build my blueprint<ArrowRight size={17} /></button>
                    <button className="secondary-button" type="button" onClick={() => loadSample("A mobile commerce app with sign-in, product search, and checkout", "mobile")}><span>Explore a sample</span><ArrowUpRight size={16} /></button>
                  </div>
                  <div className="privacy-note"><ShieldCheck size={16} /><span>Free beta: use public, synthetic, or redacted information only. This first blueprint is deterministic and does not send your input to an AI API.</span></div>
                </div>
              </section>

              <section className="principle-strip" aria-label="Product principles">
                <div className="principle-item"><div className="principle-icon blue"><Search size={17} /></div><div><strong>Start from the system</strong><span>Map behaviors, interfaces, and dependencies first.</span></div></div>
                <div className="principle-item"><div className="principle-icon green"><ShieldCheck size={17} /></div><div><strong>Know your oracle</strong><span>Separate a real requirement from a useful heuristic.</span></div></div>
                <div className="principle-item"><div className="principle-icon amber"><FileText size={17} /></div><div><strong>Leave with evidence</strong><span>Export a plan you can review, execute, and improve.</span></div></div>
              </section>

              <section className="starter-section" id="starter-guides">
                <div className="section-heading"><div><div className="eyebrow small"><span className="eyebrow-line" />START WITH A REAL SURFACE</div><h2>Good testing begins with a useful question.</h2></div><span className="section-count">04 starter guides</span></div>
                <div className="starter-grid">
                  <button type="button" className="starter-card" onClick={() => loadSample("A public ecommerce website with account, cart, and checkout", "web")}><div className="starter-card-top"><span className="starter-icon web-icon"><ClipboardCheck size={18} /></span><ArrowUpRight size={17} /></div><strong>Public ecommerce website</strong><p>Journey, accessibility, authorization, and recovery.</p><span className="starter-tag">Web · 4 dimensions</span></button>
                  <button type="button" className="starter-card" onClick={() => loadSample("A mobile banking app with sign-in and money transfer", "mobile")}><div className="starter-card-top"><span className="starter-icon mobile-icon"><Smartphone size={18} /></span><ArrowUpRight size={17} /></div><strong>Mobile banking app</strong><p>Lifecycle, permissions, network, and device coverage.</p><span className="starter-tag">Mobile · 4 dimensions</span></button>
                  <button type="button" className="starter-card" onClick={() => loadSample("A Chromebook that must boot, charge, update, and recover safely", "hardware")}><div className="starter-card-top"><span className="starter-icon hardware-icon"><HardDrive size={18} /></span><ArrowUpRight size={17} /></div><strong>Chromebook hardware</strong><p>Power, interfaces, firmware, evidence, and recovery.</p><span className="starter-tag">Hardware · 4 dimensions</span></button>
                  <button type="button" className="starter-card" onClick={() => loadSample("A connected home sensor with a companion mobile app", "firmware")}><div className="starter-card-top"><span className="starter-icon iot-icon"><Wrench size={18} /></span><ArrowUpRight size={17} /></div><strong>Connected home sensor</strong><p>Pairing, connectivity loss, updates, and reset.</p><span className="starter-tag">IoT · 4 dimensions</span></button>
                </div>
              </section>

              <section className="source-approach" id="sources">
                <div>
                  <div className="eyebrow small"><span className="eyebrow-line" />SOURCE APPROACH</div>
                  <h2>Useful guidance should show its work.</h2>
                  <p>Testing Atlas links to authoritative guidance, labels app-authored heuristics, and keeps product-specific acceptance limits visible.</p>
                </div>
                <div className="source-approach-grid">
                  <a className="source-approach-item" href="https://istqb.org/certifications/" target="_blank" rel="noreferrer"><div><strong>ISTQB / ASTQB</strong><span>Testing foundations and methods</span></div><ExternalLink size={14} /></a>
                  <a className="source-approach-item" href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noreferrer"><div><strong>W3C WAI</strong><span>Accessibility evaluation resources</span></div><ExternalLink size={14} /></a>
                  <a className="source-approach-item" href="https://wstg.owasp.org/stable/" target="_blank" rel="noreferrer"><div><strong>OWASP WSTG</strong><span>Web and API security testing</span></div><ExternalLink size={14} /></a>
                  <a className="source-approach-item" href="https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-iot-program" target="_blank" rel="noreferrer"><div><strong>NIST IoT</strong><span>Connected-device security context</span></div><ExternalLink size={14} /></a>
                </div>
              </section>
              <footer className="atlas-footer"><span>Testing Atlas beta</span><span>Built for careful testers, not confident guesses.</span><a href="#sources">View source approach <ArrowUpRight size={13} /></a></footer>
            </>
          ) : (
            <section className="workspace-section" id="blueprint-workspace">
              <div className="workspace-toolbar"><div className="workspace-breadcrumb"><button type="button" onClick={resetWorkspace}>Blueprint</button><span>/</span><strong>{blueprint.target}</strong></div><button className="text-button" type="button" onClick={resetWorkspace}><Plus size={15} />New blueprint</button></div>
              <div className="workspace-heading"><div><div className="eyebrow small"><span className="eyebrow-line" />TESTING BLUEPRINT</div><h1>{blueprint.target}</h1><p>{blueprint.summary}</p></div><div className="workspace-badges"><span className="draft-badge"><span className="status-dot" />Planning draft</span><span className="no-api-badge"><ShieldCheck size={13} />No API call</span></div></div>

              <div className="workspace-grid">
                <div className="workspace-main">
                  <article className="profile-card"><div className="profile-card-heading"><div><span className="section-overline">TARGET PROFILE</span><h2>What we know so far</h2></div><button className="icon-button" type="button" aria-label="Edit target" onClick={resetWorkspace}><Wrench size={16} /></button></div><div className="profile-grid"><div><span className="profile-label">Surface</span><strong>{blueprint.categoryLabel}</strong></div><div><span className="profile-label">Goal</span><strong>{goals.find((item) => item.key === blueprint.goal)?.label}</strong></div><div><span className="profile-label">Experience</span><strong>{levels.find((item) => item.key === blueprint.level)?.label}</strong></div><div><span className="profile-label">Coverage</span><strong>{reviewedCount}/{blueprint.checks.length} reviewed</strong></div></div></article>

                  <article className="map-card"><div className="card-heading-row"><div><span className="section-overline">SYSTEM MAP</span><h2>Start with the layers that matter</h2></div><span className="map-count">{blueprint.layers.length} layers</span></div><div className="layer-map">{blueprint.layers.map((layer, index) => <div className="layer-pill" key={layer}><span>{String(index + 1).padStart(2, "0")}</span>{layer}</div>)}</div><p className="card-footnote">The map is a working hypothesis. Add or remove layers when you learn more about the target.</p></article>

                  <article className="checks-card"><div className="card-heading-row checks-heading"><div><span className="section-overline">HIGH-VALUE CHECKS</span><h2>Turn the map into action</h2></div><span className="review-count">{reviewedCount} of {blueprint.checks.length} reviewed</span></div><div className="check-list">{blueprint.checks.map((item, index) => { const source = sourceMap[item.source as keyof typeof sourceMap]; const isReviewed = Boolean(reviewed[item.id]); return <div className={isReviewed ? "check-row is-reviewed" : "check-row"} key={item.id}><button type="button" className="check-toggle" aria-label={isReviewed ? "Mark " + item.title + " as draft" : "Mark " + item.title + " as reviewed"} aria-pressed={isReviewed} onClick={() => setReviewed((current) => ({ ...current, [item.id]: !current[item.id] }))}>{isReviewed ? <Check size={14} /> : <span>{index + 1}</span>}</button><div className="check-copy"><div className="check-title-row"><h3>{item.title}</h3><span className="source-tag">{source.name}</span></div><p>{item.detail}</p><div className="why-row"><span>Why it matters</span><em>{item.why}</em></div></div></div>; })}</div></article>

                  <article className="notes-card"><div className="card-heading-row"><div><span className="section-overline">YOUR WORKING NOTES</span><h2>Make the plan specific</h2></div><span className="saved-label">Saved locally</span></div><textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add requirements, test data, environment details, or questions for the product owner…" rows={5} /><p className="card-footnote">This draft stays in your browser for the free beta. Do not enter confidential information.</p></article>
                </div>

                <aside className="workspace-side">
                  <article className="source-card" id="sources"><div className="side-card-heading"><div><span className="section-overline">SOURCE TRAIL</span><h2>Know where to look next</h2></div><Link2 size={17} /></div><p className="side-card-intro">These references shape the method. They do not establish product-specific acceptance limits.</p><div className="source-list">{Array.from(new Set(blueprint.checks.map((item) => item.source))).map((sourceKey) => { const source = sourceMap[sourceKey as keyof typeof sourceMap]; return <a className="source-item" href={source.href} target="_blank" rel="noreferrer" key={sourceKey}><div><strong>{source.name}</strong><span>{source.scope}</span></div><ExternalLink size={14} /></a>; })}</div><div className="source-disclaimer"><ShieldCheck size={15} /><span>Official guidance is linked, not reproduced. Always verify current versions.</span></div></article>

                  <article className="export-card"><div className="side-card-heading"><div><span className="section-overline">TAKE IT WITH YOU</span><h2>Export your plan</h2></div><Download size={17} /></div><p className="side-card-intro">Keep the useful work. Add product-specific requirements before execution.</p><div className="export-actions"><button type="button" onClick={() => exportPlan("markdown")}><FileText size={16} />Markdown<ArrowUpRight size={14} /></button><button type="button" onClick={() => exportPlan("csv")}><Download size={16} />CSV checklist<ArrowUpRight size={14} /></button></div></article>

                  <article className="limit-card"><div className="limit-icon"><ShieldCheck size={19} /></div><div><strong>What this does not establish</strong><p>A blueprint is not a pass result, compliance sign-off, or a substitute for the product specification.</p></div></article>
                </aside>
              </div>
              <div className="workspace-bottom"><span><ShieldCheck size={14} /> Drafts are local to this browser</span><button className="text-button" type="button" onClick={resetWorkspace}>Start over <ArrowRight size={14} /></button></div>
            </section>
          )}
          <div className="sr-status" aria-live="polite" aria-atomic="true">{status}</div>
        </div>
      </div>
    </main>
  );
}

