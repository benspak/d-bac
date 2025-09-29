# D-Bac AI Tea - Waitlist System

A complete waitlist system for D-Bac AI Tea with email integration using Resend.

## 📁 Project Structure

### Core Files
- **`server.js`** - Main Express.js server with waitlist API and email integration
- **`package.json`** - Node.js dependencies and scripts
- **`.gitignore`** - Git ignore rules for security and clean repository

### Frontend Files
- **`index.html`** - Landing page with waitlist form
- **`styles.css`** - CSS styling for the landing page
- **`script.js`** - Frontend JavaScript with form validation and API integration

### Testing Files
- **`test-server-integration.js`** - Comprehensive server integration tests
- **`test-email-service.js`** - Email service (Resend) functionality tests

### Deployment Files
- **`deploy-to-render.sh`** - Automated deployment script for Render.com
- **`render.yaml`** - Render.com deployment configuration

### Documentation
- **`WAITLIST_INTEGRATION_GUIDE.md`** - Complete waitlist setup guide
- **`EMAIL_SERVICE_SETUP.md`** - Resend email service setup instructions
- **`DEPLOYMENT_READY.md`** - Production deployment checklist

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file:
```
RESEND_API_KEY=your_resend_api_key_here
ADMIN_EMAIL=darren.bihms@gmail.com
NODE_ENV=development
PORT=3000
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Test the System
```bash
# Test server integration
npm run test:integration

# Test email service
npm run test:email
```

## 📧 Email Integration

The system uses Resend for email delivery:
- **Welcome emails** sent to waitlist subscribers
- **Admin notifications** sent to `darren.bihms@gmail.com`
- **Professional templates** with D-Bac branding

## 🔧 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and version information.

### Waitlist Submission
```
POST /api/waitlist
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "interest": "sleep",
  "newsletter": true
}
```

## 🛡️ Security Features

- **CORS protection** - Configured for your domain
- **Input validation** - Comprehensive form validation
- **Email sanitization** - Normalized email addresses
- **Error handling** - Secure error responses
- **Environment validation** - Required API keys checked on startup

## 🚀 Deployment

### Render.com Deployment
1. Push code to GitHub
2. Connect repository to Render.com
3. Set environment variables in Render dashboard
4. Deploy!

### Environment Variables for Production
```
RESEND_API_KEY=re_your_api_key
ADMIN_EMAIL=darren.bihms@gmail.com
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://your-domain.com
```

## 🧪 Testing

### Available Test Commands
```bash
npm test                    # Run server integration tests
npm run test:integration    # Run server integration tests
npm run test:email         # Test email service functionality
```

### Manual Testing
```bash
# Start server
npm start

# Test health endpoint
curl http://localhost:3000/api/health

# Test waitlist submission
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","interest":"sleep"}'
```

## 📊 Features

### Waitlist Form
- ✅ Email validation
- ✅ Name validation
- ✅ Interest selection
- ✅ Newsletter opt-in
- ✅ Real-time validation
- ✅ Loading states
- ✅ Success messages

### Email System
- ✅ Welcome emails to subscribers
- ✅ Admin notifications to darren.bihms@gmail.com
- ✅ Professional HTML templates
- ✅ Mobile-responsive design
- ✅ Error handling and retry logic

### Backend API
- ✅ Express.js server
- ✅ CORS configuration
- ✅ Request validation
- ✅ Error handling
- ✅ Logging
- ✅ Health checks
- ✅ Graceful shutdown

## 🔒 Security

- Environment variables protected by `.gitignore`
- API keys validated on startup
- CORS properly configured
- Input sanitization and validation
- Secure error responses
- No sensitive data in logs

## 📈 ROI Optimization

This waitlist system is designed to maximize ROI:
- **Lead capture** before product launch
- **Email marketing** list building
- **Customer insights** through interest tracking
- **Early access** creates anticipation
- **Launch discount** drives conversions

## 🆘 Support

For issues or questions:
1. Check the documentation files
2. Run the test suites
3. Check server logs
4. Verify environment variables

## 📝 License

MIT License - See package.json for details
