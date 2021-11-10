#!/usr/bin/env node

const esbuild = require("esbuild")
const WATCH_ENABLED = process.env.WATCH != undefined && process.env.WATCH === "true"

esbuild.build({
    entryPoints: [
        'src/popup/index.tsx',
    ],
    bundle: true,
    outfile: 'dist/popup.js',
    minify: false,
    sourcemap: false,
    watch: WATCH_ENABLED
}).catch(console.error)