import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::news-article.news-article", {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
