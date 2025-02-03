const Q = (q) => document.querySelector(q);

Q('.dark-mode-switch').addEventListener('click', (ev) => {
  Q('body').classList.toggle('switching', true);
  setTimeout(() => {
    Q('body').classList.toggle('switching', false);
  }, 200);
  Q('.dark-mode-switch').classList.toggle('dark');
  Q('body').classList.toggle('dark');
});

var full=false;

function fill() {
  full = !full;
  
  // Check if dark mode is active
  let isDarkMode = document.body.classList.contains("dark");
  
  // Change the background color based on mode
  document.getElementById("logocontainer").style.backgroundColor = full 
    ? (isDarkMode ? "#074e02" : "#f76b00")  // Green in dark mode, Orange in light mode
    : "transparent";
}

document.getElementById('studentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const loadingOverlay = document.getElementById('loading');
  
  // Show loading animation
  loadingOverlay.style.display = 'flex';
  
  // Simulate API call (replace with actual fetch call)
  fetch('submit.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.text())
  .then(data => {
      // Hide loading overlay
      loadingOverlay.style.display = 'none';
      
      if(data.includes("Successful")) {
          showMessage('success', 'Registration Successful!');
          this.reset();
      } else {
          showMessage('error', data.replace(/<\/?[^>]+(>|$)/g, ""));
      }
  })
  .catch(error => {
      loadingOverlay.style.display = 'none';
      showMessage('error', 'An error occurred. Please try again.');
  });
});
