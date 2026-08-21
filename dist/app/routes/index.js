"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const blog_route_1 = require("../modules/blog/blog.route");
const contact_routes_1 = require("../modules/contact/contact.routes");
const user_routes_1 = require("../modules/user/user.routes");
const analytics_routes_1 = require("../modules/analytics/analytics.routes");
const category_routes_1 = require("../modules/blog/category/category.routes");
const trash_route_1 = require("../modules/trash/trash.route");
const comment_route_1 = require("../modules/blog/comment/comment.route");
const tag_route_1 = require("../modules/blog/tag/tag.route");
const system_settings_routes_1 = require("../modules/settings/system-settings/system-settings.routes");
const sent_message_routes_1 = require("../modules/sent-message/sent-message.routes");
const router = express_1.default.Router();
const allRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRoute,
    },
    {
        path: "/blog-category",
        route: category_routes_1.CategoryRoute,
    },
    {
        path: "/blog-tag",
        route: tag_route_1.TagRoute,
    },
    {
        path: "/blog",
        route: blog_route_1.BlogRoute,
    },
    {
        path: "/blog-comment",
        route: comment_route_1.CommentRoute,
    },
    {
        path: "/trash",
        route: trash_route_1.TrashRoute,
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
        path: "/settings/system/otp",
        route: system_settings_routes_1.SystemSettingsRoute,
    },
    {
        path: "/sent-message",
        route: sent_message_routes_1.SentMessageRoute,
    },
    {
        path: "/analytics",
        route: analytics_routes_1.AnalyticsRoute,
    },
    {
        path: "/system-settings",
        route: system_settings_routes_1.SystemSettingsRoute,
    },
];
allRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
