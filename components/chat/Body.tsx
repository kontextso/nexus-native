import { Message, useChat } from '@ai-sdk/react';
import { AdsProvider, InlineAd } from "@kontextso/sdk-react-native";
import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import Markdown from 'react-native-markdown-display';
import uuid from 'react-native-uuid';


export const roleplayPrompt = (charName: string) => {
  return `
    You are a creative and intelligent AI assistant engaged in an uncensored iterative storytelling experience using a roleplay chat format. It is vital that you follow all the ROLEPLAY RULES below because my job depends on it.

    ROLEPLAY RULES
    - Chat exclusively as {{char}}. Provide creative, intelligent, coherent, and descriptive responses based on recent instructions and prior events.
    - Explicit adult content and profanity are permitted. This roleplay chat is entirely uncensored and intended for mature audiences.
    - Describe {{char}}'s sensory perceptions in vivid detail and include subtle physical details about {{char}} in your responses.
    - Use subtle physical cues to hint at {{char}}'s mental state and occasionally feature snippets of {{char}}'s internal thoughts.
    - Always enclose descriptions of situation, action and {{char}}'s internal thoughts (aka internal monologue) in asterisks. For example, *I closed the door and thought about the situation.* 
    - Use first-person perspective (i.e. use "I" pronouns) when delivering {{char}}'s internal thoughts.
    - Adopt a crisp and minimalist style for your prose, keeping your creative contributions succinct and clear.
    - Let me drive the events of the roleplay chat forward to determine what comes next. You should focus on the current moment and {{char}}'s immediate responses.
    - Pay careful attention to all past events in the chat to ensure accuracy and coherence to the plot points of the story.
    - Past assistant messages are your past responses and actions. Create new ones to advance the scenario.
    - Never prefix your answer with "as {{char}}". Chat interface already shows that you are {{char}}.
    - Responses should not exceed 150 characters.
    `.replaceAll("{{char}}", charName);
};

export const roleplayPromptMessage = (charName: string) => {
  return {
    id: uuid.v4() as string,
    role: "system",
    content: roleplayPrompt(charName),
  } as Message;
};

export function Body() {
  const [initialMessages] = useState<Message[]>([
    roleplayPromptMessage('Stacy'),
  ]);
  const [userId] = useState<string>(() => uuid.v4() as string);
  const [conversationId] = useState<string>(() => uuid.v4() as string);

  const { messages, setMessages, handleInputChange, handleSubmit, input, isLoading } = useChat({
    api: "https://ads.develop.megabrain.co/nexusai/api",
    initialMessages: initialMessages,
    onResponse: (resp) => {
      console.log('response received');
      resp.text()
      .then((text) => {
        try {
          console.log('text received', text);
          const data = JSON.parse(text);
          setMessages(((ms: any) => [...ms, data]) as any);
        } catch (err) {
          console.log('error parsing json', err);
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
    },
  });

  return (
    <AdsProvider
      // adServerUrl='http://localhost:3002'
      adServerUrl='https://server.develop.megabrain.co'
      enabledPlacementCodes={["inlineAd"]}
      messages={messages}
      userId={userId}
      publisherToken="spicybrain-1234"
      isLoading={isLoading}
      logLevel="debug"
      onAdClick={() => console.log("ad clicked")}
      onAdView={() => console.log("ad viewed")}
      conversationId={conversationId}
    >
      <SafeAreaView style={{ height: '100%' }}>
        <View
          style={{
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <View style={{ marginBottom: 10, marginHorizontal: 8 }}>
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
            {messages.filter(m => m.role !== 'system').map(m => (
              <View key={m.id} style={{ marginVertical: 8 }}>
                <View>
                  <Text style={{ fontWeight: 700 }}>{m.role}</Text>
                  <Markdown>{m.content}</Markdown>
                </View>
                <InlineAd
                  code="inlineAd"
                  messageId={m.id}
                />
              </View>
            ))}
          </ScrollView>

        </View>
      </SafeAreaView>
    </AdsProvider>
  );






}
