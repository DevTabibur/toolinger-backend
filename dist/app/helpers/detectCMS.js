"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmsSignatures = void 0;
// Define all CMS signatures in an array
exports.cmsSignatures = [
    {
        name: 'WordPress',
        headers: ['x-powered-by', 'server'],
        headerIncludes: ['wordpress'],
        generatorIncludes: ['wordpress'],
        htmlIncludes: ['wp-content', 'wp-includes']
    },
    {
        name: 'Drupal',
        headers: ['x-drupal-cache'],
        headerIncludes: [],
        generatorIncludes: ['drupal'],
        htmlIncludes: ['sites/default/files']
    },
    {
        name: 'Joomla',
        headers: ['x-generator'],
        headerIncludes: ['joomla'],
        generatorIncludes: ['joomla'],
        htmlIncludes: ['Joomla!']
    },
    {
        name: 'Shopify',
        headers: ['x-powered-by'],
        headerIncludes: ['shopify'],
        generatorIncludes: ['shopify'],
        htmlIncludes: ['cdn.shopify.com']
    },
    {
        name: 'Magento',
        generatorIncludes: ['magento'],
        htmlIncludes: ['skin/frontend', 'mage/'],
    },
    {
        name: 'Blogger',
        generatorIncludes: ['blogger'],
        htmlIncludes: ['blogspot.com'],
    },
    {
        name: 'Ghost',
        generatorIncludes: ['ghost'],
        htmlIncludes: ['ghost-url', 'ghost-version'],
    },
    {
        name: 'Webflow',
        headers: [],
        generatorIncludes: ['webflow'],
        htmlIncludes: ['cdn.webflow.com', 'webflow.js'],
    },
    {
        name: 'Wix',
        headers: ['x-wix-request-id'],
        htmlIncludes: [],
    },
    {
        name: 'Squarespace',
        headers: ['x-squarespace'],
        htmlIncludes: [],
    },
    {
        name: 'TYPO3',
        generatorIncludes: ['typo3'],
        htmlIncludes: [],
    },
    {
        name: 'PrestaShop',
        generatorIncludes: ['prestashop'],
        htmlIncludes: [],
    },
    {
        name: 'Bitrix',
        generatorIncludes: ['bitrix'],
        htmlIncludes: [],
    },
    {
        name: 'DotNetNuke',
        generatorIncludes: ['dotnetnuke'],
        htmlIncludes: [],
    },
    {
        name: 'OpenCart',
        htmlIncludes: ['catalog/view/theme', 'index.php?route='],
    },
    {
        name: 'osCommerce',
        htmlIncludes: ['osCommerce'],
    },
    {
        name: 'HubSpot CMS',
        htmlIncludes: ['hs-scripts.com', 'powered by HubSpot'],
    },
    {
        name: 'Sitefinity',
        generatorIncludes: ['sitefinity'],
    },
    {
        name: 'Sitecore',
        generatorIncludes: ['sitecore'],
    },
    {
        name: 'Umbraco',
        generatorIncludes: ['umbraco'],
    },
    {
        name: 'Craft CMS',
        generatorIncludes: ['craft'],
        htmlIncludes: ['craft.min.js'],
    },
    {
        name: 'Weebly',
        htmlIncludes: ['weebly.com'],
    },
    {
        name: 'Contentful',
        htmlIncludes: ['contentful'],
    },
    {
        name: 'Duda',
        htmlIncludes: ['duda', 'duda.co'],
    },
    {
        name: 'Zyro',
        htmlIncludes: ['zyro'],
    },
    {
        name: 'Cargo',
        htmlIncludes: ['cargo.site'],
    },
    {
        name: 'Netlify CMS',
        htmlIncludes: ['netlify'],
    },
    {
        name: 'Strapi',
        generatorIncludes: ['strapi'],
    },
    {
        name: 'Sanity',
        htmlIncludes: ['sanity.io'],
    },
    {
        name: 'Next.js (Static)',
        htmlIncludes: ['_next/static'],
    }
];
