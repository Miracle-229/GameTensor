/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
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
import { IMessages } from '@/helper/Types/game';

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
  const stompClient = useRef<CompatClient | null>(null);
  const [dataMess, setDataMess] = useState<{
    content: IMessages[];
    pageable: { pageNumber: number };
    totalPages: number;
  }>(messages);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [isMaxHeightReached, setIsMaxHeightReached] = useState(false);
  const [isAddedNewMessage, setIsAddedNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  console.log(data);

  const loadMoreMessages = async () => {
    if (isLoading || isMaxHeightReached) return;
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const response = await dispatch(
      getMessagesAction({ id: currentDialog, page: nextPage })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      const newMessages = response.payload;
      if (newMessages.totalPages !== nextPage - 2) {
        if (containerRef && containerRef.current) {
          setPrevScrollPosition(containerRef.current.scrollHeight);
        }
        setCurrentPage(nextPage);
        setDataMess((prevState) => {
          const uniqueMessages = newMessages.content.filter(
            (newMsg: IMessages) =>
              !prevState.content.some(
                (msg) => msg.messageId === newMsg.messageId
              )
          );
          return {
            ...prevState,
            data: {
              ...prevState,
              content: [...uniqueMessages, ...prevState.content],
            },
          };
        });
      }
    }
    setIsLoading(false);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollTop === 0 && !isLoading) {
      loadMoreMessages();
    }
    if (scrollHeight === clientHeight) {
      setIsMaxHeightReached(true);
    } else {
      setIsMaxHeightReached(false);
    }
  };
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/gametensor');
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      data.forEach((item) => {
        if (stompClient.current) {
          stompClient.current.subscribe(
            `/chat/${item.chatId}`,
            (message: IMessage) => {
              const incomingMessage = JSON.parse(message.body);
              setDataMess((prevState) => {
                const isUnique = !prevState.content.some(
                  (msg) =>
                    msg.date === incomingMessage.date &&
                    msg.user.userId === incomingMessage.user.userId
                );
                setIsAddedNewMessage(true);
                return {
                  ...prevState,
                  content: isUnique
                    ? [incomingMessage, ...prevState.content]
                    : prevState.content,
                };
              });
            }
          );
        } else {
          console.error('STOMP client is not initialized');
        }
      });
    });

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [data]);

  const handleSendMessage = async () => {
    if (newMessageText.trim() !== '') {
      if (stompClient.current) {
        const message = {
          date: new Date().toISOString(),
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
    setDataMess((prevState) => ({
      ...prevState,
      content: [...prevState.content, ...messages.content],
    }));
  }, [messages]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageText(event.target.value);
  };

  useEffect(() => {
    if (isAddedNewMessage)
      if (messagesEndRef && messagesEndRef.current) {
        setIsAddedNewMessage(false);
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  }, [dataMess, isAddedNewMessage]);

  useEffect(() => {
    if (messagesEndRef && messagesEndRef.current) {
      setIsAddedNewMessage(false);
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dataMess, currentDialog]);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight - prevScrollPosition;
    }
  }, [prevScrollPosition]);

  useEffect(() => {
    setCurrentDialog(initialDialogId);
    setCurrentPage(0);
  }, [initialDialogId]);

  useEffect(() => {
    setDataMess({
      content: [],
      pageable: { pageNumber: 0 },
      totalPages: 0,
    });
  }, [currentDialog]);

  useEffect(() => {
    const fetchChats = async () => {
      await dispatch(getChatsAction());
    };
    fetchChats();
  }, [dispatch, currentDialog, dataMess]);

  useEffect(() => {
    const fetchMessages = async () => {
      await dispatch(getMessagesAction({ id: currentDialog }));
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

  const formatterTime = new Intl.DateTimeFormat('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const formatterDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
  let lastDate = '';

  const currentChat = data.find((chatId) => chatId.chatId === currentDialog);

  const isUserBlocked =
    currentChat &&
    currentChat.users.some((userId) => userId.status === 'BLOCKED');

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
            <div
              onScroll={handleScroll}
              ref={containerRef}
              className={styles.messageOutput}
            >
              {dataMess.content
                .slice()
                .reverse()
                .filter((message) => message.chatId === currentDialog)
                .map((message) => {
                  const messageDate = new Date(message.date);
                  const formattedDate = formatterDate.format(messageDate);
                  const showDateHeader = lastDate !== formattedDate;
                  lastDate = formattedDate;
                  return (
                    <>
                      {showDateHeader && (
                        <div className={styles.dateHeader}>
                          <p>{formattedDate}</p>
                        </div>
                      )}
                      <div
                        key={message.messageId}
                        className={styles.messageOutput_box}
                      >
                        {message.user.userId === user.userId ? (
                          <div className={styles.messageOutput_user}>
                            {message.text}
                            <p style={{ fontSize: '10px' }}>
                              {formatterTime.format(new Date(message.date))}
                            </p>
                          </div>
                        ) : (
                          <div className={styles.messageOutput_guest}>
                            {message.text}
                            <p style={{ fontSize: '10px' }}>
                              {formatterTime.format(new Date(message.date))}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })}
              <div ref={messagesEndRef} />
            </div>
            {isUserBlocked ? (
              <div className={styles.blockedMessageBox}>
                <p>This user is blocked</p>
              </div>
            ) : (
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
            )}
          </div>
        )}
      </div>
    </RegistrationLayout>
  );
}

export default Chat;
