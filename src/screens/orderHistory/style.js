import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    card: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: '#f8f8f8',
      borderRadius: 10,
      marginBottom: 10,
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 5,
      marginRight: 10,
    },
    details: { flex: 1 },
    title: { fontSize: 16, fontWeight: 'bold' },
    price: { fontSize: 14, color: '#666', marginVertical: 5 },
    date: { fontSize: 12, color: '#999' },
    emptyText: { textAlign: 'center', color: '#666', marginTop: 20 },
  });

  export default styles;