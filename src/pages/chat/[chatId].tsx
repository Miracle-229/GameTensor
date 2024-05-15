// pages/chat/[id].tsx

'use client';

import Chat from '@/pages/chat';
import { wrapper } from '@/store/store';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface ChatPageProps {
  chatId: string;
}

export default function ChatPage({ chatId }: ChatPageProps) {
  return <Chat initialDialogId={chatId} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    const { chatId } = context.params!;
    return {
      props: {
        chatId,
      },
    };
  }
);
