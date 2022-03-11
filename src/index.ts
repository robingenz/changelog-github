import { getInfo, getInfoFromPullRequest } from '@changesets/get-github-info';
import type { ChangelogFunctions, NewChangesetWithCommit, VersionType } from '@changesets/types';
import { config } from 'dotenv';

config();

const getReleaseLine = async (
  changeset: NewChangesetWithCommit,
  _type: VersionType,
  options: null | Record<string, any>
): Promise<string> => {
  if (!options || !options.repo) {
    throw new Error(
      'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]'
    );
  }

  let prFromSummary: number | undefined;
  let commitFromSummary: string | undefined;

  const replacedChangelog = changeset.summary
    .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
      const num = Number(pr);
      if (!isNaN(num)) {
        prFromSummary = num;
      }
      return '';
    })
    .replace(/^\s*commit:\s*([^\s]+)/im, (_, commit) => {
      commitFromSummary = commit;
      return '';
    })
    .trim();

  const [firstLine, ...futureLines] = replacedChangelog.split('\n').map((l) => l.trimEnd());

  const links = await (async () => {
    if (prFromSummary !== undefined) {
      let { links } = await getInfoFromPullRequest({
        repo: options.repo,
        pull: prFromSummary,
      });
      if (commitFromSummary) {
        links = {
          ...links,
          commit: `[\`${commitFromSummary}\`](https://github.com/${options.repo}/commit/${commitFromSummary})`,
        };
      }
      return links;
    }
    const commitToFetchFrom = commitFromSummary || changeset.commit;
    if (commitToFetchFrom) {
      const { links } = await getInfo({
        repo: options.repo,
        commit: commitToFetchFrom,
      });
      return links;
    }
    return {
      commit: null,
      pull: null,
    };
  })();

  const prefix = [
    links.pull === null ? '' : ` (${links.pull})`,
    links.commit === null ? '' : ` (${links.commit})`,
  ].join('');

  return `\n\n-${prefix ? `${prefix} -` : ''} ${firstLine}\n${futureLines.map((l) => `  ${l}`).join('\n')}`;
};

const changelogFunctions: ChangelogFunctions = {
  getReleaseLine: (changeset, _type, options) => {
    return getReleaseLine(changeset, _type, options);
  },
  getDependencyReleaseLine: async () => {
    return '';
  },
};

export default changelogFunctions;
