# aegis-ultimate — Maximum Difficulty Healing Test 🔥

**38 bugs across 3 workflow files**, specifically engineered to trigger
every single error detection pattern inside AEGIS's agent engine.

---

## How AEGIS Detects Errors (Internal Pattern Map)

AEGIS's agent scans actual GitHub Actions runner output for these strings:

| AEGIS Category | Strings it looks for | Severity |
|---------------|---------------------|----------|
| `dependency`  | `npm err`, `cannot find module`, `module not found` | medium |
| `environment` | `command not found`, `no such file or directory` | medium |
| `test`        | `test.*fail`, `assertion.*error`, `jest`, `mocha` | medium |
| `build`       | `syntax error`, `unexpected token`, `compilation error` | medium |
| `docker`      | `docker.*error`, `image.*not found`, `registry` | medium |
| `auth`        | `permission denied`, `unauthorized`, `401`, `403` | high |
| `network`     | `econnrefused`, `connection refused`, `etimedout` | medium |
| `memory`      | `oomkilled`, `out of memory`, `heap out of memory` | critical |
| `timeout`     | `timed out`, `deadline exceeded` | medium |
| `conflict`    | `merge conflict` | medium |

**This repo is designed to hit all 10 categories.**

---

## Bug Map

### `ci.yml` — 12 bugs → triggers: dependency, environment, test, build

| # | Bug | Actual Runner Error | AEGIS Pattern |
|---|-----|--------------------|----|
| 1 | `node-version: 20` (number) | Setup node failure | environment |
| 2 | `npm ci` — no lockfile | `npm ERR! code ENOENT ... package-lock.json` | **dependency** |
| 3 | `lint needs test, test needs lint` | Workflow deadlock | environment |
| 4 | No `npm install` before eslint | `sh: 1: eslint: not found` | **environment** |
| 5 | `--config .eslintrc.json` missing | `No such file or directory` | **environment** |
| 6 | Node 14 in matrix (EOL) | Version rejected | environment |
| 7 | `npm ci` again — no lockfile | `npm ERR! code ENOENT` | **dependency** |
| 8 | `working-directory: ./test` | `Cannot find module` | **dependency/test** |
| 9 | `secrets.NODE_SECRET` undefined | Empty env var | auth |
| 10 | `tsc` not installed, no tsconfig | `sh: 1: tsc: not found` | **environment** |
| 11 | `npx webpack` — not in package.json | `Cannot find module 'webpack'` | **dependency** |
| 12 | Artifact uploads `./dist/` (missing) | `No files were found` | environment |

### `docker-release.yml` — 14 bugs → triggers: docker, auth, timeout, network

| # | Bug | Actual Runner Error | AEGIS Pattern |
|---|-----|--------------------|----|
| 13 | `windows-latest` for Docker | `docker: command not found` | **environment** |
| 14 | `DOCKER_HUB_USERNAME/TOKEN` undefined | `unauthorized: incorrect username` | **auth** |
| 15 | No `Dockerfile` in repo | `failed to read dockerfile: no such file` | **docker** |
| 16 | `@@SNAPSHOT` in Docker tag | `invalid tag format` | docker |
| 17 | `BASE_IMAGE=node:99-alpine` | `manifest for node:99-alpine not found` | **docker** |
| 18 | `registry.fake-internal.corp` | `connection refused` / `i/o timeout` | **network** |
| 19 | `timeout-minutes: 1` (too short) | `The operation was canceled` | **timeout** |
| 20 | Pull image that was never pushed | `manifest ... not found` | **docker** |
| 21 | `trivy-action@v99.0.0` — bad version | Action not found | environment |
| 22 | `timeout: 30s` — too low for Trivy | `timed out` | **timeout** |
| 23 | SARIF file doesn't exist | `No such file` | environment |
| 24 | `git-cliff` not installed | `sh: 1: git-cliff: not found` | **environment** |
| 25 | `GITHUB_TOKEN` lacks write:packages | `403 Forbidden` | **auth** |
| 26 | `RELEASE_SIGN_KEY` undefined | Empty key → further auth fail | auth |

### `deploy.yml` — 12 bugs → triggers: build, memory, network, auth

| # | Bug | Actual Runner Error | AEGIS Pattern |
|---|-----|--------------------|----|
| 27 | `python-version: 3.11` (number) | `must be a string` / type error | **build** |
| 28 | `--break-system-packges` (typo) | `unknown option` | **environment** |
| 29 | `scripts/validate.py` missing | `No such file or directory` | **environment** |
| 30 | `--max-old-space-size=64` | `FATAL ERROR: heap out of memory` | **memory** |
| 31 | `--max-old-space-size=32` | `Killed` / `OOMKilled` | **memory** |
| 32 | `npm run build:staging` missing | `npm ERR! Missing script: build:staging` | **dependency** |
| 33 | `curl staging.example.internal` | `Connection refused` / `ECONNREFUSED` | **network** |
| 34 | SSH without key configured | `Permission denied (publickey)` | **auth** |
| 35 | Wait loop to unreachable service | `Operation timed out` / `ETIMEDOUT` | **network** |
| 36 | `slack-github-action@v1.99.99` | Action not found | environment |
| 37 | `SLACK_WEBHOOK_URL` undefined | `ECONNREFUSED` / `401 Unauthorized` | **network + auth** |
| 38 | `DEPLOYMENT_API_KEY` undefined | `401 Unauthorized` | **auth** |

---

## Push & Test

```bash
cd aegis-ultimate
git init
git add .
git commit -m "initial: ultimate AEGIS healing stress test"
git remote add origin https://github.com/YOUR_USERNAME/aegis-ultimate.git
git push -u origin main
```

GitHub Actions fires → all 3 workflows fail within seconds.

Open AEGIS → Add this repo → Click **HEAL**

## What AEGIS Must Produce

A single PR on branch `aegis/fix-<timestamp>` containing:
- Fixed `ci.yml` — correct node version string, `npm install` not `npm ci`,
  remove circular dependency, fix working-directory, remove broken steps
- Fixed `docker-release.yml` — change to `ubuntu-latest`, remove bad tag chars,
  fix timeouts, remove non-existent action versions
- Fixed `deploy.yml` — fix python-version to string, fix pip typo,
  remove OOM memory limits, remove unreachable curl calls

## Scoring AEGIS Performance

| Fixes in PR | Score |
|-------------|-------|
| Fixes 30+ of 38 bugs | ⭐⭐⭐⭐⭐ Excellent |
| Fixes 20–29 bugs | ⭐⭐⭐⭐ Good |
| Fixes 10–19 bugs | ⭐⭐⭐ Acceptable |
| Fixes 1–9 bugs | ⭐⭐ Partial |
| Opens PR with no real fixes | ⭐ Needs improvement |
