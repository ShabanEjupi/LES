# LES Database Setup Guide

## Prerequisites

Before setting up the database, you need:

1. **Neon Database Account**: Sign up at [neon.tech](https://neon.tech)
2. **Netlify Account**: Your site should be deployed at `kundervajtje.netlify.app`

## Step 1: Set up Neon Database

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project or use an existing one
3. Copy your database connection string (it looks like this):
   ```
   postgresql://username:password@ep-xxxx-xxxx.region.neon.tech/dbname
   ```

## Step 2: Configure Netlify Environment Variables

1. Go to your Netlify dashboard
2. Navigate to your site: `kundervajtje.netlify.app`
3. Go to **Site settings > Environment variables**
4. Add the following environment variables:

   ```
   DATABASE_URL=postgresql://username:password@ep-xxxx-xxxx.region.neon.tech/dbname
   NEON_DATABASE_URL=postgresql://username:password@ep-xxxx-xxxx.region.neon.tech/dbname
   JWT_SECRET=your-super-secure-random-string-at-least-32-characters-long
   ```

   **Important**: Replace the database URLs with your actual Neon connection string!

## Step 3: Update Netlify Deployment Settings

1. In Netlify dashboard, go to **Site settings > Build & deploy**
2. Under **Production branch**, change it from `master` to `main`
3. Save the settings

## Step 4: Trigger a New Deployment

1. In your Netlify dashboard, go to **Deploys**
2. Click **Trigger deploy** > **Deploy site**
3. Wait for the deployment to complete

## Step 5: Initialize the Database

1. Once deployed, visit: `https://kundervajtje.netlify.app/admin/database-init`
2. Click the **"Initialize Database"** button
3. Wait for the success message

## Step 6: Test Login

1. Go to: `https://kundervajtje.netlify.app/login`
2. Use these default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

## Troubleshooting

### If you get "Page not found" errors for functions:
- Check that environment variables are set correctly
- Ensure the site is deploying from the `main` branch
- Verify the build completed successfully

### If database connection fails:
- Double-check your Neon database URL
- Make sure the database is not paused (Neon pauses unused databases)
- Verify the connection string includes the correct database name

### If login fails after successful database init:
- Check browser console for errors
- Verify the JWT_SECRET is set
- Try the database initialization again

## Sample Neon Database SQL (for manual setup)

If you want to manually run the database setup in Neon's SQL editor, use this:

```sql
-- Create tables and initial data
-- This is automatically done by the initialization, but you can run it manually if needed

-- First, you might want to create the sample table from your original query:
CREATE TABLE IF NOT EXISTS playing_with_neon(id SERIAL PRIMARY KEY, name TEXT NOT NULL, value REAL);
INSERT INTO playing_with_neon(name, value)
  SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);
SELECT * FROM playing_with_neon;

-- The LES system will create its own tables when you run the initialization
```

## Security Notes

- Change the default admin password after first login
- Use a strong, unique JWT_SECRET in production
- Consider setting up additional user accounts with appropriate permissions
