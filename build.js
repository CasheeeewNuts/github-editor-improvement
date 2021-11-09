const esbuild = require('esbuild')

esbuild.build({
    entryPoints: [
        'src/setting/index.tsx',
    ],
    bundle: true,
    outfile: 'dist/setting.js',
    minify: false,
    sourcemap: true,
    watch: true
}).catch((err) => {
    console.error(err)
    process.exit(1)
})

esbuild.build({
    entryPoints: ["src/inject.ts"],
    bundle: false,
    outfile: "dist/inject.js",
    watch: true
}).catch(console.error)