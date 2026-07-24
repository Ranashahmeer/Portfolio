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
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Fonts                                                                */
/* ------------------------------------------------------------------ */

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:ital,wght@0,400;0,700;1,400&display=swap');
    html { scroll-behavior: smooth; }
    .font-display { font-family: 'Space Grotesk', sans-serif; font-weight: 700; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-mono2 { font-family: 'JetBrains Mono', monospace; }
    ::selection { background: rgba(190, 242, 100, 0.4); }
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
    org: "Sitpros & Technologies — Pakistan office of Focusync",
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

const CERTS = [
  { name: "Advanced Python for Data Science", org: "NED University of Engineering & Technology" },
  { name: "Cloud Data Engineering", org: "SMIT (Saylani Mass IT Training)" },
];

/* ------------------------------------------------------------------ */
/* Theme                                                                */
/* ------------------------------------------------------------------ */

function getTheme(dark) {
  return dark
    ? {
        page: "bg-[#09090b]",
        nav: "bg-[#09090b]/90 border-zinc-800",
        surface: "bg-transparent border border-zinc-800",
        surfaceAlt: "bg-zinc-900/10",
        border: "border-zinc-800",
        text: "text-zinc-100",
        muted: "text-zinc-400",
        mutedSoft: "text-zinc-500",
        pill: "bg-transparent text-zinc-300 border-zinc-800",
        pillActive: "bg-lime-400 text-black border-lime-400 font-bold",
        accentText: "text-lime-300",
        placeholderBg: "from-zinc-950 to-zinc-900",
      }
    : {
        page: "bg-[#fafafa]",
        nav: "bg-[#fafafa]/90 border-slate-200",
        surface: "bg-transparent border border-slate-200",
        surfaceAlt: "bg-slate-50",
        border: "border-slate-200",
        text: "text-zinc-900",
        muted: "text-zinc-600",
        mutedSoft: "text-zinc-400",
        pill: "bg-transparent text-zinc-700 border-slate-200",
        pillActive: "bg-indigo-600 text-white border-indigo-600 font-bold",
        accentText: "text-indigo-600",
        placeholderBg: "from-slate-50 to-slate-100",
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
      <span className={`font-mono2 text-[11px] tracking-wide uppercase ${t.mutedSoft}`}>{label}</span>
    </div>
  );
}

function Eyebrow({ t, index, label }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className={`font-mono2 text-xs tracking-widest ${t.accentText}`}>{index}</span>
      <span className={`h-px w-8 bg-gradient-to-r from-current to-transparent ${t.accentText}`} />
      <span className={`font-mono2 text-xs tracking-[0.2em] uppercase ${t.mutedSoft}`}>{label}</span>
    </div>
  );
}

