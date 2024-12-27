import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignContent: 'center',
    },
    list: { padding: 4 },
    card: {
      backgroundColor: '#f8f8f8',
      borderRadius: 10,
      margin: 10,
      padding: 5,
      elevation: 5,
      flex: 1,
      justifyContent: 'space-between',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: { fontSize: 15, fontWeight: 'bold', },
    wishlistButton: {
      padding: 3,
    },
    wishlistText: {
      fontSize: 18,
      color: '#808080',
      fontWeight: 'bold',
    },
    wishlistTextFilled: {
      color: '#FF6347',
    },
    image: {
      height: 100,
      width: '80%',
      marginVertical: 10,
      alignSelf: 'center',
      borderRadius: 10,
    },
    description: { fontSize: 14, color: '#666', marginBottom: 10, padding: 5 },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    price: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    buyButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      width: 90,
    },
    buyButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
    recentButton: {
      backgroundColor: '#28A745',
      padding: 15,
      position: 'absolute',
      bottom: 40,
      right: 20,
      borderRadius: 15,
    },
    cartButtonText: { color: '#fff', fontWeight: 'bold' },
  });

  
  export default styles;