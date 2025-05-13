class EnvUtil {
  getAltwayUrl(site = "app") {
    const siteConfig = Cypress.env("sites")[site];
    const env = siteConfig.config.env;
    const envConfig = siteConfig.envs[env];
    const altwayUrl = envConfig.altway_url;

    return altwayUrl;
  }

  getBusinessUrl(site = "app") {
    const siteConfig = Cypress.env("sites")[site];
    const env = siteConfig.config.env;
    const envConfig = siteConfig.envs[env];
    const businessUrl = envConfig.business_url;

    return businessUrl;
  }
}

export default new EnvUtil();
