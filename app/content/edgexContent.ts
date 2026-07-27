export type ContentCard = { title: string; body: string }
export type ContentSection = {
  heading: string
  layout: "cards" | "list"
  items: ContentCard[]
}
export type ContentPage = {
  key: string
  kicker: string
  title: string
  intro: string
  sections: ContentSection[]
}

export const TOP_NAV = [
  { label: "Home", route: "EdgexHome" as const },
  { label: "Products", route: "EdgexProducts" as const },
  { label: "Services", route: "EdgexServices" as const },
  { label: "Technologies", route: "EdgexTechnologies" as const },
  { label: "Industries", route: "EdgexIndustries" as const },
  { label: "Departments", route: "EdgexDepartments" as const },
  { label: "About Us", route: "EdgexAbout" as const },
  { label: "Careers", route: "EdgexCareers" as const },
  { label: "Contact Us", route: "EdgexContact" as const },
]

export const LEFT_MENU = [
  { label: "Quantum Machine Learning", pageKey: "services", anchor: "Quantum Machine Learning (QML)" },
  { label: "Quantum Optimization", pageKey: "services", anchor: "Quantum Optimization" },
  { label: "Quantum Simulation", pageKey: "services", anchor: "Quantum Simulation" },
  { label: "Quantum Security", pageKey: "services", anchor: "Quantum Security" },
  { label: "QPU Design", pageKey: "products", anchor: "EDGEX QPU Series" },
  { label: "QPU Manufacturing", pageKey: "services", anchor: "QPU Custom Engineering" },
  { label: "Cryogenic Systems", pageKey: "products", anchor: "EDGEX Cryogenic Control Systems" },
  { label: "Quantum Cloud Integration", pageKey: "services", anchor: "Quantum Cloud Integration" },
  { label: "Micro-Nuclear Reactor Data Centers", pageKey: "products", anchor: "EDGEX Micro-Nuclear Reactor (MMR) Power Module" },
  { label: "Enterprise Architecture", pageKey: "departments", anchor: "Enterprise Solutions Division" },
  { label: "Compliance & Security", pageKey: "departments", anchor: "Corporate Administration" },
]

export const HOME_CONTENT = {
  eyebrow: "QUANTUM INTELLIGENCE FOR THE ENTERPRISE",
  headline: "Engineering the next era\nof enterprise computation.",
  body: "EDGEX engineers next-generation quantum systems, QML pipelines, custom QPUs, and nuclear-powered data centers for mission-critical workloads.",
  contactEmail: "edgex@algu.net",
  highlights: [
    { title: "5", label: "Divisions" },
    { title: "5", label: "QPU Architectures" },
    { title: "6", label: "Industries Served" },
  ],
}

