import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const PaymentConfirmationScreen = ({ navigation }) => {

  const handleGoHome = () => {
    navigation.navigate("Home");
  };

  const handleGenerateReceipt = () => {
    navigation.navigate("Receipt");
  };

  return (
    <View style={styles.container}>
      <NavBar />

      <View style={styles.content}>
        <View style={styles.circle}>
          <Ionicons name="checkmark" size={60} color="#fff" />
        </View>
        <Text style={styles.confirmationText}>Pagamento Confirmado!</Text>

        <TouchableOpacity style={styles.buttonHome} onPress={handleGoHome}>
          <Text style={styles.buttonText}>Voltar para Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonReceipt} onPress={handleGenerateReceipt}>
          <Text style={styles.buttonText}>Gerar Comprovante</Text>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  confirmationText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  buttonHome: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonReceipt: {
    backgroundColor: "#6c757d",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default PaymentConfirmationScreen;
