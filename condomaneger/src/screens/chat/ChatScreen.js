import React, { useState, useEffect, useCallback } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ()=> {
    const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messagesFirestore = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData
          };

          return data;
        });

        setMessages(messagesFirestore);
      });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text, user } = messages[0];
    firestore()
      .collection('chats')
      .add({
        _id,
        createdAt,
        text,
        user
      });
  }, []);

  return (
    <PaperProvider>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: 'User Test'
        }}
      />
    </PaperProvider>
  );
}
export default ChatScreen;