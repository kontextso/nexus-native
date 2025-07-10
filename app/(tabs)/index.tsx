import { Chat } from '@/components/Chat';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      <Chat />
    </View>
  );
}