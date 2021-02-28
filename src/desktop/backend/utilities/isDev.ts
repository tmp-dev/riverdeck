const isDev = process.env.ELECTRON_ENV
  ? process.env.ELECTRON_ENV === "development"
  : false;

export default isDev;
