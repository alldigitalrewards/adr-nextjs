# Setup Instructions

## Environment Variables

This project requires the following environment variables to be configured:

### For the Next.js Application

1. `VITE_SANITY_PROJECT_ID` - Your Sanity project ID
2. `VITE_SANITY_DATASET` - Your Sanity dataset (usually "production")

### For the Migration Script

3. `SANITY_TOKEN` - Your Sanity write token (with Editor permissions)
4. `WORDPRESS_URL` - Your WordPress site URL (default: https://alldigitalrewards.com)

## How to Set Environment Variables

Create a `.env` file in the project root with the following content:

```env
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
SANITY_TOKEN=your-write-token
WORDPRESS_URL=https://alldigitalrewards.com
```

**Important:** Never commit the `.env` file to version control!

## Getting Your Sanity Credentials

1. Go to [sanity.io](https://www.sanity.io/) and create an account
2. Create a new project or use an existing one
3. Find your Project ID in the project settings
4. Generate an API token with Editor permissions from the API section

See `MIGRATION_GUIDE.md` for detailed instructions.

