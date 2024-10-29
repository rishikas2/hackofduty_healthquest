function toggleSignUp() {
    const form = document.getElementById('login-form');
    const buttonsContainer = document.querySelector('.buttons');

    // Check if the form is currently for login
    if (form.dataset.mode === 'login') {
        // Change to sign up mode
        form.dataset.mode = 'signup';
        form.innerHTML = `
        <div class="cred"><img class="logo" src="icon2.png" alt="logo"></div>
            <div class="cred">
                <input type="text" id="name" name="name" placeholder="Your Name" required>
            </div>
            <div class="cred">
                <input type="text" id="mobile" name="mobile" placeholder="Your Mobile" required>
            </div>
            <div class="cred">
                <input type="number" id="age" name="age" placeholder="Your Age" required>
            </div>
            <div class="cred">
                <input type="password" placeholder="Enter password" required>
            </div>
            <div class="buttons">
                <button type="submit">Sign Up</button>
                <button type="button" id="login-button" onclick="toggleLogin()">Already have an account? Login</button>
            </div>
        `;
    }
}

function toggleLogin() {
    const form = document.getElementById('login-form');
    form.dataset.mode = 'login';
    form.innerHTML = `
        <div class="cred"><img class="logo" src="icon2.png" alt="logo"></div>
        <div class="cred">
            <input 
                type="text" 
                id="username" 
                name="username" 
                placeholder="Your Mobile/Email" 
                required 
                pattern="(\\+?\\d{1,4}[-.\\s]?)?(\\(?\\d{3}\\)?[-.\\s]?)?\\d{3}[-.\\s]?\\d{4}|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" 
                title="Please enter a valid email or phone number">
        </div>
        <div class="cred">
            <input type="password" placeholder="Enter password" required>
        </div>
        <div class="buttons">
            <button type="submit">Login</button>
            <button type="button" id="signup-button" onclick="toggleSignUp()">Don't have an account? Sign Up</button>
        </div>
    `;
}