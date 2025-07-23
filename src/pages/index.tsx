import COLORS from '@/assets/colors';
import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Spiral } from 'ldrs/react';
import 'ldrs/react/Spiral.css';

export default function Home() {
  // Router
  const router = useRouter();

  // useEffect
  useEffect(() => {
    router.replace('/home');
  }, [router]);

  return (
    <VStack
      backgroundColor={COLORS.website.background}
      color={COLORS.default.white}
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Spiral size="80" speed="0.9" color="white" />
    </VStack>
  );
}
