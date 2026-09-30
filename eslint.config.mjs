import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".kilo/**",
      "geotech/app/**",
      "geotech/next-env.d.ts",
      "geotech/next.config.js",
      "geotech/postcss.config.js",
      "geotech/tailwind.config.ts",
    ],
  },
];

export default eslintConfig;
