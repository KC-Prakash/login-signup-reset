document.addEventListener('DOMContentLoaded', () => {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const matchText = document.getElementById('matchText');
    const requirements = document.querySelectorAll('.requirement');

    // Initially hide strength text and bar
    strengthText.style.display = 'none';
    strengthBar.style.width = '0';

    const checkPasswordStrength = () => {
        const pass = password.value;

        // Only show strength bar and text if password is not empty
        if (pass.length > 0) {
            strengthText.style.display = 'inline'; // Show strength text
            strengthBar.style.display = 'block'; // Show strength bar
        } else {
            strengthText.style.display = 'none'; // Hide strength text
            strengthBar.style.display = 'none'; // Hide strength bar
        }

        const strength = getPasswordStrength(pass);
        
        // Update the strength bar
        strengthBar.style.width = `${strength.percent}%`;

        // Change the strength bar color based on strength
        if (strength.percent < 40) {
            strengthBar.style.backgroundColor = 'red';
            strengthText.textContent = 'Weak';
            strengthText.style.color = 'red';
        } else if (strength.percent < 70) {
            strengthBar.style.backgroundColor = 'orange';
            strengthText.textContent = 'Medium';
            strengthText.style.color = 'orange';
        } else {
            strengthBar.style.backgroundColor = 'green';
            strengthText.textContent = 'Strong';
            strengthText.style.color = 'green';
        }

        // Update password requirements
        requirements.forEach((req, index) => {
            const regex = getRequirementRegex(index);
            if (regex.test(pass)) {
                req.querySelector('.symbol').style.color = 'green';
                req.querySelector('.description').style.color = 'green';
                req.querySelector('.description').style.fontWeight = 'bold';
            } else {
                req.querySelector('.symbol').style.color = 'white';
                req.querySelector('.description').style.color = 'white';
                req.querySelector('.description').style.fontWeight = 'normal';
            }
        });
    };

    const getPasswordStrength = (password) => {
        let strength = 0;
        const lengthCriteria = password.length >= 8;
        const digitCriteria = /\d/.test(password);
        const upperCriteria = /[A-Z]/.test(password);
        const lowerCriteria = /[a-z]/.test(password);
        const symbolCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (lengthCriteria) strength += 20;
        if (digitCriteria) strength += 20;
        if (upperCriteria) strength += 20;
        if (lowerCriteria) strength += 20;
        if (symbolCriteria) strength += 20;

        return {
            percent: strength
        };
    };

    const getRequirementRegex = (index) => {
        const regexes = [
            /\d/, // 0-9
            /[A-Z]/, // Uppercase
            /[!@#$%^&*(),.?":{}|<>]/, // Symbol
            /[a-z]/, // Lowercase
            /.{8,}/ // Length
        ];
        return regexes[index];
    };

    // Check password strength on input
    password.addEventListener('input', () => {
        // Clear the confirm password field and reset matchText when password is changed
        if (password.value === '') {
            confirmPassword.value = ''; // Clear confirm password field
            matchText.textContent = ''; // Clear match text
            matchText.style.color = 'black'; // Reset color of match text
        }
        matchText.textContent = ''; // Reset match text when password is changed
        matchText.style.color = 'black'; // Reset color
        checkPasswordStrength();
    });

    // Check password match
    confirmPassword.addEventListener('input', () => {
        if (confirmPassword.value === password.value) {
            matchText.textContent = 'Passwords match';
            matchText.style.color = 'green';
        } else if (confirmPassword.value === '') {
            matchText.textContent = ''; // Clear matchText if confirmPassword is empty
            matchText.style.color = 'black';
        } else {
            matchText.textContent = 'Passwords do not match';
            matchText.style.color = 'red';
        }
    });

    // Clear both password fields when a reset or custom clear action is triggered
    const clearFields = () => {
        password.value = '';         // Clear the password field
        confirmPassword.value = '';  // Clear the confirm password field
        matchText.textContent = '';  // Clear the match text
        matchText.style.color = 'black';  // Reset color of match text
        strengthBar.style.width = '0';  // Reset the strength bar
        strengthText.style.display = 'none';  // Hide the strength text
    };

    // Optionally, you can trigger this function on some custom button click, form reset, or event
    document.getElementById('clearButton').addEventListener('click', clearFields); // Example button to clear fields

    // Initial check on load (just in case there's a pre-filled password)
    checkPasswordStrength();
});
