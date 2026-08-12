# Tooling Manifest

## Browser control skill

- Purpose: responsive browser QA, screenshots, DOM collision and interaction checks
- Type: bundled Codex skill
- Source: OpenAI bundled Browser plugin
- Version: `26.707.72221`
- License: environment-managed
- Installed date: preinstalled
- Why selected: official bundled capability; supports the existing in-app browser
- Permissions: controls test tabs; no cookie/profile inspection
- Network access: yes
- Credentials required: no for public/local pages
- Risk review: low; no repository dependency or install script
- Used by: visual regression and production QA
- Update policy: managed by Codex plugin runtime
- Removal: managed by Codex, not project-local

## Apple Design skill

- Purpose: typography, modal, motion restraint and accessibility design rules
- Type: local Codex skill
- Source: installed skill catalog
- Version / commit: environment-managed, no project package
- License: environment-managed
- Installed date: preinstalled
- Permissions: instruction-only; no network/filesystem execution
- Risk review: low
- Used by: Rain Plan, typography, dialog and reduced-motion QA

## Node.js built-ins

- Purpose: crawler pipeline, normalization, matching, hashing, tests and report generation
- Type: runtime
- Source: bundled workspace/runtime
- Version: record with each refresh report (`process.version`)
- License: Node.js license
- Credentials required: none
- Network access: only when an explicit live refresh is enabled
- Risk review: low; no install scripts or third-party dependency tree
- Removal: none; pipeline files can be removed without system changes

## Codex Security plugin — suggested

- Purpose: third-party package and crawler supply-chain review
- Type: OpenAI curated remote plugin
- Source: `codex-security@openai-curated-remote`
- Status: installation suggested; do not claim installed until the client confirms
- Risk review: preferred over unknown GitHub security wrappers

## Rejected / deferred tools

- Unknown GitHub crawler skills: deferred; repository ownership, license, install scripts and maintenance not yet reviewed.
- Standalone browser MCPs: rejected for now; bundled Browser skill already covers the required QA.
- Unpinned `latest` npm/Python packages: rejected; no dependency is currently necessary.
- CAPTCHA/anti-bot tooling: prohibited by project policy.

## Reviewed UI QA candidates — deferred

- Microsoft Playwright: official Microsoft repository, Apache-2.0, actively maintained; deferred because the bundled Browser skill already supplies the required Chromium session without adding a large browser dependency.
- Deque axe-core: official Deque repository, MPL-2.0, actively maintained; suitable for a later dedicated accessibility gate, but not installed during this dependency-free pass.
- Mapbox pixelmatch: official Mapbox repository, ISC, maintained; useful once stable image baselines are committed, but DOM collision and live screenshot review are the safer first gate for this highly content-driven site.
- Review date: `2026-08-12`. No install scripts were executed and no repository credentials were granted.

## GitHub Actions (pinned)

- `actions/checkout` v4: `11d5960a326750d5838078e36cf38b85af677262`, MIT.
- `actions/setup-node` v4: `49933ea5288caeca8642d1e84afbd3f7d6820020`, MIT.
- `actions/upload-artifact` v4: `ea165f8d65b6e75b540449e92b4886f43607fa02`, MIT.
- Purpose: isolated CI validation and short-lived report artifacts.
- Permissions: repository contents read-only; no credentials beyond default read token.
- Network: GitHub-hosted action/runtime download and public source access only.
- Risk review: official GitHub repositories, pinned immutable commits, no project secrets.
- Update policy: review release and commit before changing SHA.
