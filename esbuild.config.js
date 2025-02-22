const esbuild = require('esbuild');

/*

Just a quick script to be able to compile one or both parts of this extension.

Pass -o to build the options page and -m to build the main background script.

$ node ./esbuild.config.js -o -m

esbuild does not type check the TypeScript, use tsc -noEmit for that.

*/

// eslint-disable-next-line no-console
console.log('Building...');

if (process.argv.includes('-o')) {
  esbuild.buildSync({
    entryPoints: ['./src/options/options.tsx'],
    outfile: './src/options/options.js',
    bundle: true,
    minify: true,
    logLevel: 'info',
    platform: 'browser',
  });
}

if (process.argv.includes('-m')) {
  esbuild.buildSync({
    entryPoints: ['./src/scripts/main.ts'],
    outfile: './src/scripts/main.js',
    bundle: true,
    minify: true,
    logLevel: 'info',
    platform: 'browser',
  });
}
