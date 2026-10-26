# Frontend Team Workflow — ISI LMS

These rules apply to the frontend team working on the ISI LMS Vue application. Shared Git, communication, and database coordination rules must remain consistent with the backend repository.

## 1. Branching

- `main` is protected. Never push directly to `main`.
- Create a feature branch for each Jira issue using the format `feature/LMS-<n>-short-title`.
- Keep one Jira issue per branch.
- Start branches from the latest `main`.

## 2. Pull Requests (PRs)

- Keep PRs small and focused, ideally under a few hundred changed lines.
- Include the Jira issue key in the PR title, for example: `LMS-12: Add courses dashboard`.
- At least one teammate other than the author must review each PR.
- Review PRs within a few hours when possible.
- Merge only after the build passes and the required review is complete.

## 3. Definition of Done

A frontend Jira issue is complete when:

- Its acceptance criteria have been verified by someone other than the author.
- The application builds successfully.
- Relevant documentation or README files are updated.
- Actual time spent is logged in Jira.
- Changes are merged into `main` through an approved PR.

## 4. Environment Variables and Secrets

- Never commit passwords, API keys, tokens, or other secrets.
- Use `.env.local` for local frontend configuration and ensure it is excluded from Git.
- Commit only safe example configuration, such as `.env.example`, without real secrets.
- Remember that frontend environment variables included in the built application can be visible to users. Never store private server-side secrets in them.
- Share secrets only through the team's approved password manager or secure channel.

## 5. Backend API Integration

- Follow the agreed API contract documented in `docs/api-contract.md`.
- Coordinate with the backend team before relying on new or changed endpoints.
- Update frontend API functions, types, and related documentation when the agreed API contract changes.
- Announce API contract changes in the team channel before merging.
- If the project uses a generated API client, regenerate it after the relevant contract change is merged.

## 6. Shared Database and Migrations

- The frontend team must not independently apply database migrations.
- Database migrations are managed by the backend team according to the shared migration procedure.
- Coordinate with the backend team before testing changes that depend on database migrations.
- Follow migration announcements from the team, since both repositories use the same database.

## 7. Communication

- Hold a 10-minute team sync at the start and end of each workday.
- Post blockers in the team channel immediately.
- Coordinate API dependencies and integration issues with backend developers as early as possible.

## 8. Jira Hygiene

- Move each Jira issue to the appropriate status when work starts and finishes.
- Log actual time spent accurately, including investigation and debugging.
- Keep issue status and progress up to date so the team can reassess the one-week deadline.

## Team Agreement

All team members must confirm they have read and agreed to the workflow by reacting with a thumbs-up in the team channel.