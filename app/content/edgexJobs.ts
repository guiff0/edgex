export type Job = {
  id: string
  title: string
  department: string
  location: string
  employment_type: string
  summary: string
  description: string
  requirements: string[]
  posted_at: string
  active: boolean
}

/**
 * Local seed data. EdgexCareersScreen tries the synced `jobs` table first
 * (via PowerSync/Supabase) and falls back to this list when that table is
 * empty or unreachable — so Careers still works before the backend is wired
 * up, and offline.
 */
export const SEED_JOBS: Job[] = [
  {
    id: "qpu-design-engineer",
    title: "QPU Design Engineer",
    department: "Quantum Engineering Division",
    location: "Charlotte, NC (On-site)",
    employment_type: "Full-time",
    summary: "Architect superconducting and photonic qubit designs for the QPU-X and QPU-P product lines.",
    description:
      "You'll work across coherence, gate-error, and connectivity tradeoffs for EDGEX's custom QPU lines, partnering with fabrication and cryogenics to take designs from simulation to shipped hardware.",
    requirements: [
      "Graduate degree in physics, EE, or related field",
      "Experience with superconducting or photonic qubit architectures",
      "Familiarity with cryogenic system constraints",
    ],
    posted_at: "2026-07-01",
    active: true,
  },
  {
    id: "quantum-software-engineer",
    title: "Quantum Software Engineer (QML)",
    department: "Quantum Software Division",
    location: "Remote (US)",
    employment_type: "Full-time",
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
    id: "nuclear-systems-engineer",
    title: "Nuclear Systems Integration Engineer",
    department: "Advanced Energy Systems Division",
    location: "Charlotte, NC (On-site)",
    employment_type: "Full-time",
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
