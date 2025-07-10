import { Message } from '@ai-sdk/react';
import { InlineAd } from "@kontextso/sdk-react-native";
import { ScrollView, Text, View } from "react-native";
import Markdown from 'react-native-markdown-display';

export function Body({ messages }: { messages: Message[] }) {
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
            <View>
              <Text
                style={{ 
                  fontSize: 20,
                  fontWeight: 700
                }}
              >
                {m.role}
              </Text>
              <Markdown>
                {m.content}
              </Markdown>
            </View>
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