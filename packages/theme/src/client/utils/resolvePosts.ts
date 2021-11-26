import type { PageData } from "@vuepress/client";
import type { PostPageData } from "../../shared";
import { usePages } from "../composables";
import { compareDate } from "./resolveTime";

export async function getAllPosts(): Promise<PageData[]> {
  const pages = await usePages();
  return pages.filter((page) => page.frontmatter.layout === "Post");
}

export function sortPostsByDate(posts: PageData[]): PageData[] {
  return posts.sort((prev: PageData, next: PageData) => {
    return compareDate(prev, next);
  });
}

export function sortPostsByDateWithPager(posts: PageData[]): PostPageData[] {
  const sortedPosts = sortPostsByDate(posts);

  return sortedPosts.map((post, index) => {
    const postWithPager = post as PostPageData;

    postWithPager.next =
      index > 0
        ? {
            title: sortedPosts[index - 1].title,
            link: sortedPosts[index - 1].path
          }
        : null;

    postWithPager.prev =
      index < sortedPosts.length - 1
        ? {
            title: sortedPosts[index + 1].title,
            link: sortedPosts[index + 1].path
          }
        : null;

    return postWithPager;
  });
}