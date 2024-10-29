// Get references to the form and the prescription list
const prescriptionForm = document.getElementById('prescriptionForm');
const prescriptionList = document.getElementById('prescriptionList').getElementsByTagName('tbody')[0];
const bonusCountElement = document.getElementById('bonusCount');
const notificationElement = document.getElementById('notification');

// Load bonus count from local storage on page load
let bonusCount = parseInt(localStorage.getItem('bonusCount')) || 0; // Retrieve or initialize to 0
let prescriptions = []; // Store all prescriptions with times

// Display the initial bonus count
bonusCountElement.textContent = bonusCount;

// Handle form submission
prescriptionForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const medicineName = document.getElementById('medicineName').value;
    const time = document.getElementById('time').value;
    const frequency = parseInt(document.getElementById('frequency').value, 10);

    // Add the new prescription to the prescriptions array
    prescriptions.push({ medicineName, time, frequency });

    // Create a prescription entry in the table
    const prescriptionRow = document.createElement('tr');
    prescriptionRow.classList.add('prescription-item');

    // Create cells for the prescription entry
    prescriptionRow.innerHTML = `
        <td>${medicineName}</td>
        <td>${time}</td>
        <td>${frequency}</td>
    `;

    // Create a cell for checkboxes based on the frequency
    const actionCell = document.createElement('td');
    for (let i = 0; i < frequency; i++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('med-check');
        actionCell.appendChild(checkbox);

        // Add event listener for each checkbox
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(actionCell.querySelectorAll('.med-check')).every(cb => cb.checked);
            if (allChecked) {
                bonusCount += 2; // Increase by 2 when all checkboxes are checked
            } else {
                // Decrease by 2 when any checkbox is unchecked
                bonusCount = Math.max(bonusCount - 2, 0); // Ensure it doesn't go below 0
            }
            bonusCountElement.textContent = bonusCount;
            localStorage.setItem('bonusCount', bonusCount); // Save the updated bonus count
        });
    }

    prescriptionRow.appendChild(actionCell);
    prescriptionList.appendChild(prescriptionRow);

    // Clear the form fields
    prescriptionForm.reset();
});

// Function to display notification
function showNotification(message) {
    notificationElement.textContent = message;
    notificationElement.style.display = 'block';
    notificationElement.style.top = '20px'; // Slide down to visible position

    // Hide the notification after 5 seconds
    setTimeout(() => {
        notificationElement.style.top = '-100px'; // Slide up (off-screen)
        setTimeout(() => {
            notificationElement.style.display = 'none'; // Hide completely
        }, 500); // Wait for the slide-up transition to complete
    }, 5000);
}

// Function to check the current time against the medication times
function checkMedicationTimes() {
    const currentTime = new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    });

    prescriptions.forEach(prescription => {
        if (prescription.time === currentTime) {
            showNotification(`Time to take your medication: ${prescription.medicineName}`);
        }
    });
}

// Check every 10 seconds if it's time to take any medication
setInterval(checkMedicationTimes, 10000);

// Reset function to start fresh
function resetBonusCount() {
    bonusCount = 0; // Reset bonus count
    bonusCountElement.textContent = bonusCount; // Update display
    localStorage.setItem('bonusCount', bonusCount); // Clear from local storage
}

// Get reference to the reset button
const resetButton = document.getElementById('resetButton');

// Add event listener to the reset button
resetButton.addEventListener('click', resetBonusCount);
