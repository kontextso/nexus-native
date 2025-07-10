import React from 'react';
import { Button, TextInput, View } from 'react-native';

interface FooterProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Footer({ input, handleInputChange, handleSubmit }: FooterProps) {
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row', // Arrange input and button horizontally
        alignItems: 'center',
      }}
    >
      <TextInput
        style={{
          flex: 1, // Takes up remaining space
          backgroundColor: 'white',
          padding: 8,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: 'black',
          marginRight: 8, // spacing between input and button
        }}
        placeholder="Say something"
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
        onSubmitEditing={(e: any) => {
          handleSubmit(e);
          e.preventDefault();
        }}
        autoFocus={true}
      />
      <Button title="Submit" onPress={e => handleSubmit(e as any)} />
    </View>
  );
}
