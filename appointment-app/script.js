// =====================================================
// APPLICATION STATE
// =====================================================

const appState = {
    currentStep: 1,
    selectedService: null,
    selectedDate: null,
    selectedTime: null,
    applicantInfo: {
        fullName: '',
        nationality: '',
        email: '',
        mobile: '',
        passport: '',
        notes: ''
    },
    currentMonth: new Date(2026, 1), // February 2026
};

// Save state to localStorage
function saveState() {
    localStorage.setItem('appointmentState', JSON.stringify(appState));
}

// Load state from localStorage
function loadState() {
    const saved = localStorage.getItem('appointmentState');
    if (saved) {
        Object.assign(appState, JSON.parse(saved));
    }
}

// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    loadState();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load the first step
    showStep(appState.currentStep);
    
    // Restore previously entered data if available
    restoreFormData();
    
    // Initialize calendar
    generateCalendar();
});

// =====================================================
// EVENT LISTENERS SETUP
// =====================================================

function initializeEventListeners() {
    // Navigation buttons
    document.getElementById('backBtn').addEventListener('click', goToPreviousStep);
    document.getElementById('continueBtn').addEventListener('click', goToNextStep);
    document.getElementById('confirmBtn').addEventListener('click', confirmAppointment);
    
    // Step 1: Service selection
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', selectService);
    });
    
    // Step 2: Calendar navigation
    document.getElementById('prevMonth').addEventListener('click', previousMonth);
    document.getElementById('nextMonth').addEventListener('click', nextMonth);
    
    // Step 3: Time slot selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', selectTimeSlot);
    });
    
    // Step 4: Form validation
    document.getElementById('fullName').addEventListener('blur', validateFullName);
    document.getElementById('nationality').addEventListener('change', validateNationality);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('mobile').addEventListener('blur', validateMobile);
    document.getElementById('passport').addEventListener('blur', validatePassport);
    
    // Form inputs for real-time validation feedback
    document.getElementById('fullName').addEventListener('input', validateFullName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('mobile').addEventListener('input', validateMobile);
    document.getElementById('passport').addEventListener('input', validatePassport);
}

// =====================================================
// STEP NAVIGATION
// =====================================================

function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(step => {
        step.style.display = 'none';
    });
    
    // Show the target step
    const stepElement = document.getElementById(`step${stepNumber}`);
    if (stepElement) {
        stepElement.style.display = 'block';
    }
    
    // Update progress bar
    updateProgressBar(stepNumber);
    
    // Update navigation buttons
    updateNavigationButtons(stepNumber);
    
    // Update current step
    appState.currentStep = stepNumber;
    saveState();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgressBar(stepNumber) {
    const percentage = stepNumber * 20;
    document.getElementById('currentStep').textContent = stepNumber;
    document.getElementById('progressPercent').textContent = percentage;
    document.querySelector('.progress-fill').style.width = percentage + '%';
}

