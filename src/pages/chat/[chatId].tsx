import Chat from '@/pages/chat';
import { wrapper } from '@/store/store';

interface ChatPageProps {
  chatId: string;
}

export default function ChatPage({ chatId }: ChatPageProps) {
  return <Chat initialDialogId={chatId} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    const { role } = context.req.cookies;
    const { chatId } = context.params!;
    if (!role) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    if (role === 'ROLE_ADMIN') {
      return {
        redirect: {
          destination: '/admin/block',
          permanent: false,
        },
      };
    }
    return {
      props: {
        chatId,
      },
    };
  }
);
