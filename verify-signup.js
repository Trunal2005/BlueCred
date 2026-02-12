
async function testSignupAndLogin() {
    const email = `test_user_${Date.now()}@example.com`;
    const password = 'password123';
    const name = 'Test User';
    const role = 'COMMUNITY';

    console.log(`Testing Signup for ${email}...`);

    try {
        // 1. Signup
        const signupRes = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, role })
        });

        if (signupRes.ok) {
            console.log('[SUCCESS] Signup successful');
            const signupData = await signupRes.json();
            // 2. Login
            console.log(`Testing Login for ${email}...`);
            const loginRes = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (loginRes.ok) {
                const loginData = await loginRes.json();
                if (loginData.token) {
                    console.log('[SUCCESS] Login successful. Token received.');
                } else {
                    console.error('[FAILED] Login succeeded but no token returned.');
                }
            } else {
                console.error(`[FAILED] Login failed. Status: ${loginRes.status}`);
                console.error(await loginRes.text());
            }

        } else {
            console.error(`[FAILED] Signup failed. Status: ${signupRes.status}`);
            console.error(await signupRes.text());
        }

    } catch (e) {
        console.error('[ERROR] Request failed:', e.message);
    }
}

testSignupAndLogin();
