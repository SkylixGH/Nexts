## 1. All commit messages must be less than 100 characters long and convey meaningful information
Keep commit messages short while still conveying information. Longer commit names get truncated by GitHub and other Git interfaces. Descriptive commit names aid in pinpointing commits that introduced new bugs. For example, let's say the master branch has a math bug in a 3D cube renderer when a value is below zero. There's a commit, A, named `fix(render): fixed erroneous math`, and a commit, B, named `fix(render): fix bad algorithm`. It would be difficult to determine at a glance if commit A or commit B could've introduced the bug. However, if the commits were named `fix(render): fixed erroneous vector math in cube renderer` and `fix(renderer): fix bad bloom lighting algorithm`, it would be much easier to pinpoint the buggy commit.

## 2. Describe in the commit description what the commit fixes, or adds, if applicable
e.g. the commit `fix(monorepo): fix build error with single projects` is unacceptable if there is no descriptive commit body. Your commit must address the error, under what conditions it occurs, and also the GitHub issue it addresses (if any). The example commit is fine if the commit description contains more information on the build error, such as:

```
fix(monorepo): fix build error with single projects

Fix a build error that occurred when single projects had both JavaScript and TypeScript files in its sources.
```

Also, attempt to add this information to the commit name if it's short, so it is easier to determine at a glance if the commit might cause a bug in the future. For this commit, the recommended name would be `fix(monorepo): fix build error when single projects have both js and ts sources`. In this case, the commit description would not be needed.

## 3. Commit names must state the type and scope of the commit
All commit names must follow the format `type<(scope)>: <description>`, e.g. `test(sockets): add unit tests for socket server`.
`scope` in the case of Nexo means the monorepo package that the commit occurred in. If the commit changed files in up to 3 packages, separate them with commas, e.g. `style(sockets,sockets-client,rest): remove trailing whitespace`. If this causes the commit name to be >100 characters, you may replace the scope(s) with `...` and **state the changed packages in the commit body.** If the commit affects **all** packages, the scope shall be `*`, e.g. `style(*): change spaces to tabs`. If the commit affects only the root package, the scope shall be `root`.

The types of commits are listed below.
  - **build**: Changes that affect the build system or external dependencies (this is a special type; the scope is likely to be left out because the build scripts are always in the root)
  - **ci**: Changes to continuous integration files and scripts (this is a special type; the scope **must** be the continuous integration service whose configuration changed, e.g. `ci(travis): ...`)
  - **docs**: Changes that only affect documentation, whether it be the documentation website or in-code JSDoc
  - **feat**: A new feature
  - **fix**: A bug fix
  - **perf**: A code change that improves performance
  - **refactor**: A code change that neither fixes a bug nor adds a feature (e.g. a restructuring, moving a function to a different file, etc.)
  - **style**: Changes that do not affect the execution of the code (white-space, formatting, missing semicolons)
  - **test**: Adds missing unit tests or corrects existing unit tests

## 4. One type of change per commit
You shouldn't group multiple different types of changes together in one commit; they should be in separate commits. Use Git's staged changes to aid this.

## 5. Test before you commit
All commits should be unit tested before committing. A non-WIP commit should never make CI fail.

## 6. Keep work-in-progress features in a separate branch, or a (preferably draft) PR
Do not commit unfinished code to master. Master should only consist of functional code.

The commit naming guidelines also apply to first-party (Skylix) PRs. PRs should be titled with their main purpose in the form of a commit name as listed in #3. #4 is a lot more loose when it comes to PRs; PRs can include fixes, features, and refactors, but they must stay in one package unless they affect all or most packages. A PR that changes multiple packages in the same way is accepted, but a PR that adds a feature to X and fixes a bug in Y is unacceptable.

I'll also be adding all of this information to the contributing guidelines in the repo so that new contributors can follow the commit conventions as well.