function updateNavigationButtons(stepNumber) {
    const backBtn = document.getElementById('backBtn');
    const continueBtn = document.getElementById('continueBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    
    // Back button
    if (stepNumber === 1) {
        backBtn.style.display = 'none';
    } else {
        backBtn.style.display = 'inline-flex';
    }
    
    // Continue and Confirm buttons
    if (stepNumber === 5) {
        continueBtn.style.display = 'none';
        confirmBtn.style.display = 'inline-flex';
    } else {
        continueBtn.style.display = 'inline-flex';
        confirmBtn.style.display = 'none';
    }
    
    // Disable continue button by default
    continueBtn.disabled = true;
    
    // Enable based on current step
    checkStepValidation(stepNumber);
}

function goToNextStep() {
    if (!validateStep(appState.currentStep)) return;
    
    if (appState.currentStep < 5) {
        showStep(appState.currentStep + 1);
    }
}

function goToPreviousStep() {
    if (appState.currentStep > 1) {
        showStep(appState.currentStep - 1);
    }
}

// =====================================================
// STEP 1: SERVICE SELECTION
// =====================================================

function selectService(event) {
    const card = event.currentTarget;
    
    // Remove selected class from all cards
    document.querySelectorAll('.service-card').forEach(c => {
        c.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    card.classList.add('selected');
    
    // Update state
    appState.selectedService = card.dataset.service;
    saveState();
    
    // Enable continue button
    document.getElementById('continueBtn').disabled = false;
    
    // Update subtitle on step 2 when navigating
    updateStep2Subtitle();
}

function updateStep2Subtitle() {
    const subtitle = document.getElementById('serviceForDate');
    if (subtitle) {
        subtitle.textContent = appState.selectedService || 'Visa Services';
    }
}

// =====================================================
// STEP 2: DATE SELECTION
// =====================================================

function generateCalendar() {
    const month = appState.currentMonth.getMonth();
    const year = appState.currentMonth.getFullYear();
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const calendarDates = document.getElementById('calendarDates');
    calendarDates.innerHTML = '';
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarDates.appendChild(emptyCell);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('button');
        dateElement.type = 'button';
        dateElement.className = 'calendar-date';
        dateElement.textContent = day;
        
        const cellDate = new Date(year, month, day);
        cellDate.setHours(0, 0, 0, 0);
        
        // Check if date is in the past
        const isPast = cellDate < today;
        
        if (isPast) {
            dateElement.classList.add('disabled');
            dateElement.disabled = true;
        } else {
            // Add availability indicator (demo: most are available, some limited)
            const random = Math.random();
            if (random < 0.7) {
                dateElement.classList.add('available');
            } else if (random < 0.9) {
                dateElement.classList.add('limited');
            } else {
                dateElement.classList.add('booked');
                dateElement.disabled = true;
            }
            
            dateElement.addEventListener('click', selectDate);
        }
        
        // Highlight selected date
        if (appState.selectedDate) {
            const selectedParts = appState.selectedDate.split('/');
            if (parseInt(selectedParts[0]) === day && 
                parseInt(selectedParts[1]) === month &&
                parseInt(selectedParts[2]) === year) {
                dateElement.classList.add('selected');
            }
        }
        
        calendarDates.appendChild(dateElement);
    }
}

function selectDate(event) {
    const dateElement = event.target;
    const day = parseInt(dateElement.textContent);
    const month = appState.currentMonth.getMonth();
    const year = appState.currentMonth.getFullYear();
    
    // Remove selected class from all dates
    document.querySelectorAll('.calendar-date').forEach(d => {
        d.classList.remove('selected');
    });
    
    // Add selected class to clicked date
    dateElement.classList.add('selected');
    
    // Update state with selected date
    appState.selectedDate = `${day}/${month}/${year}`;
    saveState();
    
    // Update date display
    updateSelectedDateDisplay(day, month, year);
    
    // Enable continue button
    document.getElementById('continueBtn').disabled = false;
}

function updateSelectedDateDisplay(day, month, year) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    
    const date = new Date(year, month, day);
    const dayName = days[date.getDay()];
    const monthName = months[month];
    
    document.getElementById('selectedDateDisplay').textContent = 
        `${dayName}, ${monthName} ${day}`;
}

function previousMonth() {
    appState.currentMonth.setMonth(appState.currentMonth.getMonth() - 1);
    generateCalendar();
}

function nextMonth() {
    appState.currentMonth.setMonth(appState.currentMonth.getMonth() + 1);
    generateCalendar();
}

// =====================================================
// STEP 3: TIME SLOT SELECTION
// =====================================================

function selectTimeSlot(event) {
    const slot = event.currentTarget;
    
    // Remove selected class from all slots
    document.querySelectorAll('.time-slot').forEach(s => {
        s.classList.remove('selected');
    });
    
    // Add selected class to clicked slot
    slot.classList.add('selected');
    
    // Update state
    appState.selectedTime = slot.dataset.time;
    saveState();
    
    // Enable continue button
    document.getElementById('continueBtn').disabled = false;
}

// =====================================================
// STEP 4: FORM VALIDATION
// =====================================================

function validateFullName() {
    const input = document.getElementById('fullName');
    const error = document.getElementById('fullNameError');
    const value = input.value.trim();
    
    if (value.length < 2) {
        input.classList.add('is-invalid');
        error.textContent = 'Full name must be at least 2 characters';
        return false;
    } else {
        input.classList.remove('is-invalid');
        error.textContent = '';
        appState.applicantInfo.fullName = value;
        saveState();
        return true;
    }
}

function validateNationality() {
    const select = document.getElementById('nationality');
    const error = document.getElementById('nationalityError');
    
    if (!select.value) {
        select.classList.add('is-invalid');
        error.textContent = 'Please select a nationality';
        return false;
    } else {
        select.classList.remove('is-invalid');
        error.textContent = '';
        appState.applicantInfo.nationality = select.value;
        saveState();
        return true;
    }
}

function validateEmail() {
    const input = document.getElementById('email');
    const error = document.getElementById('emailError');
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        input.classList.add('is-invalid');
        error.textContent = 'Please enter a valid email address';
        return false;
    } else {
        input.classList.remove('is-invalid');
        error.textContent = '';
        appState.applicantInfo.email = value;
        saveState();
        return true;
    }
}

