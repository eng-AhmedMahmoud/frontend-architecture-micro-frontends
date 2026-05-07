import { dirnameFromMetaUrl, reactRsbuildConfig } from "@commerceos/tooling/rsbuild/react";

export default reactRsbuildConfig({
    dirname: dirnameFromMetaUrl(import.meta.url),
    server: {
        port: Number(process.env.TURBO_MFE_PORT ?? 3000),
    },
    moduleFederation: {
        options: {
            name: 'host',
            remotes: {
                analytics: 'analytics@http://localhost:3002/remoteEntry.js',
            }
        },
        shared: {
            react: { singleton: true },
            'react-dom': { singleton: true }
        }
    }
});
