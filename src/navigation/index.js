import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductListScreen from '../screens/products/index';
import RecentPurchasesScreen from "../screens/orderHistory/index"

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductList"
      >
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{title: 'Product Screen',  headerTitleAlign: "center",}}
          
        />
         <Stack.Screen
          name="RecentPurchasesScreen"
          component={RecentPurchasesScreen}
          options={{title: 'Recent Purchase', headerTitleAlign: "center",}}
          screenOptions={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
