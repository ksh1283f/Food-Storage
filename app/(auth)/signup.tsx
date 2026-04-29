import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import AuthButton from "@/src/components/auth/AuthButton";
import AuthInput from "@/src/components/auth/AuthInput";
import { auth } from "@/src/lib/firebase";
import { COLORS, SPACING, TYPO } from "@/src/theme/designSystem";

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("오류", "이메일과 비밀번호를 입력해주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert("오류", "비밀번호가 일치하지 않아요.");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (e: any) {
      const msg =
        e.code === "auth/email-already-in-use" ? "이미 사용 중인 이메일이에요." :
        e.code === "auth/weak-password" ? "비밀번호는 6자 이상이어야 해요." :
        e.code === "auth/invalid-email" ? "이메일 형식이 올바르지 않아요." :
        "다시 시도해주세요.";
      Alert.alert("오류", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>회원가입</Text>

        <View style={styles.inputGroup}>
          <AuthInput
            placeholder="이메일"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <AuthInput
            placeholder="비밀번호 (6자 이상)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <AuthInput
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
          />
        </View>

        <AuthButton title="가입하기" loading={loading} onPress={handleSignUp} />
        <AuthButton
          title="이미 계정이 있어요  로그인"
          variant="ghost"
          onPress={() => router.back()}
          style={styles.ghostBtn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.bg },
  container: { flexGrow: 1, justifyContent: "center", padding: SPACING.lg },
  title: { ...TYPO.title, color: COLORS.text, marginBottom: SPACING.xl },
  inputGroup: { gap: SPACING.sm, marginBottom: SPACING.md },
  ghostBtn: { marginTop: SPACING.sm },
});
