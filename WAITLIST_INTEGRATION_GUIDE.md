# Prime Key Health - Waitlist Integration

This project includes a complete email waitlist form integration with Resend for production deployment.

## Features

- ✅ Modern, responsive waitlist form
- ✅ Real-time form validation
- ✅ Professional email templates
- ✅ Resend integration for reliable email delivery
- ✅ Admin notifications
- ✅ Production-ready backend API
- ✅ Mobile-optimized design

## Setup Instructions

### 1. Frontend (Already Complete)
The waitlist form is already integrated into the landing page with:
- Professional styling matching the brand
- Form validation and error handling
- Loading states and success messages
- Mobile-responsive design

### 2. Backend Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file with:
   ```
   RESEND_API_KEY=your_resend_api_key_here
   ADMIN_EMAIL=admin@d-bac-tea.com
   PORT=3000
   NODE_ENV=production
   ```

3. **Get Resend API Key**
   - Sign up at [resend.com](https://resend.com)
   - Create an API key
   - Add your domain for sending emails

4. **Deploy Backend**
   - Deploy to Render.com or your preferred platform
   - Update the frontend API endpoint in `script.js`

### 3. Frontend API Integration

Update the `submitWaitlistData` function in `script.js`:

```javascript
async function submitWaitlistData(data) {
    const response = await fetch('https://your-backend-url.com/api/waitlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to submit waitlist data');
    }

    return response.json();
}
```

## Email Templates

The backend includes professional email templates for:
- Welcome email to new waitlist members
- Admin notifications for new signups
- Customizable based on user interests

## Database Integration

The backend is ready for database integration. Uncomment the MongoDB code in `backend-example.js` and configure your database connection.

## Production Deployment

1. **Frontend**: Deploy static files to any CDN or hosting service
2. **Backend**: Deploy to Render.com, Heroku, or similar platform
3. **Domain**: Configure your domain with Resend for email sending
4. **Monitoring**: Set up error tracking and analytics

## ROI Optimization

This waitlist system is designed to maximize ROI by:
- Capturing high-intent leads
- Building anticipation for launch
- Creating email marketing opportunities
- Providing early customer insights
- Enabling pre-launch marketing campaigns

## Next Steps

1. Set up Resend account and API key
2. Deploy backend to production
3. Update frontend API endpoint
4. Test email delivery
5. Set up analytics tracking
6. Launch marketing campaigns

## Support

For technical support or customization requests, contact the development team.
