export type JobRole = "Engineering" | "Research" | "Data Science" | "Consulting & Delivery"

export type JobField =
  | "Quantum Hardware"
  | "Quantum Machine Learning"
  | "Quantum Finance"
  | "Fraud & Anomaly Detection"
  | "Error Correction"
  | "Energy Systems"
  | "Enterprise Solutions"

export const JOB_ROLES: JobRole[] = ["Engineering", "Research", "Data Science", "Consulting & Delivery"]

export const JOB_FIELDS: JobField[] = [
  "Quantum Hardware",
  "Quantum Machine Learning",
  "Quantum Finance",
  "Fraud & Anomaly Detection",
  "Error Correction",
  "Energy Systems",
  "Enterprise Solutions",
]

export type JobLocation =
  | "Charlotte, NC"
  | "New York, NY"
  | "Bayonne, NJ"
  | "Remote (US)"

export const JOB_LOCATIONS: JobLocation[] = ["Charlotte, NC", "New York, NY", "Bayonne, NJ", "Remote (US)"]

export type Job = {
  id: string
  title: string
  department: string
  location: string
  locationCategory: JobLocation
  employment_type: string
  role: JobRole
  field: JobField
  summary: string
  description: string
  requirements: string[]
  posted_at: string
  // Optional richer corporate-posting fields — present on more detailed
  // listings (e.g. the Bayonne posting), omitted on simpler ones. When
  // present, the Job Detail screen renders the full "Job Information" block
  // plus Responsibilities/Required/Preferred as three separate sections
  // instead of a single flat requirements list.
  jobIdentification?: string
  fullAddress?: string
  basePaySalary?: string
  responsibilities?: string[]
  preferredQualifications?: string[]
  active: boolean
}

/**
 * Local seed data. EdgexCareersScreen tries the synced `jobs` table first
 * (pulled from Supabase into WatermelonDB by jobsSync.ts) and falls back to
 * this list when that table is empty or unreachable — so Careers still
 * works before the backend is wired up, and offline.
 */
