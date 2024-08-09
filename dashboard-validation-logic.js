    (function() {
        // Function to get a cookie value by name
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        // Retrieve the authToken from cookies
        const authToken = getCookie('authToken');

        // Redirect to the homepage if authToken is not present
        if (!authToken) {
            window.location.href = '/';
            return;
        }

        // Retrieve the values from local storage
        const onboardingStatus = localStorage.getItem('onboarding-status') === 'true';
        const verificationStatus = localStorage.getItem('verification-status') === 'true';

        // Determine if the current hostname is server.wized.com
        const isServerWized = window.location.hostname === 'server.wized.com';

        // Redirect function to handle different environments
        const redirect = (path) => {
            if (isServerWized) {
                window.location.pathname = path;
            } else {
                window.location.href = path;
            }
        };

        // Redirect based on the values
        if (!verificationStatus && !onboardingStatus) {
            redirect('/auth/verification');
        } else if (verificationStatus && !onboardingStatus) {
            redirect('/auth/onboarding');
        }
    })();
