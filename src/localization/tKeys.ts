export const tKeys = {
  common: {
    errors: {
      required: 'common.errors.required',
    },
    back: 'common.back',
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
    detail: {
      header: 'users.detail.header',
      identityTitle: 'users.detail.identityTitle',
      roleTitle: 'users.detail.roleTitle',
      firstNameLabel: 'users.detail.firstNameLabel',
      lastNameLabel: 'users.detail.lastNameLabel',
      emailLabel: 'users.detail.emailLabel',
      notProvided: 'users.detail.notProvided',
      createdAt: 'users.detail.createdAt',
      lastSignIn: 'users.detail.lastSignIn',
      neverSignedIn: 'users.detail.neverSignedIn',
      active: 'users.detail.active',
      inactive: 'users.detail.inactive',
      roles: {
        admin: {
          label: 'users.detail.roles.admin.label',
          description: 'users.detail.roles.admin.description',
        },
        manager: {
          label: 'users.detail.roles.manager.label',
          description: 'users.detail.roles.manager.description',
        },
        user: {
          label: 'users.detail.roles.user.label',
          description: 'users.detail.roles.user.description',
        },
      },
    },
  },
  pagination: {
    previous: 'pagination.previous',
    next: 'pagination.next',
    pageOf: 'pagination.pageOf',
  },
} as const;
