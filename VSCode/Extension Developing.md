# Extension Developing

## Initialization
```
npx --package yo --package generator-code yo code
```

## Packaging
1. Add `publisher` in `package.json`.
2. Remove `This is the README for your extension "vscode-tool". ` in default readme.
3. Run:
```
npx --package vsce vsce package
```