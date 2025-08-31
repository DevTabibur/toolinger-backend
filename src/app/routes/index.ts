import express from "express";
import { AuthRoute } from "../modules/auth/auth.routes";
import { BlogRoute } from "../modules/blog/blog.routes";
import { ShortenerRoute } from "../modules/shortener/shortener.routes";
import { ConverterRoute } from "../modules/converter/converter.routes";
import { CutterRoute } from "../modules/cutter/cutter.routes";
import { ContactRoute } from "../modules/contact/contact.routes";
import { UserRoute } from "../modules/user/user.routes";
import { AnalyticsRoute } from "../modules/analytics/analytics.routes";
import { ToolsRoute } from "../modules/tools/tools.routes";
import { WebsiteManagementRoute } from "../modules/website-management/website-management.routes";
import { DomainToolsRoute } from "../modules/domain-tools/domain-tools.routes";
import { AdvancedToolsRoute } from "../modules/advanced-tools/advanced-tools.routes";
import { MoreToolsRoute } from "../modules/calculators-tools/more-tools.routes";
import { CategoryRoute } from "../modules/category/category.routes";
import { DynamicPagesArticleAndSeoRoute } from "../modules/pages-management/pages-management.routes";

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
    path: "/blog",
    route: BlogRoute,
  },
  {
    path: "/shorten",
    route: ShortenerRoute,
  },
  {
    path: "/converter",
    route: ConverterRoute,
  },
  {
    path: "/cutter",
    route: CutterRoute,
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
    path: "/analytics",
    route: AnalyticsRoute,
  },

  {
    path: "/tools",
    route: ToolsRoute,
  },
  // Website Management Tools (32 tools)
  {
    path: "/website-management",
    route: WebsiteManagementRoute,
  },
  // More Tools (59 tools)
  {
    path: "/more-tools",
    route: MoreToolsRoute,
  },
  // Domain realted tools
  {
    path: "/domain-tools",
    route: DomainToolsRoute,
  },
  {
    path: "/advanced-tools",
    route: AdvancedToolsRoute,
  },
  // {
  //   path: "/url-encoder-decoder",
  //   route: URLEncoderDecoderRoute,
  // },

  {
    path: "/pages-article-and-seo",
    route: DynamicPagesArticleAndSeoRoute,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
