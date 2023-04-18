const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const disableDownloadingRemoteTypes =
  process.env.DISABLE_DOWNLOADING_REMOTE_TYPES === "true";

const remoteEnv = !process.env.MF_REMOTE
  ? "http://127.0.0.1:3001/_next/static"
  : process.env.MF_REMOTE?.charAt(process.env.MF_REMOTE.length - 1) === "/"
  ? process.env.MF_REMOTE.slice(0, -1)
  : process.env.MF_REMOTE;

/**
 * function that returns the mf options (constructor params for NextFederationPlugin]
 * @param {object} options
 * @param {boolean} options.isServer
 * @returns {ConstructorParameters<typeof NextFederationPlugin>[0]}
 * */
function mfOptions({ isServer }) {
  return {
    name: "remote",
    filename: "static/chunks/remoteEntry.js",
    exposes: {
      "./Token": "./src/components/Token",
    },
    remotes: {
      remote: `remote@${remoteEnv}/${
        isServer ? "ssr" : "chunks"
      }/remoteEntry.js`,
    },
    shared: {},
    extraOptions: {
      automaticAsyncBoundary: true,
    },
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.plugins.push(new NextFederationPlugin(mfOptions(options)));
    config.plugins.push(
      new FederatedTypesPlugin({
        disableDownloadingRemoteTypes,
        federationConfig: {
          ...mfOptions(options),
          remotes: {
            remote: `remote@${remoteEnv}/chunks/remoteEntry.js`,
          },
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
