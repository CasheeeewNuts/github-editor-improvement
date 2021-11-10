#!/usr/bin/env node

const esbuild = require("esbuild")
const WATCH_ENABLED = process.env.WATCH != undefined && process.env.WATCH === "true"

esbuild.build({
    entryPoints: ["src/script/inject.ts"],
    bundle: false,
    minify: true,
    outfile: "dist/inject.js",
    watch: WATCH_ENABLED
}).catch(console.error)