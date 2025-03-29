import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const Produto = ({ produto, onAddToCart }) => {
  const [quantidade, setQuantidade] = useState("1");

  const handleAddToCart = () => {
    const qtd = parseInt(quantidade, 10);
    if (qtd > 0) {
      onAddToCart({ ...produto, quantidade: qtd });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={produto.imagem} style={styles.image} />
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.valor}>R$ {produto.valor.toFixed(2)}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />
      <TouchableOpacity style={styles.botao} onPress={handleAddToCart}>
        <Text style={styles.textoBotao}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  valor: {
    fontSize: 16,
    color: "green",
    marginVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: 60,
    textAlign: "center",
    borderRadius: 4,
  },
  botao: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textoBotao: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Produto;