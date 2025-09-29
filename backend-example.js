// Backend Example for Waitlist Integration with Resend
// This is a Node.js/Express example for production deployment

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Waitlist endpoint
app.post('/api/waitlist', async (req, res) => {
    try {
        const { email, name, interest, newsletter } = req.body;

        // Validate required fields
        if (!email || !name || !interest) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Store in database (example with MongoDB)
        const waitlistEntry = {
            email,
            name,
            interest,
            newsletter: newsletter || false,
            timestamp: new Date(),
            status: 'pending'
        };

        // TODO: Save to database
        // await db.collection('waitlist').insertOne(waitlistEntry);

        // Send confirmation email using Resend
        const emailData = await resend.emails.send({
            from: 'D-Bac AI Tea <noreply@d-bac-tea.com>',
            to: [email],
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

        res.json({
            success: true,
            message: 'Successfully joined waitlist!',
            emailId: emailData.id
        });

    } catch (error) {
        console.error('Waitlist submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
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
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
