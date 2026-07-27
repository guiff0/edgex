import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type EdgexStackParamList = {
  EdgexHome: undefined
  EdgexProducts: { pageKey: "products" }
  EdgexServices: { pageKey: "services" }
  EdgexTechnologies: { pageKey: "technologies" }
  EdgexIndustries: { pageKey: "industries" }
  EdgexDepartments: { pageKey: "departments" }
  EdgexAbout: { pageKey: "about" }
  EdgexContact: { pageKey: "contact" }
  EdgexCareers: undefined
  EdgexJobDetail: { jobId: string }
  EdgexApply: { jobId: string }
  EdgexLogin: undefined
  EdgexSignUp: undefined
  EdgexLeadership: { pageKey: "leadership" }
  EdgexLegal: { pageKey: "legal" }
  EdgexGovernance: { pageKey: "governance" }
  EdgexDocumentation: { pageKey: "documentation" }
  EdgexApiAccess: { pageKey: "api-access" }
  EdgexWhitepapers: { pageKey: "whitepapers" }
  EdgexCaseStudies: { pageKey: "case-studies" }
  EdgexNewsroom: { pageKey: "newsroom" }
}

export type EdgexStackScreenProps<T extends keyof EdgexStackParamList> = NativeStackScreenProps<
  EdgexStackParamList,
  T
>
