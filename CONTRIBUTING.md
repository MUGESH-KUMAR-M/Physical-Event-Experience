# Contributing to VenueFlow

Thank you for considering contributing to VenueFlow! 🎉

## How to Contribute

### Reporting Bugs
1. Check [existing issues](https://github.com/MUGESH-KUMAR-M/Physical-Event-Experience/issues) first
2. Open a new issue with a clear title and description
3. Include steps to reproduce, expected behaviour, and actual behaviour

### Suggesting Features
1. Open a GitHub Discussion or Issue tagged `enhancement`
2. Describe the use case and expected outcome

### Code Contributions

#### Setup
```bash
git clone https://github.com/MUGESH-KUMAR-M/Physical-Event-Experience.git
cd Physical-Event-Experience/app
npm install
npm run dev
```

#### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests: `npm test` — all 26 tests must pass
5. Run lint: `npm run lint`
6. Commit with a clear message: `git commit -m "feat: describe your change"`
7. Push and open a Pull Request

#### Code Standards
- Use JSDoc comments on all exported functions
- Add PropTypes to all React components
- Write unit tests for any new logic in `src/tests/`
- Follow the existing file structure:
  - `src/utils/` — pure logic functions
  - `src/components/` — React components
  - `src/tests/` — test files

## Code of Conduct
Be respectful, inclusive, and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).
