export default {
    version: '1.0.0',
    typescript: true,
    author: 'SkylixGH',
    node: {
        minVersion: '16.*',
        maxVersion: '*',
    },
    apps: [
        {
            type: 'desktop',
            path: './apps/desktop',
            description: 'This is a desktop app',
            keywords: ['desktop', 'app'],
            name: 'My Desktop App',
        },
        {
            type: 'mobile',
            path: './apps/mobile',
            description: 'This is a mobile app',
            keywords: ['mobile', 'app'],
            name: 'My Mobile App',
        },
        {
            type: 'node',
            path: './apps/server',
            description: 'This is a server app',
            keywords: ['server', 'app'],
            name: 'My Server App',
        },
    ],
    packages: [
        {
            path: './packages/api-interfaces',
            name: 'api-interfaces',
            main: 'src/index.ts',
            description: 'This is a package for the API types',
            keywords: ['api', 'package'],
        },
        {
            path: './packages/api-client',
            name: 'api-client',
            main: 'src/index.ts',
            description: 'This is a package for the API client',
            keywords: ['api', 'package'],
        },
    ],
};