export const PAGES: Record<string, ContentPage> = {
  products: {
    key: "products",
    kicker: "PRODUCTS",
    title: "Quantum Products Portfolio",
    intro:
      "A full product line spanning software, custom silicon, cryogenic hardware, and the power infrastructure to run it all on-site.",
    sections: [
      {
        heading: "Portfolio",
        layout: "cards",
        items: [
          {
            title: "EDGEX QML Suite",
            body: "Quantum-enhanced machine learning platform for predictive analytics, anomaly detection, and high-dimensional modeling.",
          },
          {
            title: "EDGEX QPU Series",
            body: "Custom-engineered Quantum Processing Units: Superconducting QPU-X, Photonic QPU-P, Trapped-Ion QPU-I, Spin-Qubit QPU-S, and the fault-tolerant Topological QPU-T.",
          },
          {
            title: "EDGEX Cryogenic Control Systems",
            body: "Pulse-level control electronics, RF/microwave systems, and cryogenic infrastructure.",
          },
          {
            title: "EDGEX Micro-Nuclear Reactor (MMR) Power Module",
            body: "20–50 MW modular reactor powering quantum campuses.",
          },
          {
            title: "EDGEX Quantum Data Center Platform",
            body: "Quantum-ready, nuclear-powered, high-density compute facilities.",
          },
        ],
      },
    ],
  },
  services: {
    key: "services",
    kicker: "SERVICES",
    title: "Enterprise Quantum Services",
    intro: "From algorithm design through deployed, compliant infrastructure.",
    sections: [
      {
        heading: "What we run for clients",
        layout: "cards",
        items: [
          { title: "Quantum Machine Learning (QML)", body: "Hybrid quantum-classical pipelines using quantum kernels, variational circuits, and QNNs." },
          { title: "Quantum Optimization", body: "QAOA-based optimization for finance, logistics, manufacturing, and energy." },
          { title: "Quantum Simulation", body: "Molecular modeling, materials science, climate systems, and physics simulations." },
          { title: "Quantum Security", body: "Quantum-resistant cryptography, QKD, and quantum threat detection." },
          { title: "Quantum Cloud Integration", body: "Azure Quantum, AWS Braket, IBM Quantum, and hybrid HPC + QPU orchestration." },
          { title: "QPU Custom Engineering", body: "Design, fabrication, testing, and deployment of custom quantum processors." },
          { title: "Nuclear-Powered Data Center Deployment", body: "MMR integration, safety systems, compliance, and facility architecture." },
        ],
      },
    ],
  },
  technologies: {
    key: "technologies",
    kicker: "TECHNOLOGIES",
    title: "Core Technology Stack",
    intro: "The layers underneath every EDGEX engagement, from algorithm to reactor.",
    sections: [
      {
        heading: "Stack",
        layout: "list",
        items: [
          { title: "Quantum Kernels & SVMs", body: "" },
          { title: "Variational Quantum Circuits (VQC)", body: "" },
          { title: "Quantum Neural Networks (QNN)", body: "" },
          { title: "Quantum Approximate Optimization Algorithms (QAOA)", body: "" },
          { title: "Hybrid Quantum-Classical Transformers", body: "" },
          { title: "Azure Quantum Integration", body: "" },
          { title: "High-performance classical compute", body: "" },
          { title: "Cryogenic systems (10–20 mK)", body: "" },
          { title: "Micro-Nuclear Reactor Systems", body: "" },
          { title: "Quantum-safe cryptography", body: "" },
          { title: "Quantum cloud orchestration", body: "" },
        ],
      },
    ],
  },
  industries: {
    key: "industries",
    kicker: "INDUSTRIES",
    title: "Industry Solutions",
    intro: "Domain-specific applications of the same underlying quantum stack.",
    sections: [
      {
        heading: "Where EDGEX operates",
        layout: "cards",
        items: [
          { title: "Financial Services & Trading", body: "Risk analytics, pricing models, fraud detection, portfolio optimization." },
          { title: "Healthcare & Life Sciences", body: "Diagnostics, drug discovery, genomic pattern recognition, medical imaging." },
          { title: "Cybersecurity & Threat Intelligence", body: "Quantum-resistant encryption, anomaly detection, threat modeling." },
          { title: "Manufacturing & Logistics", body: "Routing, scheduling, predictive maintenance, supply-chain forecasting." },
          { title: "Energy & Climate Science", body: "Materials modeling, grid optimization, climate simulation." },
          { title: "Government & Defense", body: "Secure communications, advanced simulation, strategic analytics." },
        ],
      },
    ],
  },
  departments: {
    key: "departments",
    kicker: "DEPARTMENTS",
    title: "Corporate Structure",
    intro: "Seven divisions covering hardware, software, energy, and delivery.",
    sections: [
      {
        heading: "Divisions",
        layout: "cards",
        items: [
          { title: "Quantum Engineering Division", body: "QPU design, fabrication, cryogenic systems, quantum control electronics." },
          { title: "Quantum Software Division", body: "QML, optimization, simulation, security, cloud integration." },
          { title: "Advanced Energy Systems Division", body: "Micro-nuclear reactor engineering, safety systems, facility integration." },
          { title: "Enterprise Solutions Division", body: "Architecture design, consulting, PoCs, deployment, compliance." },
          { title: "Research & Innovation Lab", body: "Quantum algorithms, materials science, photonics, superconducting research." },
          { title: "Operations & Infrastructure", body: "Data centers, HPC clusters, nuclear-powered quantum campuses." },
          { title: "Corporate Administration", body: "Legal, finance, HR, compliance, governance." },
        ],
      },
    ],
  },
  about: {
    key: "about",
    kicker: "ABOUT US",
    title: "ALGU Co. (DBA EDGEX)",
    intro: "Mission: to engineer quantum systems that transform enterprise intelligence, accelerate computation, and power the next era of technological innovation.",
    sections: [
      {
        heading: "Corporate identity",
        layout: "list",
        items: [
          { title: "Company Name", body: "ALGU Co." },
          { title: "Doing Business As", body: "EDGEX" },
          { title: "Company Number", body: "1617133" },
          { title: "Status", body: "Current Active" },
          { title: "Company Type", body: "Business Corporation – Domestic" },
          { title: "Jurisdiction", body: "North Carolina, United States" },
          { title: "Registered Address", body: "2321 Dundeen St., Charlotte, NC 28216, United States" },
          { title: "Registered Agent", body: "Guiffo, Alex — 2321 Dundeen St., Charlotte, NC 28216, United States" },
          { title: "Directors / Officers", body: "4 officers on file" },
        ],
      },
      {
        heading: "Vision",
        layout: "list",
        items: [
          {
            title: "Vision",
            body: "A world where quantum computing, advanced energy systems, and AI converge to solve humanity's most complex challenges.",
          },
        ],
      },
    ],
  },
  contact: {
    key: "contact",
    kicker: "CONTACT US",
    title: "Corporate Contact",
    intro: "edgex@algu.net · 2321 Dundeen St., Charlotte, NC 28216, USA",
    sections: [],
  },
  leadership: {
    key: "leadership",
    kicker: "COMPANY",
    title: "Leadership",
    intro:
      "ALGU Co. is led by its founder alongside division heads across engineering, software, energy, and enterprise delivery. Full officer and director disclosures are on file with the North Carolina Secretary of State.",
    sections: [
      {
        heading: "Executive",
        layout: "list",
        items: [
          { title: "Alex Guiffo", body: "Founder & Managing Director; Registered Agent" },
        ],
      },
      {
        heading: "Division leadership",
        layout: "list",
        items: [
          { title: "Quantum Engineering Division", body: "QPU design, fabrication, cryogenic systems" },
          { title: "Quantum Software Division", body: "QML, optimization, simulation, security" },
          { title: "Advanced Energy Systems Division", body: "Micro-nuclear reactor engineering" },
          { title: "Enterprise Solutions Division", body: "Architecture, consulting, deployment" },
          { title: "Research & Innovation Lab", body: "Quantum algorithms, materials science, photonics" },
          { title: "Operations & Infrastructure", body: "Data centers, HPC clusters, quantum campuses" },
          { title: "Corporate Administration", body: "Legal, finance, HR, compliance, governance" },
        ],
      },
    ],
  },
  legal: {
    key: "legal",
    kicker: "COMPANY",
    title: "Legal Information",
    intro:
      "ALGU Co. is a registered Business Corporation operating under the trade name EDGEX. This page summarizes the entity's registration status and standard legal terms; contact edgex@algu.net for formal documentation requests.",
    sections: [
      {
        heading: "Registered entity",
        layout: "list",
        items: [
          { title: "Company Name", body: "ALGU Co." },
          { title: "Doing Business As", body: "EDGEX" },
          { title: "Company Number", body: "1617133" },
          { title: "Status", body: "Current Active" },
          { title: "Company Type", body: "Business Corporation – Domestic" },
          { title: "Jurisdiction", body: "North Carolina, United States" },
          { title: "Registered Address", body: "2321 Dundeen St., Charlotte, NC 28216, United States" },
          { title: "Registered Agent", body: "Guiffo, Alex" },
        ],
      },
      {
        heading: "Terms summary",
        layout: "list",
        items: [
          {
            title: "Use of services",
            body: "Engagements with ALGU Co./EDGEX are governed by a signed statement of work or master services agreement; no work is performed outside an agreed contract.",
          },
          {
            title: "Confidentiality",
            body: "Client data, designs, and deployment details are treated as confidential and are not disclosed to third parties without written consent.",
          },
          {
            title: "Intellectual property",
            body: "Custom QPU designs and software delivered under contract are licensed or assigned per the terms of the specific engagement agreement.",
          },
        ],
      },
    ],
  },
  governance: {
    key: "governance",
    kicker: "COMPANY",
    title: "Corporate Governance",
    intro:
      "Governance at ALGU Co. spans regulatory compliance for both quantum technology exports and nuclear-adjacent engineering work, overseen by Corporate Administration.",
    sections: [
      {
        heading: "Governance framework",
        layout: "list",
        items: [
          { title: "Compliance oversight", body: "Corporate Administration division; export control and data-handling compliance review on all client engagements." },
          { title: "Safety review", body: "Independent safety review of MMR (micro-modular reactor) integration work, coordinated with NRC-compliant engineering partners." },
          { title: "Security practices", body: "Quantum-safe cryptography and access controls applied to client data and internal systems." },
          { title: "Ethics", body: "Conflict-of-interest disclosure required for all engagements involving government or defense clients." },
        ],
      },
    ],
  },
  documentation: {
    key: "documentation",
    kicker: "RESOURCES",
    title: "Documentation",
    intro:
      "Technical documentation for EDGEX platforms and APIs. Full developer docs are provided under active client engagements — reach out at edgex@algu.net for access.",
    sections: [
      {
        heading: "Documentation areas",
        layout: "cards",
        items: [
          { title: "EDGEX QML Suite", body: "Pipeline configuration, model deployment, and integration guides." },
          { title: "QPU Series", body: "Device specifications, control electronics interfaces, and calibration procedures." },
          { title: "Quantum Cloud Integration", body: "Setup guides for Azure Quantum, AWS Braket, and IBM Quantum connectivity." },
          { title: "Security & Compliance", body: "Quantum-safe cryptography implementation and compliance documentation." },
        ],
      },
    ],
  },
  "api-access": {
    key: "api-access",
    kicker: "RESOURCES",
    title: "API Access",
    intro:
      "API access to EDGEX's QML and cloud orchestration platforms is provisioned per client engagement, not self-serve — this keeps access scoped to contracted workloads and compliance requirements.",
    sections: [
      {
        heading: "Requesting access",
        layout: "list",
        items: [
          { title: "1. Engagement setup", body: "API access is scoped during onboarding as part of your statement of work." },
          { title: "2. Credential issuance", body: "Enterprise Solutions issues scoped API keys and connection details for your environment." },
          { title: "3. Integration support", body: "Documentation and direct support are provided through the engagement's assigned technical contact." },
        ],
      },
    ],
  },
  whitepapers: {
    key: "whitepapers",
    kicker: "RESOURCES",
    title: "Whitepapers",
    intro: "Technical perspectives from EDGEX's engineering and research teams.",
    sections: [
      {
        heading: "Available whitepapers",
        layout: "cards",
        items: [
          { title: "Hybrid Quantum-Classical Pipelines for Enterprise QML", body: "Architecture patterns for combining variational circuits with classical ML at production scale." },
          { title: "Powering Quantum Campuses with Micro-Modular Reactors", body: "Engineering considerations for pairing MMR power modules with cryogenic HPC facilities." },
          { title: "Quantum-Resistant Cryptography: A Migration Framework", body: "A practical path for enterprises moving from classical to quantum-safe cryptographic standards." },
          { title: "Benchmarking QPU Architectures for Financial Risk Modeling", body: "Comparative performance considerations across superconducting, photonic, and trapped-ion QPUs." },
        ],
      },
    ],
  },
  "case-studies": {
    key: "case-studies",
    kicker: "RESOURCES",
    title: "Case Studies",
    intro:
      "Illustrative engagement profiles showing how EDGEX's stack applies across industries. These are representative scenarios based on our service lines, not disclosures of specific client identities or results.",
    sections: [
      {
        heading: "Representative engagements",
        layout: "cards",
        items: [
          { title: "Financial Services — Portfolio Optimization", body: "QAOA-based optimization applied to a multi-asset portfolio rebalancing workflow, illustrating typical scope for a trading-desk engagement." },
          { title: "Healthcare — Genomic Pattern Recognition", body: "QML-assisted pattern recognition integrated into an existing genomic analysis pipeline as a proof-of-concept engagement." },
          { title: "Manufacturing — Predictive Maintenance", body: "Quantum-enhanced scheduling and predictive maintenance modeling for a multi-site production network." },
          { title: "Energy — Grid Optimization", body: "Quantum simulation applied to grid load-balancing scenarios for a regional energy provider engagement." },
        ],
      },
    ],
  },
  newsroom: {
    key: "newsroom",
    kicker: "RESOURCES",
    title: "Newsroom",
    intro:
      "Company announcements and press coverage will be posted here as they're published. Media inquiries: edgex@algu.net.",
    sections: [],
  },
}

