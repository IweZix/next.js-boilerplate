import { useRouter } from 'next/router';

export interface RouterPages {
  home: string;
  about: string;
}

const ROUTER_PAGES: RouterPages = {
  home: '/',
  about: '/about',
};

export const useRouterPages = () => {
  const router = useRouter();

  const navigateTo = (route: keyof RouterPages) => {
    router.push(ROUTER_PAGES[route]);
  };

  const replaceWith = (route: keyof RouterPages) => {
    router.replace(ROUTER_PAGES[route]);
  };

  const navigateToCustom = (path: string) => {
    router.push(path);
  };

  return {
    navigateTo,
    replaceWith,
    navigateToCustom,
    pages: ROUTER_PAGES,
    router,
  };
};
