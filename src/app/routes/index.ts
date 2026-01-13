import express from "express";
import { AuthRoute } from "../modules/auth/auth.routes";
import { BlogRoute } from "../modules/blog/blog.route";
import { ContactRoute } from "../modules/contact/contact.routes";
import { UserRoute } from "../modules/user/user.routes";
import { AnalyticsRoute } from "../modules/analytics/analytics.routes";
import { CategoryRoute } from "../modules/blog/category/category.routes";
import { TrashRoute } from "../modules/trash/trash.route";
import { CommentRoute } from "../modules/blog/comment/comment.route";
import { TagRoute } from "../modules/blog/tag/tag.route";
import { SystemSettingsRoute } from "../modules/settings/system-settings/system-settings.routes";
import { SentMessageRoute } from "../modules/sent-message/sent-message.routes";

const router = express.Router();

const allRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/blog-category",
    route: CategoryRoute,
  },
  {
    path: "/blog-tag",
    route: TagRoute,
  },
  {
    path: "/blog",
    route: BlogRoute,
  },
  {
    path: "/blog-comment",
    route: CommentRoute,
  },
  {
    path: "/trash",
    route: TrashRoute,
  },
  {
    path: "/contact",
    route: ContactRoute,
  },
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path: "/settings/system/otp",
    route: SystemSettingsRoute,
  },
  {
    path: "/sent-message",
    route: SentMessageRoute,
  },
  {
    path: "/analytics",
    route: AnalyticsRoute,
  },
  {
    path: "/system-settings",
    route: SystemSettingsRoute,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
