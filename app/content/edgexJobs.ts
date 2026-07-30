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
    posted_at: "2026-07-01",
    active: true,
  },
  {
    id: "cryogenic-systems-engineer",
    jobIdentification: "EDGX-2026-01187",
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
    posted_at: "2026-06-15",
    active: true,
  },
  {
    id: "quantum-error-correction-scientist",
    jobIdentification: "EDGX-2026-01256",
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
    posted_at: "2026-07-10",
    active: true,
  },
  {
    id: "error-correction-engineer",
    jobIdentification: "EDGX-2026-01261",
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
    posted_at: "2026-07-05",
    active: true,
  },
  {
    id: "quantum-software-engineer-qml",
    jobIdentification: "EDGX-2026-01309",
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
    posted_at: "2026-07-08",
    active: true,
  },
  {
    id: "principal-quantum-algorithms-scientist",
    jobIdentification: "EDGX-2026-01198",
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
    posted_at: "2026-06-28",
    active: true,
  },
  {
    id: "senior-quantum-ml-engineer-finance",
    jobIdentification: "EDGX-2026-01334",
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
    posted_at: "2026-07-12",
    active: true,
  },
  {
    id: "quantitative-researcher-quantum-finance",
    jobIdentification: "EDGX-2026-01102",
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
    posted_at: "2026-06-20",
    active: true,
  },
  {
    id: "quantum-risk-modeling-analyst",
    jobIdentification: "EDGX-2026-01358",
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
    posted_at: "2026-07-14",
    active: true,
  },
  {
    id: "quantum-fraud-detection-data-scientist",
    jobIdentification: "EDGX-2026-01372",
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
    posted_at: "2026-07-16",
    active: true,
  },
  {
    id: "ml-engineer-anomaly-detection",
    jobIdentification: "EDGX-2026-01381",
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
    posted_at: "2026-07-18",
    active: true,
  },
  {
    id: "nuclear-systems-engineer",
    jobIdentification: "EDGX-2026-00987",
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
    posted_at: "2026-06-20",
    active: true,
  },
  {
    id: "enterprise-solutions-consultant",
    jobIdentification: "EDGX-2026-01366",
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
