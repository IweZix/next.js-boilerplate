import { tKeys } from '@/localization/tKeys';
import { t } from 'i18next';
import { pages } from 'next/dist/build/templates/app-page';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export interface RouterPages {
  home: string;
  about: string;
}

const ROUTER_PAGES: RouterPages = {
  home: '/',
  about: '/about',
};
export const ROUTER_PAGES_TITLES = {
  home: t(tKeys.navbar.home),
  about: t(tKeys.navbar.about),
};

export const useRouterPages = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<keyof RouterPages>('home');

  // Synchronisation automatique avec la route actuelle
  useEffect(() => {
    const page = (Object.keys(ROUTER_PAGES) as Array<keyof RouterPages>).find(
      (key) => ROUTER_PAGES[key] === router.pathname
    );
    if (page) setCurrentPage(page);
  }, [router.pathname]);

  const navigateTo = (route: keyof RouterPages) => {
    setCurrentPage(route);
    router.push(ROUTER_PAGES[route]);
  };

  const replaceWith = (route: keyof RouterPages) => {
    setCurrentPage(route);
    router.replace(ROUTER_PAGES[route]);
  };

  const navigateToCustom = (path: string) => {
    setCurrentPage(path as keyof RouterPages);
    router.push(path);
  };

  return {
    navigateTo,
    replaceWith,
    navigateToCustom,
    currentPage,
    pages: ROUTER_PAGES,
    pagesTitles: ROUTER_PAGES_TITLES,
    router,
  };
};