function validateMobile() {
    const input = document.getElementById('mobile');
    const error = document.getElementById('mobileError');
    const value = input.value.trim();
    
    // Accept various phone formats
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        input.classList.add('is-invalid');
        error.textContent = 'Please enter a valid phone number';
        return false;
    } else {
        input.classList.remove('is-invalid');
        error.textContent = '';
        appState.applicantInfo.mobile = value;
        saveState();
        return true;
    }
}

function validatePassport() {
    const input = document.getElementById('passport');
    const error = document.getElementById('passportError');
    const value = input.value.trim();
    
    // Check if passport is alphanumeric and at least 5 characters
    const passportRegex = /^[A-Za-z0-9]{5,}$/;
    
    if (!passportRegex.test(value)) {
        input.classList.add('is-invalid');
        error.textContent = 'Please enter a valid passport number';
        return false;
    } else {
        input.classList.remove('is-invalid');
        error.textContent = '';
        appState.applicantInfo.passport = value;
        saveState();
        return true;
    }
}

function restoreFormData() {
    if (appState.applicantInfo.fullName) {
        document.getElementById('fullName').value = appState.applicantInfo.fullName;
    }
    if (appState.applicantInfo.nationality) {
        document.getElementById('nationality').value = appState.applicantInfo.nationality;
    }
    if (appState.applicantInfo.email) {
        document.getElementById('email').value = appState.applicantInfo.email;
    }
    if (appState.applicantInfo.mobile) {
        document.getElementById('mobile').value = appState.applicantInfo.mobile;
    }
    if (appState.applicantInfo.passport) {
        document.getElementById('passport').value = appState.applicantInfo.passport;
    }
    if (appState.applicantInfo.notes) {
        document.getElementById('notes').value = appState.applicantInfo.notes;
    }
}

function updateFormData() {
    appState.applicantInfo.fullName = document.getElementById('fullName').value.trim();
    appState.applicantInfo.nationality = document.getElementById('nationality').value;
    appState.applicantInfo.email = document.getElementById('email').value.trim();
    appState.applicantInfo.mobile = document.getElementById('mobile').value.trim();
    appState.applicantInfo.passport = document.getElementById('passport').value.trim();
    appState.applicantInfo.notes = document.getElementById('notes').value.trim();
    saveState();
}

// =====================================================
// STEP 5: REVIEW & CONFIRMATION
// =====================================================

function updateReviewSection() {
    // Update appointment details
    document.getElementById('reviewService').textContent = appState.selectedService;
    
    // Format date
    if (appState.selectedDate) {
        const [day, month, year] = appState.selectedDate.split('/');
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        
        const date = new Date(year, month, day);
        const dayName = days[date.getDay()];
        const monthName = months[month];
        
        document.getElementById('reviewDate').textContent = 
            `${dayName}, ${monthName} ${day}, ${year}`;
    }
    
    document.getElementById('reviewTime').textContent = appState.selectedTime;
    
    // Update personal information
    document.getElementById('reviewFullName').textContent = appState.applicantInfo.fullName;
    document.getElementById('reviewNationality').textContent = appState.applicantInfo.nationality;
    document.getElementById('reviewEmail').textContent = appState.applicantInfo.email;
    document.getElementById('reviewMobile').textContent = appState.applicantInfo.mobile;
    document.getElementById('reviewPassport').textContent = appState.applicantInfo.passport;
}

