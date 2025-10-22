# WordPress to Sanity Migration Guide

This guide will help you migrate content from your WordPress site (alldigitalrewards.com) to the new Next.js + Sanity CMS platform.

## Prerequisites

1. **Sanity Account**: Create a free account at [sanity.io](https://www.sanity.io/)
2. **Sanity Project**: Create a new project in your Sanity dashboard
3. **Sanity Token**: Generate a write token with Editor permissions

## Step 1: Set Up Sanity Project

### 1.1 Create Sanity Project

```bash
# Login to Sanity (if not already logged in)
pnpm sanity login

# Initialize Sanity in the project
cd sanity
pnpm sanity init
```

Follow the prompts:
- Select "Create new project"
- Choose a project name (e.g., "All Digital Rewards")
- Use default dataset configuration (production)
- Select "Clean project with no predefined schemas"

### 1.2 Get Your Project Credentials

After initialization, note down:
- **Project ID**: Found in `sanity/sanity.config.ts` or your Sanity dashboard
- **Dataset**: Usually "production"

### 1.3 Generate API Token

1. Go to [manage.sanity.io](https://manage.sanity.io/)
2. Select your project
3. Go to "API" → "Tokens"
4. Click "Add API token"
5. Name it "Migration Script"
6. Set permissions to "Editor"
7. Copy the token (you won't see it again!)

## Step 2: Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Sanity Configuration
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production

# Migration Script Variables
SANITY_TOKEN=your-write-token
WORDPRESS_URL=https://alldigitalrewards.com
```

**Important**: Never commit the `.env` file to version control!

## Step 3: Deploy Sanity Schemas

Deploy your content schemas to Sanity:

```bash
cd sanity
pnpm sanity deploy
```

This will:
- Upload your schema definitions to Sanity
- Make them available in the Sanity Studio
- Enable the migration script to create content

## Step 4: Run the Migration Script

### 4.1 Dry Run (Recommended)

First, test the migration with a small batch:

```bash
# Edit scripts/migrate-wordpress.ts
# Change perPage to 5 in fetchWordPressPosts() and fetchWordPressPages()

pnpm tsx scripts/migrate-wordpress.ts
```

### 4.2 Full Migration

Once you've verified the dry run works:

```bash
# Reset perPage to 100 in the script
pnpm tsx scripts/migrate-wordpress.ts
```

The script will:
1. ✅ Fetch all posts and pages from WordPress REST API
2. ✅ Extract and migrate categories
3. ✅ Download and upload featured images to Sanity
4. ✅ Convert HTML content to Portable Text
5. ✅ Create blog posts with proper relationships
6. ✅ Create pages with SEO metadata

### 4.3 Monitor Progress

The script provides real-time feedback:
- 📥 Fetching progress
- 📂 Category creation
- 📝 Post migration
- 📄 Page migration
- ✅ Success count
- ❌ Error count

## Step 5: Launch Sanity Studio

Start the Sanity Studio to review migrated content:

```bash
cd sanity
pnpm sanity dev
```

Open [http://localhost:3333](http://localhost:3333) to access the Studio.

## Step 6: Manual Content Review

After migration, review and enhance:

### 6.1 Blog Posts
- ✅ Check featured images
- ✅ Verify categories
- ✅ Review content formatting
- ✅ Update SEO metadata

### 6.2 Pages
- ✅ Set correct page types (service, product, solution, etc.)
- ✅ Add hero sections
- ✅ Add feature sections
- ✅ Verify content structure

### 6.3 Navigation
- ✅ Create main navigation menu
- ✅ Create footer navigation
- ✅ Set up mega menu structure
- ✅ Assign colors to menu items

## Step 7: Content Enhancement

### 7.1 Add Missing Content

The migration script handles basic content, but you'll need to manually add:
- Hero sections for pages
- Feature lists
- Call-to-action buttons
- Custom layouts
- Interactive tools
- API documentation

### 7.2 Optimize Images

- Compress images for web
- Add proper alt text
- Set hotspot for cropping

### 7.3 SEO Optimization

- Review meta titles and descriptions
- Add Open Graph images
- Set canonical URLs

## Troubleshooting

### Issue: "Missing required environment variables"

**Solution**: Ensure `.env` file exists with all required variables.

### Issue: "Error fetching WordPress posts"

**Solution**: 
- Check that WordPress REST API is accessible
- Verify WORDPRESS_URL is correct
- Some WordPress sites disable REST API - contact your host

### Issue: "Error downloading image"

**Solution**:
- Images may be behind authentication
- Check image URLs are publicly accessible
- Some images may have been deleted from WordPress

### Issue: "Rate limiting errors"

**Solution**:
- Add delays between requests
- Reduce perPage parameter
- Run migration in smaller batches

## Advanced: Custom Content Types

To migrate additional WordPress content types:

1. Create new schema in `sanity/schemas/`
2. Add to `sanity/schemas/index.ts`
3. Deploy schema: `cd sanity && pnpm sanity deploy`
4. Extend migration script with new fetch and migrate functions

## Next Steps

After successful migration:

1. ✅ Build Next.js components for content display
2. ✅ Set up routing for blog posts and pages
3. ✅ Implement search functionality
4. ✅ Add form handling for lead generation
5. ✅ Deploy to Vercel

## Support

For issues or questions:
- Sanity Documentation: [sanity.io/docs](https://www.sanity.io/docs)
- WordPress REST API: [developer.wordpress.org/rest-api](https://developer.wordpress.org/rest-api/)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)

