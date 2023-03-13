const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Lenguajes y Compiladores',
  tagline: 'Sitio de la materia Lenguajes y Compiladores',
  url: 'https://jisbruzzi.github.io',
  baseUrl: '/teo/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'compiladores',
  projectName: 'compiladores.github.io', // Usually your repo name.
  trailingSlash: false,
  themeConfig: {
    navbar: {
      title: 'Lenguajes y Compiladores',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'labs/intro',
          position: 'left',
          label: 'Laboratorios',
        },
        {
          type: 'doc',
          docId: 'practicas/intro',
          position: 'left',
          label: 'Prácticas',
        },
        {
          type: 'doc',
          docId: 'teoricas/intro',
          position: 'left',
          label: 'Teóricas',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownItemsAfter: [],
          dropdownActiveClassDisabled: true,
        },
        {
          href: 'https://github.com/compiladores',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Material',
          items: [
            {
              label: 'Laboratorios',
              to: 'docs/labs/intro',
            },
          ],
        },
      ],
      copyright: `Hecho para Ud.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
          // Please change this to your repo.
          editUrl: 'https://github.com/compiladores/compiladores.github.io/edit/master/docs/',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'este cuatri',
              path: '',
            },
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },

      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
      integrity: 'sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc',
      crossorigin: 'anonymous',
    },
  ],
};
