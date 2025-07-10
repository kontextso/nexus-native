import { Text, View } from "react-native";

export function Header() {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#ccc',
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Nexus AI</Text>
    </View>
  );
}