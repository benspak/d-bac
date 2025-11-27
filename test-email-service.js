// Prime Key Health Email Service Test
// Tests Resend integration and email delivery functionality

const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmailDelivery() {
    try {
        console.log('🧪 Testing Prime Key Health Email Service...');

        // Test welcome email
        const welcomeEmail = await resend.emails.send({
            from: 'Prime Key Health <noreply@d-bac-tea.com>',
            to: ['darren.bihms@gmail.com'],
            subject: '🧪 Test: Prime Key Health Waitlist Welcome Email',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #27ae60; margin-bottom: 10px;">🧪 Test Email</h1>
                        <p style="color: #7f8c8d; font-size: 18px;">Resend integration is working!</p>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h2 style="color: #2c3e50; margin-bottom: 15px;">Test Details</h2>
                        <ul style="color: #2c3e50; line-height: 1.6;">
                            <li>✅ Resend API connection successful</li>
                            <li>✅ Email template rendering correctly</li>
                            <li>✅ Delivery to darren.bihms@gmail.com working</li>
                            <li>✅ Ready for production deployment</li>
                        </ul>
                    </div>

                    <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="color: #27ae60; margin: 0; font-weight: 600;">
                            🎉 Your waitlist system is ready to go!
                        </p>
                    </div>

                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #7f8c8d; font-size: 14px;">
                            Prime Key Health | Wellness in Every Cup
                        </p>
                    </div>
                </div>
            `
        });

        console.log('✅ Welcome email sent successfully!');
        console.log('📧 Email ID:', welcomeEmail.id);

        // Test admin notification
        const adminEmail = await resend.emails.send({
            from: 'Prime Key Health <noreply@d-bac-tea.com>',
            to: ['darren.bihms@gmail.com'],
            subject: '🧪 Test: Admin Notification',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background-color: #27ae60; color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                        <h1 style="margin: 0; font-size: 24px;">🧪 Test Admin Notification</h1>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h2 style="color: #2c3e50; margin-bottom: 15px;">Test Customer Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Name:</td>
                                <td style="padding: 8px 0; color: #2c3e50;">Test User</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Email:</td>
                                <td style="padding: 8px 0; color: #2c3e50;">test@example.com</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Interest:</td>
                                <td style="padding: 8px 0; color: #27ae60; font-weight: 600;">Better Sleep</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Newsletter:</td>
                                <td style="padding: 8px 0; color: #2c3e50;">✅ Yes</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #2c3e50;">Timestamp:</td>
                                <td style="padding: 8px 0; color: #2c3e50;">${new Date().toLocaleString()}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #7f8c8d; font-size: 14px;">
                            Prime Key Health | Wellness in Every Cup
                        </p>
                    </div>
                </div>
            `
        });

        console.log('✅ Admin notification sent successfully!');
        console.log('📧 Email ID:', adminEmail.id);

        console.log('\n🎉 All tests passed! Your Resend integration is working perfectly.');
        console.log('📧 Check darren.bihms@gmail.com for both test emails.');

    } catch (error) {
        console.error('❌ Test failed:', error);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Check your RESEND_API_KEY in .env file');
        console.log('2. Verify the API key is correct');
        console.log('3. Make sure you have sufficient credits in Resend');
    }
}

// Run the test
testEmailDelivery();