export const SEED_JOBS: Job[] = [
  {
    id: "qpu-design-engineer",
    jobIdentification: "EDGX-2026-01142",
    fullAddress: "2321 Dundeen St, Charlotte, NC 28216, US",
    basePaySalary: "Charlotte, NC $145,000.00–$195,000.00",
    title: "QPU Design Engineer",
    department: "Quantum Engineering Division",
    location: "Charlotte, NC (On-site)",
    locationCategory: "Charlotte, NC",
    employment_type: "Full-time",
    role: "Engineering",
    field: "Quantum Hardware",
    summary: "Architect superconducting and photonic qubit designs for the QPU-X and QPU-P product lines.",
    description:
      "You'll work across coherence, gate-error, and connectivity tradeoffs for EDGEX's custom QPU lines, partnering with fabrication and cryogenics to take designs from simulation to shipped hardware.",
    requirements: [
      "Graduate degree in physics, EE, or related field",
      "Experience with superconducting or photonic qubit architectures",
      "Familiarity with cryogenic system constraints (10–20 mK)",
      "Working knowledge of pulse-level control and gate calibration",
    ],
    responsibilities: [
      "Design qubit layouts and gate architectures for the QPU-X (superconducting) and QPU-P (photonic) product lines",
      "Run coherence, gate-error, and connectivity tradeoff analyses to guide design decisions",
      "Partner with the fabrication team to move designs from simulation into physical devices",
      "Work with Cryogenic Systems to validate designs against 10–20 mK operating constraints",
      "Support pulse-level control and gate calibration during device bring-up",
      "Document design decisions and characterization results for the QPU Series product line",
    ],
    preferredQualifications: [
      "Experience with superconducting qubit fabrication processes",
      "Familiarity with photonic qubit architectures specifically",
      "Publication record in quantum device physics",
    ],
    posted_at: "2026-07-01",
    active: true,
  },
  {
    id: "cryogenic-systems-engineer",
    jobIdentification: "EDGX-2026-01187",
    fullAddress: "2321 Dundeen St, Charlotte, NC 28216, US",
    basePaySalary: "Charlotte, NC $140,000.00–$185,000.00",
    title: "Cryogenic Systems Engineer",
    department: "Quantum Engineering Division",
    location: "Charlotte, NC (On-site)",
    locationCategory: "Charlotte, NC",
    employment_type: "Full-time",
    role: "Engineering",
    field: "Quantum Hardware",
    summary: "Design and maintain the dilution refrigeration and RF/microwave control stack for EDGEX's QPU fleet.",
    description:
      "You'll own the cryogenic control systems product line — dilution refrigerator integration, RF/microwave signal chains, and the pulse-level firmware that drives gate operations at 10–20 mK.",
    requirements: [
      "Experience with dilution refrigerator systems",
      "RF/microwave engineering background",
      "Comfort with low-level firmware for timing-critical control loops",
      "Experience troubleshooting cryogenic thermal and vibration issues",
    ],
    responsibilities: [
      "Own the dilution refrigeration and RF/microwave control stack for EDGEX's QPU fleet",
      "Design and maintain the pulse-level firmware driving gate operations at 10–20 mK",
      "Troubleshoot cryogenic thermal, vibration, and signal-integrity issues in production systems",
      "Work with QPU Design Engineering to validate new device designs against cryogenic constraints",
      "Support installation and commissioning of cryogenic systems at client and EDGEX facilities",
      "Maintain documentation for the Cryogenic Control Systems product line",
    ],
    preferredQualifications: [
      "Experience with commercial dilution refrigerator platforms",
      "Background in RF/microwave signal chain design for quantum control",
      "Comfort working in a regulated or safety-critical engineering environment",
    ],
    posted_at: "2026-06-15",
    active: true,
  },
  {
    id: "quantum-error-correction-scientist",
    jobIdentification: "EDGX-2026-01256",
    fullAddress: "2321 Dundeen St, Charlotte, NC 28216, US (or Remote — United States)",
    basePaySalary: "Charlotte, NC $165,000.00–$220,000.00",
    title: "Quantum Error Correction Research Scientist",
    department: "Research & Innovation Lab",
    location: "Charlotte, NC (On-site) or Remote (US)",
    locationCategory: "Charlotte, NC",
    employment_type: "Full-time",
    role: "Research",
    field: "Error Correction",
    summary: "Develop and benchmark error-correcting codes across EDGEX's five QPU architectures.",
    description:
      "You'll research surface codes, cat codes, and topological error correction schemes, and work with Quantum Engineering to validate which codes are practical on which hardware modality — a core input to the fault-tolerant QPU-T roadmap.",
    requirements: [
      "PhD or equivalent research experience in quantum information theory",
      "Familiarity with surface codes and/or topological error correction",
      "Experience benchmarking logical error rates against physical noise models",
      "Publication record in quantum error correction preferred",
    ],
    responsibilities: [
      "Research surface codes, cat codes, and topological error correction schemes across EDGEX's five QPU architectures",
      "Benchmark logical error rates against physical noise models for each hardware modality",
      "Determine which error-correcting codes are practical on which QPU architecture",
      "Feed research findings directly into the fault-tolerant QPU-T roadmap",
      "Collaborate with Quantum Engineering on syndrome extraction and decoder requirements",
      "Publish and present findings internally and, where appropriate, externally",
    ],
    preferredQualifications: [
      "Experience with real-time decoder implementations",
      "Familiarity with hardware-specific noise characterization",
      "Track record of peer-reviewed publications in quantum error correction",
    ],
    posted_at: "2026-07-10",
    active: true,
  },
  {
    id: "error-correction-engineer",
    jobIdentification: "EDGX-2026-01261",
    fullAddress: "2321 Dundeen St, Charlotte, NC 28216, US",
    basePaySalary: "Charlotte, NC $150,000.00–$200,000.00",
    title: "Quantum Error Correction Engineer",
    department: "Quantum Engineering Division",
    location: "Charlotte, NC (On-site)",
    locationCategory: "Charlotte, NC",
    employment_type: "Full-time",
    role: "Engineering",
    field: "Error Correction",
    summary: "Implement error-correcting code layers in EDGEX's control firmware and calibration pipelines.",
    description:
      "You'll translate error-correction research into shipped firmware — syndrome extraction, decoder integration, and real-time feedback loops running on the QPU control electronics.",
    requirements: [
      "Strong background in digital signal processing or real-time control systems",
      "Familiarity with quantum error correction concepts (syndrome measurement, decoding)",
      "Experience with FPGA or low-latency embedded firmware",
    ],
    responsibilities: [
      "Translate error-correction research into shipped control firmware",
      "Implement syndrome extraction and decoder integration in real-time control loops",
      "Build and maintain feedback loops running on QPU control electronics",
      "Work with the Research & Innovation Lab to validate new codes before production rollout",
      "Support debugging of error-correction-related issues in deployed systems",
      "Contribute to internal standards for error-correction firmware development",
    ],
    preferredQualifications: [
      "Experience with FPGA-based real-time control systems",
      "Familiarity with a specific error-correcting code family (surface, cat, topological)",
      "Background in embedded systems for scientific instrumentation",
    ],
    posted_at: "2026-07-05",
    active: true,
  },
  {
    id: "quantum-software-engineer-qml",
    jobIdentification: "EDGX-2026-01309",
    fullAddress: "Remote — United States",
    basePaySalary: "Remote (US) $150,000.00–$205,000.00",
    title: "Quantum Software Engineer (QML)",
    department: "Quantum Software Division",
    location: "Remote (US)",
    locationCategory: "Remote (US)",
    employment_type: "Full-time",
    role: "Engineering",
    field: "Quantum Machine Learning",
    summary: "Build hybrid quantum-classical QML pipelines for financial and healthcare clients.",
    description:
      "You'll implement variational circuits, quantum kernels, and QNNs, and integrate them with classical ML pipelines running on Azure Quantum and AWS Braket.",
    requirements: [
      "Strong Python background",
      "Experience with a quantum SDK (Qiskit, Cirq, or PennyLane)",
      "Comfort working across classical ML and quantum toolchains",
    ],
    responsibilities: [
      "Implement variational quantum circuits, quantum kernels, and QNNs for the QML Suite",
      "Integrate quantum components with classical ML pipelines on Azure Quantum and AWS Braket",
      "Build and maintain hybrid quantum-classical pipelines for financial and healthcare client engagements",
      "Work directly with Enterprise Solutions during proof-of-concept engagements",
      "Contribute to the QML Suite's core library used across client deployments",
      "Write tests, documentation, and reference implementations for new QML components",
    ],
    preferredQualifications: [
      "Experience with more than one quantum SDK (Qiskit, Cirq, PennyLane)",
      "Background in either financial services or healthcare data",
      "Familiarity with MLOps tooling (MLflow, SageMaker, Vertex AI)",
    ],
    posted_at: "2026-07-08",
    active: true,
  },
  {
    id: "principal-quantum-algorithms-scientist",
    jobIdentification: "EDGX-2026-01198",
    fullAddress: "2321 Dundeen St, Charlotte, NC 28216, US (or Remote — United States)",
    basePaySalary: "Charlotte, NC $190,000.00–$255,000.00",
    title: "Principal Quantum Algorithms Scientist",
    department: "Research & Innovation Lab",
    location: "Charlotte, NC (On-site) or Remote (US)",
    locationCategory: "Charlotte, NC",
    employment_type: "Full-time",
    role: "Research",
    field: "Quantum Machine Learning",
    summary: "Lead algorithm research for EDGEX's QML Suite across variational circuits, QNNs, and QAOA.",
    description:
      "You'll set technical direction for the algorithms underneath the QML Suite, evaluating new variational architectures and optimization techniques before they move into the Quantum Software Division's production pipeline.",
    requirements: [
      "PhD in quantum computing, physics, or computer science",
      "Deep familiarity with variational quantum algorithms and QAOA",
      "Track record leading applied research from prototype to production handoff",
    ],
    responsibilities: [
      "Set technical direction for the algorithms underneath the QML Suite",
      "Evaluate new variational architectures and optimization techniques before production handoff",
      "Lead applied research on QAOA, QNNs, and hybrid quantum-classical transformer architectures",
      "Partner with the Quantum Software Division to move research into the production pipeline",
      "Mentor research staff and review technical work across the Research & Innovation Lab",
      "Represent EDGEX's algorithmic research externally where appropriate",
    ],
    preferredQualifications: [
      "Track record leading a research team from prototype to shipped product",
      "Deep expertise in one QPU modality's algorithmic constraints",
      "Publications or invited talks in quantum machine learning",
    ],
    posted_at: "2026-06-28",
    active: true,
  },
  {
    id: "senior-quantum-ml-engineer-finance",
    jobIdentification: "EDGX-2026-01334",
    fullAddress: "375 Park Ave, New York, NY 10152, US (or Remote — United States)",
    basePaySalary: "New York, NY $175,000.00–$235,000.00",
    title: "Senior Quantum ML Engineer, Finance",
    department: "Quantum Software Division",
    location: "New York, NY or Remote (US)",
    locationCategory: "New York, NY",
    employment_type: "Full-time",
    role: "Engineering",
    field: "Quantum Finance",
    summary: "Build QAOA-based portfolio optimization and quantum Monte Carlo pricing tools for trading-desk clients.",
    description:
      "You'll own the finance-facing slice of the QML Suite — portfolio allocation, derivatives pricing, and risk aggregation models — working directly with client quant teams during PoC and production engagements.",
    requirements: [
      "Experience with quantitative finance (derivatives pricing, portfolio optimization)",
      "Hands-on experience with QAOA or quantum amplitude estimation",
      "Comfort working directly with client quant/trading teams",
    ],
    responsibilities: [
      "Own the finance-facing slice of the QML Suite: portfolio allocation, derivatives pricing, risk aggregation",
      "Build QAOA-based portfolio optimization tools for trading-desk clients",
      "Implement quantum Monte Carlo pricing models for derivatives engagements",
      "Work directly with client quant teams during PoC and production phases",
      "Translate trading-desk requirements into QML Suite features",
      "Support production incidents affecting finance-facing deployments",
    ],
    preferredQualifications: [
      "Prior experience at a bank, hedge fund, or trading firm",
      "Familiarity with quantum amplitude estimation specifically",
      "Series 7/63 or similar not required, but financial industry familiarity a plus",
    ],
    posted_at: "2026-07-12",
    active: true,
  },
  {
    id: "quantitative-researcher-quantum-finance",
    jobIdentification: "EDGX-2026-01102",
    fullAddress: "375 Park Ave, New York, NY 10152, US",
    basePaySalary: "New York, NY $170,000.00–$225,000.00",
    title: "Quantitative Researcher, Quantum Finance",
    department: "Research & Innovation Lab",
    location: "New York, NY",
    locationCategory: "New York, NY",
    employment_type: "Full-time",
    role: "Research",
    field: "Quantum Finance",
    summary: "Research quantum algorithms for derivatives pricing, time-series forecasting, and risk modeling.",
    description:
      "You'll develop and validate quantum Monte Carlo and amplitude estimation approaches to derivatives pricing, and hybrid quantum-classical models for time-series forecasting, ahead of handoff to the finance engineering team.",
    requirements: [
      "Graduate degree in a quantitative field (financial engineering, physics, applied math)",
      "Experience with Monte Carlo pricing methods",
      "Familiarity with quantum amplitude estimation a strong plus",
    ],
    responsibilities: [
      "Develop quantum Monte Carlo and amplitude estimation approaches to derivatives pricing",
      "Research hybrid quantum-classical models for time-series forecasting",
      "Validate research findings against classical benchmark models",
      "Hand off validated approaches to the finance engineering team for productionization",
      "Collaborate with client quant teams to align research direction with real trading-desk needs",
      "Present research findings to internal stakeholders and select clients",
    ],
    preferredQualifications: [
      "PhD in financial engineering, physics, or applied mathematics",
      "Prior buy-side or sell-side quantitative research experience",
      "Familiarity with quantum amplitude estimation implementations",
    ],
    posted_at: "2026-06-20",
    active: true,
  },
  {
    id: "quantum-risk-modeling-analyst",
    jobIdentification: "EDGX-2026-01358",
    fullAddress: "Remote — United States",
    basePaySalary: "Remote (US) $130,000.00–$175,000.00",
    title: "Quantum Risk Modeling Analyst",
    department: "Quantum Software Division",
    location: "Remote (US)",
    locationCategory: "Remote (US)",
    employment_type: "Full-time",
    role: "Data Science",
    field: "Quantum Finance",
    summary: "Build quantum-enhanced risk aggregation and stress-testing models for portfolio clients.",
    description:
      "You'll develop risk models for portfolios with complex, non-linear dependency structures, using quantum-enhanced simulation to capture correlation effects classical models tend to miss.",
    requirements: [
      "Background in quantitative risk modeling",
      "Experience with portfolio stress-testing methodologies",
      "Python proficiency; quantum computing exposure a plus, not required",
    ],
    responsibilities: [
      "Build quantum-enhanced risk aggregation models for portfolio clients",
      "Develop stress-testing methodologies for portfolios with non-linear dependency structures",
      "Validate risk models against classical benchmarks before client delivery",
      "Support client engagements led by Enterprise Solutions with risk-modeling deliverables",
      "Document modeling assumptions and limitations for client-facing reports",
    ],
    preferredQualifications: [
      "Prior experience in portfolio risk management or quantitative risk",
      "Exposure to quantum computing concepts (not required to apply)",
      "Strong Python and data visualization skills",
    ],
    posted_at: "2026-07-14",
    active: true,
  },
  {
    id: "quantum-fraud-detection-data-scientist",
    jobIdentification: "EDGX-2026-01372",
    fullAddress: "Remote — United States",
    basePaySalary: "Remote (US) $145,000.00–$195,000.00",
    title: "Quantum Fraud Detection Data Scientist",
    department: "Quantum Software Division",
    location: "Remote (US)",
    locationCategory: "Remote (US)",
    employment_type: "Full-time",
    role: "Data Science",
    field: "Fraud & Anomaly Detection",
    summary: "Build quantum kernel and QNN-based anomaly detection models for transaction fraud detection.",
    description:
      "You'll design quantum-enhanced anomaly detection models for high-dimensional transaction data, working with client fraud and risk teams to integrate them into existing detection pipelines.",
    requirements: [
      "Experience building fraud/anomaly detection models in production",
      "Familiarity with quantum kernel methods or QNNs",
      "Comfort working with imbalanced, high-dimensional transactional data",
    ],
    responsibilities: [
      "Design quantum kernel and QNN-based anomaly detection models for transaction fraud detection",
      "Work with client fraud and risk teams to integrate models into existing detection pipelines",
      "Evaluate model performance on imbalanced, high-dimensional transactional data",
      "Partner with Enterprise Solutions during fraud-detection PoC engagements",
      "Document model behavior and limitations for client risk and compliance teams",
    ],
    preferredQualifications: [
      "Experience building fraud detection systems in a regulated environment",
      "Familiarity with quantum kernel methods specifically",
      "Comfort explaining model behavior to non-technical risk stakeholders",
    ],
    posted_at: "2026-07-16",
    active: true,
  },
  {
    id: "ml-engineer-anomaly-detection",
    jobIdentification: "EDGX-2026-01381",
    fullAddress: "Remote — United States",
    basePaySalary: "Remote (US) $140,000.00–$185,000.00",
    title: "Machine Learning Engineer, Anomaly Detection",
    department: "Quantum Software Division",
    location: "Remote (US)",
    locationCategory: "Remote (US)",
    employment_type: "Full-time",
    role: "Engineering",
    field: "Fraud & Anomaly Detection",
    summary: "Productionize hybrid quantum-classical anomaly detection pipelines for cybersecurity and finance clients.",
    description:
      "You'll take anomaly detection models from research prototypes to production services — orchestration, monitoring, and integration with client-side threat detection and fraud systems.",
    requirements: [
      "Strong software engineering background (Python, production ML systems)",
      "Experience deploying anomaly/threat detection models at scale",
      "Familiarity with hybrid quantum-classical pipeline orchestration a plus",
    ],
    responsibilities: [
      "Productionize hybrid quantum-classical anomaly detection pipelines",
      "Build orchestration and monitoring for anomaly/threat detection services",
      "Integrate detection pipelines with client-side fraud and threat detection systems",
      "Support performance tuning and scalability improvements for deployed models",
      "Participate in on-call rotation for production anomaly-detection services",
    ],
    preferredQualifications: [
      "Experience deploying ML systems on Kubernetes",
      "Familiarity with hybrid quantum-classical pipeline orchestration",
      "Background in either cybersecurity or financial fraud detection",
    ],
    posted_at: "2026-07-18",
    active: true,
  },
  {
    id: "nuclear-systems-engineer",
    jobIdentification: "EDGX-2026-00987",
    fullAddress: "2321 Dundeen St, Charlotte, NC 28216, US",
    basePaySalary: "Charlotte, NC $150,000.00–$200,000.00",
    title: "Nuclear Systems Integration Engineer",
    department: "Advanced Energy Systems Division",
    location: "Charlotte, NC (On-site)",
    locationCategory: "Charlotte, NC",
    employment_type: "Full-time",
    role: "Engineering",
    field: "Energy Systems",
    summary: "Integrate micro-modular reactor (MMR) power modules with quantum data center infrastructure.",
    description:
      "You'll work at the boundary between reactor core partners and EDGEX's facility architecture — power distribution, containment monitoring, and fail-safe protocol integration.",
    requirements: [
      "Background in nuclear or power systems engineering",
      "Experience with regulatory/compliance documentation",
      "Comfort working alongside external NRC-compliant engineering partners",
    ],
    responsibilities: [
      "Integrate micro-modular reactor (MMR) power modules with quantum data center infrastructure",
      "Own power distribution and containment monitoring system design for EDGEX facilities",
      "Work alongside external NRC-compliant nuclear engineering partners on reactor core integration",
      "Support fail-safe protocol design and validation for facility power systems",
      "Prepare and maintain regulatory and compliance documentation",
      "Support commissioning of new quantum campus facilities",
    ],
    preferredQualifications: [
      "Direct experience with NRC licensing or compliance processes",
      "Background in data center or mission-critical facility power systems",
      "Comfort working across engineering and regulatory disciplines",
    ],
    posted_at: "2026-06-20",
    active: true,
  },
  {
    id: "enterprise-solutions-consultant",
    jobIdentification: "EDGX-2026-01366",
    fullAddress: "Remote — United States",
    basePaySalary: "Remote (US) $135,000.00–$180,000.00",
    title: "Enterprise Solutions Consultant",
    department: "Enterprise Solutions Division",
    location: "Remote (US)",
    locationCategory: "Remote (US)",
    employment_type: "Full-time",
    role: "Consulting & Delivery",
    field: "Enterprise Solutions",
    summary: "Lead client readiness assessments and PoC delivery across finance, healthcare, and defense accounts.",
    description:
      "You'll scope quantum readiness for enterprise clients, run proof-of-concept engagements, and hand off production architecture to the Engineering and Software divisions.",
    requirements: [
      "5+ years in technical consulting or solutions architecture",
      "Ability to translate quantum capabilities into business outcomes",
      "Experience with enterprise procurement and compliance cycles",
    ],
    responsibilities: [
      "Lead quantum readiness assessments for enterprise clients across finance, healthcare, and defense",
      "Scope and run proof-of-concept engagements alongside Quantum Engineering and Quantum Software",
      "Translate client business problems into concrete quantum computing engagement plans",
      "Hand off validated PoCs to the appropriate division for production build-out",
      "Manage client relationships through procurement and compliance cycles",
      "Represent EDGEX in client-facing technical and business discussions",
    ],
    preferredQualifications: [
      "Experience selling or delivering into regulated industries (finance, government, healthcare)",
      "Background in technical pre-sales or solutions architecture",
      "Comfort working across multiple concurrent client engagements",
    ],
    posted_at: "2026-07-15",
    active: true,
  },
  {
    id: "principal-swe-agentic-quantum-ai",
    title: "Principal Software Engineer, Agentic Quantum AI Platforms",
    department: "Quantum Software Division",
    location: "Bayonne, NJ (On-site)",
    locationCategory: "Bayonne, NJ",
    employment_type: "Full-time",
    role: "Engineering",
    field: "Quantum Machine Learning",
    jobIdentification: "EDGX-2026-04721",
    fullAddress: "20 Port Jersey Blvd, Bayonne, NJ 07002, US",
    basePaySalary: "Bayonne, NJ $195,000.00–$260,000.00",
    summary:
      "Lead architecture and hands-on development of the agentic orchestration layer behind the EDGEX QML Suite — the system that coordinates quantum and classical workloads across client engagements.",
    description:
      "As Principal Software Engineer on the Quantum Software Division's platform team, you'll lead the design, build, and scaling of the agentic orchestration layer underneath the EDGEX QML Suite — the system that decides which parts of a hybrid pipeline run on quantum hardware, which run classically, and how multi-step reasoning, retrieval, and tool use are coordinated across both. This is a hands-on role: you'll write production code, make key architectural calls, and be accountable for what ships, while also setting the multi-year direction for the platform.",
    requirements: [
      "8+ years in software engineering, including experience leading architecture for large distributed systems",
      "Expert-level Python; strong working proficiency in TypeScript or Rust",
      "Hands-on experience with agentic/orchestration frameworks (LangGraph, AutoGen, or equivalent)",
      "Strong grounding in retrieval-augmented generation, tool/function calling, and multi-step reasoning patterns",
      "Distributed systems experience: message queues, gRPC/REST, containerized deployment (Docker/Kubernetes)",
      "Comfort designing systems that route work across quantum and classical execution backends",
    ],
    responsibilities: [
      "Own the multi-year strategy for the QML Suite's agentic orchestration layer — toolchains, retrieval pipelines, state management, and evaluation loops",
      "Architect the routing logic that decides which pipeline stages run on EDGEX QPUs versus classical compute, and define clear primitives for when each applies",
      "Establish standards for the platform's development lifecycle: evaluation, observability, security review, and release readiness",
      "Contribute directly in Python — services, concurrency, reliability — and set the bar through reference implementations",
      "Lead design and code reviews; participate directly in incident response and production hardening",
      "Build reusable agent components: task decomposition, tool/function calling, self-critique loops, and multi-agent coordination",
      "Partner with the Research & Innovation Lab on moving new orchestration techniques from prototype into the production platform",
    ],
    preferredQualifications: [
      "Experience with quantum SDKs (Qiskit, Cirq, or PennyLane)",
      "Background in financial services or another regulated, high-stakes domain",
      "Publications, talks, or open-source contributions related to agentic AI systems",
    ],
    posted_at: "2026-07-27",
    active: true,
  },
]

