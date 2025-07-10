import { Message, useChat } from '@ai-sdk/react';
import { AdsProvider } from "@kontextso/sdk-react-native";
import { useState } from 'react';
import { SafeAreaView } from "react-native";
import uuid from 'react-native-uuid';
import { Body } from './Body';
import { Footer } from './Footer';
import { Header } from './Header';
import { roleplayPromptMessage } from './utils';

const API_URL = "https://ads.develop.megabrain.co/nexusai/api";
// const API_URL = "http://localhost:3000/nexusai/api";

const PUBLISHER_TOKEN = "spicybrain-1234"; 

const AD_SERVER_URL = "https://server.develop.megabrain.co";
// const AD_SERVER_URL = "http://localhost:3002";


export function Chat() {
  const [initialMessages] = useState<Message[]>([
    roleplayPromptMessage('Stacy'),
  ]);
  const [userId] = useState<string>(() => uuid.v4() as string);
  const [conversationId] = useState<string>(() => uuid.v4() as string);

  const { messages, setMessages, handleInputChange, handleSubmit, input, isLoading } = useChat({
    api: API_URL,
    initialMessages: initialMessages,
    onResponse: (resp) => {
      console.log('response received');
      resp.text()
      .then((text) => {
        try {
          const data = JSON.parse(text);
          data.createdAt = new Date();
          setMessages((ms => {
            return [...ms, data]
          }));
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
      adServerUrl={AD_SERVER_URL}
      enabledPlacementCodes={["inlineAd"]}
      messages={messages.filter(m => m.role !== 'system')}
      userId={userId}
      publisherToken={PUBLISHER_TOKEN}
      isLoading={isLoading}
      logLevel="debug"
      onAdClick={() => console.log("ad clicked")}
      onAdView={() => console.log("ad viewed")}
      conversationId={conversationId}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Header />
        <Body
          messages={messages}
        />
        <Footer
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </SafeAreaView>
    </AdsProvider>
  );






}
