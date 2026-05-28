import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::application-area.application-area", {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
