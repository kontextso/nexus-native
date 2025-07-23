import { Message as MessageType } from '@ai-sdk/react';
import { InlineAd } from "@kontextso/sdk-react-native";
import { ScrollView, Text, View } from "react-native";
import { Message } from './Message';

interface BodyProps {
  messages: MessageType[];
  isLoading: boolean;
}

export function Body({ messages, isLoading }: BodyProps) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{ 
          flex: 1,
        }}
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        {messages.filter(m => m.role !== 'system').map((m, i) => (
          <View 
            key={m.id}
            style={{ marginVertical: 8 }}
          >
            <Message 
              message={m}
            />
            <InlineAd
              code="inlineAd"
              messageId={m.id}
              theme="v1-dark"
            />
          </View>
        ))}
        {isLoading && (
          <View style={{ marginVertical: 8 }}>
            <Text>Loading...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}