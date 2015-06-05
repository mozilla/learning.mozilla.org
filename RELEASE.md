## Release Process

This documents the process for issuing and deploying a new
release for teach.mozilla.org.

It assumes the following:

  * You want to create release `0.0.4`.
  * Your GitHub username is `toolness`.

If this isn't the case, simply replace these values for your own.
And if you want to make things a lot easier, you can generate a custom
version of this document by running:

```
node lib/changelog.js 0.0.4 toolness
```

These instructions also assume that your `develop` branch currently
contains the changes you want to release.

1.  Verify that the ["Unreleased" section of `CHANGELOG.md`][unreleased]
    is up-to-date by comparing it against GitHub's commit list (you can
    see that by clicking on the "Unreleased" section heading).

    Feel free to move more important, less technical entries to the top
    of the list. Remember, it will be read by both developers *and* users,
    so avoid the use of jargon where possible.

2.  Create a branch off `develop` called `v0.0.4-rc` and push it to your
    GitHub fork:

    ```
    git checkout -b v0.0.4-rc develop
    git push -u https://github.com/toolness/teach.webmaker.org.git v0.0.4-rc
    ```

3.  [Issue a PR][pr] to merge your branch into `master` titled
    "Tag and release v0.0.4". Paste in the latest changes from the
    topmost "Unreleased" section of `CHANGELOG.md` into the
    description of the PR so stakeholders know what's changed. If you're
    on OS X, you can easily copy this to your clipboard with the following
    command:

    ```
    node lib/changelog.js unreleased | pbcopy
    ```

    If you're on Windows, just use `clip` instead of `pbcopy`.

4.  Make sure that Travis thinks the PR looks good (i.e., all tests pass).

5.  Wait for the stakeholders to sign-off on the release. Usually this just
    means @hannahkane, but if she's not around, consider asking
    @ldecoursy instead.

6.  Update the version number in `package.json` to `0.0.4` and then
    run:

    ```
    node lib/changelog.js bump
    ```

    This will create a new entry for the new version in `CHANGELOG.md`,
    and it will also output your new version's release notes to
    `tag-message-v0.0.4.txt`.

7.  Commit the changes to git and push them:

    ```
    git commit -a -m "Release v0.0.4."
    git push
    ```

8.  Merge the PR into `master`. Once Travis CI is finished, the site
    will be deployed to production.

9.  Tag the release and push it to the official repository:

    ```
    git tag -a v0.0.4 -F tag-message-v0.0.4.txt
    git push https://github.com/mozilla/teach.webmaker.org.git v0.0.4   
    ```

10. Merge `v0.0.4-rc` into `develop` on the official repository:

    ```
    git checkout develop
    git pull https://github.com/mozilla/teach.webmaker.org.git develop
    git merge v0.0.4-rc
    git push https://github.com/mozilla/teach.webmaker.org.git develop
    ```

Hooray, you're done!

[unreleased]: https://github.com/mozilla/teach.webmaker.org/blob/develop/CHANGELOG.md#unreleased
[pr]: https://github.com/mozilla/teach.webmaker.org/compare/master...toolness:v0.0.4-rc
