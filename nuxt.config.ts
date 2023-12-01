export default {
  buildModules: ["@nuxt/typescript-build"],
  css: ["@/globals/globals.css"],

  axios: {
    baseURL: "http://localhost:5000",
  },
  head: {
    link: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOriginIsolated: true,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap",
      },
    ],
  },
};
