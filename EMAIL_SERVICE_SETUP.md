# Prime Key Health - Resend Setup Guide

## Quick Setup for darren.bihms@gmail.com

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with your email: **darren.bihms@gmail.com**
3. Verify your email address

### Step 2: Get API Key
1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it: "Prime Key Health Waitlist"
4. Copy the API key (starts with `re_`)

### Step 3: Add Domain (Optional but Recommended)
1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Add your domain (e.g., `d-bac-tea.com`)
4. Follow DNS setup instructions
5. Verify domain (this may take a few minutes)

### Step 4: Deploy Backend to Render.com

#### Option A: Deploy from GitHub
1. Push your code to GitHub
2. Go to [render.com](https://render.com)
3. Sign up/login
4. Click **New +** → **Web Service**
5. Connect your GitHub repository
6. Configure:
   - **Name**: `prime-key-health-backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Option B: Deploy from Local Files
1. Install Render CLI: `npm install -g @render/cli`
2. Login: `render login`
3. Deploy: `render deploy`

### Step 5: Set Environment Variables in Render
In your Render dashboard, go to **Environment** and add:
```
RESEND_API_KEY=re_your_api_key_here
ADMIN_EMAIL=darren.bihms@gmail.com
NODE_ENV=production
PORT=10000
```

### Step 6: Update Frontend API Endpoint
Update the API endpoint in `script.js`:
```javascript
const API_ENDPOINT = 'https://your-render-app-name.onrender.com/api/waitlist';
```

### Step 7: Test the Integration
1. Open your website
2. Fill out the waitlist form
3. Check darren.bihms@gmail.com for:
   - Welcome email to the user
   - Admin notification email

## Email Templates Included

### Welcome Email Features:
- ✅ Professional Prime Key Health branding
- ✅ Personalized based on wellness interest
- ✅ Early access benefits highlighted
- ✅ 20% launch discount mentioned
- ✅ Mobile-responsive design

### Admin Notification Features:
- ✅ Real-time notifications to darren.bihms@gmail.com
- ✅ Complete customer details
- ✅ Professional formatting
- ✅ Timestamp and interest tracking

## Troubleshooting

### Common Issues:

1. **Emails not sending**
   - Check API key is correct
   - Verify domain is set up (if using custom domain)
   - Check Render logs for errors

2. **API errors**
   - Verify environment variables in Render
   - Check API endpoint URL is correct
   - Test with curl: `curl -X POST https://your-app.onrender.com/api/health`

3. **Domain verification**
   - DNS changes can take up to 24 hours
   - Use Resend's test domain for immediate testing

## Production Checklist

- [ ] Resend account created
- [ ] API key obtained
- [ ] Backend deployed to Render
- [ ] Environment variables set
- [ ] Frontend API endpoint updated
- [ ] Test emails sent successfully
- [ ] Domain verified (optional)
- [ ] Monitoring set up

## Cost Estimation

- **Resend**: Free tier includes 3,000 emails/month
- **Render**: Free tier available for backend hosting
- **Total**: $0/month for small to medium usage

## Support

If you need help with setup:
1. Check Render logs: `render logs`
2. Test API: `curl https://your-app.onrender.com/api/health`
3. Contact Resend support for email issues

## Next Steps After Setup

1. **Analytics**: Set up Google Analytics to track form submissions
2. **Database**: Add MongoDB for storing waitlist data
3. **Marketing**: Use collected emails for launch campaigns
4. **Automation**: Set up automated follow-up sequences
5. **Scaling**: Monitor usage and upgrade plans as needed
