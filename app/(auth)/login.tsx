import AuthButton from "@/src/components/auth/AuthButton";
import AuthInput from "@/src/components/auth/AuthInput";
import { auth } from "@/src/lib/firebase";
import { saveSession } from "@/src/store/authStore";
import { COLORS, SPACING, TYPO } from "@/src/theme/designSystem";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      await saveSession(email.trim(), password);
    } catch (e: any) {
      const msg =
        e.code === "auth/user-not-found" ? "존재하지 않는 계정이에요." :
        e.code === "auth/wrong-password" || e.code === "auth/invalid-credential" ? "비밀번호가 틀렸어요." :
        e.code === "auth/invalid-email" ? "올바른 이메일 형식이 아니에요." :
        "다시 시도해주세요.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>🍱 반찬 관리</Text>
        <Text style={styles.subtitle}>유통기한을 놓치지 마세요</Text>

        <View style={styles.inputGroup}>
          <AuthInput
            placeholder="이메일"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AuthInput
            placeholder="비밀번호"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AuthButton title="이메일로 로그인" loading={loading} onPress={handleLogin} />
        <AuthButton
          title="계정이 없어요  회원가입"
          variant="ghost"
          onPress={() => router.push("/(auth)/signup")}
          style={styles.ghostBtn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.bg },
  container: { flexGrow: 1, justifyContent: "center", padding: SPACING.lg },
  title: { ...TYPO.title, color: COLORS.text, textAlign: "center", marginBottom: SPACING.sm },
  subtitle: { ...TYPO.body, color: COLORS.subText, textAlign: "center", marginBottom: SPACING.xl },
  inputGroup: { gap: SPACING.sm, marginBottom: SPACING.md },
  error: { ...TYPO.caption, color: COLORS.danger, textAlign: "center", marginBottom: SPACING.sm },
  ghostBtn: { marginTop: SPACING.sm },
});
