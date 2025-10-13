import React, { ReactElement, useState } from 'react';
import { VStack, HStack, Text, Image } from '@chakra-ui/react';
import COLORS from '@/assets/colors';
import Button from '@/components/core/buttons/button';
import { useRouterPages } from '@/utils/router';

enum PageTitle {
  HOME = 'Home',
}

/**
 * Header component that renders the header section of the application.
 * @returns {ReactElement} - The rendered AnonymousHeader component.
 */
export const Header = (): ReactElement => {
  return <AnonymousHeader />;
};

const AnonymousHeader = (): ReactElement => {
  const router = useRouterPages();
  const [pageTitle, setPageTitle] = useState<string>(PageTitle.HOME);

  const handleLogin = (): void => {
    console.log('Login button clicked');
    setPageTitle(PageTitle.HOME);
    router.navigateTo('home');
  };

  const handleDashboard = (): void => {
    console.log('Dashboard button clicked');
    setPageTitle('');
    router.navigateTo('home');
  };

  const handleStatistics = (): void => {
    console.log('Statistics button clicked');
    setPageTitle('');
    router.navigateTo('home');
  };

  return (
    <VStack
      width="100%"
      height="60px"
      backgroundColor={COLORS.website.background}
      justifyContent="center"
      alignItems="center"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
    >
      <HStack justifyContent={'space-between'} width="100%" padding="0 20px">
        <HStack>
          <Image
            src="/assets/chronos-text-logo.png"
            alt="Chronos Text Logo"
            height="40px"
            objectFit="contain"
          />
          <Text>IMG</Text>
        </HStack>
        <HStack>
          <Button
            text="BTN1"
            bgColor={pageTitle === PageTitle.HOME ? COLORS.website.principal : COLORS.default.white}
            bgColorHover={COLORS.website.principal}
            fontColor={pageTitle === PageTitle.HOME ? COLORS.default.white : COLORS.default.black}
            onClick={handleDashboard}
          />
          <Button
            text="BTN2"
            bgColor={pageTitle === PageTitle.HOME ? COLORS.website.principal : COLORS.default.white}
            bgColorHover={COLORS.website.principal}
            fontColor={pageTitle === PageTitle.HOME ? COLORS.default.white : COLORS.default.black}
            onClick={handleStatistics}
          />
          <Button
            text="BTN1"
            bgColor={pageTitle === PageTitle.HOME ? COLORS.website.principal : COLORS.default.white}
            bgColorHover={COLORS.website.principal}
            fontColor={pageTitle === PageTitle.HOME ? COLORS.default.white : COLORS.default.black}
            onClick={handleLogin}
          />
        </HStack>
      </HStack>
    </VStack>
  );
};
