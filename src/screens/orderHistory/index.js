import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';

export default function RecentPurchasesScreen() {
  const [recentPurchases, setRecentPurchases] = useState([]);

  useEffect(() => {
    fetchRecentPurchases();
  }, []);

  const fetchRecentPurchases = async () => {
    const purchases = JSON.parse(await AsyncStorage.getItem('purchases')) || [];
    const filteredPurchases = purchases.filter(item => {
      const purchaseDate = new Date(item.purchaseDate);
      const currentDate = new Date();
      const timeDiff = currentDate - purchaseDate;
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      return daysDiff <= 2;
    });
    setRecentPurchases(filteredPurchases);
  };

  const renderPurchaseItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.date}>Purchased on: {new Date(item.purchaseDate).toLocaleDateString()}</Text>
      </View>
    </View>
  );
  
  const getKey = (item) => `${item.id}-${new Date(item.purchaseDate).getTime()}`;
  
  return (
    <SafeAreaView style={styles.container}>
      {recentPurchases.length > 0 ? (
        <FlatList
          data={recentPurchases}
          keyExtractor={getKey}
          renderItem={renderPurchaseItem}
        />
      ) : (
        <Text style={styles.emptyText}>No recent purchases in the last 2 days</Text>
      )}
    </SafeAreaView>
  );
  
}




