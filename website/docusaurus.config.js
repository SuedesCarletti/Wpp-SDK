// docusaurus.config.js

// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WhatsApp Business Platform Node.js SDK for the Cloud API, hosted by Meta',
  tagline: 'WhatsApp Business Platform SDK',
  favicon: 'img/favicon.ico',
  
  // Set the production url of your site here
  url: 'https://SuedesCarletti.github.io',
  
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/Wpp-SDK/',
  
  // GitHub pages deployment config.
  organizationName: 'SuedesCarletti',
  projectName: 'Wpp-SDK',
  
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/SuedesCarletti/Wpp-SDK/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
    },
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'WhatsApp Business Platform Node.js SDK for the Cloud API, hosted by Meta',
      logo: {
        alt: 'WhatsApp logo',
        src: 'img/Digital_Glyph_Green.svg',
      },
      items: [
        {
          href: 'https://github.com/SuedesCarletti/Wpp-SDK',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    announcementBar: {
      id: 'archived',
      content: 'The project is archived - go to <a target="_blank" rel="noopener noreferrer" href="https://github.com/WhatsApp/WhatsApp-Nodejs-SDK/issues/31">this GitHub issue</a> to learn more.',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: false,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Cloud API',
              to: 'https://developers.facebook.com/docs/whatsapp/cloud-api',
            },
            {
              label: 'Business Management API',
              to: 'https://developers.facebook.com/docs/whatsapp/business-management-api',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/showcase/whatsapp-business/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/whatsappbiz',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/SuedesCarletti/Wpp-SDK',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Privacy',
              href: 'https://opensource.fb.com/legal/privacy',
              target: '_blank',
              rel: 'noreferrer noopener',
            },
            {
              label: 'Terms',
              href: 'https://opensource.fb.com/legal/terms',
              target: '_blank',
              rel: 'noreferrer noopener',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Meta Platforms, Inc. Built for the dev community with love by Rashed Talukder using Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};

module.exports = config;
