
async function testLogin() {
    const users = [
        { email: 'admin@bluecred.io', password: 'password123', role: 'ADMIN' },
        { email: 'ngo@earth.org', password: 'password123', role: 'NGO' },
        { email: 'buyer@corp.com', password: 'password123', role: 'BUYER' }
    ];

    console.log("Verifying credentials against http://localhost:3000/api/auth/login ...");
    let allSuccess = true;

    for (const u of users) {
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: u.email, password: u.password })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.token) {
                    console.log(`[SUCCESS] Logged in as ${u.role} (${u.email})`);
                } else {
                    console.log(`[FAILED] No token returned for ${u.email}`);
                    allSuccess = false;
                }
            } else {
                const data = await res.text();
                console.error(`[FAILED] Could not login as ${u.role} (${u.email}). Status: ${res.status}. Response: ${data}`);
                allSuccess = false;
            }
        } catch (e) {
            console.error(`[ERROR] Connection failed for ${u.email}:`, e.message);
            allSuccess = false;
        }
    }
}

testLogin();
