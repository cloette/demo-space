interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '11Lc1USJZ9v7S5Jib28bbd7j2TiMcgiD',
  domain: 'app90438451.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
