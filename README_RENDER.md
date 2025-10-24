# Deploy frontend to Render (static site)

This guide explains how to deploy the frontend-only build of this repository to Render as a static site.

Prerequisites
- You own or have access to the GitHub repository contactscalebreakers-dev/scale_breakers_space.
- Node version: the project includes an .nvmrc — use that version locally or use Node 18 in CI.
- This repo uses pnpm. Render will run the build command below which ensures pnpm is enabled.

Recommended Render setup (manual steps)
1. Sign in at https://render.com and go to "New" → "Static Site".
2. Connect your GitHub account and select the repository: contactscalebreakers-dev/scale_breakers_space.
3. Configure the static site:
   - Branch: main
   - Build Command:
     corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile && pnpm run build
   - Publish Directory: dist
   - Root Directory: (leave blank unless your frontend is in a subfolder)
   - Environment (Optional): Add any client-specific env vars that the frontend expects (see .env.example)
4. Click "Create Static Site". Render will build and deploy. It will also redeploy on every push to main.

Notes
- The build command above ensures pnpm is available and installs using the lockfile, then runs your existing `pnpm run build` (which runs `vite build`).
- The site publish directory is `dist` (Vite default).
- If the static site requires environment variables, set them in Render Dashboard → Environment.

Custom domain and your screenshot note
- I see from your screenshot that the domain may be locked from transfers until a specific date. If the domain is currently locked (e.g., "You can transfer this domain after ..."), you will not be able to transfer it to Render before that date. You can still:
  - Use Render's default *.onrender.com domain, or
  - Point a DNS record from your domain provider (update A/CNAME records) to Render following Render's domain docs, if Transfer is not required.
- If you do want the domain transferred to a different registrar, you must wait until the date indicated by your registrar.

CI and safety
- I included a GitHub Actions workflow (.github/workflows/render-frontend-ci.yml) that builds the frontend and uploads the `dist` as an artifact. It helps catch build issues before deployment.
- If you want automatic deploy from GitHub to Render, Render will do that when you connect the repo in the Render dashboard — you do not need the Actions workflow to deploy, but CI is helpful.

If you want me to open a branch + PR
- I can create a branch called `render-frontend-deploy` and open a PR that adds the three files above. I’ll also include a short PR description and instructions to set any required environment variables on Render.
- To allow me to push and open the PR I need permission to push to the repo (e.g., adding me as a collaborator or giving me a personal access token with repo:status, repo_deployment, public_repo, repo:invite if you prefer). If you don’t want to grant push access, you can create the branch and commit/push the files yourself using the exact commands below.

How to add the files yourself (copy/paste method)
1. Create a local branch and add the files:
   - git clone git@github.com:contactscalebreakers-dev/scale_breakers_space.git
   - cd scale_breakers_space
   - git checkout -b render-frontend-deploy
   - Create the files shown above in the repo (under the exact paths).
   - git add .github/workflows/render-frontend-ci.yml render.yaml README_RENDER.md
   - git commit -m "chore(ci): add frontend build workflow and Render deployment guide"
   - git push --set-upstream origin render-frontend-deploy
2. Open a PR on GitHub (web UI) from render-frontend-deploy → main, add a short description:
   - "Add frontend build CI and Render static-site config; instructions for deploying frontend-only to Render."

Or, using the GitHub CLI (after pushing the branch):
   - gh pr create --fill --reviewer @your-reviewer --label "infra"

If you prefer, I will open the PR for you after you grant me push access. Otherwise, you can follow the steps above and I’ll review the PR and help fix any build/deploy errors.

What I’ll do next (after you confirm)
- If you want me to create the PR now, let me know how you'd like to grant repo push access and I’ll create the branch and PR with the files above.
- If you will apply the files yourself, do that and paste the build logs here if anything fails — I’ll debug and fix the errors and update the PR/files as needed.

Quick troubleshooting tips if the build fails on Render
- Check the Render build logs for errors during pnpm install or vite build and paste the first failing lines here.
- Confirm the Node version used by Render matches .nvmrc (Render allows selecting Node version in the build environment; otherwise the build command can ensure Node 18 is used).
- If the frontend requires environment variables at build time (e.g., API keys or public endpoints), add them in the Render dashboard → Environment.

Would you like me to:
1) Create the branch and PR right now (I’ll need push access), or
2) You add the files using the steps above and tell me whether the Render build succeeded (or paste any errors) so I can debug?

If you want me to proceed and create the PR, tell me how you’d like to grant me push access (add me as a collaborator or give a temporary token), and I’ll push the branch and open the PR.