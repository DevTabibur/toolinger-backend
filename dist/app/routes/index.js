"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const category_routes_1 = require("../modules/category/category.routes");
const blog_routes_1 = require("../modules/blog/blog.routes");
const shortener_routes_1 = require("../modules/shortener/shortener.routes");
const converter_routes_1 = require("../modules/converter/converter.routes");
const cutter_routes_1 = require("../modules/cutter/cutter.routes");
const contact_routes_1 = require("../modules/contact/contact.routes");
const user_routes_1 = require("../modules/user/user.routes");
const analytics_routes_1 = require("../modules/analytics/analytics.routes");
const seo_routes_1 = require("../modules/seo/seo.routes");
const tools_routes_1 = require("../modules/tools/tools.routes");
const website_management_routes_1 = require("../modules/website-management/website-management.routes");
const more_tools_routes_1 = require("../modules/more-tools/more-tools.routes");
const domain_tools_routes_1 = require("../modules/domain-tools/domain-tools.routes");
const advanced_tools_routes_1 = require("../modules/advanced-tools/advanced-tools.routes");
const router = express_1.default.Router();
const allRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRoute,
    },
    {
        path: "/category",
        route: category_routes_1.CategoryRoute,
    },
    {
        path: "/blog",
        route: blog_routes_1.BlogRoute,
    },
    {
        path: "/shorten",
        route: shortener_routes_1.ShortenerRoute,
    },
    {
        path: "/converter",
        route: converter_routes_1.ConverterRoute,
    },
    {
        path: "/cutter",
        route: cutter_routes_1.CutterRoute,
    },
    {
        path: "/contact",
        route: contact_routes_1.ContactRoute,
    },
    {
        path: "/user",
        route: user_routes_1.UserRoute,
    },
    {
        path: "/analytics",
        route: analytics_routes_1.AnalyticsRoute,
    },
    {
        path: "/seo",
        route: seo_routes_1.SEORoute,
    },
    {
        path: "/tools",
        route: tools_routes_1.ToolsRoute,
    },
    // Website Management Tools (32 tools)
    {
        path: "/website-management",
        route: website_management_routes_1.WebsiteManagementRoute,
    },
    // More Tools (59 tools)
    {
        path: "/more-tools",
        route: more_tools_routes_1.MoreToolsRoute,
    },
    // Domain realted tools
    {
        path: '/domain-tools',
        route: domain_tools_routes_1.DomainToolsRoute
    },
    {
        path: '/advanced-tools',
        route: advanced_tools_routes_1.AdvancedToolsRoute
    }
    // {
    //   path: "/url-encoder-decoder",
    //   route: URLEncoderDecoderRoute,
    // },
];
allRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
