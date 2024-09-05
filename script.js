document.addEventListener('DOMContentLoaded', function () {
	const loginWrapper = document.getElementById('login-wrapper');
	const registrationWrapper = document.getElementById('registration-wrapper');
	const loginForm = document.getElementById('loginForm');
	const registrationForm = document.getElementById('registrationForm');
	const loader = document.getElementById('loader');
	const modal = document.getElementById('modal');
	const modalMessage = document.getElementById('modal-message');
	const modalClose = document.getElementById('modal-close');

	// Toggle between registration and login forms
	document.querySelectorAll('.reg-login-option').forEach(function (link) {
		link.addEventListener('click', function (event) {
			event.preventDefault();
			const targetId = this.getAttribute('data-target');
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				loginWrapper.style.display =
					targetId === '#login-wrapper' ? 'block' : 'none';
				registrationWrapper.style.display =
					targetId === '#registration-wrapper' ? 'block' : 'none';
			}
		});
	});

	function displayModal(message) {
		modalMessage.textContent = message;
		modal.classList.remove('hidden');
	}

	function hideModal() {
		modal.classList.add('hidden');
	}

	function showLoaderAfterModal() {
		setTimeout(() => {
			hideModal();
			loader.style.display = 'block';
			setTimeout(() => {
				window.location.href = 'dashboard.html';
			}, 3000);
		}, 3000);
	}

	// Handle registration form submission
	registrationForm.addEventListener('submit', function (event) {
		event.preventDefault();
		const username = document.getElementById('regUsername').value.trim();
		const email = document.getElementById('regEmail').value.trim();
		const password = document.getElementById('regPassword').value.trim();
		const confirmPassword = document
			.getElementById('regConfirmPassword')
			.value.trim();

		if (!username || !email || !password || !confirmPassword) {
			displayModal('All fields are required!');
			return;
		}

		if (password !== confirmPassword) {
			displayModal('Passwords do not match!');
			return;
		}

		const existingUser = localStorage.getItem('user');
		if (existingUser) {
			displayModal('User is already registered. Please log in.');
			return;
		}

		localStorage.setItem('user', JSON.stringify({ username, email, password }));
		displayModal('Registration successful! Redirecting to dashboard...');
		showLoaderAfterModal();
	});

	// Handle login form submission
	loginForm.addEventListener('submit', function (event) {
		event.preventDefault();
		const username = document.getElementById('loginUsername').value.trim();
		const password = document.getElementById('loginPassword').value.trim();

		if (!username || !password) {
			displayModal('Username and password are required!');
			return;
		}

		const userData = JSON.parse(localStorage.getItem('user'));
		if (!userData) {
			displayModal('No registered users found. Please sign up.');
			return;
		}

		if (userData.username === username && userData.password === password) {
			displayModal('Login successful! Redirecting to dashboard...');
			showLoaderAfterModal();
		} else {
			displayModal('Invalid username or password!');
		}
	});

	// Close modal when close button is clicked
	modalClose.addEventListener('click', hideModal);

	// Close modal when clicking outside the modal content
	window.addEventListener('click', function (event) {
		if (event.target === modal) {
			hideModal();
		}
	});
});
