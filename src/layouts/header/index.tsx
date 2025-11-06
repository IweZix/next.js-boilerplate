import React, { ReactElement, useState, useEffect } from 'react';
import { VStack, HStack, Text, Image, Box, IconButton } from '@chakra-ui/react';
import COLORS from '@/assets/colors';
import Button from '@/components/core/buttons/button';
import { useRouterPages } from '@/utils/router';
import { t } from 'i18next';
import { tKeys } from '@/localization/tKeys';
import CloseIcon from '@/components/icons/CloseIcon';

enum PageTitle {
  HOME = 'Home',
  ABOUT = 'About',
}

export const Header = (): ReactElement => {
  return <AnonymousHeader />;
};

const AnonymousHeader = (): ReactElement => {
  const router = useRouterPages();
  const [pageTitle, setPageTitle] = useState<string>(PageTitle.HOME);
  const [isShrunk, setIsShrunk] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeNavigation = (): void => {
    setPageTitle(PageTitle.HOME);
    router.navigateTo('home');
    setDrawerOpen(false);
  };

  const handleAboutNavigation = (): void => {
    setPageTitle(PageTitle.HOME);
    router.navigateTo('about');
    setDrawerOpen(false);
  };

  return (
    <VStack
      width="100%"
      height={isShrunk ? '50px' : '80px'}
      backgroundColor={COLORS.website.background}
      justifyContent="center"
      alignItems="center"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
      transition="all 0.3s ease"
    >
      <HStack justifyContent="space-between" width="100%" padding="0 20px">
        {/* Logo */}
        <HStack gap={3}>
          <Image
            // TODO: replace with your logo
            src="/assets/monlogo.png"
            // TODO: replace with your alt text
            alt="Mon Logo"
            height={isShrunk ? '30px' : '45px'}
            objectFit="contain"
            transition="all 0.3s ease"
          />
          <Text fontSize={isShrunk ? 'md' : 'lg'}>IMG</Text>
        </HStack>

        {/* Desktop Buttons */}
        <HStack gap={3} display={{ base: 'none', md: 'flex' }}>
          <Button
            text={t(tKeys.navbar.home)}
            bgColor={pageTitle === PageTitle.HOME ? COLORS.website.principal : COLORS.default.white}
            bgColorHover={COLORS.website.principal}
            fontColor={pageTitle === PageTitle.HOME ? COLORS.default.white : COLORS.default.black}
            onClick={handleHomeNavigation}
          />
          <Button
            text={t(tKeys.navbar.about)}
            bgColor={pageTitle === PageTitle.HOME ? COLORS.website.principal : COLORS.default.white}
            bgColorHover={COLORS.website.principal}
            fontColor={pageTitle === PageTitle.HOME ? COLORS.default.white : COLORS.default.black}
            onClick={handleAboutNavigation}
          />
        </HStack>

        {/* Mobile Burger */}
        <Box display={{ base: 'flex', md: 'none' }}>
          <IconButton
            aria-label="Open menu"
            icon={
              isDrawerOpen ? (
                <CloseIcon size={24} color="#000" />
              ) : (
                <CloseIcon size={24} color="#000" />
              )
            }
            variant="ghost"
            onClick={() => setDrawerOpen(!isDrawerOpen)}
          />
        </Box>
      </HStack>

      {/* Mobile Drawer (simulé sans sous-composants) */}
      {isDrawerOpen && (
        <VStack
          position="absolute"
          top={isShrunk ? '50px' : '80px'}
          left="0"
          width="100%"
          backgroundColor={COLORS.website.background}
          boxShadow="0 4px 8px rgba(0,0,0,0.1)"
          paddingY={4}
          gap={3}
          display={{ base: 'flex', md: 'none' }}
          transition="all 0.3s ease"
        >
          <Button text={t(tKeys.navbar.home)} onClick={handleHomeNavigation} />
          <Button text={t(tKeys.navbar.about)} onClick={handleAboutNavigation} />
        </VStack>
      )}
    </VStack>
  );
};
