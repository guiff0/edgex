import { FC, useState } from "react"
import * as DocumentPicker from "expo-document-picker"
import { View } from "react-native"

import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { EdgexAuthGate } from "@/components/edgex/EdgexAuthGate"
import { EdgexPrimaryButton } from "@/components/edgex/EdgexPrimitives"
import { EdgexIllustration } from "@/components/edgex/EdgexIllustration"
import { EdgexScreenShell } from "@/components/edgex/EdgexScreenShell"
import type { EdgexStackScreenProps } from "@/navigators/edgexNavigationTypes"
import { submitApplication } from "@/services/watermelon/applicationsSync"
import { useSupabaseAuth } from "@/services/supabase/useSupabaseAuth"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

interface EdgexApplyScreenProps extends EdgexStackScreenProps<"EdgexApply"> {}

type SubmitState = "idle" | "submitting" | "done" | "error"

export const EdgexApplyScreen: FC<EdgexApplyScreenProps> = function EdgexApplyScreen({ route, navigation }) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const { jobId } = route.params
  const { session } = useSupabaseAuth()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState(session?.user?.email ?? "")
  const [phone, setPhone] = useState("")
  const [coverNote, setCoverNote] = useState("")
  const [resume, setResume] = useState<DocumentPicker.DocumentPickerAsset | null>(null)
  const [state, setState] = useState<SubmitState>("idle")
  const [error, setError] = useState("")

  const pickResume = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      copyToCacheDirectory: true,
    })
    if (!result.canceled && result.assets?.[0]) {
      setResume(result.assets[0])
    }
  }

  const canSubmit = fullName.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const onSubmit = async () => {
    if (!canSubmit) {
      setError("Please enter your name and a valid email.")
      return
    }
    setError("")
    setState("submitting")
    try {
      await submitApplication({
        jobId,
        fullName,
        email,
        phone,
        coverNote,
        resumeUri: resume?.uri ?? null,
        resumeFileName: resume?.name ?? null,
      })
      setState("done")
    } catch {
      setState("error")
      setError("Something went wrong submitting your application. Please try again.")
    }
  }

  if (state === "done") {
    return (
      <EdgexScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xxl, alignItems: "flex-start" }}>
          <Text
            text="Application received"
            style={{ fontFamily: typography.primary.bold, color: edgex.text, fontSize: 28, marginBottom: spacing.sm }}
          />
          <Text
            text="Thanks — your application was saved and will sync to our team as soon as you're online. We'll follow up by email."
            style={{ color: edgex.textDim, fontSize: 15, lineHeight: 22, marginBottom: spacing.lg }}
          />
          <EdgexPrimaryButton
            text="Back to careers"
            onPress={() => navigation.navigate("EdgexCareers")}
            fontFamily={typography.primary.medium}
          />
        </View>
      </EdgexScreenShell>
    )
  }

  return (
    <EdgexScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl }}>
        <EdgexIllustration variant="careers" height={130} style={{ marginBottom: spacing.lg }} />
      </View>

      <EdgexAuthGate
        onNavigateToSignUp={() => navigation.navigate("EdgexSignUp")}
        title="Sign in to apply"
        subtitle="Applications are tied to your account so we can follow up and so you can track status later."
      >
      <View style={{ paddingHorizontal: spacing.lg }}>
        <Text
          text="APPLY"
          style={{
            fontFamily: typography.primary.medium,
            color: edgex.signal,
            fontSize: 12,
            letterSpacing: 2,
            marginBottom: spacing.sm,
          }}
        />
        <Text
          text="Submit your application"
          style={{ fontFamily: typography.primary.bold, color: edgex.text, fontSize: 28, marginBottom: spacing.lg }}
        />

        <TextField
          label="Full name"
          value={fullName}
          onChangeText={setFullName}
          containerStyle={{ marginBottom: spacing.md }}
          style={{ color: edgex.text }}
          inputWrapperStyle={{ backgroundColor: edgex.surface, borderColor: edgex.hairline }}
          LabelTextProps={{ style: { color: edgex.textDim } }}
          placeholderTextColor={edgex.textDim}
        />
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={{ marginBottom: spacing.md }}
          style={{ color: edgex.text }}
          inputWrapperStyle={{ backgroundColor: edgex.surface, borderColor: edgex.hairline }}
          LabelTextProps={{ style: { color: edgex.textDim } }}
          placeholderTextColor={edgex.textDim}
        />
        <TextField
          label="Phone (optional)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          containerStyle={{ marginBottom: spacing.md }}
          style={{ color: edgex.text }}
          inputWrapperStyle={{ backgroundColor: edgex.surface, borderColor: edgex.hairline }}
          LabelTextProps={{ style: { color: edgex.textDim } }}
          placeholderTextColor={edgex.textDim}
        />
        <TextField
          label="Cover note (optional)"
          value={coverNote}
          onChangeText={setCoverNote}
          multiline
          numberOfLines={4}
          containerStyle={{ marginBottom: spacing.md }}
          style={{ color: edgex.text, minHeight: 90, textAlignVertical: "top" }}
          inputWrapperStyle={{ backgroundColor: edgex.surface, borderColor: edgex.hairline }}
          LabelTextProps={{ style: { color: edgex.textDim } }}
          placeholderTextColor={edgex.textDim}
        />

        <Text
          text="Resume"
          style={{ fontFamily: typography.primary.medium, color: edgex.textDim, fontSize: 13, marginBottom: 6 }}
        />
        <EdgexPrimaryButton
          text={resume ? resume.name : "Choose file (PDF or Word) →"}
          onPress={pickResume}
          fontFamily={typography.primary.medium}
          style={{
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: edgex.steel,
            color: edgex.text,
            marginBottom: spacing.lg,
          }}
        />

        {error ? (
          <Text text={error} style={{ color: edgex.danger, fontSize: 13, marginBottom: spacing.md }} />
        ) : null}

        <EdgexPrimaryButton
          text={state === "submitting" ? "Submitting…" : "Submit application"}
          onPress={onSubmit}
          fontFamily={typography.primary.medium}
          disabled={state === "submitting"}
        />
      </View>
      </EdgexAuthGate>

      <View style={{ height: spacing.xxl }} />
    </EdgexScreenShell>
  )
}
