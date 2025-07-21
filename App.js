import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//telas
import HomeScreen from './screens/Home';
import CartScreen from './screens/Cart';
import PaymentConfirmationScreen from './screens/PaymentConfirmationScreen';
import Processing from './screens/Processing';

//context
import { CartProvider } from './context/CartContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{headerShown: false}}
          />
          <Stack.Screen
          name="PaymentConfirmationScreen"
          component={PaymentConfirmationScreen}
          options={{headerShown: false}}
          />
          <Stack.Screen
          name="Processing"
          component={Processing}
          options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