export const FOOTER = {
  columns: [
    {
      heading: "Company",
      items: [
        { label: "About ALGU Co.", route: "EdgexAbout" },
        { label: "Leadership", route: "EdgexLeadership" },
        { label: "Careers", route: "EdgexCareers" },
        { label: "Legal Information", route: "EdgexLegal" },
        { label: "Corporate Governance", route: "EdgexGovernance" },
      ],
    },
    {
      heading: "Solutions",
      items: [
        { label: "Quantum Machine Learning", route: "EdgexServices" },
        { label: "Quantum Optimization", route: "EdgexServices" },
        { label: "QPU Engineering", route: "EdgexProducts" },
        { label: "Nuclear-Powered Data Centers", route: "EdgexProducts" },
        { label: "Quantum Security", route: "EdgexServices" },
      ],
    },
    {
      heading: "Resources",
      items: [
        { label: "Documentation", route: "EdgexDocumentation" },
        { label: "API Access", route: "EdgexApiAccess" },
        { label: "Whitepapers", route: "EdgexWhitepapers" },
        { label: "Case Studies", route: "EdgexCaseStudies" },
        { label: "Newsroom", route: "EdgexNewsroom" },
      ],
    },
    {
      heading: "Legal",
      items: [
        { label: "Company Number: 1617133", route: null },
        { label: "Status: Current Active", route: null },
        { label: "Jurisdiction: North Carolina (US)", route: null },
        { label: "Registered Address: 2321 Dundeen St., Charlotte, NC 28216", route: null },
        { label: "Agent: Guiffo, Alex", route: null },
      ],
    },
  ],
  contactEmail: "edgex@algu.net",
}
