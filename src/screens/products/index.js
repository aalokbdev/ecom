import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fetchProducts from '../../services';
import styles from './style';

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    
    fetchData();
    loadWishlist();
  }, []);

  const fetchData = async () => {
    if(products){
      const savedProducts = JSON.parse(await AsyncStorage.getItem('products')) || [];
      setProducts(savedProducts);
    }
    try {
      setLoading(true);
      const response = await fetchProducts();
      setProducts(response);
      await AsyncStorage.setItem('products', JSON.stringify(response));
      startAnimation();
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadWishlist = async () => {
    const savedWishlist = JSON.parse(await AsyncStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  };

  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleWishlist = async (product) => {
    const updatedWishlist = [...wishlist];
    const productIndex = updatedWishlist.findIndex((item) => item.id === product.id);

    if (productIndex > -1) {
      updatedWishlist.splice(productIndex, 1);
    } else {
      updatedWishlist.push(product);
    }

    await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  const renderProduct = ({ item }) => {
    const isInWishlist = wishlist.some((product) => product.id === item.id);

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {item.title.length > 18 ? `${item.title.slice(0, 15)}` : item.title}
          </Text>
          <TouchableOpacity
            onPress={() => handleWishlist(item)}
            style={styles.wishlistButton}>
            <Text style={[styles.wishlistText, isInWishlist && styles.wishlistTextFilled]}>
              {isInWishlist ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <Text style={styles.description}>
          {item.description.length > 70 ? `${item.description.slice(0, 70)}...` : item.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => purchaseProduct(item)}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const purchaseProduct = async (product) => {
    const purchases = JSON.parse(await AsyncStorage.getItem('purchases')) || [];
    const purchaseData = { ...product, quantity: 1, purchaseDate: new Date().toISOString(), };
    const updatedPurchases = [purchaseData, ...purchases ];
    await AsyncStorage.setItem('purchases', JSON.stringify(updatedPurchases));
    Alert.alert("Item purchased",`Find it in recent purchases`, [
       {text: 'OK',},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.list}
          numColumns={2}
        />
      ) : (
        <Text style={{textAlign:'center'}}>No Products Found</Text>
      )}

      <TouchableOpacity
        style={styles.recentButton}
        onPress={() => navigation.navigate('RecentPurchasesScreen')}>
        <Text style={styles.cartButtonText}>Go to Recent Purchase</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

