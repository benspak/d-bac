// D-Bac AI Tea Backend - Production Ready
// Waitlist Integration with Resend Email Service

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();

// Validate required environment variables
if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is required but not set');
    process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);

// CORS Configuration - Allow requests from your frontend domain
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        // Allow localhost for development
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return callback(null, true);
        }

        // Allow your production domain
        const allowedOrigins = [
            'https://your-domain.com',
            'https://www.your-domain.com',
            'https://d-bac-tea.com',
            'https://www.d-bac-tea.com'
        ];

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Allow any origin in development (remove in production)
        if (process.env.NODE_ENV === 'development') {
            return callback(null, true);
        }

        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static('.', {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0', // Cache for 1 day in production
    etag: true,
    lastModified: true
}));

// Add cache-busting headers for CSS files
app.use('/styles.css', (req, res, next) => {
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Serve the main HTML file for the root path
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Waitlist endpoint
app.post('/api/waitlist', async (req, res) => {
    try {
        const { email, name, interest, newsletter } = req.body;

        // Validate required fields with detailed error messages
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email address is required',
                field: 'email'
            });
        }

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Full name is required',
                field: 'name'
            });
        }

        if (!interest) {
            return res.status(400).json({
                success: false,
                message: 'Please select your primary wellness goal',
                field: 'interest'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address',
                field: 'email'
            });
        }

        // Validate name length
        if (name.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Name must be at least 2 characters long',
                field: 'name'
            });
        }

        // Validate interest value
        const validInterests = ['sleep', 'digestion', 'energy', 'stress', 'immunity', 'general'];
        if (!validInterests.includes(interest)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid interest selection',
                field: 'interest'
            });
        }

        // Store in database (example with MongoDB)
        const waitlistEntry = {
            email: email.toLowerCase().trim(),
            name: name.trim(),
            interest,
            newsletter: newsletter || false,
            timestamp: new Date(),
            status: 'pending',
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent')
        };

        // TODO: Save to database
        // await db.collection('waitlist').insertOne(waitlistEntry);
        console.log('📝 Waitlist entry:', waitlistEntry);

        // Send confirmation email using Resend
        console.log('📧 Sending welcome email to:', email);
        const emailData = await resend.emails.send({
            from: 'D-Bac AI Tea <noreply@d-bac-tea.com>',
            to: [email.toLowerCase().trim()],
            subject: 'Welcome to the D-Bac AI Tea Waitlist! 🍃',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #27ae60; margin-bottom: 10px;">Welcome to D-Bac AI Tea!</h1>
                        <p style="color: #7f8c8d; font-size: 18px;">Thank you for joining our exclusive waitlist</p>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h2 style="color: #2c3e50; margin-bottom: 15px;">What's Next?</h2>
                        <ul style="color: #2c3e50; line-height: 1.6;">
                            <li>🎁 <strong>Early Access:</strong> You'll be among the first to try our premium AI-crafted tea blends</li>
                            <li>💰 <strong>Launch Discount:</strong> Enjoy 20% off your first order when we launch</li>
                            <li>📧 <strong>Exclusive Content:</strong> Receive wellness tips and tea recipes</li>
                            <li>⭐ <strong>VIP Support:</strong> Priority customer service</li>
                        </ul>
                    </div>

                    <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="color: #27ae60; margin: 0; font-weight: 600;">
                            Your Interest: ${getInterestDisplayName(interest)}
                        </p>
                    </div>

                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #7f8c8d; font-size: 14px;">
                            We'll notify you as soon as our premium tea blends are ready!
                        </p>
                        <p style="color: #7f8c8d; font-size: 12px; margin-top: 20px;">
                            D-Bac AI Health Tea | Wellness in Every Cup
                        </p>
                    </div>
                </div>
            `
        });

        // Send notification to admin
        const adminEmail = process.env.ADMIN_EMAIL || 'darren.bihms@gmail.com';
        console.log('📧 Sending admin notification to:', adminEmail);

        try {
            await resend.emails.send({
                from: 'D-Bac AI Tea <noreply@d-bac-tea.com>',
                to: [adminEmail],
                subject: `🎉 New Waitlist Signup: ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background-color: #27ae60; color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                        <h1 style="margin: 0; font-size: 24px;">🎉 New Waitlist Signup!</h1>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h2 style="color: #2c3e50; margin-bottom: 15px;">Customer Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Name:</td>
                                <td style="padding: 8px 0; color: #2c3e50;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Email:</td>
                                <td style="padding: 8px 0; color: #2c3e50;">${email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Interest:</td>
                                <td style="padding: 8px 0; color: #27ae60; font-weight: 600;">${getInterestDisplayName(interest)}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Newsletter:</td>
                                <td style="padding: 8px 0; color: #2c3e50;">${newsletter ? '✅ Yes' : '❌ No'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Timestamp:</td>
                                <td style="padding: 8px 0; color: #2c3e50;">${new Date().toLocaleString()}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="color: #27ae60; margin: 0; font-weight: 600;">
                            📈 Total waitlist members: [Database count would go here]
                        </p>
                    </div>

                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #7f8c8d; font-size: 14px;">
                            D-Bac AI Health Tea | Wellness in Every Cup
                        </p>
                    </div>
                </div>
            `
            });
            console.log('✅ Admin notification sent successfully');
        } catch (adminError) {
            console.error('❌ Failed to send admin notification:', adminError);
            // Don't fail the entire request if admin notification fails
        }

        console.log('✅ Waitlist submission successful');
        res.json({
            success: true,
            message: 'Successfully joined waitlist!',
            emailId: emailData.id,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Waitlist submission error:', error);

        // Handle specific Resend errors
        if (error.name === 'ResendError') {
            return res.status(400).json({
                success: false,
                message: 'Email service temporarily unavailable. Please try again later.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        // Generic error response
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Helper function to get display name for interest
function getInterestDisplayName(interest) {
    const interestMap = {
        'sleep': 'Better Sleep',
        'digestion': 'Digestive Health',
        'energy': 'Energy & Vitality',
        'stress': 'Stress Relief',
        'immunity': 'Immune Support',
        'general': 'General Wellness'
    };
    return interestMap[interest] || interest;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
    });
});

// CORS preflight handler
app.options('*', cors(corsOptions));

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        path: req.originalUrl
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('🚨 Global error handler:', error);

    if (error.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'CORS policy violation'
        });
    }

    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`🚀 D-Bac AI Tea Backend running on port ${PORT}`);
    console.log(`📧 Admin notifications: ${process.env.ADMIN_EMAIL || 'darren.bihms@gmail.com'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Process terminated');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Process terminated');
        process.exit(0);
    });
});

module.exports = app;
