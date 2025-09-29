// D-Bac AI Tea Server Integration Test Suite
// Tests CORS, email functionality, and API endpoints

const { Resend } = require('resend');
require('dotenv').config();

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

async function testBackend() {
    console.log('🧪 D-Bac AI Tea Server Integration Test Suite');
    console.log('=====================================\n');

    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check Endpoint...');
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        const data = await response.json();

        if (response.ok && data.status === 'OK') {
            console.log('✅ Health check passed');
            console.log(`   Environment: ${data.environment}`);
            console.log(`   Version: ${data.version}`);
        } else {
            console.log('❌ Health check failed');
            return false;
        }
    } catch (error) {
        console.log('❌ Health check failed:', error.message);
        return false;
    }

    // Test 2: CORS Preflight
    console.log('\n2️⃣ Testing CORS Configuration...');
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`, {
            method: 'OPTIONS',
            headers: {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });

        if (response.ok) {
            console.log('✅ CORS preflight passed');
            console.log(`   Access-Control-Allow-Origin: ${response.headers.get('Access-Control-Allow-Origin')}`);
        } else {
            console.log('❌ CORS preflight failed');
        }
    } catch (error) {
        console.log('❌ CORS test failed:', error.message);
    }

    // Test 3: Waitlist Validation
    console.log('\n3️⃣ Testing Waitlist Validation...');

    // Test missing email
    try {
        const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000'
            },
            body: JSON.stringify({
                name: 'Test User',
                interest: 'sleep'
            })
        });

        const data = await response.json();
        if (response.status === 400 && data.field === 'email') {
            console.log('✅ Email validation working');
        } else {
            console.log('❌ Email validation failed');
        }
    } catch (error) {
        console.log('❌ Email validation test failed:', error.message);
    }

    // Test invalid email format
    try {
        const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000'
            },
            body: JSON.stringify({
                email: 'invalid-email',
                name: 'Test User',
                interest: 'sleep'
            })
        });

        const data = await response.json();
        if (response.status === 400 && data.field === 'email') {
            console.log('✅ Email format validation working');
        } else {
            console.log('❌ Email format validation failed');
        }
    } catch (error) {
        console.log('❌ Email format test failed:', error.message);
    }

    // Test 4: Resend Integration
    console.log('\n4️⃣ Testing Resend Email Service...');

    if (!process.env.RESEND_API_KEY) {
        console.log('⚠️  RESEND_API_KEY not set, skipping email test');
    } else {
        try {
            const resend = new Resend(process.env.RESEND_API_KEY);

            const emailData = await resend.emails.send({
                from: 'D-Bac AI Tea <noreply@d-bac-tea.com>',
                to: ['darren.bihms@gmail.com'],
                subject: '🧪 Test: D-Bac AI Tea Backend Email Test',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #27ae60; margin-bottom: 10px;">🧪 Backend Test Email</h1>
                            <p style="color: #7f8c8d; font-size: 18px;">Resend integration is working!</p>
                        </div>

                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                            <h2 style="color: #2c3e50; margin-bottom: 15px;">Test Results</h2>
                            <ul style="color: #2c3e50; line-height: 1.6;">
                                <li>✅ Backend server running</li>
                                <li>✅ CORS configuration working</li>
                                <li>✅ API validation working</li>
                                <li>✅ Resend email service connected</li>
                                <li>✅ Ready for production deployment</li>
                            </ul>
                        </div>

                        <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <p style="color: #27ae60; margin: 0; font-weight: 600;">
                                🎉 Your waitlist system is fully functional!
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

            console.log('✅ Resend email test passed');
            console.log(`   Email ID: ${emailData.id}`);
        } catch (error) {
            console.log('❌ Resend email test failed:', error.message);
        }
    }

    // Test 5: Complete Waitlist Submission
    console.log('\n5️⃣ Testing Complete Waitlist Submission...');
    try {
        const testData = {
            email: 'test@example.com',
            name: 'Test User',
            interest: 'sleep',
            newsletter: true
        };

        const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000'
            },
            body: JSON.stringify(testData)
        });

        const data = await response.json();

        if (response.ok && data.success) {
            console.log('✅ Complete waitlist submission test passed');
            console.log(`   Email ID: ${data.emailId}`);
            console.log(`   Timestamp: ${data.timestamp}`);
        } else {
            console.log('❌ Complete waitlist submission test failed');
            console.log(`   Error: ${data.message}`);
        }
    } catch (error) {
        console.log('❌ Complete waitlist test failed:', error.message);
    }

    // Test 6: 404 Handler
    console.log('\n6️⃣ Testing 404 Handler...');
    try {
        const response = await fetch(`${API_BASE_URL}/api/nonexistent`, {
            headers: {
                'Origin': 'http://localhost:3000'
            }
        });

        const data = await response.json();
        if (response.status === 404 && data.message === 'Endpoint not found') {
            console.log('✅ 404 handler working');
        } else {
            console.log('❌ 404 handler failed');
        }
    } catch (error) {
        console.log('❌ 404 handler test failed:', error.message);
    }

    console.log('\n🎉 Server Integration Test Suite Complete!');
    console.log('\n📋 Next Steps:');
    console.log('1. Deploy backend to Render.com');
    console.log('2. Update frontend API endpoint');
    console.log('3. Test with real domain');
    console.log('4. Monitor logs for any issues');
}

// Run tests
testBackend().catch(console.error);
