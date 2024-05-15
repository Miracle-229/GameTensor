/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Link from 'next/link';
import styles from '@/styles/Chat.module.scss';
import { FaTelegramPlane } from 'react-icons/fa';
import RegistrationLayout from '@/layouts/RegistrationLayout';
import { getChatsAction } from '@/store/getChats/getChatsThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { chatsData } from '@/store/getChats/getChatsSelector';
import { createMessageAction } from '@/store/createMessage/createMessageThunk';
import { getCurrentUserAction } from '@/store/currentUser/currentUserThunk';
import { getNotifCountAction } from '@/store/getNotifCount/getNotifCountThunk';
import { messagesData } from '@/store/getMessages/getMessagesSelector';
import { getMessagesAction } from '@/store/getMessages/getMessagesThunk';
import { currentUserData } from '@/store/currentUser/currentUserSelector';

interface ChatProps {
  initialDialogId: string;
}

function Chat({ initialDialogId }: ChatProps) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(currentUserData);
  const data = useSelector(chatsData);
  const messages = useSelector(messagesData);
  const [currentDialog, setCurrentDialog] = useState<string>(initialDialogId);
  const containerRef = useRef<HTMLDivElement>(null);
  const [newMessageText, setNewMessageText] = useState<string>('');
  const stompClient = useRef<any>(null);
  const [dataMess, setDataMess] = useState(messages);

  console.log(dataMess);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const offsetAbs = Math.abs(offset);
    const offsetHours = Math.floor(offsetAbs / 60);
    const offsetMinutes = offsetAbs % 60;
    const offsetSign = offset < 0 ? '+' : '-';
    const offsetString = `${offsetSign}${offsetHours
      .toString()
      .padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;
    return date.toISOString().replace('Z', offsetString);
  }

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/gametensor');
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, (frame) => {
      // Подписываемся на каждый диалог
      data.forEach((item) => {
        stompClient.current.subscribe(
          `/chat/${item.chatId}`,
          async (message) => {
            const incomingMessage = JSON.parse(message.body);
            console.log('Received:', incomingMessage);
            setDataMess((prevMessages) => [...prevMessages, incomingMessage]);
          }
        );
      });
    });

    return () => {
      stompClient.current.deactivate();
    };
  }, [data]);

  const handleSendMessage = async () => {
    if (newMessageText.trim() !== '') {
      if (stompClient.current) {
        const message = {
          date: new Date().toLocaleTimeString(),
          user: {
            userId: user.userId,
          },
          chatId: currentDialog,
          text: newMessageText,
        };
        stompClient.current.publish({
          destination: `/chat/${currentDialog}`,
          body: JSON.stringify(message),
        });
      }
      await dispatch(
        createMessageAction({ id: currentDialog, text: newMessageText })
      );
      setNewMessageText('');
    }
  };

  useEffect(() => {
    setDataMess(messages);
  }, [messages]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageText(event.target.value);
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [containerRef, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [currentDialog]);

  useEffect(() => {
    setCurrentDialog(initialDialogId);
  }, [initialDialogId]);

  useEffect(() => {
    const fetchChats = async () => {
      await dispatch(getChatsAction());
    };
    fetchChats();
  }, [dispatch, currentDialog, dataMess]);

  useEffect(() => {
    const fetchMessages = async () => {
      await dispatch(getMessagesAction(currentDialog));
    };
    fetchMessages();
  }, [dispatch, currentDialog]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await dispatch(getCurrentUserAction());
    };
    fetchCurrentUser();
  }, [dispatch, currentDialog]);
  useEffect(() => {
    const fetchNotifCount = async () => {
      await dispatch(getNotifCountAction());
    };
    fetchNotifCount();
  }, [dispatch]);

  return (
    <RegistrationLayout title="Chat">
      <div className={styles.chatContainer}>
        {data.length > 0 ? (
          <div className={styles.dialogList}>
            {data.map((item) => (
              <Link href={`/chat/${item.chatId}`} key={item.chatId}>
                <div
                  className={
                    item.chatId === currentDialog
                      ? styles.activeDialog
                      : styles.dialog
                  }
                >
                  <span>{item.name}</span>
                  <div className={styles.lastMessage}>
                    {item.lastMessage && item.lastMessage.text
                      ? item.lastMessage.text.length > 12
                        ? `${item.lastMessage.text.slice(0, 12)}...`
                        : item.lastMessage.text
                      : ''}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>You haven't started any dialog yet.</div>
        )}
        {currentDialog !== undefined && (
          <div className={styles.messageArea}>
            <div ref={containerRef} className={styles.messageOutput}>
              {dataMess
                .slice()
                .reverse()
                .map((message) => (
                  <div key={message.date} className={styles.messageOutput_box}>
                    {message.user.userId === user.userId ? (
                      // Если сообщение от текущего пользователя
                      <div className={styles.messageOutput_user}>
                        {message.text}
                      </div>
                    ) : (
                      // Если сообщение от другого пользователя
                      <div className={styles.messageOutput_guest}>
                        {message.text}
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className={styles.messageBox}>
              <input
                value={newMessageText}
                onChange={handleInputChange}
                type="text"
                placeholder="Write message"
                onKeyUp={handleKeyUp}
              />
              <button type="button" onClick={handleSendMessage}>
                <FaTelegramPlane size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
      {/* <WebSocketComponent chatsData={data} initialDialogId={initialDialogId} /> */}
    </RegistrationLayout>
  );
}

export default Chat;
