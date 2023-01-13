const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: process.env.SONAR_HOST_URL,
    token: process.env.SONAR_AUTH_TOKEN,
    options: {
      "sonar.projectKey": "FRONT-END-UI",
      "sonar.sources": "./src",
      "sonar.exclusions": "**/__tests__/**",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info"
    },
  },
  () => {},
);