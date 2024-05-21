export const config = {
  IS_DEV: process.env.NODE_ENV !== "production",
  API_URL: process.env.API_URL || "/",
  API_KEY: process.env.API_KEY || "",
  BASE_URL: process.env.BASE_URL || "/",
};
