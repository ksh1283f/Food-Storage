import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../src/lib/firebase";
import { COLORS, SPACING, TYPO } from "../src/theme/designSystem";

WebBrowser.maybeCompleteAuthSession();

const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
const ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

export default function LoginScreen() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(() => {
        Alert.alert("로그인 실패", "다시 시도해주세요.");
      });
    } else if (response?.type === "error") {
      Alert.alert("로그인 실패", "다시 시도해주세요.");
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍱 반찬 관리</Text>
      <Text style={styles.subtitle}>로그인하고 반찬을 관리하세요</Text>

      <TouchableOpacity
        style={[styles.button, !request && styles.buttonDisabled]}
        onPress={() => promptAsync()}
        disabled={!request}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Google로 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  title: { ...TYPO.title, color: COLORS.text, marginBottom: SPACING.sm },
  subtitle: { ...TYPO.body, color: COLORS.subText, marginBottom: SPACING.xl },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { ...TYPO.subtitle, color: "#fff" },
});
