import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  ExternalLink,
  Sun,
  Moon,
  Menu,
  X,
  Image as ImageIcon,
  ArrowRight,
  ArrowUpRight,
  Database,
  Cloud,
  Cpu,
  Code2,
  GitBranch,
  Layers,
  BarChart3,
  User,
  GraduationCap,
  Award,
  Briefcase,
  ChevronRight,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Fonts                                                                */
/* ------------------------------------------------------------------ */

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');
    html { scroll-behavior: smooth; }
    .font-display { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; letter-spacing: -0.02em; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-tag { font-family: 'JetBrains Mono', monospace; }
    ::selection { background: rgba(99, 102, 241, 0.35); }
  `}</style>
);

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const ROLES = [
  "Data Engineer",
  "Cloud Data Engineer",
  "AI Automation Engineer",
  "Top Rated Upwork Freelancer",
];

const STATS = [
  { label: "Years Experience", value: "3+" },
  { label: "Upwork Job Success", value: "100%" },
  { label: "Freelancer Status", value: "Top Rated" },
  { label: "Pipelines Delivered", value: "15+" },
];

const SKILL_GROUPS = [
  {
    stage: "01",
    label: "Languages",
    items: ["Python", "SQL (T-SQL)", "C#", "JavaScript / TypeScript"],
  },
  {
    stage: "02",
    label: "Data Engineering & ETL",
    items: [
      "ETL Pipeline Design",
      "Metadata-Driven Frameworks",
      "Data Validation & Cleansing",
      "dbt",
      "Data Warehousing",
    ],
  },
  {
    stage: "03",
    label: "Orchestration & Streaming",
    items: ["Apache Airflow", "Apache NiFi", "Apache Kafka", "Apache Spark / PySpark"],
  },
  {
    stage: "04",
    label: "Cloud & Infrastructure",
    items: [
      "AWS (S3, Lambda, EventBridge, IAM)",
      "Snowflake",
      "Snowpipe",
      "Redshift",
      "BigQuery",
      "Terraform",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    stage: "05",
    label: "CI/CD & Version Control",
    items: ["GitHub Actions", "Jenkins", "Git", "GitHub"],
  },
  {
    stage: "06",
    label: "Databases",
    items: ["SQL Server", "PostgreSQL", "Query Optimization", "Stored Procedures"],
  },
  {
    stage: "07",
    label: "AI / GenAI",
    items: [
      "LLM API Integration (OpenAI, Claude)",
      "RAG Pipelines",
      "n8n Workflow Automation",
      "AI Agent Development",
    ],
  },
  {
    stage: "08",
    label: "Backend & APIs",
    items: ["REST API Design", "FastAPI", ".NET Core / .NET 8", "Flask"],
  },
  {
    stage: "09",
    label: "Frontend",
    items: ["Angular 17"],
  },
  {
    stage: "10",
    label: "Reporting & Analytics",
    items: ["Excel / openpyxl", "pandas", "Data Profiling", "EDA"],
  },
];

const EXPERIENCE = [
  {
    role: "Senior AI Automation & Data Engineer",
    org: "Focusync — UK-based Fintech",
    dates: "2024 — Present",
    icon: Cpu,
    bullets: [
      "Own end-to-end ETL pipeline development and performance for regulatory, credit-risk, and stress-testing applications",
      "Write and optimize complex SQL Server queries and stored procedures for data extraction, transformation, and loan-calculation logic",
      "Built a config-driven Python ETL validation engine to automate data validation, cleansing, and troubleshooting",
      "Designed an LLM-powered regulatory compliance pipeline matching GL account reasons to regulatory passages (Claude, pdfplumber, pyodbc)",
      "Rebuilt a legacy multi-day manual migration process into a fully automated pipeline completing in minutes",
      "Set up CI/CD pipelines (GitHub Actions) for automated testing and deployment",
    ],
  },
  {
    role: "Data Engineer",
    org: "Sitpros & Technologies",
    dates: "2023 — 2024",
    icon: Database,
    bullets: [
      "Designed a metadata-driven ETL framework cutting onboarding time by 90% and improving load performance by 60%",
      "Built a real-time SCD Type-2 pipeline using Apache NiFi in Docker on AWS EC2, streaming into Snowflake with <30-second latency",
      "Developed an Airflow-orchestrated pipeline with Slack alerting, cutting failure-resolution time by 80%",
      "Built a serverless currency-exchange pipeline using AWS Lambda and EventBridge",
      "Modeled warehouse tables using dbt and provisioned infrastructure using Terraform",
      "Implemented Kafka-based streaming and containerized services with Docker and Kubernetes",
      "Led a 2TB+ SQL Server ↔ PostgreSQL migration with 100% data consistency (checksum-verified)",
      "Built a Natural Language to SQL (NLQ) system with FastAPI/.NET backend and Angular frontend",
    ],
  },
  {
    role: "Data Engineering Intern",
    org: "Connect Communications",
    dates: "Jun 2023 — Aug 2023",
    icon: GitBranch,
    bullets: [
      "Assisted in redesigning a legacy ETL process into a metadata-driven ingestion framework",
      "Gained hands-on exposure to Airflow orchestration and core AWS data services",
    ],
  },
  {
    role: "Independent Consultant",
    org: "Top Rated Upwork Freelancer — 100% Job Success",
    dates: "Ongoing",
    icon: Briefcase,
    bullets: [
      "Delivered AI automation for global clients using n8n, Python, and REST API integrations",
      "Built AI SMS agents and RAG-based virtual assistant bots",
      "Architected a Content-to-Cash AI pipeline for a client",
      "Built a full multi-vendor SaaS platform (PlayEase) using Angular 17, .NET 8, SQL Server, JWT",
    ],
  },
];

const FILTERS = ["All", "Data Engineering", "Cloud & DevOps", "AI & GenAI", "Full-Stack"];

const PROJECTS = [
  {
    id: 1,
    title: "Fintech Data Migration Automation",
    categories: ["Data Engineering"],
    desc: "Rebuilt a legacy multi-day manual migration process into a fully automated pipeline completing in minutes.",
    tech: ["Python", "SQL Server", "ETL"],
    flagship: true,
  },
  {
    id: 2,
    title: "LLM-Powered Regulatory Compliance Pipeline",
    categories: ["AI & GenAI"],
    desc: "Matches GL account reasons to regulatory text using Claude, pdfplumber, and pyodbc, cutting manual compliance review time.",
    tech: ["Claude API", "pdfplumber", "pyodbc", "Python"],
    flagship: true,
  },
  {
    id: 3,
    title: "Real-Time SCD Type-2 Streaming Pipeline",
    categories: ["Cloud & DevOps"],
    desc: "Apache NiFi in Docker on AWS EC2, streaming into Snowflake via Snowpipe, <30-second latency, full historical auditability.",
    tech: ["Apache NiFi", "Docker", "AWS EC2", "Snowflake"],
  },
  {
    id: 4,
    title: "Serverless Currency Exchange Pipeline",
    categories: ["Cloud & DevOps"],
    desc: "AWS Lambda + EventBridge + S3 + Snowpipe, fully serverless ingestion into Snowflake.",
    tech: ["AWS Lambda", "EventBridge", "S3", "Snowpipe"],
  },
  {
    id: 5,
    title: "Metadata-Driven ETL Framework",
    categories: ["Data Engineering"],
    desc: "Schema-driven framework auto-mapping incoming files across 15+ pipelines, 90% faster onboarding.",
    tech: ["Python", "SQL Server", "Metadata Config"],
  },
  {
    id: 6,
    title: "SQL Server ↔ PostgreSQL Migration (2TB+)",
    categories: ["Data Engineering"],
    desc: "Full referential integrity, checksum-verified, 100% data consistency.",
    tech: ["SQL Server", "PostgreSQL", "Python"],
  },
  {
    id: 7,
    title: "NL-to-SQL Analytics Platform",
    categories: ["AI & GenAI", "Full-Stack"],
    desc: "FastAPI/.NET backend, Angular frontend, natural language querying for non-technical users.",
    tech: ["FastAPI", ".NET", "Angular", "LLM API"],
  },
  {
    id: 8,
    title: "Config-Driven ETL Validation Engine",
    categories: ["Data Engineering"],
    desc: "Python engine invoked via sp_execute_external_script automating data quality checks.",
    tech: ["Python", "SQL Server", "sp_execute_external_script"],
  },
  {
    id: 9,
    title: "AI Voice Agent Demo",
    categories: ["AI & GenAI"],
    desc: "Multi-screen UI demo application, flagship freelance portfolio asset.",
    tech: ["LLM API", "n8n", "React"],
  },
  {
    id: 10,
    title: "RAG-Based AI Agents (Client Work)",
    categories: ["AI & GenAI"],
    desc: "n8n-orchestrated AI SMS agent and virtual-assistant-style chatbot for clients.",
    tech: ["n8n", "RAG", "REST APIs"],
  },
  {
    id: 11,
    title: "Content-to-Cash AI Pipeline",
    categories: ["AI & GenAI"],
    desc: "Automation pipeline connecting content generation to downstream sales workflows for a client.",
    tech: ["n8n", "Python", "LLM API"],
  },
  {
    id: 12,
    title: "PlayEase",
    categories: ["Full-Stack"],
    desc: "Multi-vendor futsal booking SaaS platform: Angular 17, .NET 8 Web API, SQL Server, JWT authentication.",
    tech: ["Angular 17", ".NET 8", "SQL Server", "JWT"],
  },
  {
    id: 13,
    title: "GherTak",
    categories: ["Full-Stack", "Data Engineering"],
    desc: "Personal e-commerce platform built end-to-end, with full developer documentation and infrastructure migration planning (VPS to managed PaaS).",
    tech: ["Full-Stack", "Infra Planning", "Docs"],
  },
  {
    id: 14,
    title: "Variable Rate Loan Calculation Engine",
    categories: ["Data Engineering"],
    desc: "SQL Server stored procedures with RAISERROR-based error handling for production reliability.",
    tech: ["SQL Server", "T-SQL", "Stored Procedures"],
  },
];

const AnthropicIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M12 2L2 22h4l3-7h6l3 7h4L12 2zM10 12l2-5 2 5h-4z" />
  </svg>
);

const CERTS = [
  { name: "Advanced Python for Data Science", org: "NED University of Engineering & Technology", icon: Award },
  { name: "Cloud Data Engineering", org: "SMIT (Saylani Mass IT Training)", icon: Award },
  { name: "Claude 101", org: "Anthropic", tag: "Issued Jul 2026", cred: "jmym7da2sxsq", icon: AnthropicIcon },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Automated pipelines",
    desc: "Manual, multi-day processes rebuilt into automated ETL that runs in minutes, not days.",
  },
  {
    icon: Cloud,
    title: "Cloud-native infra",
    desc: "Production data platforms on AWS and Snowflake, provisioned with Terraform and Docker.",
  },
  {
    icon: Sparkles,
    title: "AI & GenAI integration",
    desc: "LLM-powered compliance pipelines, RAG agents, and NL-to-SQL systems shipped to production.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability first",
    desc: "Checksum-verified migrations, validation engines, and CI/CD — built to hold up under load.",
  },
];

/* ------------------------------------------------------------------ */
/* Theme                                                                */
/* ------------------------------------------------------------------ */

function getTheme(dark) {
  return dark
    ? {
        page: "bg-[#080A11]",
        nav: "bg-[#080A11]/70 border-white/[0.06]",
        surface: "bg-[#10141F] border border-white/[0.07]",
        surfaceAlt: "bg-[#0C0F17]",
        border: "border-white/[0.08]",
        divide: "divide-white/[0.06]",
        text: "text-slate-100",
        muted: "text-slate-400",
        mutedSoft: "text-slate-500",
        pill: "bg-white/[0.03] text-slate-300 border-white/[0.08]",
        pillActive: "bg-indigo-500 text-white border-indigo-500",
        accentText: "text-indigo-400",
        accentBg: "bg-indigo-500",
        glow: "hover:shadow-[0_0_45px_-12px_rgba(99,102,241,0.45)] hover:border-indigo-500/40",
        placeholderBg: "from-[#10141F] to-[#0C0F17]",
      }
    : {
        page: "bg-[#F7F8FB]",
        nav: "bg-[#F7F8FB]/75 border-slate-200",
        surface: "bg-white border border-slate-200",
        surfaceAlt: "bg-slate-100/70",
        border: "border-slate-200",
        divide: "divide-slate-200",
        text: "text-slate-900",
        muted: "text-slate-600",
        mutedSoft: "text-slate-400",
        pill: "bg-slate-100 text-slate-600 border-slate-200",
        pillActive: "bg-indigo-600 text-white border-indigo-600",
        accentText: "text-indigo-600",
        accentBg: "bg-indigo-600",
        glow: "hover:shadow-[0_0_45px_-15px_rgba(79,70,229,0.35)] hover:border-indigo-400/50",
        placeholderBg: "from-slate-100 to-slate-200",
      };
}

/* ------------------------------------------------------------------ */
/* Small shared components                                             */
/* ------------------------------------------------------------------ */

function ImagePlaceholder({ t, className = "", label = "Image coming soon", rounded = "rounded-2xl" }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${t.placeholderBg} border ${t.border} ${rounded} ${className}`}
    >
      <ImageIcon className={`w-6 h-6 ${t.mutedSoft}`} strokeWidth={1.5} />
      <span className={`font-tag text-[11px] tracking-wide uppercase ${t.mutedSoft}`}>{label}</span>
    </div>
  );
}

