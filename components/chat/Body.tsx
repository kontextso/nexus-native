import { useChat } from '@ai-sdk/react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";

/*
  initialMessages: [
    roleplayPromptMessage('John'),
    assistantMessage as Message
  ],
*/

export function Body() {
  const { messages, setMessages, handleInputChange, handleSubmit, input } = useChat({
    api: "https://ads.megabrain.co/nexusai/api",
    initialMessages: [
      {
        id: 'system-id-1',
        role: 'assistant',
        content: 'Geenerate random content.'
      }
    ],
    onResponse: (resp) => {
      resp.json().then((data) => {
        setMessages(((ms: any) => [...ms, data]) as any);
      });
    },
  });

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View
        style={{
          height: '95%',
          display: 'flex',
          flexDirection: 'column',
          paddingHorizontal: 8,
        }}
      >

        <View style={{ marginTop: 8 }}>
          <TextInput
            style={{ 
              backgroundColor: 'white', 
              padding: 8, 
              borderRadius: 8, 
              borderWidth: 1, 
              borderColor: 'black' 
            }}
            placeholder="Say something..."
            value={input}
            onChange={e =>
              handleInputChange({
                ...e,
                target: {
                  ...e.target,
                  value: e.nativeEvent.text,
                },
              } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            onSubmitEditing={e => {
              handleSubmit(e);
              e.preventDefault();
            }}
            autoFocus={true}
          />
        </View>

        <ScrollView>
          {messages.map(m => (
            <View key={m.id} style={{ marginVertical: 8 }}>
              <View>
                <Text style={{ fontWeight: 700 }}>{m.role}</Text>
                <Text>{m.content}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );






}
