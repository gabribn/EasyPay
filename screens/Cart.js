import React, { useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const CartScreen = ({ navigation }) => {
  const { cart, setCart } = useCart();
  const [paymentMethodVisible, setPaymentMethodVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleQuantityChange = (productId, operation) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                operation === "increase"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : item.quantity,
            }
          : item
      )
    );
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentMethodVisible(false);
  };

  const renderCartItem = ({ item }) => {
    const totalItemPrice = item.valor * item.quantity;
    return (
      <View style={styles.cartItem}>
        <Image source={item.imagem} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.nome}</Text>
          <Text style={styles.productPrice}>
            R${totalItemPrice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.decreaseButton}
            onPress={() => handleQuantityChange(item.id, "decrease")}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.increaseButton}
            onPress={() => handleQuantityChange(item.id, "increase")}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
          <Text style={styles.removeText}>Remover</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.valor * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <NavBar />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.totalAndPayment}>
          <View style={styles.paymentMethodContainer}>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setPaymentMethodVisible(!paymentMethodVisible)}
            >
              <Text style={styles.buttonText}>
                {selectedPaymentMethod
                  ? `${selectedPaymentMethod}`
                  : paymentMethodVisible
                  ? "Ocultar"
                  : "Método de Pagamento"}
              </Text>
            </TouchableOpacity>
            {paymentMethodVisible && (
              <View style={styles.paymentMethods}>
                <TouchableOpacity
                  onPress={() => handlePaymentMethodSelect("Cartão de Crédito")}
                >
                  <Text style={styles.paymentOption}>Cartão de Crédito</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePaymentMethodSelect("Cartão de Débito")}
                >
                  <Text style={styles.paymentOption}>Cartão de Débito</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePaymentMethodSelect("Pix")}
                >
                  <Text style={styles.paymentOption}>Pix</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total: R${totalPrice.toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                if (cart.length === 0) {
                  Alert.alert(
                    "Carrinho vazio",
                    "Adicione produtos ao carrinho antes de continuar.",
                    [{ text: "OK" }]
                  );
                } else {
                  navigation.navigate("Processing");
                }
              }}
            >
              <Text style={styles.checkoutButtonText}>Ir para Pagamento</Text>
            </TouchableOpacity>
          </View>
        </View>
        {cart.length === 0 ? (
          <Text style={styles.emptyCartText}>O carrinho está vazio</Text>
        ) : (
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.cartList}
          />
        )}
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 18,
    color: "#999",
    marginTop: 20,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    marginRight: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  increaseButton: {
    backgroundColor: "#28a745",
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  decreaseButton: {
    backgroundColor: "#dc3545",
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  removeText: {
    fontSize: 16,
    color: "#FF0000",
  },
  cartList: {
    marginTop: 10,
  },
  totalAndPayment: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  paymentMethodContainer: {
    flex: 1,
    padding: 15,
  },
  totalContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  toggleButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  paymentMethods: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  paymentOption: {
    fontSize: 18,
    marginBottom: 12,
    color: "#333",
    fontWeight: "500",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default CartScreen;