/**
 * Shared, company-wide sections rendered on every job posting — this is
 * what makes even a short role's page run a full page, same as the
 * reference posting: the job-specific content (description, responsibilities,
 * required/preferred qualifications) is genuinely shorter than a full page
 * on its own, but every real corporate posting pads that out with the same
 * "about us" / benefits / compensation philosophy / EEO boilerplate that
 * applies company-wide. Written originally for EDGEX, not copied from any
 * reference posting.
 */
export const COMPANY_BLURB =
  "ALGU Co., operating as EDGEX, engineers full-stack quantum computing systems — custom QPUs across five architectures, cryogenic control systems, a quantum machine learning platform, and the micro-nuclear reactor power modules to run it all without grid dependency. EDGEX is the only quantum computing company that also owns its own power infrastructure, letting clients scale past what a shared cloud QPU allocation can support. More than a dozen engagements span financial services, healthcare, cybersecurity, manufacturing, energy, and government. Learn more about EDGEX's approach to quantum-driven enterprise computing across the rest of this site."

export const BENEFITS: string[] = [
  "401(k) with company match",
  "Medical, dental, and vision insurance",
  "Paid time off and paid sick time",
  "Life and disability insurance",
  "Wellness and mental health resources",
  "Parental leave",
]

export const COMPENSATION_PHILOSOPHY =
  "EDGEX's approach to compensation is straightforward: competitive base pay, meaningful benefits, and the chance to work on problems that don't exist anywhere else yet. The salary range listed for each role reflects the market for that location and level; actual offers account for a candidate's experience, skills, and how their background maps to the role's scope. Employees may also be eligible for additional incentive programs depending on role and division."

export const FINE_PRINT =
  "ALGU Co. (DBA EDGEX) provides equal employment opportunity to all applicants and employees regardless of race, color, religion, sex, national origin, age, sexual orientation, gender identity, disability, protected veteran status, or any other characteristic protected by applicable federal, state, or local law. No third-party recruiting agencies, please."
