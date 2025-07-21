import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Processing = ({ navigation }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  return (
    <View style={styles.container}>
      <NavBar />

      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Ionicons name="card" size={80} color="#007bff" />
        </Animated.View>
        <Text style={styles.waitText}>Aguardando inserção do cartão...</Text>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#e6f0ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  waitText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Processing;
