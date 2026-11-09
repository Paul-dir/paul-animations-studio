# Project conventions

- Keep project case studies in `src/data/projectCaseStudies.ts` and use the existing slug-based detail page so new projects share the same navigation and presentation.
- Reference downloaded project screenshots through their Lovable Assets JSON pointers to avoid committing binary media.
- Share project catalog metadata in `src/data/projects.ts` between the home showcase and Portfolio listing so images, descriptions and internal case-study links stay consistent.