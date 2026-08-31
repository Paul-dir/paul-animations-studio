import { CASE_STUDIES, type CaseStudy } from "@/data/projectCaseStudies";

export const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const projectPath = (title: string) => `/projects/${slugify(title)}`;

export const getCaseStudyBySlug = (
  slug: string
): (CaseStudy & { slug: string }) | null => {
  const entry = Object.entries(CASE_STUDIES).find(
    ([title]) => slugify(title) === slug
  );
  if (!entry) return null;
  return { ...entry[1], slug };
};

export const allProjectSlugs = () =>
  Object.keys(CASE_STUDIES).map((title) => ({ title, slug: slugify(title) }));
