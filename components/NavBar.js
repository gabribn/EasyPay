import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NavBar = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../images/pagamento.png')} 
        style={[styles.image, { tintColor: 'white' }]}
      />
      <Text style={[styles.text, { fontStyle: 'italic' }]}>EasyPay</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    padding: 10,
    backgroundColor: '#28a745',
  },
  image: {
    width: 40,
    height: 40, 
    marginRight: 10, 
  },
  text: {
    fontSize: 24, 
    fontWeight: '400', 
    color: '#fff',
  },
});

export default NavBar;
