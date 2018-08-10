const configYaml = require("config-yaml");

module.exports = class Bundle {
  constructor(filePath) {
    this.filePath = filePath;
  }

  getPath() {
    return __dirname;
  }

  initialize(application) {
    const properties = configYaml(this.filePath, { encoding: "utf8" });

    const configuration = application.getParameter("configuration");
    configuration.addProperties(properties);
  }
};
