import React, { ReactElement, useState, useEffect } from 'react';
import { VStack, HStack, Text, Image, Box, IconButton, Stack } from '@chakra-ui/react';
import { useRouterPages } from '@/utils/router';
import { t } from 'i18next';
import { tKeys } from '@/localization/tKeys';
import CloseIcon from '@/components/icons/CloseIcon';
import BurgerIcon from '@/components/icons/BurgerIcon';
import { motion } from 'framer-motion';

const MotionVStack = motion(VStack);

export const Header = (): ReactElement => {
  return <WhiteHeader />;
};

const WhiteHeader = (): ReactElement => {
  const router = useRouterPages();

  const isActive = (route: string) => {
    switch (route) {
      case router.navbarPages.home:
        return router.router.pathname === router.pages.home;
      case router.navbarPages.about:
        return router.router.pathname === router.pages.about;
      default:
        return false;
    }
  };

  const [isShrunk, setIsShrunk] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (route: keyof typeof router.pages) => {
    router.navigateTo(route);
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
        zIndex="1000"
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
              { title: t(tKeys.navbar.home), routeKey: 'home', path: router.pages.home },
              { title: t(tKeys.navbar.about), routeKey: 'about', path: router.pages.about },
            ].map((item) => {
              const active = isActive(item.path);

              return (
                <Box
                  key={item.routeKey}
                  position="relative"
                  cursor="pointer"
                  onClick={() => navigate(item.routeKey as keyof typeof router.pages)}
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
                { title: t(tKeys.navbar.home), routeKey: 'home', path: router.pages.home },
                { title: t(tKeys.navbar.about), routeKey: 'about', path: router.pages.about },
              ].map((item) => {
                const active = isActive(item.path);

                return (
                  <Box
                    key={item.routeKey}
                    position="relative"
                    cursor="pointer"
                    onClick={() => navigate(item.routeKey as keyof typeof router.pages)}
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
