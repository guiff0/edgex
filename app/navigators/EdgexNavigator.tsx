import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { EdgexApplyScreen } from "@/screens/edgex/EdgexApplyScreen"
import { EdgexCareersScreen } from "@/screens/edgex/EdgexCareersScreen"
import { EdgexContentScreen } from "@/screens/edgex/EdgexContentScreen"
import { EdgexHomeScreen } from "@/screens/edgex/EdgexHomeScreen"
import { EdgexJobDetailScreen } from "@/screens/edgex/EdgexJobDetailScreen"
import { EdgexLoginScreen } from "@/screens/edgex/EdgexLoginScreen"
import { EdgexSignUpScreen } from "@/screens/edgex/EdgexSignUpScreen"

import type { EdgexStackParamList } from "./edgexNavigationTypes"

const Stack = createNativeStackNavigator<EdgexStackParamList>()

export function EdgexNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="EdgexHome">
      <Stack.Screen name="EdgexHome" component={EdgexHomeScreen} />

      <Stack.Screen name="EdgexProducts" component={EdgexContentScreen} initialParams={{ pageKey: "products" }} />
      <Stack.Screen name="EdgexServices" component={EdgexContentScreen} initialParams={{ pageKey: "services" }} />
      <Stack.Screen
        name="EdgexTechnologies"
        component={EdgexContentScreen}
        initialParams={{ pageKey: "technologies" }}
      />
      <Stack.Screen
        name="EdgexIndustries"
        component={EdgexContentScreen}
        initialParams={{ pageKey: "industries" }}
      />
      <Stack.Screen
        name="EdgexDepartments"
        component={EdgexContentScreen}
        initialParams={{ pageKey: "departments" }}
      />
      <Stack.Screen name="EdgexAbout" component={EdgexContentScreen} initialParams={{ pageKey: "about" }} />
      <Stack.Screen name="EdgexContact" component={EdgexContentScreen} initialParams={{ pageKey: "contact" }} />

      <Stack.Screen name="EdgexCareers" component={EdgexCareersScreen} />
      <Stack.Screen name="EdgexJobDetail" component={EdgexJobDetailScreen} />
      <Stack.Screen name="EdgexApply" component={EdgexApplyScreen} />

      <Stack.Screen name="EdgexLogin" component={EdgexLoginScreen} />
      <Stack.Screen name="EdgexSignUp" component={EdgexSignUpScreen} />

      <Stack.Screen name="EdgexLeadership" component={EdgexContentScreen} initialParams={{ pageKey: "leadership" }} />
      <Stack.Screen name="EdgexLegal" component={EdgexContentScreen} initialParams={{ pageKey: "legal" }} />
      <Stack.Screen name="EdgexGovernance" component={EdgexContentScreen} initialParams={{ pageKey: "governance" }} />
      <Stack.Screen
        name="EdgexDocumentation"
        component={EdgexContentScreen}
        initialParams={{ pageKey: "documentation" }}
      />
      <Stack.Screen name="EdgexApiAccess" component={EdgexContentScreen} initialParams={{ pageKey: "api-access" }} />
      <Stack.Screen
        name="EdgexWhitepapers"
        component={EdgexContentScreen}
        initialParams={{ pageKey: "whitepapers" }}
      />
      <Stack.Screen
        name="EdgexCaseStudies"
        component={EdgexContentScreen}
        initialParams={{ pageKey: "case-studies" }}
      />
      <Stack.Screen name="EdgexNewsroom" component={EdgexContentScreen} initialParams={{ pageKey: "newsroom" }} />
      <Stack.Screen name="EdgexLearn" component={EdgexContentScreen} initialParams={{ pageKey: "learn" }} />
    </Stack.Navigator>
  )
}
