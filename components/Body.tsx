import { Message as MessageType } from '@ai-sdk/react';
import { InlineAd } from "@kontextso/sdk-react-native";
import { ScrollView, View } from "react-native";
import { Message } from './Message';


export function Body({ messages }: { messages: MessageType[] }) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{ 
          flex: 1 
        }}
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        {messages.filter(m => m.role !== 'system').map(m => (
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
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}