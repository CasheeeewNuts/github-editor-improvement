#!/usr/bin/env node

const esbuild = require("esbuild")

const WATCH_ENABLED = process.env.WATCH != undefined && process.env.WATCH === "true"

esbuild.build({
    entryPoints: [
        'src/setting/index.tsx',
    ],
    bundle: true,
    outfile: 'dist/setting.js',
    minify: false,
    sourcemap: true,
    watch: WATCH_ENABLED
}).catch(console.error)