// DOM Elements
const form = document.getElementById('studentForm');
const nameInput = document.getElementById('name');
const studentIdInput = document.getElementById('studentId');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');

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
  // Get today's date in YYYY-MM-DD format.
  const today = new Date().toISOString().split('T')[0];
  const isValid = (dateInput.value === today);
  toggleValidationState(dateInput, isValid, 'dateError');
  return isValid;
};
const timeError = document.getElementById('timeError');

const validateTime = () => {
  // Get current time in minutes since midnight
  const now = new Date();
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

  // Get the value from the time input (format: "HH:MM")
  const [inputHours, inputMinutes] = timeInput.value.split(':').map(Number);
  const inputTotalMinutes = inputHours * 60 + inputMinutes;

  // Allow a tolerance of 5 minutes (you can adjust this as needed)
  const tolerance = 5;
  const isValid = Math.abs(currentTotalMinutes - inputTotalMinutes) <= tolerance;

  // Toggle error message display accordingly
  toggleValidationState(timeInput, isValid, 'timeError');
  return isValid;
};

// Example helper function to show/hide error messages:
function toggleValidationState(input, isValid, errorId) {
  const errorElement = document.getElementById(errorId);
  input.parentElement.classList.toggle('error', !isValid);
  input.parentElement.classList.toggle('success', isValid);
  errorElement.style.display = isValid ? 'none' : 'block';
}

// Optionally, run the validation on input change:
timeInput.addEventListener('input', validateTime);


// Validation Helper
const toggleValidationState = (input, isValid, errorId) => {
  const errorElement = document.getElementById(errorId);
  // Here you can add or remove error classes on the parent element if needed:
  input.parentElement.classList.toggle('error', !isValid);
  input.parentElement.classList.toggle('success', isValid);
  // Display or hide the error message:
  errorElement.style.display = isValid ? 'none' : 'block';
};

// Event Listeners
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
    // Form submission logic here
    alert('Form submitted successfully!');
    form.reset();
    // Optionally clear success/error classes after reset:
    document.querySelectorAll('.success, .error').forEach(el => el.classList.remove('success', 'error'));
  } else {
    alert('Please fix the errors in the form');
  }
});
const Q = (q) => document.querySelector(q);

Q('.dark-mode-switch').addEventListener('click', (ev) => {
    Q('body').classList.toggle('switching', true);
    setTimeout(() => {
      Q('body').classList.toggle('switching', false);
    }, 200);
    Q('.dark-mode-switch').classList.toggle('dark');
    Q('body').classList.toggle('dark');
  });
  function fill() {
    full = !full;
    
    // Check if dark mode is active
    let isDarkMode = document.body.classList.contains("dark");
    
    // Change the background color based on mode
    document.getElementById("logocontainer").style.backgroundColor = full 
      ? (isDarkMode ? "#074e02" : "#f76b00")  // Green in dark mode, Orange in light mode
      : "transparent";
  }

  // Get the time input element.
const timeInput = document.getElementById('time');

// Function to auto-fill time input.
function fillTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  timeInput.value = `${hours}:${minutes}`;
}

// Call fillTime when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', fillTime);
