import { Message as MessageType } from '@ai-sdk/react';
import { Text, View } from "react-native";
import Markdown from 'react-native-markdown-display';

export function Message({ message }: { message: MessageType }) {
  return (
    <View>
      <Text
        style={{ 
          fontSize: 20,
          fontWeight: 700
        }}
      >
        {message.role}
      </Text>
      <Markdown>
        {message.content}
      </Markdown>
    </View>
  )
}