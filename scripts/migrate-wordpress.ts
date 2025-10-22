/**
 * WordPress to Sanity Migration Script
 * 
 * This script extracts content from the WordPress REST API and imports it into Sanity CMS.
 * 
 * Usage:
 * 1. Set environment variables:
 *    - WORDPRESS_URL: Your WordPress site URL (e.g., https://alldigitalrewards.com)
 *    - SANITY_PROJECT_ID: Your Sanity project ID
 *    - SANITY_DATASET: Your Sanity dataset (e.g., production)
 *    - SANITY_TOKEN: Your Sanity write token
 * 
 * 2. Run: pnpm tsx scripts/migrate-wordpress.ts
 */

import { createClient } from '@sanity/client'
import axios from 'axios'

const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://alldigitalrewards.com'
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || ''
const SANITY_DATASET = process.env.SANITY_DATASET || 'production'
const SANITY_TOKEN = process.env.SANITY_TOKEN || ''

if (!SANITY_PROJECT_ID || !SANITY_TOKEN) {
  console.error('❌ Missing required environment variables: SANITY_PROJECT_ID and SANITY_TOKEN')
  process.exit(1)
}

const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false,
  token: SANITY_TOKEN,
  apiVersion: '2024-01-01',
})

interface WordPressPost {
  id: number
  date: string
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  author: number
  featured_media: number
  categories: number[]
  _embedded?: {
    author?: Array<{ name: string }>
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
    }>>
  }
}

interface WordPressPage {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
}

async function fetchWordPressPosts(page = 1, perPage = 100): Promise<WordPressPost[]> {
  try {
    const response = await axios.get(`${WORDPRESS_URL}/wp-json/wp/v2/posts`, {
      params: {
        page,
        per_page: perPage,
        _embed: true,
      },
    })
    
    const posts = response.data
    const totalPages = parseInt(response.headers['x-wp-totalpages'] || '1')
    
    console.log(`📥 Fetched ${posts.length} posts from WordPress (page ${page}/${totalPages})`)
    
    if (page < totalPages) {
      const nextPosts = await fetchWordPressPosts(page + 1, perPage)
      return [...posts, ...nextPosts]
    }
    
    return posts
  } catch (error) {
    console.error('❌ Error fetching WordPress posts:', error)
    return []
  }
}

async function fetchWordPressPages(page = 1, perPage = 100): Promise<WordPressPage[]> {
  try {
    const response = await axios.get(`${WORDPRESS_URL}/wp-json/wp/v2/pages`, {
      params: {
        page,
        per_page: perPage,
      },
    })
    
    const pages = response.data
    const totalPages = parseInt(response.headers['x-wp-totalpages'] || '1')
    
    console.log(`📥 Fetched ${pages.length} pages from WordPress (page ${page}/${totalPages})`)
    
    if (page < totalPages) {
      const nextPages = await fetchWordPressPages(page + 1, perPage)
      return [...pages, ...nextPages]
    }
    
    return pages
  } catch (error) {
    console.error('❌ Error fetching WordPress pages:', error)
    return []
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

function htmlToPortableText(html: string): any[] {
  // Simple conversion - in production, use a proper HTML to Portable Text converter
  const text = stripHtml(html)
  return [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text,
        },
      ],
    },
  ]
}

async function downloadImage(url: string): Promise<any> {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data)
    
    // Upload to Sanity
    const asset = await sanityClient.assets.upload('image', buffer, {
      filename: url.split('/').pop() || 'image.jpg',
    })
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`❌ Error downloading image ${url}:`, error)
    return null
  }
}

async function migrateCategories(posts: WordPressPost[]) {
  console.log('\n📂 Migrating categories...')
  
  const categoriesMap = new Map<number, { name: string; slug: string }>()
  
  posts.forEach((post) => {
    if (post._embedded?.['wp:term']?.[0]) {
      post._embedded['wp:term'][0].forEach((cat) => {
        categoriesMap.set(cat.id, { name: cat.name, slug: cat.slug })
      })
    }
  })
  
  const categoryIds = new Map<number, string>()
  
  for (const [wpId, category] of categoriesMap) {
    try {
      const sanityCategory = await sanityClient.create({
        _type: 'category',
        title: category.name,
        slug: {
          _type: 'slug',
          current: category.slug,
        },
      })
      
      categoryIds.set(wpId, sanityCategory._id)
      console.log(`✅ Created category: ${category.name}`)
    } catch (error) {
      console.error(`❌ Error creating category ${category.name}:`, error)
    }
  }
  
  return categoryIds
}