function SectionTitle({ t, children }) {
  return (
    <h2 className={`font-display font-extrabold text-3xl sm:text-4xl ${t.text} mb-8`}>{children}</h2>
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
/* Hero pipeline background (signature element)                        */
/* ------------------------------------------------------------------ */

function PipelineBackdrop({ dark }) {
  const stroke = dark ? "#1B2B1F" : "#E1EBC2";
  const flow = dark ? "#A1CB35" : "#769826";
  const paths = [
    "M -50 80 C 200 80, 250 200, 500 200 S 800 320, 1050 320",
    "M -50 220 C 150 220, 300 60, 550 60 S 850 180, 1050 180",
    "M -50 340 C 250 340, 300 380, 550 380 S 800 260, 1050 260",
  ];
  return (
    <svg
      viewBox="0 0 1000 400"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full opacity-70"
      aria-hidden="true"
    >
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
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -240 }}
            transition={{
              duration: 5 + i * 1.4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8,
            }}
            style={{ opacity: 0.9 }}
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
  return (
    <div className={`fixed top-0 inset-x-0 z-50 backdrop-blur-sm border-b ${t.nav} transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#top" className="font-mono2 text-xs tracking-tight hover:opacity-80 transition-opacity">
          ~/rana_shahmeer_ali<span className={dark ? "text-lime-400" : "text-indigo-600"}>/</span>
        </a>
        
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-mono2 text-[11px] uppercase tracking-wider ${t.muted} hover:${dark ? 'text-lime-300' : 'text-indigo-600'} transition-colors relative py-1`}
            >
              {l.label}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className={`font-mono2 text-[10px] uppercase tracking-widest border border-current px-2.5 py-1 transition-all ${
              dark ? 'text-lime-300 hover:bg-lime-400 hover:text-black' : 'text-indigo-600 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            {dark ? 'LIGHT_MODE' : 'DARK_MODE'}
          </button>
          
          <button
            className={`md:hidden font-mono2 text-[10px] border border-current px-2 py-0.5 ${t.muted}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? 'CLOSE' : 'MENU'}
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
            <div className="px-6 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`font-mono2 text-xs uppercase ${t.muted}`}
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
  return (
    <section id="top" className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 border-b border-zinc-800/80 dark:border-zinc-800/80">
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-[1.3fr_0.7fr] gap-12 items-start">
        <div className="z-10">
          {/* Metadata label */}
          <div className="flex items-center gap-2 mb-6 font-mono2 text-[10px] uppercase tracking-widest text-zinc-500">
            <span>[REF: RSA_HERO_V1.1]</span>
            <span>&middot;</span>
            <span className={dark ? "text-lime-300 font-bold" : "text-indigo-600 font-bold"}>SYS_STATUS: READY</span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl leading-none uppercase tracking-tighter mb-6">
            Rana<br />Shahmeer Ali
          </h1>

          <p className="font-mono2 text-xs uppercase tracking-widest text-zinc-500 mb-8">
            Karachi, Pakistan &middot; Open to relocation (Saudi Arabia)
          </p>

          <p className={`font-body text-lg sm:text-xl ${t.muted} max-w-xl leading-relaxed mb-10`}>
            I turn manual, multi-day data processes into automated pipelines that run in
            minutes — for fintech platforms and Upwork clients alike.
          </p>

          {/* Stacked Roles list */}
          <div className={`flex flex-col gap-2 font-mono2 text-xs uppercase tracking-wider pl-4 border-l border-zinc-700/60 mb-10`}>
            {ROLES.map((role, idx) => (
              <div key={role} className="flex items-center gap-2.5">
                <span className={dark ? "text-lime-400" : "text-indigo-600"}>[0{idx + 1}]</span>
                <span className={idx === 0 ? "font-bold text-zinc-200" : "text-zinc-400"}>{role}</span>
                {idx === 0 && <span className={`inline-block w-1.5 h-1.5 rounded-full ${dark ? 'bg-lime-400 animate-ping' : 'bg-indigo-600 animate-ping'}`} />}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className={`px-6 py-3.5 rounded-none font-mono2 text-[11px] uppercase tracking-widest transition-all duration-200 ${
                dark 
                  ? 'bg-lime-400 text-black border border-lime-400 hover:bg-transparent hover:text-lime-300' 
                  : 'bg-indigo-600 text-white border border-indigo-600 hover:bg-transparent hover:text-indigo-600'
              }`}
            >
              Hire on Upwork &rarr;
            </a>
            <a
              href="#projects"
              className={`px-6 py-3.5 rounded-none border border-current font-mono2 text-[11px] uppercase tracking-widest transition-all duration-200 bg-transparent hover:opacity-80`}
            >
              View Projects
            </a>
          </div>
        </div>
        
        <Reveal delay={0.2} className="flex justify-center md:justify-end z-10 w-full">
          <div className="relative group max-w-xs sm:max-w-sm w-full mt-8 md:mt-0">
            {/* Coordinate markings */}
            <span className="absolute -top-5 left-0 font-mono2 text-[9px] text-zinc-500 uppercase">[SYS_COORD: X-104_Y-290]</span>
            <span className="absolute -bottom-5 right-0 font-mono2 text-[9px] text-zinc-500 uppercase">[LOC: KHI_PK]</span>
            
            <div className={`border p-2.5 rounded-none ${
              dark ? 'border-zinc-800 bg-zinc-950/40' : 'bg-white border-slate-200'
            }`}>
              <img
                src="/profile.jpg"
                alt="Rana Shahmeer Ali"
                className="w-full rounded-none grayscale filter contrast-125 border border-current"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

function About({ t, dark }) {
  return (
    <section id="about" className="py-20 sm:py-28 border-b border-zinc-800/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
        <div className="z-10">
          <Reveal>
            <div className="flex items-center gap-2 mb-4 font-mono2 text-[10px] uppercase tracking-widest text-zinc-500">
              <span>[STAGE 00]</span>
              <span>&middot;</span>
              <span>OVERVIEW</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter mb-8 leading-none">
              Extract,<br />transform,<br />deliver.
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
        
        <Reveal delay={0.1} className="z-10 w-full">
          <div className="font-mono2 text-xs uppercase tracking-wider">
            <span className="text-[10px] text-zinc-500 block mb-4">// PERFORMANCE_METRICS_LOG</span>
            <div className={`border-t border-b ${t.border} divide-y ${t.border}`}>
              {STATS.map((s, i) => (
                <div key={s.label} className="grid grid-cols-[30px_1fr_auto] items-center py-4">
                  <span className="text-zinc-500">0{i + 1}.</span>
                  <span className="text-zinc-400">{s.label}</span>
                  <span className={`font-bold ${dark ? 'text-lime-300' : 'text-indigo-600'}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
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
    <section id="skills" className={`py-20 sm:py-28 border-b border-zinc-800/80 dark:border-zinc-800/80 ${t.surfaceAlt}`}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-2 mb-4 font-mono2 text-[10px] uppercase tracking-widest text-zinc-500">
            <span>[STAGE 01–10]</span>
            <span>&middot;</span>
            <span>Technical Index</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter mb-12 leading-none">
            Every stage<br />of the pipeline.
          </h2>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4 divide-y md:divide-y-0 divide-zinc-800/40">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.label} delay={(i % 3) * 0.05} className="pt-8 md:pt-0">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2 pb-3 border-b border-zinc-800/60 dark:border-zinc-800/60 mb-4">
                  <span className={`font-mono2 text-xs font-semibold ${dark ? 'text-lime-300' : 'text-indigo-600'}`}>{group.stage}.</span>
                  <h3 className={`font-display font-bold text-sm tracking-wide uppercase ${t.text}`}>
                    {group.label}
                  </h3>
                </div>
                
                <ul className="flex flex-col divide-y divide-zinc-800/30 dark:divide-zinc-800/30 font-mono2 text-[11px] uppercase tracking-wide">
                  {group.items.map((skill) => (
                    <li key={skill} className="py-2.5 flex items-center justify-between hover:translate-x-1 transition-transform duration-200">
                      <span className="text-zinc-400">{skill}</span>
                      <span className={`text-[9px] font-bold ${dark ? 'text-lime-400/70' : 'text-indigo-500/70'}`}>[STABLE]</span>
                    </li>
                  ))}
                </ul>
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
    <section id="experience" className="py-20 sm:py-28 border-b border-zinc-800/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-2 mb-4 font-mono2 text-[10px] uppercase tracking-widest text-zinc-500">
            <span>[STAGE 11]</span>
            <span>&middot;</span>
            <span>Experience Log</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter mb-12 leading-none">
            Where the pipelines<br />were built.
          </h2>
        </Reveal>
        
        <div className={`border-t border-b ${t.border} divide-y ${t.border} mt-10`}>
          {EXPERIENCE.map((job, idx) => {
            return (
              <Reveal key={job.role + job.dates} className="py-8">
                <div className="grid md:grid-cols-[40px_1fr_auto] gap-6 items-start">
                  <span className="font-mono2 text-xs text-zinc-500 font-bold">0{idx + 1}.</span>
                  
                  <div>
                    <h3 className={`font-display font-bold text-lg sm:text-xl uppercase tracking-tight ${t.text} mb-1`}>
                      {job.role}
                    </h3>
                    <p className={`font-mono2 text-[11px] uppercase tracking-wider font-bold mb-6 ${dark ? 'text-lime-300' : 'text-indigo-600'}`}>
                      {job.org}
                    </p>
                    
                    <ul className="flex flex-col gap-3 font-body text-sm text-zinc-400 max-w-2xl pl-4 border-l border-zinc-800/80 dark:border-zinc-800/80">
                      {job.bullets.map((b) => (
                        <li key={b} className="leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-left md:text-right font-mono2 text-xs text-zinc-500 font-semibold md:pt-1">
                    [{job.dates}]
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects                                                             */
/* ------------------------------------------------------------------ */

function ProjectCard({ t, project, dark, index }) {
  const getIcon = () => {
    if (project.categories.includes("AI & GenAI")) return Cpu;
    if (project.categories.includes("Data Engineering")) return Database;
    if (project.categories.includes("Cloud & DevOps")) return GitBranch;
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
      className={`group rounded-none border ${t.border} ${t.surface} overflow-hidden transition-all duration-300 flex flex-col justify-between hover:bg-zinc-950/20 dark:hover:bg-zinc-950/20 h-full`}
    >
      <div className="p-6 flex-grow">
        {/* Card Top Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="font-mono2 text-[10px] text-zinc-500 uppercase tracking-widest">
            [SYS_ID: 0{project.id}]
          </div>
          
          <div className="flex items-center gap-3">
            {project.flagship && (
              <span className={`font-mono2 text-[9px] tracking-wide uppercase px-2 py-0.5 rounded-none font-bold bg-lime-400 text-black border border-lime-400`}>
                FLAGSHIP
              </span>
            )}
            <ExternalLink className={`w-3.5 h-3.5 ${t.mutedSoft} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300`} />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.categories.map((c) => (
            <span
              key={c}
              className={`font-mono2 text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-none border border-zinc-800 dark:border-zinc-800 text-zinc-400`}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className={`font-display font-bold text-xl ${t.text} mb-3 leading-snug group-hover:underline underline-offset-4 ${dark ? 'group-hover:decoration-lime-300' : 'group-hover:decoration-indigo-600'} transition-all`}>
          {project.title}
        </h3>
        
        {/* Desc */}
        <p className={`font-body text-sm ${t.muted} leading-relaxed`}>{project.desc}</p>
      </div>

      {/* Tech tags */}
      <div className={`px-6 py-4 border-t ${t.border} ${t.surfaceAlt} flex flex-wrap gap-2`}>
        {project.tech.map((tech) => (
          <span key={tech} className="font-mono2 text-[10px] tracking-wide text-zinc-500 font-semibold">
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

  const getColSpan = (index, isFlagship) => {
    if (isFlagship) return "md:col-span-2 lg:col-span-2";
    const pattern = ["lg:col-span-1", "lg:col-span-1", "lg:col-span-2", "lg:col-span-1", "lg:col-span-2", "lg:col-span-1"];
    return pattern[index % pattern.length];
  };

  return (
    <section id="projects" className={`py-20 sm:py-28 border-b border-zinc-800/80 dark:border-zinc-800/80 ${t.surfaceAlt}`}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-2 mb-4 font-mono2 text-[10px] uppercase tracking-widest text-zinc-500">
            <span>[STAGE 12]</span>
            <span>&middot;</span>
            <span>Project Index</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter mb-12 leading-none">
            Shipped,<br />not simulated.
          </h2>
        </Reveal>
        
        {/* Command Line Style filter tabs */}
        <div className="flex flex-wrap gap-3 mb-10 font-mono2 text-xs">
          {FILTERS.map((f) => {
            const active = filter === f;
            const flagMap = {
              "All": "--all",
              "Data Engineering": "--data-eng",
              "Cloud & DevOps": "--cloud-devops",
              "AI & GenAI": "--ai-genai",
              "Full-Stack": "--full-stack"
            };
            const label = flagMap[f] || `--${f.toLowerCase().replace(/\s+/g, '-')}`;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 transition-all rounded-none border ${
                  active 
                    ? dark 
                      ? 'text-lime-300 border-lime-400 bg-lime-950/10 font-bold' 
                      : 'text-indigo-600 border-indigo-600 bg-indigo-50 font-bold' 
                    : 'text-zinc-500 hover:text-zinc-300 border-transparent'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        
        {/* Editorial Masonry Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, idx) => (
              <div key={p.id} className={getColSpan(idx, p.flagship)}>
                <ProjectCard t={t} project={p} dark={dark} index={idx} />
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
    <section id="freelance" className="py-20 sm:py-28 border-b border-zinc-800/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
        <Reveal>
          <div className="flex items-center gap-2 mb-4 font-mono2 text-[10px] uppercase tracking-widest text-zinc-500">
            <span>[STAGE 13]</span>
            <span>&middot;</span>
            <span>Freelance Registry</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter mb-8 leading-none">
            Top Rated on<br />Upwork.
          </h2>
          <p className={`font-body text-base ${t.muted} mb-8 max-w-sm leading-relaxed`}>
            A 100% Job Success Score, built one delivered pipeline at a time — for law firms,
            lending startups, and AI-first companies.
          </p>
          
          <div className="font-mono2 text-xs uppercase tracking-wider space-y-3 pl-4 border-l border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">[01]</span>
              <span className={dark ? "text-lime-300" : "text-indigo-600"}>STATUS: TOP_RATED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">[02]</span>
              <span>JOB_SUCCESS: 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">[03]</span>
              <span>MARKET: UPWORK</span>
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={0.1} className="w-full">
          <div className={`border ${t.border} p-6 sm:p-8 rounded-none`}>
            <span className="font-mono2 text-[10px] text-zinc-500 block mb-4">// DELIVERABLES_RECORD</span>
            <ul className="flex flex-col divide-y divide-zinc-800/40">
              {items.map((item, idx) => (
                <li key={item} className="py-3 flex gap-3 items-start">
                  <span className="font-mono2 text-xs text-zinc-500">0{idx + 1}.</span>
                  <span className={`font-body text-sm ${t.muted}`}>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://www.upwork.com/"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-none font-mono2 text-[11px] uppercase tracking-widest transition-all duration-200 border border-current ${
                dark 
                  ? 'bg-lime-400 text-black border-lime-400 hover:bg-transparent hover:text-lime-300' 
                  : 'bg-indigo-600 text-white border-indigo-600 hover:bg-transparent hover:text-indigo-600'
              }`}
            >
              Hire Me on Upwork &rarr;
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
  return (
    <section id="education" className={`py-20 sm:py-28 border-b border-zinc-800/80 dark:border-zinc-800/80 ${t.surfaceAlt}`}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-2 mb-4 font-mono2 text-[10px] uppercase tracking-widest text-zinc-500">
            <span>[STAGE 14]</span>
            <span>&middot;</span>
            <span>Foundations</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter mb-12 leading-none">
            Academic & Certs.
          </h2>
        </Reveal>
        
        <div className={`border-t border-b ${t.border} divide-y ${t.border} mt-10`}>
          <Reveal>
            <div className="grid md:grid-cols-[40px_1fr_auto] py-6 font-mono2 text-xs uppercase tracking-wide gap-4">
              <span className="text-zinc-500 font-bold">01.</span>
              <div>
                <h3 className={`font-display font-bold text-base tracking-tight uppercase ${t.text}`}>
                  BS Computer Science
                </h3>
                <p className="text-zinc-400 mt-1 capitalize-none">Bahria University, Karachi Campus</p>
              </div>
              <span className="text-zinc-500 font-semibold">[EXPECTED 2026]</span>
            </div>
          </Reveal>
          {CERTS.map((c, i) => (
            <Reveal key={c.name} delay={0.05 + i * 0.05}>
              <div className="grid md:grid-cols-[40px_1fr_auto] py-6 font-mono2 text-xs uppercase tracking-wide gap-4">
                <span className="text-zinc-500 font-bold">0{i + 2}.</span>
                <div>
                  <h3 className={`font-display font-bold text-base tracking-tight uppercase ${t.text}`}>
                    {c.name}
                  </h3>
                  <p className="text-zinc-400 mt-1 capitalize-none">{c.org}</p>
                </div>
                <span className="text-zinc-500 font-semibold">[VERIFIED]</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                              */
/* ------------------------------------------------------------------ */

function Contact({ t, dark }) {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-2 mb-4 font-mono2 text-[10px] uppercase tracking-widest text-zinc-500">
            <span>[STAGE 15]</span>
            <span>&middot;</span>
            <span>Contact Directory</span>
          </div>
        </Reveal>
        
        <Reveal delay={0.05}>
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl leading-none uppercase tracking-tighter mb-16">
            Let&apos;s build<br />something reliable.
          </h2>
        </Reveal>
        
        <Reveal delay={0.15}>
          <div className={`border-t ${t.border} pt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-left font-mono2 text-[11px] uppercase tracking-wider`}>
            <div>
              <span className="text-zinc-500 block mb-2">// EMAIL_ROUTING</span>
              <a 
                href="mailto:ranashahmeerali@gmail.com" 
                className={`font-bold hover:underline transition-colors ${dark ? 'hover:text-lime-300 text-zinc-200' : 'hover:text-indigo-600 text-zinc-800'}`}
              >
                ranashahmeerali@gmail.com
              </a>
            </div>
            
            <div>
              <span className="text-zinc-500 block mb-2">// MOBILE_TELEPHONY</span>
              <a 
                href="tel:03090905305" 
                className={`font-bold hover:underline transition-colors ${dark ? 'hover:text-lime-300 text-zinc-200' : 'hover:text-indigo-600 text-zinc-800'}`}
              >
                0309-0905305
              </a>
            </div>
            
            <div>
              <span className="text-zinc-500 block mb-2">// SOCIALS</span>
              <div className="flex flex-col gap-1.5 font-bold">
                <a 
                  href="https://linkedin.com/in/rana-shahmeer-ali-479592263" 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`hover:underline transition-colors ${dark ? 'hover:text-lime-300 text-zinc-200' : 'hover:text-indigo-600 text-zinc-800'}`}
                >
                  LINKEDIN &rarr;
                </a>
                <a 
                  href="https://github.com/Ranashahmeer" 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`hover:underline transition-colors ${dark ? 'hover:text-lime-300 text-zinc-200' : 'hover:text-indigo-600 text-zinc-800'}`}
                >
                  GITHUB &rarr;
                </a>
              </div>
            </div>
            
            <div>
              <span className="text-zinc-500 block mb-2">// PLATFORMS</span>
              <a 
                href="https://www.upwork.com/" 
                target="_blank" 
                rel="noreferrer" 
                className={`font-bold hover:underline transition-colors ${dark ? 'hover:text-lime-300 text-zinc-200' : 'hover:text-indigo-600 text-zinc-800'}`}
              >
                UPWORK PROFILE &rarr;
              </a>
            </div>
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
        <span className="font-mono2 text-[10px] text-zinc-500 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Rana Shahmeer Ali &middot; All Rights Reserved.
        </span>
        <span className="font-mono2 text-[10px] text-zinc-500 uppercase tracking-widest">
          [STACK: REACT + TAILWIND + FRAMER]
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
    <div className={`min-h-screen ${t.page} ${t.text} transition-colors duration-300 relative overflow-hidden bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:32px_32px]`}>
      <FontImport />
      <Nav t={t} dark={dark} setDark={setDark} />
      <Hero t={t} dark={dark} />
      <About t={t} dark={dark} />
      <Skills t={t} dark={dark} />
      <ExperienceTimeline t={t} dark={dark} />
      <Projects t={t} dark={dark} />
      <Freelance t={t} dark={dark} />
      <Education t={t} dark={dark} />
      <Contact t={t} dark={dark} />
      <Footer t={t} />
    </div>
  );
}
