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
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
    html { scroll-behavior: smooth; }
    .font-display { font-family: 'Manrope', sans-serif; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-mono2 { font-family: 'JetBrains Mono', monospace; }
    ::selection { background: rgba(45, 212, 191, 0.3); }
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
        page: "bg-[#0B130E]",
        nav: "bg-[#0B130E]/80 border-[#1B2B1F]",
        surface: "bg-[#111C15]",
        surfaceAlt: "bg-[#111C15]/60",
        border: "border-[#1B2B1F]",
        text: "text-slate-100",
        muted: "text-slate-400",
        mutedSoft: "text-[#618055]",
        pill: "bg-[#111C15] text-[#A1CB35] border-[#1B2B1F]",
        pillActive: "bg-spring-green text-[#0B130E] border-spring-green",
        accentText: "text-spring-green",
        placeholderBg: "from-[#111C15] to-[#1D2F1B]",
      }
    : {
        page: "bg-[#FAFBF6]",
        nav: "bg-[#FAFBF6]/80 border-[#E1EBC2]",
        surface: "bg-white",
        surfaceAlt: "bg-[#FAFBF6]/60",
        border: "border-[#E1EBC2]",
        text: "text-[#132213]",
        muted: "text-slate-600",
        mutedSoft: "text-[#769826]",
        pill: "bg-white text-[#769826] border-[#E1EBC2]",
        pillActive: "bg-spring-greenDark text-white border-spring-greenDark",
        accentText: "text-spring-greenDark",
        placeholderBg: "from-[#FAFBF6] to-[#E2F0B9]",
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
    <div className={`fixed top-0 inset-x-0 z-50 backdrop-blur border-b ${t.nav}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className={`font-display font-extrabold text-lg ${t.text}`}>
          RSA<span className={t.accentText}>.</span>
        </a>
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-body text-sm ${t.muted} hover:${t.accentText} transition-colors`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-full border ${t.border} ${t.muted} hover:${t.accentText} transition-colors`}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            className={`md:hidden p-2 rounded-full border ${t.border} ${t.muted}`}
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
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`font-body text-sm ${t.muted}`}
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
      </div>
      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-[1.3fr_0.7fr] gap-12 items-center">
        <div>
          <p className={`font-mono2 text-xs tracking-[0.25em] uppercase ${t.accentText} mb-4`}>
            Karachi, Pakistan &middot; Open to relocation (Saudi Arabia)
          </p>
          <h1 className={`font-display font-extrabold text-4xl sm:text-6xl leading-tight ${t.text}`}>
            Rana Shahmeer Ali
          </h1>
          <div className="h-10 sm:h-12 mt-4 flex items-center">
            <span className={`font-mono2 text-lg sm:text-2xl ${t.muted}`}>
              {typed}
              <span className="inline-block w-[2px] h-5 sm:h-6 bg-spring-greenDark dark:bg-spring-green ml-1 align-middle animate-pulse" />
            </span>
          </div>
          <p className={`font-body text-base sm:text-lg ${t.muted} mt-6 max-w-xl`}>
            I turn manual, multi-day data processes into automated pipelines that run in
            minutes — for fintech platforms and Upwork clients alike.
          </p>
          <div className="flex flex-wrap gap-4 mt-9">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-spring-yellow to-spring-orange text-slate-950 font-body font-semibold text-sm hover:-translate-y-0.5 transition-all shadow-lg shadow-spring-orange/20"
            >
              Hire on Upwork <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#projects"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${t.border} ${t.text} font-body font-semibold text-sm hover:border-spring-greenDark hover:text-spring-greenDark dark:hover:border-spring-green dark:hover:text-spring-green hover:-translate-y-0.5 transition-all`}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-sm ${t.muted} hover:${t.accentText} transition-all`}
            >
              Contact
            </a>
          </div>
        </div>
        <Reveal delay={0.2}>
          <img
            src="/profile.jpg"
            alt="Rana Shahmeer Ali"
            className="w-40 h-40 sm:w-56 sm:h-56 mx-auto rounded-full object-cover border border-spring-greenDark/20 dark:border-spring-green/20 shadow-2xl"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

function About({ t }) {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <Eyebrow t={t} index="STAGE 00" label="About" />
          <SectionTitle t={t}>Extract, transform, deliver.</SectionTitle>
        </Reveal>
        <Reveal delay={0.05}>
          <p className={`font-body text-base sm:text-lg leading-relaxed ${t.muted} max-w-3xl`}>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.05}>
              <div className={`p-5 rounded-2xl border ${t.border} ${t.surface}`}>
                <p className={`font-display font-extrabold text-2xl sm:text-3xl ${t.accentText}`}>
                  {s.value}
                </p>
                <p className={`font-body text-xs sm:text-sm ${t.mutedSoft} mt-1`}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Skills                                                               */
/* ------------------------------------------------------------------ */

function Skills({ t }) {
  return (
    <section id="skills" className={`py-20 sm:py-28 ${t.surfaceAlt}`}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <Eyebrow t={t} index="STAGE 01–10" label="Skills" />
          <SectionTitle t={t}>Every stage of the pipeline.</SectionTitle>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10 mt-4">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.label} delay={(i % 2) * 0.05}>
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-spring-greenDark/70 dark:from-spring-green/70 to-transparent" />
                <div className="flex items-baseline gap-2 mb-3">
                  <span className={`font-mono2 text-xs ${t.accentText}`}>{group.stage}</span>
                  <h3 className={`font-display font-bold text-sm tracking-wide uppercase ${t.text}`}>
                    {group.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className={`font-mono2 text-xs px-3 py-1.5 rounded-full border ${t.pill} hover:border-spring-greenDark hover:text-spring-greenDark dark:hover:border-spring-green dark:hover:text-spring-green transition-colors`}
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

function ExperienceTimeline({ t }) {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <Eyebrow t={t} index="STAGE 11" label="Experience" />
          <SectionTitle t={t}>Where the pipelines were built.</SectionTitle>
        </Reveal>
        <div className="relative mt-10">
          <div className={`absolute left-[19px] top-2 bottom-2 w-px ${t.border} border-l`} />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-spring-greenDark via-spring-greenDark/40 to-transparent dark:from-spring-green dark:via-spring-green/40"
          />
          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((job, i) => {
              const Icon = job.icon;
              return (
                <Reveal key={job.role + job.dates} delay={i * 0.1} className="relative pl-14">
                  <div
                    className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-2 border-spring-greenDark dark:border-spring-green ${t.page}`}
                  >
                    <Icon className="w-4 h-4 text-spring-greenDark dark:text-spring-green" strokeWidth={1.75} />
                  </div>
                  <div className={`p-6 rounded-2xl border ${t.border} ${t.surface}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className={`font-display font-bold text-lg ${t.text}`}>{job.role}</h3>
                      <span className={`font-mono2 text-xs ${t.accentText}`}>{job.dates}</span>
                    </div>
                    <p className={`font-body text-sm ${t.mutedSoft} mb-4`}>{job.org}</p>
                    <ul className="flex flex-col gap-2">
                      {job.bullets.map((b) => (
                        <li key={b} className={`flex gap-2 font-body text-sm ${t.muted}`}>
                          <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 ${t.accentText}`} />
                          <span>{b}</span>
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

