import React, { ReactElement, useState, useEffect } from 'react';
import { VStack, HStack, Text, Image, Box, IconButton } from '@chakra-ui/react';
import Button from '@/components/core/buttons/button';
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
    <MotionVStack
      width="100%"
      height={isShrunk ? '60px' : '80px'}
      bg="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(10px)"
      borderBottom="1px solid rgba(0,0,0,0.05)"
      justify="center"
      align="center"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
      boxShadow={isShrunk ? '0 2px 12px rgba(0,0,0,0.08)' : 'none'}
      animate={{ height: isShrunk ? '60px' : '80px', opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <HStack justify="space-between" width="100%" maxW="1200px" px={6} py={2}>
        {/* --- LOGO --- */}
        <HStack gap={3} cursor="pointer" onClick={() => navigate('home')}>
          <Image
            src="/header/ln.svg"
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
            Luca Nicolas
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
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ width: '100%' }}
        >
          <VStack
            bg="rgba(255, 255, 255, 0.95)"
            backdropFilter="blur(12px)"
            py={4}
            borderTop="1px solid rgba(0,0,0,0.05)"
            gap={3}
          >
            <Button text={t(tKeys.navbar.home)} onClick={() => navigate('home')} />

            <Button text={t(tKeys.navbar.about)} onClick={() => navigate('about')} />
          </VStack>
        </motion.div>
      )}
    </MotionVStack>
  );
};
