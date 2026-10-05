1. Install the gh-pages package
npm install gh-pages --save-dev

2. Update your package.json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    // other scripts...
  }
}

 "name": "your-project-name",
  "version": "0.1.0",
  "homepage": "https://yourusername.github.io/your-repo-name",

3. BASE_PATH=/space-bunny/ pnpm run deploy