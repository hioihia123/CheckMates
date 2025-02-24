document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const form = document.getElementById('studentForm');
  const nameInput = document.getElementById('name');
  const studentIdInput = document.getElementById('studentId');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const timeError = document.getElementById('timeError');

  // Regular Expressions
  const nameRegex = /^[A-Za-z\s'-]+$/;
  const studentIdRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

  // Validation Functions
  const validateName = () => {
    const isValid = nameRegex.test(nameInput.value.trim());
    toggleValidationState(nameInput, isValid, 'nameError');
    return isValid;
  };

  const validateStudentId = () => {
    const isValid = studentIdRegex.test(studentIdInput.value.trim());
    toggleValidationState(studentIdInput, isValid, 'idError');
    return isValid;
  };

  const validateDate = () => {
    const today = new Date().toISOString().split('T')[0];
    const isValid = (dateInput.value === today);
    toggleValidationState(dateInput, isValid, 'dateError');
    return isValid;
  };

  const validateTime = () => {
    const now = new Date();
    const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

    // Parse time input ("HH:MM") into hours and minutes
    const [inputHours, inputMinutes] = timeInput.value.split(':').map(Number);
    const inputTotalMinutes = inputHours * 60 + inputMinutes;

    // Allow a tolerance of 5 minutes
    const tolerance = 5;
    const isValid = Math.abs(currentTotalMinutes - inputTotalMinutes) <= tolerance;
    toggleValidationState(timeInput, isValid, 'timeError');
    return isValid;
  };

  // Single declaration of toggleValidationState helper
  function toggleValidationState(input, isValid, errorId) {
    const errorElement = document.getElementById(errorId);
    input.parentElement.classList.toggle('error', !isValid);
    input.parentElement.classList.toggle('success', isValid);
    errorElement.style.display = isValid ? 'none' : 'block';
  }

  // Event Listeners for validation
  nameInput.addEventListener('input', validateName);
  studentIdInput.addEventListener('input', validateStudentId);
  dateInput.addEventListener('change', validateDate);
  timeInput.addEventListener('input', validateTime);

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const isNameValid = validateName();
    const isIdValid = validateStudentId();
    const isDateValid = validateDate();

    if (isNameValid && isIdValid && isDateValid) {
      alert('Form submitted successfully!');
      form.reset();
      // Clear all success/error classes
      document.querySelectorAll('.success, .error').forEach(el => {
        el.classList.remove('success', 'error');
      });
    } else {
      alert('Please fix the errors in the form');
    }
  });

  // Dark mode toggle using a helper function Q
  const Q = (q) => document.querySelector(q);
  const darkSwitch = Q('.dark-mode-switch');
  if (darkSwitch) {
    darkSwitch.addEventListener('click', () => {
      Q('body').classList.toggle('switching', true);
      setTimeout(() => {
        Q('body').classList.toggle('switching', false);
      }, 200);
      darkSwitch.classList.toggle('dark');
      Q('body').classList.toggle('dark');
    });
  }

  // Declare the variable 'full' properly
  let full = false;
  function fill() {
    full = !full;
    let isDarkMode = document.body.classList.contains("dark");
    document.getElementById("logocontainer").style.backgroundColor = full 
      ? (isDarkMode ? "#074e02" : "#f76b00")  // Green in dark mode, Orange in light mode
      : "transparent";
  }

  // Auto-fill time input
  function fillTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeInput.value = `${hours}:${minutes}`;
  }
  fillTime();
});
