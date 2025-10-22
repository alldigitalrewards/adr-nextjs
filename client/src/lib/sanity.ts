import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ queries
export const queries = {
  allBlogPosts: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    featuredImage,
    categories[]-> {
      title,
      slug
    }
  }`,
  
  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    featuredImage,
    content,
    categories[]-> {
      title,
      slug
    },
    seo
  }`,
  
  allPages: `*[_type == "page"] {
    _id,
    title,
    slug,
    pageType
  }`,
  
  pageBySlug: `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    pageType,
    hero,
    content,
    features,
    seo
  }`,
  
  navigationByMenuId: `*[_type == "navigation" && menuId == $menuId][0] {
    title,
    menuId,
    items[] {
      label,
      url,
      page-> {
        slug
      },
      color,
      submenu[] {
        label,
        url,
        page-> {
          slug
        },
        description
      }
    }
  }`,
}

