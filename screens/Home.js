import React from "react";
import { View, ScrollView, FlatList, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import SearchBar from "../components/Search";
import Product from "../components/Produto";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useCart } from "../context/CartContext";

const produtosDestaque = [
  { id: "1", nome: "Coca-Cola", valor: 6.00, imagem: require("../images/coca.jpg") },
  { id: "2", nome: "Red bull", valor: 12.00, imagem: require("../images/redbull.jpg") },
  { id: "3", nome: "Água Crystal", valor: 4.00, imagem: require("../images/cristal.jpg") },
];

const categorias = [
  { id: "1", nome: "Refrigerantes", imagem: require("../images/refrigerantes.png") },
  { id: "2", nome: "Energéticos", imagem: require("../images/energetico.png") },
  { id: "3", nome: "Águas", imagem: require("../images/agua.png") },
  { id: "4", nome: "Cervejas", imagem: require("../images/cerveja.png") },
];

const produtosMaisVendidos = [
  { id: "4", nome: "Skol Beats", valor: 10.00, imagem: require("../images/skolbeats.png") },
  { id: "5", nome: "Água Crystal", valor: 4.00, imagem: require("../images/cristal.jpg") },
  { id: "6", nome: "Skol", valor: 8.00, imagem: require("../images/skol.jpg") },
];

const HomeScreen = ({ navigation }) => {
  const { addToCart } = useCart();

  const handleSearch = (text) => {
    console.log("Buscando por:", text);
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <SearchBar onSearch={handleSearch} />

        <Text style={[styles.sectionTitle, styles.greenText, styles.leftAlign]}>Produtos em Destaque</Text>
        <FlatList
          data={produtosDestaque}
          renderItem={({ item }) => (
            <Product produto={item} onAddToCart={addToCart} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        />

        <View style={styles.blueBackground}>
          <Text style={[styles.sectionTitle, styles.whiteText, styles.centerAlign]}>Categorias</Text>
          <View style={styles.categoriesContainer}>
            {categorias.map((item) => (
              <TouchableOpacity key={item.id} style={styles.categoryItem}>
                <Image source={item.imagem} style={[styles.categoryImage, { tintColor: 'white' }]} />
                <Text style={styles.categoryText}>{item.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={[styles.sectionTitle, styles.greenText, styles.leftAlign]}>Mais Vendidos</Text>
        <FlatList
          data={produtosMaisVendidos}
          renderItem={({ item }) => (
            <Product produto={item} onAddToCart={addToCart} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        />
      </ScrollView>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  greenText: {
    color: '#28a745',
  },
  whiteText: {
    color: 'white',
  },
  leftAlign: {
    textAlign: "left",
    marginLeft: 10,
  },
  centerAlign: {
    textAlign: "center",
  },
  carousel: {
    marginVertical: 10,
  },
  blueBackground: {
    backgroundColor: '#30c953',
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: "center",
    margin: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 5,
    color: "white",
    textAlign: "center",
  },
});

export default HomeScreen;