async function migratePosts(posts: WordPressPost[], categoryIds: Map<number, string>) {
  console.log('\n📝 Migrating blog posts...')
  
  let successCount = 0
  let errorCount = 0
  
  for (const post of posts) {
    try {
      const author = post._embedded?.author?.[0]?.name || 'Unknown'
      const featuredMediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
      const altText = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || ''
      
      let featuredImage = null
      if (featuredMediaUrl) {
        featuredImage = await downloadImage(featuredMediaUrl)
        if (featuredImage) {
          featuredImage.alt = altText
        }
      }
      
      const categories = post.categories
        .map((catId) => categoryIds.get(catId))
        .filter(Boolean)
        .map((id) => ({
          _type: 'reference',
          _ref: id,
        }))
      
      const sanityPost = {
        _type: 'blogPost',
        title: stripHtml(post.title.rendered),
        slug: {
          _type: 'slug',
          current: post.slug,
        },
        author,
        publishedAt: post.date,
        excerpt: stripHtml(post.excerpt.rendered),
        featuredImage,
        categories,
        content: htmlToPortableText(post.content.rendered),
        seo: {
          metaTitle: stripHtml(post.title.rendered),
          metaDescription: stripHtml(post.excerpt.rendered),
        },
      }
      
      await sanityClient.create(sanityPost)
      successCount++
      console.log(`✅ Migrated post: ${sanityPost.title}`)
    } catch (error) {
      errorCount++
      console.error(`❌ Error migrating post ${post.slug}:`, error)
    }
  }
  
  console.log(`\n✅ Successfully migrated ${successCount} posts`)
  console.log(`❌ Failed to migrate ${errorCount} posts`)
}

async function migratePages(pages: WordPressPage[]) {
  console.log('\n📄 Migrating pages...')
  
  let successCount = 0
  let errorCount = 0
  
  for (const page of pages) {
    try {
      const sanityPage = {
        _type: 'page',
        title: stripHtml(page.title.rendered),
        slug: {
          _type: 'slug',
          current: page.slug,
        },
        pageType: 'company', // Default, can be updated manually
        content: htmlToPortableText(page.content.rendered),
        seo: {
          metaTitle: stripHtml(page.title.rendered),
        },
      }
      
      await sanityClient.create(sanityPage)
      successCount++
      console.log(`✅ Migrated page: ${sanityPage.title}`)
    } catch (error) {
      errorCount++
      console.error(`❌ Error migrating page ${page.slug}:`, error)
    }
  }
  
  console.log(`\n✅ Successfully migrated ${successCount} pages`)
  console.log(`❌ Failed to migrate ${errorCount} pages`)
}

async function main() {
  console.log('🚀 Starting WordPress to Sanity migration...')
  console.log(`📍 WordPress URL: ${WORDPRESS_URL}`)
  console.log(`📍 Sanity Project: ${SANITY_PROJECT_ID}`)
  console.log(`📍 Sanity Dataset: ${SANITY_DATASET}\n`)
  
  // Fetch all content from WordPress
  const posts = await fetchWordPressPosts()
  const pages = await fetchWordPressPages()
  
  console.log(`\n📊 Found ${posts.length} posts and ${pages.length} pages`)
  
  // Migrate categories first
  const categoryIds = await migrateCategories(posts)
  
  // Migrate posts
  await migratePosts(posts, categoryIds)
  
  // Migrate pages
  await migratePages(pages)
  
  console.log('\n🎉 Migration complete!')
}

main().catch((error) => {
  console.error('❌ Migration failed:', error)
  process.exit(1)
})

