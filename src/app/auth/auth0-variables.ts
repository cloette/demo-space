interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID:  process.env.AUTH0_CLIENT_ID || '11Lc1USJZ9v7S5Jib28bbd7j2TiMcgiD',
  domain: process.env.AUTH0_DOMAIN || 'app90438451.auth0.com',
  callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:4200/callback'
};