function confirmAppointment() {
    // Generate confirmation number
    const confirmationNumber = 'CNS-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0') + 
        '-' + String(Math.floor(Math.random() * 100000)).padStart(5, '0');
    
    // Update modal
    document.getElementById('confirmationEmail').textContent = appState.applicantInfo.email;
    document.getElementById('confirmationNumber').textContent = confirmationNumber;
    
    // Show success modal
    const modal = document.getElementById('successModal');
    modal.style.display = 'flex';
    
    // Clear localStorage
    localStorage.removeItem('appointmentState');
}

// =====================================================
// VALIDATION & CHECKS
// =====================================================

function validateStep(stepNumber) {
    switch (stepNumber) {
        case 1:
            if (!appState.selectedService) {
                alert('Please select a service');
                return false;
            }
            return true;
        
        case 2:
            if (!appState.selectedDate) {
                alert('Please select a date');
                return false;
            }
            return true;
        
        case 3:
            if (!appState.selectedTime) {
                alert('Please select a time slot');
                return false;
            }
            return true;
        
        case 4:
            if (!validateFullName() || !validateNationality() || 
                !validateEmail() || !validateMobile() || !validatePassport()) {
                alert('Please fill all required fields correctly');
                return false;
            }
            updateFormData();
            return true;
        
        case 5:
            return true;
        
        default:
            return false;
    }
}

function checkStepValidation(stepNumber) {
    const continueBtn = document.getElementById('continueBtn');
    
    switch (stepNumber) {
        case 1:
            if (appState.selectedService) {
                continueBtn.disabled = false;
                // Restore selected service view
                document.querySelectorAll('.service-card').forEach(card => {
                    if (card.dataset.service === appState.selectedService) {
                        card.classList.add('selected');
                    } else {
                        card.classList.remove('selected');
                    }
                });
            }
            break;
        
        case 2:
            generateCalendar();
            updateStep2Subtitle();
            if (appState.selectedDate) {
                continueBtn.disabled = false;
            }
            break;
        
        case 3:
            if (appState.selectedTime) {
                continueBtn.disabled = false;
                // Restore selected time
                document.querySelectorAll('.time-slot').forEach(slot => {
                    if (slot.dataset.time === appState.selectedTime) {
                        slot.classList.add('selected');
                    } else {
                        slot.classList.remove('selected');
                    }
                });
            }
            break;
        
        case 4:
            restoreFormData();
            // Check if form is valid
            const isFormValid = 
                validateFullName() && 
                validateNationality() && 
                validateEmail() && 
                validateMobile() && 
                validatePassport();
            
            if (isFormValid) {
                continueBtn.disabled = false;
            }
            break;
        
        case 5:
            continueBtn.style.display = 'none';
            document.getElementById('confirmBtn').style.display = 'inline-flex';
            updateReviewSection();
            break;
    }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

// Real-time validation as user types
document.addEventListener('DOMContentLoaded', function() {
    // Add input listeners for real-time form validation feedback
    const continueBtn = document.getElementById('continueBtn');
    
    // Watch form fields for changes to enable/disable continue button on step 4
    const formInputs = document.querySelectorAll('#fullName, #nationality, #email, #mobile, #passport');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (appState.currentStep === 4) {
                const isFormValid = 
                    document.getElementById('fullName').value.trim().length >= 2 &&
                    document.getElementById('nationality').value &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value) &&
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById('mobile').value.replace(/\s/g, '')) &&
                    /^[A-Za-z0-9]{5,}$/.test(document.getElementById('passport').value);
                
                continueBtn.disabled = !isFormValid;
            }
        });
    });
});
