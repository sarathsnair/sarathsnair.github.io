# Google Analytics Setup Guide

This portfolio includes Google Analytics 4 (GA4) integration for tracking visitor analytics.

## Setup Instructions

### 1. Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" or "Admin" (gear icon)

### 2. Create a Property

1. In Admin, click "Create Property"
2. Enter your property name (e.g., "Sarath S Nair Portfolio")
3. Select your timezone and currency
4. Click "Next"

### 3. Set Up Data Stream

1. Select "Web" as the platform
2. Enter your website URL: `https://sarathsnair.me`
3. Enter stream name: "Portfolio Website"
4. Click "Create stream"

### 4. Get Your Measurement ID

After creating the data stream, you'll see your **Measurement ID** in the format `G-XXXXXXXXXX`

### 5. Add to Your Project

1. Create a `.env.local` file in the root directory (use `.env.local.example` as template):

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your Measurement ID:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 6. For GitHub Pages Deployment

Since this is a static export, you need to add the environment variable to your GitHub Actions workflow:

1. Go to your GitHub repository
2. Click "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Name: `GA_MEASUREMENT_ID`
5. Value: Your Measurement ID (e.g., `G-XXXXXXXXXX`)
6. Click "Add secret"

Then update your `.github/workflows/deploy.yml` to include the environment variable during build:

```yaml
- name: Build
  run: npm run build
  env:
    NEXT_PUBLIC_GA_MEASUREMENT_ID: ${{ secrets.GA_MEASUREMENT_ID }}
```

### 7. Test Your Setup

#### Local Testing:
```bash
npm run dev
```

Visit `http://localhost:3000` and open browser DevTools > Network tab. You should see requests to `google-analytics.com/g/collect`.

#### Production Testing:
After deploying, visit your live site and check:
1. Open DevTools > Network tab
2. Filter by "gtag" or "collect"
3. You should see analytics requests being sent

Or use the [Google Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

### 8. Verify in Google Analytics

1. Go to your GA4 property
2. Click "Reports" > "Realtime"
3. Visit your website in another tab
4. You should see yourself as an active user within ~10 seconds

## Features Tracked

The implementation tracks the following metrics:

### Automatic Tracking:
- **Page views** - Every time someone visits your portfolio
- **User sessions** - Duration and engagement
- **Traffic sources** - Where visitors came from (Google, LinkedIn, direct, etc.)
- **Device/browser information** - Desktop vs mobile, browser types
- **Geographic location** - Country and city of visitors

### Custom Event Tracking:

#### 1. **Resume Downloads** (Most Important!)
Every time someone clicks on your Resume button/link, tracked as:
- Event: `resume_download`
- Category: `engagement`
- Label: `Resume Download Click`

#### 2. **Social Media Clicks**
Tracks clicks on all social media links:
- Event: `social_click`
- Platforms tracked: GitHub, LinkedIn, Email
- Shows which platform gets the most attention

#### 3. **Project Links**
Tracks when users click on project links:
- Event: `project_click`
- Types: `demo` (live demo) or `github` (source code)
- Includes project name to see which projects generate the most interest

#### 4. **Experience/Company Links**
Tracks clicks on company website links:
- Event: `experience_click`
- Shows which companies visitors want to learn more about

#### 5. **Section Navigation**
Tracks when users navigate to different sections via footer links:
- Event: `section_navigation`
- Sections: Experience, Projects, Education, Achievements

## Viewing Your Analytics Data

Once set up, you can view these metrics in Google Analytics:

### For Resume Downloads:
1. Go to Reports > Engagement > Events
2. Look for `resume_download` event
3. You'll see:
   - Total resume download clicks
   - Downloads over time
   - Which traffic sources lead to the most downloads

### For Social Media Clicks:
1. Go to Reports > Engagement > Events
2. Look for `social_click` event
3. Click on the event to see breakdown by platform (github, linkedin, email)

### For Project Clicks:
1. Go to Reports > Engagement > Events
2. Look for `project_click` event
3. See which projects get the most clicks and whether people prefer demos or code

### Creating Custom Reports:

You can create custom reports to answer specific questions:
- "Which traffic source leads to the most resume downloads?"
- "What's the conversion rate from page view to resume download?"
- "Which projects are most popular with visitors from LinkedIn?"

To create a custom report:
1. Go to Explore (in left sidebar)
2. Click "Blank" to create a new exploration
3. Add dimensions (e.g., Event name, Traffic source)
4. Add metrics (e.g., Event count, Users)
5. Drag dimensions and metrics to build your report

## Privacy Considerations

- Google Analytics respects "Do Not Track" browser settings
- Analytics only loads on the client-side
- No personally identifiable information (PII) is collected
- Compliant with GDPR when used properly

## Troubleshooting

### Analytics Not Working?

1. **Check environment variable**: Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
2. **Clear cache**: Clear browser cache and hard reload (Cmd/Ctrl + Shift + R)
3. **Check Console**: Look for any JavaScript errors in browser DevTools
4. **Ad blockers**: Disable ad blockers temporarily to test
5. **Check Network tab**: Verify requests to `googletagmanager.com` are not blocked

### Still Not Working?

Check that:
- Your Measurement ID format is correct: `G-XXXXXXXXXX`
- The Data Stream is active in GA4
- You're looking at "Realtime" reports (standard reports can take 24-48 hours)

## Additional Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
