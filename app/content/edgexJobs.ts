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

export type Job = {
  id: string
  title: string
  department: string
  location: string
  employment_type: string
  role: JobRole
  field: JobField
  summary: string
  description: string
  requirements: string[]
  posted_at: string
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
    title: "QPU Design Engineer",
    department: "Quantum Engineering Division",
    location: "Charlotte, NC (On-site)",
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
    title: "Cryogenic Systems Engineer",
    department: "Quantum Engineering Division",
    location: "Charlotte, NC (On-site)",
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
    title: "Quantum Error Correction Research Scientist",
    department: "Research & Innovation Lab",
    location: "Charlotte, NC (On-site) or Remote (US)",
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
    title: "Quantum Error Correction Engineer",
    department: "Quantum Engineering Division",
    location: "Charlotte, NC (On-site)",
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
    title: "Quantum Software Engineer (QML)",
    department: "Quantum Software Division",
    location: "Remote (US)",
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
    title: "Principal Quantum Algorithms Scientist",
    department: "Research & Innovation Lab",
    location: "Charlotte, NC (On-site) or Remote (US)",
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
    title: "Senior Quantum ML Engineer, Finance",
    department: "Quantum Software Division",
    location: "New York, NY or Remote (US)",
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
    title: "Quantitative Researcher, Quantum Finance",
    department: "Research & Innovation Lab",
    location: "New York, NY",
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
    title: "Quantum Risk Modeling Analyst",
    department: "Quantum Software Division",
    location: "Remote (US)",
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
    title: "Quantum Fraud Detection Data Scientist",
    department: "Quantum Software Division",
    location: "Remote (US)",
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
    title: "Machine Learning Engineer, Anomaly Detection",
    department: "Quantum Software Division",
    location: "Remote (US)",
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
    title: "Nuclear Systems Integration Engineer",
    department: "Advanced Energy Systems Division",
    location: "Charlotte, NC (On-site)",
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
    title: "Enterprise Solutions Consultant",
    department: "Enterprise Solutions Division",
    location: "Remote (US)",
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
]
