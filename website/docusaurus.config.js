module.exports = {
  title: "atipicial-js",
  tagline: "JS SDK for ATIPICIAL blockchain",
  url: "https://docs.coz.io",
  baseUrl: "/atipicial/atipicial-js/",
  organizationName: "atipicial",
  projectName: "atipicial-js",
  scripts: [
    "https://buttons.github.io/buttons.js",
    // "https://unpkg.com/@atipicial/atipicial-js@next",
  ],
  favicon: "img/favicon.png",
  customFields: {
    users: [
      {
        caption: "Atipicial Wallet",
        image:
          "https://github.com/Atipicial/atipicial-wallet/blob/dev/icons/png/512x512.png?raw=true",
        infoLink: "http://atipicialwallet.com/",
        pinned: true,
      },
    ],
    repoUrl: "https://github.com/atipicial/atipicial-js",
  },
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: "../docs",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: false,
        theme: {
          customCss: "../src/css/customTheme.css",
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html"],
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: "atipicial-js",
      logo: {
        src: "img/logo.svg",
      },
      items: [
        {
          to: "docs/",
          label: "Docs",
          position: "left",
        },
        {
          to: "docs/api",
          label: "API",
          position: "left",
        },
        {
          to: "docs/changelog/latest",
          label: "Changelog",
          position: "left",
        },
        {
          to: "/help",
          label: "Help",
          position: "left",
        },
      ],
    },
    footer: {
      links: [],
      copyright: "Copyright © 2021 Ethan Fast, Yak Jun Xiang",
      logo: {
        src: "img/logo.svg",
      },
    },
  },
};
