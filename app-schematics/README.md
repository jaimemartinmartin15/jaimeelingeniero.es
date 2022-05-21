# Setup

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

# Developing

Run `npm run build:watch` to build the schematic in watch mode. Use `schematics .:rxjs-page --dry-run=false --name=somePageName` to execute the schematic.

# Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!