function ProjectCard({ t, project, large }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className={`group rounded-2xl border ${t.border} ${t.surface} overflow-hidden hover:border-spring-greenDark/60 dark:hover:border-spring-green/60 hover:-translate-y-1 transition-all ${
        large ? "sm:col-span-2" : ""
      }`}
    >
      <ImagePlaceholder t={t} className={`w-full ${large ? "h-56" : "h-36"}`} rounded="rounded-none" />
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.categories.map((c) => (
            <span
              key={c}
              className={`font-mono2 text-[10px] tracking-wide uppercase px-2 py-1 rounded-full border ${t.pill}`}
            >
              {c}
            </span>
          ))}
          {project.flagship && (
            <span className="font-mono2 text-[10px] tracking-wide uppercase px-2 py-1 rounded-full bg-spring-yellow text-slate-950 border border-spring-yellow">
              Flagship
            </span>
          )}
        </div>
        <h3 className={`font-display font-bold text-lg ${t.text} mb-2`}>{project.title}</h3>
        <p className={`font-body text-sm ${t.muted} mb-4`}>{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className={`font-mono2 text-[11px] ${t.mutedSoft}`}>
              {tech}
              <span className={`${t.mutedSoft} mx-1`}>&middot;</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Projects({ t }) {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(
    () =>
      filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter)),
    [filter]
  );

  return (
    <section id="projects" className={`py-20 sm:py-28 ${t.surfaceAlt}`}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <Eyebrow t={t} index="STAGE 12" label="Projects" />
          <SectionTitle t={t}>Shipped, not simulated.</SectionTitle>
        </Reveal>
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-body text-sm px-4 py-2 rounded-full border transition-colors ${
                filter === f ? t.pillActive : t.pill
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <motion.div layout className="grid sm:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} t={t} project={p} large={p.flagship} />
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

function Freelance({ t }) {
  const items = [
    "AI SMS agents and RAG-based virtual assistant bots for global clients",
    "Content-to-Cash AI pipeline architecture for a growth-stage client",
    "Multi-vendor SaaS platform (PlayEase) built end-to-end on Angular and .NET",
    "n8n and Python automation across REST API integrations",
  ];
  return (
    <section id="freelance" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
        <Reveal>
          <Eyebrow t={t} index="STAGE 13" label="Freelance" />
          <SectionTitle t={t}>Top Rated on Upwork.</SectionTitle>
          <p className={`font-body text-base ${t.muted} mb-6 max-w-md`}>
            A 100% Job Success Score, built one delivered pipeline at a time — for law firms,
            lending startups, and AI-first companies.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-spring-yellow text-slate-950 font-body font-semibold text-sm">
              <Award className="w-4 h-4" /> Top Rated
            </span>
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${t.border} ${t.text} font-body font-semibold text-sm`}>
              100% Job Success
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className={`p-6 sm:p-8 rounded-2xl border ${t.border} ${t.surface}`}>
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-spring-greenDark dark:bg-spring-green mt-2 shrink-0" />
                  <span className={`font-body text-sm ${t.muted}`}>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://www.upwork.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-spring-yellow to-spring-orange text-slate-950 font-body font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-spring-orange/20"
            >
              Hire Me on Upwork <ExternalLink className="w-4 h-4" />
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

function Education({ t }) {
  return (
    <section id="education" className={`py-20 sm:py-28 ${t.surfaceAlt}`}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <Eyebrow t={t} index="STAGE 14" label="Education & Certifications" />
          <SectionTitle t={t}>Foundations.</SectionTitle>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6">
          <Reveal>
            <div className={`p-6 rounded-2xl border ${t.border} ${t.surface} h-full`}>
              <GraduationCap className={`w-6 h-6 ${t.accentText} mb-4`} strokeWidth={1.5} />
              <h3 className={`font-display font-bold ${t.text} mb-1`}>
                BS Computer Science
              </h3>
              <p className={`font-body text-sm ${t.mutedSoft}`}>
                Bahria University, Karachi Campus — Expected 2026
              </p>
            </div>
          </Reveal>
          {CERTS.map((c, i) => (
            <Reveal key={c.name} delay={0.05 + i * 0.05}>
              <div className={`p-6 rounded-2xl border ${t.border} ${t.surface} h-full`}>
                <Award className={`w-6 h-6 ${t.accentText} mb-4`} strokeWidth={1.5} />
                <h3 className={`font-display font-bold ${t.text} mb-1`}>{c.name}</h3>
                <p className={`font-body text-sm ${t.mutedSoft}`}>{c.org}</p>
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

function Contact({ t }) {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <Eyebrow t={t} index="STAGE 15" label="Contact" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className={`font-display font-extrabold text-3xl sm:text-5xl ${t.text} mb-4`}>
            Let&apos;s build something reliable.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={`font-body text-sm ${t.mutedSoft} mb-10`}>
            Currently open to full-time roles and freelance projects.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:ranashahmeerali@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-spring-yellow to-spring-orange text-slate-950 font-body font-semibold text-sm hover:-translate-y-0.5 transition-all shadow-lg shadow-spring-orange/20"
            >
              <Mail className="w-4 h-4" /> Email Me
            </a>
            <a
              href="https://linkedin.com/in/rana-shahmeer-ali-479592263"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${t.border} ${t.text} font-body font-semibold text-sm hover:border-spring-greenDark hover:text-spring-greenDark dark:hover:border-spring-green dark:hover:text-spring-green hover:-translate-y-0.5 transition-all`}
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a
              href="https://github.com/Ranashahmeer"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${t.border} ${t.text} font-body font-semibold text-sm hover:border-spring-greenDark hover:text-spring-greenDark dark:hover:border-spring-green dark:hover:text-spring-green hover:-translate-y-0.5 transition-all`}
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.upwork.com/"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-sm ${t.muted} hover:${t.accentText} transition-all`}
            >
              Upwork Profile
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className={`flex flex-wrap justify-center gap-6 mt-10 font-mono2 text-xs ${t.mutedSoft}`}>
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> ranashahmeerali@gmail.com
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> 0309-0905305
            </span>
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
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className={`font-mono2 text-xs ${t.mutedSoft}`}>
          &copy; {new Date().getFullYear()} Rana Shahmeer Ali
        </span>
        <span className={`font-mono2 text-xs ${t.mutedSoft}`}>Built with React &middot; Tailwind &middot; Framer Motion</span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const [dark, setDark] = useState(false);
  const t = getTheme(dark);

  return (
    <div className={`min-h-screen ${t.page} ${t.text} transition-colors duration-300`}>
      <FontImport />
      <Nav t={t} dark={dark} setDark={setDark} />
      <Hero t={t} dark={dark} />
      <About t={t} />
      <Skills t={t} />
      <ExperienceTimeline t={t} />
      <Projects t={t} />
      <Freelance t={t} />
      <Education t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
