// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-bs-theme', currentTheme);
  darkModeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';

  darkModeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    darkModeToggle.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  });

  // Verification System
  const verifyButton = document.getElementById('verify-button');
  const uinInput = document.getElementById('uin-input');
  const resultDiv = document.getElementById('result');
  const loader = document.getElementById('loader');

  verifyButton.addEventListener('click', async () => {
    const uin = uinInput.value.trim();
    
    if (!uin) {
      showResult('Please enter a valid verification ID', 'error');
      return;
    }

    loader.style.display = 'block';
    resultDiv.style.display = 'none';

    // Simulated API call
    try {
      const response = await mockApiCall(uin);
      showResult(response.message, response.status);
    } catch (error) {
      showResult(error.message, 'error');
    } finally {
      loader.style.display = 'none';
    }
  });

  // Mock API Function
  async function mockApiCall(uin) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const validIDs = ['12345', 'AUTH2024', 'TRUST987'];
        if (validIDs.includes(uin)) {
          resolve({
            status: 'success',
            message: `Verified Successfully!<br>Business Name: Tech Corp Inc<br>Registration Date: 2022-01-15<br>Status: Active`
          });
        } else {
          reject(new Error('Invalid verification ID. Please check and try again.'));
        }
      }, 1500);
    });
  }

  // Result Display
  function showResult(message, type) {
    resultDiv.innerHTML = message;
    resultDiv.className = '';
    resultDiv.classList.add(type);
    resultDiv.style.display = 'block';
    
    // Add animation
    resultDiv.style.animation = 'fadeIn 0.5s ease';
    setTimeout(() => resultDiv.style.animation = '', 500);
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
