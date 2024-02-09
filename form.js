let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    }

    window.onscroll = () => {
        navbar.classList.remove('active');
        menu.classList.remove('bx-x');
    }

    document.addEventListener("DOMContentLoaded", function() {
        var scrollToTopButton = document.querySelector(".scroll-to-top");
    
        window.addEventListener("scroll", function() {
            if (window.pageYOffset > 100) {
                scrollToTopButton.classList.add("show");
            } else {
                scrollToTopButton.classList.remove("show");
            }
        });
    
        scrollToTopButton.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });

    // Function to concatenate checked checkboxes and handle sticky header
    function concatenateCheckedCheckboxes() {
        // Get all checkboxes with name "medicine"
        const checkboxesMedicine = document.querySelectorAll('input[name="medicine"]:checked');

        // Initialize an empty array to store medicine values
        const medicineValues = [];

        // Iterate over the medicine checkboxes and push checked values to the array
        checkboxesMedicine.forEach(checkbox => {
            medicineValues.push(checkbox.value);
        });

        // Join the array values into a single string separated by commas
        const concatenatedMedicineValues = medicineValues.join(', ');

        // Assign the concatenated values to the hidden input field for medicines
        document.getElementById('medicine_concatenated').value = concatenatedMedicineValues;

        // Get all the checkboxes for medical conditions
        const checkboxesMedicalConditions = document.querySelectorAll('input[name="medical_condition"]');

        // Initialize an empty array to store checked medical condition values
        const medicalConditionValues = [];

        // Iterate over the medical condition checkboxes
        checkboxesMedicalConditions.forEach(checkbox => {
            // If checkbox is checked, add its value to the array
            if (checkbox.checked) {
                medicalConditionValues.push(checkbox.value);
            }
        });

        // Update the value of the hidden input field for medical conditions with concatenated values
        document.getElementById('medical_conditions_concatenated').value = medicalConditionValues.join(', ');

        // Handle sticky header
        const header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 100);
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Add event listener to the form for validation before submission
        document.querySelector('form').addEventListener('submit', function (event) {
            // Validate form before submission
            if (!validateForm()) {
                event.preventDefault();
                return;
            }

            concatenateCheckedCheckboxes();
        });

        // Add event listeners to the input fields for real-time validation
        const textInputs = document.querySelectorAll('input[type="text"], input[type="email"]');
        
        textInputs.forEach(input => {
            input.addEventListener('input', function () {
                validateTextInput(input);
            });

            input.addEventListener('blur', function () {
                validateTextInput(input);
            });
        });
    });


    function validateTextInput(input) {
        const value = input.value.trim();
        const fieldName = input.getAttribute('placeholder');

        clearError(input);
        resetBorderColor(input);

        if (value === '') {
            displayError(input, `${fieldName} cannot be empty.`);
            setInvalidBorderColor(input);
            return;
        }

        
        switch (input.id || input.name) {
            case 'studentName':
                if (!/^[a-zA-Z\s]+$/.test(value)) {
                    displayError(input, 'Invalid characters. Only letters and spaces are allowed.');
                    setInvalidBorderColor(input);
                }
                break;

            case 'Age':
                const age = parseInt(value, 10);
                if (isNaN(age) || age < 1 || age > 150) {
                    displayError(input, 'Please enter a valid age.');
                    setInvalidBorderColor(input);
                }
                break;

            case 'cellNum':
                
                if (!/^\d{11}$/.test(value)) {
                    displayError(input, 'Please enter a valid 11-digit cellphone number.');
                    setInvalidBorderColor(input);
                }
                break;
            
            case 'emailAdd':
                clearError(input);
                resetBorderColor(input);
                
                if (value === '') {
                    displayError(input, 'Email address cannot be empty.');
                    setInvalidBorderColor(input);
                    return;
                }
            
            const customEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!customEmailRegex.test(value)) {
                displayError(input, 'Please enter a valid email address.');
                setInvalidBorderColor(input);
                
                return;
            }
                break;
            
            case 'sex':
                clearError(input);
                resetBorderColor(input);
                
                if (value === '') {
                    displayError(input, 'Sex cannot be empty.');
                    setInvalidBorderColor(input);
                    return;
                }
                
                const validSexValues = ['Female', 'Male'];
                if (!validSexValues.includes(value)) {
                    displayError(input, 'Please enter either "Female" or "Male".')
                    setInvalidBorderColor(input);
                    
                    return;
                }
                break;

            default:
                break;
        }
    }

    
    function displayError(input, message) {
        clearError(input);

        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;

        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }

    
    function clearError(input) {
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    
    function setInvalidBorderColor(input) {
        input.style.borderColor = 'red';
    }

    
    function resetBorderColor(input) {
        input.style.borderColor = '';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Call the function when the form is submitted
    document.querySelector('form').addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault();
            return;
        }

        concatenateCheckedCheckboxes();
    });

    // Call the function to handle sticky header when the window is scrolled
    window.addEventListener("scroll", function () {
        concatenateCheckedCheckboxes();
    });

    function handleMedicalAttentionCheckbox() {
        const medicalAttentionCheckbox = document.getElementById('no');
        const medicalConditionCheckboxes = document.querySelectorAll('input[name="medical_condition"]');
        const othersTextbox = document.getElementById('others');
        const form = document.getElementById('medicalForm');
        const errorContainer = document.getElementById('medicalConditionError');
    
        // Validation function to check if at least one medical condition checkbox is selected
        function isAtLeastOneCheckboxSelected() {
            return Array.from(medicalConditionCheckboxes).some(checkbox => checkbox.checked);
        }
    
        function handleFormSubmit(event) {
            if (medicalAttentionCheckbox.checked) {
                // User chose 'No', no need to validate medical conditions
                errorContainer.innerHTML = '';  // Clear any existing error message
                return;
            }
        
            if (!isAtLeastOneCheckboxSelected()) {
                errorContainer.innerHTML = '<span style="color: red; font-size: 10px;">Please choose at least one medical condition.</span>';  // Display red error message with 10px font size
                event.preventDefault(); // Prevent form submission if validation fails
            } else {
                errorContainer.innerHTML = '';  // Clear the error message if conditions are met
            }
        }        
    
        medicalAttentionCheckbox.addEventListener('change', function () {
            if (medicalAttentionCheckbox.checked) {
                medicalConditionCheckboxes.forEach(checkbox => {
                    checkbox.disabled = true;
                });
                othersTextbox.disabled = true;
                othersTextbox.value = '';
            } else {
                medicalConditionCheckboxes.forEach(checkbox => {
                    checkbox.disabled = false;
                });
                othersTextbox.disabled = false;
            }
        });
    
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Call the function to initialize the event listeners
    handleMedicalAttentionCheckbox();