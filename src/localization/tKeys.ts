export const tKeys = {
  common: {
    errors: {
      required: 'common.errors.required',
    },
  },
  navbar: {
    home: 'navbar.home',
  },
  homepage: {
    title: 'homepage.title',
  },
  login: {
    title: 'login.title',
    emailLabel: 'login.emailLabel',
    passwordLabel: 'login.passwordLabel',
    submit: 'login.submit',
    emailInvalid: 'login.emailInvalid',
    invalidCredentials: 'login.invalidCredentials',
  },
  dashboard: {
    title: 'dashboard.title',
    welcome: 'dashboard.welcome',
    role: 'dashboard.role',
    noRole: 'dashboard.noRole',
    logout: 'dashboard.logout',
  },
  sidebar: {
    nav: {
      dashboard: 'sidebar.nav.dashboard',
      users: 'sidebar.nav.users',
      settings: 'sidebar.nav.settings',
    },
    comingSoon: 'sidebar.comingSoon',
    menu: 'sidebar.menu',
  },
  users: {
    title: 'users.title',
    accessDenied: 'users.accessDenied',
    columns: {
      email: 'users.columns.email',
      name: 'users.columns.name',
      role: 'users.columns.role',
    },
  },
  pagination: {
    previous: 'pagination.previous',
    next: 'pagination.next',
    pageOf: 'pagination.pageOf',
  },
} as const;
