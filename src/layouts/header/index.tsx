import React, { ReactElement, useState, useEffect } from 'react';
import { VStack, HStack, Text, Image, Box, IconButton, Stack } from '@chakra-ui/react';
import { t } from 'i18next';
import { tKeys } from '@/localization/tKeys';
import CloseIcon from '@/components/icons/CloseIcon';
import BurgerIcon from '@/components/icons/BurgerIcon';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const MotionVStack = motion(VStack);

export const Header = (): ReactElement => {
  return <WhiteHeader />;
};

const WhiteHeader = (): ReactElement => {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const [isShrunk, setIsShrunk] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (path: string) => {
    router.push(path);
    setDrawerOpen(false);
  };

  return (
    <Stack justify="center" align="center">
      <MotionVStack
        width="90%"
        height={isShrunk ? '60px' : '80px'}
        bg="rgba(255, 255, 255, 0.5)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(0,0,0,0.05)"
        borderRadius={'25px'}
        justify="center"
        align="center"
        position="fixed"
        zIndex="10"
        boxShadow={isShrunk ? '0 2px 12px rgba(0,0,0,0.08)' : 'none'}
        animate={{ height: isShrunk ? '60px' : '80px', opacity: 1 }}
        initial={{ opacity: 0 }}
        marginTop={24}
      >
        <HStack justify="space-between" width="100%" maxW="1200px" px={6} py={2}>
          {/* --- LOGO --- */}
          <HStack gap={3} cursor="pointer" onClick={() => navigate('home')}>
            <Image
              src="/header/myLogo.svg"
              alt="Logo"
              height={isShrunk ? '30px' : '40px'}
              transition="all 0.3s ease"
            />
            <Text
              fontSize={isShrunk ? 'lg' : 'xl'}
              fontWeight="bold"
              color="#1e293b"
              letterSpacing="0.5px"
            >
              Website name
            </Text>
          </HStack>

          {/* --- DESKTOP MENU --- */}
          <HStack gap={8} align="center" display={{ base: 'none', md: 'flex' }}>
            {[
              { title: t(tKeys.navbar.home), routeKey: 'home', path: '/home' },
              { title: t(tKeys.navbar.about), routeKey: 'about', path: '/about' },
            ].map((item) => {
              const active = isActive(item.path);

              return (
                <Box
                  key={item.routeKey}
                  position="relative"
                  cursor="pointer"
                  onClick={() => navigate(item.path)}
                >
                  <Text
                    fontSize="md"
                    fontWeight={active ? '600' : '400'}
                    color={active ? '#2563eb' : '#1e293b'}
                    transition="color 0.3s ease"
                    _hover={{ color: '#2563eb' }}
                  >
                    {item.title}
                  </Text>

                  <Box
                    position="absolute"
                    bottom="-4px"
                    left="0"
                    height="2px"
                    width={active ? '100%' : '0%'}
                    bg="#2563eb"
                    borderRadius="full"
                    transition="width 0.3s ease"
                  />
                </Box>
              );
            })}
          </HStack>

          {/* --- BURGER ICON --- */}
          <Box display={{ base: 'flex', md: 'none' }}>
            <IconButton
              aria-label="Toggle menu"
              variant="ghost"
              onClick={() => setDrawerOpen(!isDrawerOpen)}
            >
              {isDrawerOpen ? (
                <CloseIcon size={24} color="#1e293b" />
              ) : (
                <BurgerIcon size={24} color="#1e293b" />
              )}
            </IconButton>
          </Box>
        </HStack>

        {/* --- MOBILE MENU --- */}
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: isShrunk ? '60px' : '80px',
              left: 0,
              width: '100%',
            }}
          >
            <MotionVStack
              width="100%"
              height={isShrunk ? '100px' : '130px'}
              bg="rgba(255, 255, 255, 0.95)"
              backdropFilter="blur(10px)"
              border="1px solid rgba(0,0,0,0.05)"
              borderRadius={'25px'}
              justify="center"
              align="center"
              position="fixed"
              zIndex="1000"
              boxShadow={isShrunk ? '0 2px 12px rgba(0,0,0,0.08)' : 'none'}
              gap={'24px'}
              marginTop={'12px'}
            >
              {[
                { title: t(tKeys.navbar.home), path: '/home' },
                { title: t(tKeys.navbar.about), path: '/about' },
              ].map((item) => {
                const active = isActive(item.path);

                return (
                  <Box
                    key={item.path}
                    position="relative"
                    cursor="pointer"
                    onClick={() => navigate(item.path)}
                  >
                    <Text
                      fontSize="lg"
                      fontWeight={active ? '600' : '400'}
                      color={active ? '#2563eb' : '#1e293b'}
                      transition="color 0.3s ease"
                      textAlign="center"
                    >
                      {item.title}
                    </Text>

                    <Box
                      position="absolute"
                      bottom="-6px"
                      left="50%"
                      transform="translateX(-50%)"
                      height="2px"
                      width={active ? '100%' : '0%'}
                      bg="#2563eb"
                      borderRadius="full"
                      transition="width 0.3s ease"
                    />
                  </Box>
                );
              })}
            </MotionVStack>
          </motion.div>
        )}
      </MotionVStack>
    </Stack>
  );
};
