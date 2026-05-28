import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::global-setting.global-setting", {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
