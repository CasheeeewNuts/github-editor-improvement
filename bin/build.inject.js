#!/usr/bin/env node

const esbuild = require("esbuild")
const WATCH_ENABLED = process.env.WATCH != undefined && process.env.WATCH === "true"

esbuild.build({
    entryPoints: ["src/script/inject.ts"],
    bundle: false,
    outfile: "dist/inject.js",
    watch: WATCH_ENABLED
}).catch(console.error)