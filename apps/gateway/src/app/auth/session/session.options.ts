export const ironOptions = {
  cookieName: 'abc',
  password: '2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8',

  // cookieName: process.env.COOKIE_NAME,
  // password: process.env.COOKE_PWD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  };