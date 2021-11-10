#!/usr/bin/env node

const esbuild = require("esbuild")
const WATCH_ENABLED = process.env.WATCH != undefined && process.env.WATCH === "true"

esbuild.build({
    entryPoints: ["src/script/initialize.ts"],
    bundle: true,
    minify: true,
    outfile: "dist/initialize.js",
    watch: WATCH_ENABLED
}).catch(console.error)