function Eyebrow({ t, dark, label }) {
  return (
    <div
      className={`inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full border ${t.border} ${t.surfaceAlt} font-body text-xs font-medium ${t.muted}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${t.accentBg}`} />
      {label}
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero pipeline background (signature element, recolored to glow)     */
/* ------------------------------------------------------------------ */

function PipelineBackdrop({ dark }) {
  const stroke = dark ? "rgba(148,163,184,0.08)" : "rgba(100,116,139,0.12)";
  const flow = dark ? "#818CF8" : "#6366F1";
  const paths = [
    "M -50 80 C 200 80, 250 200, 500 200 S 800 320, 1050 320",
    "M -50 220 C 150 220, 300 60, 550 60 S 850 180, 1050 180",
    "M -50 340 C 250 340, 300 380, 550 380 S 800 260, 1050 260",
  ];
  return (
    <svg
      viewBox="0 0 1000 400"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full opacity-80"
      aria-hidden="true"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" />
          <motion.path
            d={d}
            fill="none"
            stroke={flow}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 22"
            filter="url(#glow)"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -240 }}
            transition={{
              duration: 5 + i * 1.4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8,
            }}
            style={{ opacity: 0.85 }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                  */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#freelance", label: "Freelance" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

function Nav({ t, dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${t.nav} ${
        scrolled ? "shadow-[0_8px_30px_-15px_rgba(0,0,0,0.4)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-base tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2">
          Rana Shahmeer Ali
        </a>

        <div className={`hidden md:flex items-center gap-1 rounded-full border px-1.5 py-1.5 ${t.border} ${t.surfaceAlt}`}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-body text-[13px] font-medium ${t.muted} px-3.5 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors ${
                dark ? "hover:text-slate-100" : "hover:text-slate-900"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            className={`w-9 h-9 flex items-center justify-center rounded-full border ${t.border} ${t.muted} transition-colors ${
              dark ? "hover:text-indigo-400" : "hover:text-indigo-600"
            }`}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="#contact"
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-[13px] font-semibold text-white ${t.accentBg} transition-all duration-200 shadow-[0_0_25px_-8px_rgba(99,102,241,0.6)] hover:shadow-[0_0_35px_-6px_rgba(99,102,241,0.8)] hover:brightness-110`}
          >
            Let&apos;s talk
          </a>

          <button
            className={`md:hidden w-9 h-9 flex items-center justify-center rounded-full border ${t.border} ${t.muted}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`md:hidden border-t ${t.border} ${t.page} overflow-hidden`}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`font-body text-sm py-2.5 ${t.muted}`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

function useTypingEffect(words, typeSpeed = 55, pause = 1400) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), typeSpeed / 2);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setWordIndex((w) => w + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, pause]);

  return text;
}

function Hero({ t, dark }) {
  const typed = useTypingEffect(ROLES);

  return (
    <section id="top" className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <PipelineBackdrop dark={dark} />
        <div
          className={`absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl ${
            dark ? "bg-indigo-600/10" : "bg-indigo-400/10"
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-[1.25fr_0.75fr] gap-14 items-center">
        <div className="z-10">
          <Eyebrow t={t} dark={dark} label="Available for new engagements" />

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.03] mb-6">
            Ship pipelines.<br />
            <span className={t.accentText}>Not delays.</span>
          </h1>

          <p className={`font-body text-lg sm:text-xl ${t.muted} max-w-xl leading-relaxed mb-8`}>
            I turn manual, multi-day data processes into automated pipelines that run in
            minutes — for fintech platforms and Upwork clients alike.
          </p>

          <div className={`font-body text-sm font-medium mb-10 h-6 flex items-center gap-2`}>
            <span className={t.mutedSoft}>Currently working as a</span>
            <span className={`font-semibold ${t.accentText}`}>
              {typed}
              <span className="inline-block w-[2px] h-4 bg-current ml-0.5 align-middle animate-pulse" />
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-body text-sm font-semibold text-white ${t.accentBg} transition-all duration-200 shadow-[0_0_30px_-8px_rgba(99,102,241,0.65)] hover:shadow-[0_0_40px_-6px_rgba(99,102,241,0.85)] hover:brightness-110`}
            >
              Hire on Upwork <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#projects"
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full border ${t.border} font-body text-sm font-semibold ${t.text} transition-all duration-200 hover:bg-white/[0.05]`}
            >
              View Projects
            </a>
          </div>
        </div>

        <Reveal delay={0.2} className="flex justify-center md:justify-end z-10 w-full">
          <div className="relative max-w-xs sm:max-w-sm w-full">
            <div
              className={`absolute -inset-3 rounded-[2rem] blur-2xl opacity-40 ${
                dark ? "bg-gradient-to-br from-indigo-500/40 to-sky-400/10" : "bg-gradient-to-br from-indigo-300/40 to-sky-200/20"
              }`}
            />
            <div className={`relative border p-2 rounded-3xl ${t.surface} shadow-2xl`}>
              <img
                src="/profile.jpg"
                alt="Rana Shahmeer Ali"
                className="w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Feature grid — new, Miraal-style capability cards                   */
/* ------------------------------------------------------------------ */

function FeatureGrid({ t, dark }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div
                className={`group h-full rounded-2xl border p-6 transition-all duration-300 ${t.surface} ${t.glow}`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 border ${t.border} ${
                    dark ? "bg-indigo-500/10" : "bg-indigo-50"
                  }`}
                >
                  <f.icon className={`w-5 h-5 ${t.accentText}`} strokeWidth={1.75} />
                </div>
                <h3 className={`font-display text-base mb-2 ${t.text}`}>{f.title}</h3>
                <p className={`font-body text-sm leading-relaxed ${t.muted}`}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

function About({ t, dark }) {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
        <div className="z-10">
          <Reveal>
            <Eyebrow t={t} dark={dark} label="Overview" />
            <h2 className="font-display text-4xl sm:text-5xl mb-7 leading-[1.05]">
              Extract, transform,<br />deliver.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className={`font-body text-base leading-relaxed ${t.muted} max-w-xl`}>
              Data & Cloud Engineer with 3+ years of experience designing production-grade ETL
              pipelines, real-time streaming systems, and cloud data platforms for fintech
              environments, plus independent consulting delivering AI automation and GenAI/RAG
              solutions for global clients. Skilled across batch and streaming architectures
              (Airflow, NiFi, Kafka, Spark), cloud infrastructure (AWS, Snowflake, Terraform,
              Docker, Kubernetes), and relational/warehouse databases (SQL Server, PostgreSQL,
              Redshift, BigQuery). Hands-on experience integrating LLM/GenAI APIs (OpenAI, Claude)
              into production workflows, including regulatory document matching and
              natural-language-to-SQL systems. Proven record of converting manual, multi-day
              processes into automated pipelines running in minutes.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="z-10 w-full grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`rounded-2xl border p-5 transition-all duration-300 ${t.surface} ${t.glow}`}
            >
              <div className={`font-display text-3xl mb-1 ${t.accentText}`}>{s.value}</div>
              <div className={`font-body text-xs ${t.muted}`}>{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Skills                                                               */
/* ------------------------------------------------------------------ */

function Skills({ t, dark }) {
  return (
    <section id="skills" className={`py-20 sm:py-28 ${t.surfaceAlt}`}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <Eyebrow t={t} dark={dark} label="Technical index" />
          <h2 className="font-display text-4xl sm:text-5xl mb-12 leading-[1.05]">
            Every stage of<br />the pipeline.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.label} delay={(i % 3) * 0.05}>
              <div
                className={`h-full rounded-2xl border p-6 transition-all duration-300 ${t.surface} ${t.glow}`}
              >
                <h3 className={`font-display text-base mb-4 ${t.text}`}>{group.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className={`font-body text-xs px-3 py-1.5 rounded-full border ${t.border} ${t.muted}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Experience timeline                                                  */
/* ------------------------------------------------------------------ */

function ExperienceTimeline({ t, dark }) {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <Eyebrow t={t} dark={dark} label="Experience log" />
          <h2 className="font-display text-4xl sm:text-5xl mb-14 leading-[1.05]">
            Where the pipelines<br />were built.
          </h2>
        </Reveal>

        <div className="relative pl-8 sm:pl-10">
          <div className={`absolute left-[11px] sm:left-[13px] top-2 bottom-2 w-px ${dark ? "bg-white/10" : "bg-slate-200"}`} />
          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((job, idx) => {
              const Icon = job.icon;
              return (
                <Reveal key={job.role + job.dates} delay={idx * 0.05} className="relative">
                  <div
                    className={`absolute -left-8 sm:-left-10 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      dark ? "bg-[#080A11] border-indigo-500" : "bg-[#F7F8FB] border-indigo-500"
                    }`}
                  >
                    <Icon className={`w-3 h-3 ${t.accentText}`} />
                  </div>

                  <div className={`rounded-2xl border p-6 sm:p-7 transition-all duration-300 ${t.surface} ${t.glow}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-1">
                      <h3 className={`font-display text-lg sm:text-xl ${t.text}`}>{job.role}</h3>
                      <span className={`font-body text-xs font-medium ${t.mutedSoft}`}>{job.dates}</span>
                    </div>
                    <p className={`font-body text-sm font-semibold mb-5 ${t.accentText}`}>{job.org}</p>

                    <ul className="flex flex-col gap-2.5">
                      {job.bullets.map((b) => (
                        <li key={b} className={`font-body text-sm leading-relaxed ${t.muted} flex gap-2.5`}>
                          <span className={`mt-2 w-1 h-1 rounded-full shrink-0 ${t.accentBg}`} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects                                                             */
/* ------------------------------------------------------------------ */

function ProjectCard({ t, dark, project }) {
  const getIcon = () => {
    if (project.categories.includes("AI & GenAI")) return Cpu;
    if (project.categories.includes("Cloud & DevOps")) return Cloud;
    if (project.categories.includes("Full-Stack")) return Layers;
    return Code2;
  };
  const Icon = getIcon();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className={`group rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col justify-between h-full ${t.surface} ${t.glow}`}
    >
      <div className="p-6 flex-grow">
        <div className="flex items-center justify-between mb-5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${t.border} ${dark ? "bg-indigo-500/10" : "bg-indigo-50"}`}>
            <Icon className={`w-4 h-4 ${t.accentText}`} strokeWidth={1.75} />
          </div>

          <div className="flex items-center gap-2.5">
            {project.flagship && (
              <span className={`font-body text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full font-semibold text-white ${t.accentBg}`}>
                Flagship
              </span>
            )}
            <ExternalLink className={`w-3.5 h-3.5 ${t.mutedSoft} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300`} />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.categories.map((c) => (
            <span
              key={c}
              className={`font-body text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full border ${t.border} ${t.mutedSoft}`}
            >
              {c}
            </span>
          ))}
        </div>

        <h3 className={`font-display text-lg mb-2.5 leading-snug ${t.text}`}>{project.title}</h3>
        <p className={`font-body text-sm ${t.muted} leading-relaxed`}>{project.desc}</p>
      </div>

      <div className={`px-6 py-4 border-t ${t.border} flex flex-wrap gap-2`}>
        {project.tech.map((tech) => (
          <span key={tech} className={`font-tag text-[10px] tracking-wide ${t.mutedSoft}`}>
            #{tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Projects({ t, dark }) {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(
    () =>
      filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter)),
    [filter]
  );

  return (
    <section id="projects" className={`py-20 sm:py-28 ${t.surfaceAlt}`}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <Eyebrow t={t} dark={dark} label="Project index" />
          <h2 className="font-display text-4xl sm:text-5xl mb-12 leading-[1.05]">
            Shipped,<br />not simulated.
          </h2>
        </Reveal>

        <div className="flex flex-wrap gap-2.5 mb-10">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full font-body text-sm font-medium border transition-all duration-200 ${
                  active ? t.pillActive : `${t.pill} hover:bg-white/[0.05]`
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <div key={p.id}>
                <ProjectCard t={t} dark={dark} project={p} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Freelance / Upwork                                                   */
/* ------------------------------------------------------------------ */

function Freelance({ t, dark }) {
  const items = [
    "AI SMS agents and RAG-based virtual assistant bots for global clients",
    "Content-to-Cash AI pipeline architecture for a growth-stage client",
    "Multi-vendor SaaS platform (PlayEase) built end-to-end on Angular and .NET",
    "n8n and Python automation across REST API integrations",
  ];
  return (
    <section id="freelance" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
        <Reveal>
          <Eyebrow t={t} dark={dark} label="Freelance registry" />
          <h2 className="font-display text-4xl sm:text-5xl mb-6 leading-[1.05]">
            Top Rated on<br />Upwork.
          </h2>
          <p className={`font-body text-base ${t.muted} mb-8 max-w-sm leading-relaxed`}>
            A 100% Job Success Score, built one delivered pipeline at a time — for law firms,
            lending startups, and AI-first companies.
          </p>

          <div className="flex flex-col gap-3">
            {[["Status", "Top Rated"], ["Job Success", "100%"], ["Market", "Upwork"]].map(([k, v]) => (
              <div key={k} className="flex items-center gap-3">
                <span className={`font-body text-sm ${t.mutedSoft}`}>{k}</span>
                <span className={`font-body text-sm font-semibold ${t.accentText}`}>{v}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="w-full">
          <div className={`rounded-2xl border p-7 sm:p-9 transition-all duration-300 ${t.surface} ${t.glow}`}>
            <span className={`font-body text-xs font-semibold uppercase tracking-wide block mb-5 ${t.mutedSoft}`}>
              Deliverables
            </span>
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${t.accentText}`} strokeWidth={1.75} />
                  <span className={`font-body text-sm leading-relaxed ${t.muted}`}>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://www.upwork.com/"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full font-body text-sm font-semibold text-white ${t.accentBg} transition-all duration-200 shadow-[0_0_30px_-8px_rgba(99,102,241,0.65)] hover:shadow-[0_0_40px_-6px_rgba(99,102,241,0.85)] hover:brightness-110`}
            >
              Hire Me on Upwork <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Education & certifications                                          */
/* ------------------------------------------------------------------ */

function Education({ t, dark }) {
  const rows = [
    { title: "BS Computer Science", org: "Bahria University, Karachi Campus", tag: "Graduated 2026", icon: GraduationCap },
    ...CERTS.map((c) => ({ 
      title: c.name, 
      org: c.org, 
      tag: c.tag || "Verified", 
      cred: c.cred,
      icon: c.icon || Award 
    })),
  ];
  return (
    <section id="education" className={`py-20 sm:py-28 ${t.surfaceAlt}`}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <Eyebrow t={t} dark={dark} label="Foundations" />
          <h2 className="font-display text-4xl sm:text-5xl mb-12 leading-[1.05]">
            Academic & certs.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-5">
          {rows.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className={`h-full rounded-2xl border p-6 transition-all duration-300 ${t.surface} ${t.glow} flex flex-col justify-between`}>
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 border ${t.border} ${dark ? "bg-indigo-500/10" : "bg-indigo-50"}`}>
                    <r.icon className={`w-4 h-4 ${t.accentText}`} strokeWidth={1.75} />
                  </div>
                  <h3 className={`font-display text-base mb-1.5 ${t.text}`}>{r.title}</h3>
                  <p className={`font-body text-sm mb-4 ${t.muted}`}>{r.org}</p>
                </div>
                <div className="flex flex-col gap-1 border-t pt-4 mt-auto border-white/[0.05] dark:border-white/[0.05] border-slate-200">
                  <span className={`font-body text-xs font-semibold ${t.accentText}`}>{r.tag}</span>
                  {r.cred && (
                    <span className={`font-tag text-[10px] ${t.mutedSoft}`}>ID: {r.cred}</span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA banner — new, Miraal-style closing panel                        */
/* ------------------------------------------------------------------ */

function CTABanner({ t, dark }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div
            className={`relative overflow-hidden rounded-3xl border p-10 sm:p-16 text-center ${t.surface}`}
          >
            <div
              className={`absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl opacity-50 ${
                dark ? "bg-indigo-600/25" : "bg-indigo-300/40"
              }`}
            />
            <div className="relative z-10">
              <Eyebrow t={t} dark={dark} label="Open to new work" />
              <h2 className="font-display text-3xl sm:text-5xl mb-5 leading-[1.05]">
                Ready to build<br />something reliable?
              </h2>
              <p className={`font-body text-base ${t.muted} max-w-xl mx-auto mb-9 leading-relaxed`}>
                Whether it's a fintech data platform or an AI automation pipeline —
                I'll help you ship it without the multi-day manual detour.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body text-sm font-semibold text-white ${t.accentBg} transition-all duration-200 shadow-[0_0_30px_-8px_rgba(99,102,241,0.65)] hover:shadow-[0_0_40px_-6px_rgba(99,102,241,0.85)] hover:brightness-110`}
                >
                  Get in touch <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="https://www.upwork.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full border ${t.border} font-body text-sm font-semibold ${t.text} hover:bg-white/[0.05] transition-all duration-200`}
                >
                  View Upwork Profile
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                              */
/* ------------------------------------------------------------------ */

function Contact({ t, dark }) {
  const groups = [
    { label: "Email", value: "ranashahmeerali@gmail.com", href: "mailto:ranashahmeerali@gmail.com" },
    { label: "Phone", value: "0309-0905305", href: "tel:03090905305" },
    { label: "LinkedIn", value: "View profile", href: "https://linkedin.com/in/rana-shahmeer-ali-479592263" },
    { label: "GitHub", value: "View profile", href: "https://github.com/Ranashahmeer" },
  ];
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <Eyebrow t={t} dark={dark} label="Contact directory" />
          <h2 className="font-display text-4xl sm:text-6xl mb-14 leading-[1.05]">
            Let&apos;s build<br />something reliable.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {groups.map((g) => (
              <a
                key={g.label}
                href={g.href}
                target={g.href.startsWith("http") ? "_blank" : undefined}
                rel={g.href.startsWith("http") ? "noreferrer" : undefined}
                className={`group rounded-2xl border p-6 transition-all duration-300 ${t.surface} ${t.glow}`}
              >
                <span className={`font-body text-xs font-semibold uppercase tracking-wide block mb-3 ${t.mutedSoft}`}>
                  {g.label}
                </span>
                <span
                  className={`font-body text-sm font-semibold flex items-center gap-1.5 ${t.text} transition-colors ${
                    dark ? "group-hover:text-indigo-400" : "group-hover:text-indigo-600"
                  }`}
                >
                  {g.value}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */

function Footer({ t }) {
  return (
    <footer className={`border-t ${t.border} py-8`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className={`font-body text-xs ${t.mutedSoft}`}>
          &copy; {new Date().getFullYear()} Rana Shahmeer Ali &middot; All Rights Reserved.
        </span>
        <span className={`font-body text-xs ${t.mutedSoft}`}>
          Built with React, Tailwind &amp; Framer Motion
        </span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const [dark, setDark] = useState(true);
  const t = getTheme(dark);

  return (
    <div className={`min-h-screen ${t.page} ${t.text} transition-colors duration-300 relative overflow-hidden`}>
      <FontImport />
      <Nav t={t} dark={dark} setDark={setDark} />
      <Hero t={t} dark={dark} />
      <FeatureGrid t={t} dark={dark} />
      <About t={t} dark={dark} />
      <Skills t={t} dark={dark} />
      <ExperienceTimeline t={t} dark={dark} />
      <Projects t={t} dark={dark} />
      <Freelance t={t} dark={dark} />
      <Education t={t} dark={dark} />
      <CTABanner t={t} dark={dark} />
      <Contact t={t} dark={dark} />
      <Footer t={t} />
    </div>
  );
}
