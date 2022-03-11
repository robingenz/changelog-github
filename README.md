# changelog-github

[![npm (version)](https://img.shields.io/npm/v/@robingenz/changelog-github)](https://www.npmjs.com/package/@robingenz/changelog-github)
[![npm (downloads)](https://img.shields.io/npm/dw/@robingenz/changelog-github)](https://www.npmjs.com/package/@robingenz/changelog-github)

🦋 A changelog entry generator for GitHub that links to commits and PRs.

This generator is based on [@changesets/changelog-github](https://www.npmjs.com/package/@changesets/changelog-github) and intended for use with [Changesets](https://github.com/changesets/changesets).

## Installation

1. Install the pckage:
   ```bash
   npm install @robingenz/changelog-github
   ```
2. Change your .changeset/config.json to point to the new package:
   ```
   "changelog": [
      "@robingenz/changelog-github",
      { "repo": "org/repo" }
   ],
   ```
   Replace `org/repo` with your own repo.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

See [LICENSE](./LICENSE).
