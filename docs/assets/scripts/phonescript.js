
import { startGame,quitGame, restartGame } from "./snake.js";

const colorRed = '#FF3D3D';
const colorGreen = 'green';


const openDialog = document.getElementById("open-popup");
const dialog = document.getElementById("phone-popUp");
const closeDialog = document.getElementById("closeDialog");


openDialog.addEventListener("click", () => dialog.showModal());
closeDialog.addEventListener("click", () => dialog.close());

const GameDisplay = document.getElementById("phonegame");
const PhoneDisplay =  document.getElementById("phonedisplay");

const openGame = document.getElementById("openGame");
const closeGame = document.getElementById("closeGame");
const quitGameDialog = document.getElementById("quitDialog");
const restart =document.getElementById("resetGame");


restart.addEventListener("click", () => restartGame());
function OpenGame()
{
    PhoneDisplay.classList.add("hidden");
    GameDisplay.classList.remove("hidden");
    startGame();
};

function CloseGame()
{
    PhoneDisplay.classList.remove("hidden");
    GameDisplay.classList.add("hidden");
};


quitGameDialog.addEventListener("click", () =>{
    quitGame();
    CloseGame();
    dialog.close();
});

openGame.addEventListener("click", OpenGame);
closeGame.addEventListener("click", CloseGame);



    document.querySelectorAll('.phone-textfield input').forEach(input => 
    {
        input.addEventListener('focus', (event) => 
        {
            event.target.parentNode.classList.add('focused');
        });
    
        input.addEventListener('blur', (event) => 
        {
            event.target.parentNode.classList.remove('focused');
        });
        
    });
    
    document.querySelectorAll('.phone-textfield textarea').forEach(input => 
    {
        input.addEventListener('focus', (event) => 
        {
            event.target.parentNode.classList.add('focused');
        });
    
        input.addEventListener('blur', (event) => 
        {
            event.target.parentNode.classList.remove('focused');
        });
        
    });
    

    document.addEventListener('DOMContentLoaded', function () 
    {
        // Constants for name validation
        const minLengthName = 2;
        const maxLengthName = 30;
        const nameRegEx = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9.\-_ ]+$/;
        const nameInput = document.querySelector('#name');
        const nameInfo = document.querySelector('.valid_info_name');
      
        
        let nameVal = false;
    
        // Helper function to handle validation feedback
        function showFeedback(message, color, isValid) 
        {
            nameInput.classList.remove('valid', 'invalid');
            nameInfo.textContent = message;
            nameInfo.style.color = color;
            nameInput.classList.add(isValid ? 'valid' : 'invalid');
        }
    
        // Max length check
        nameInput.addEventListener('keydown', function (e) 
        {
            if (nameInput.value.length >= maxLengthName && !['Backspace', 'Delete'].includes(e.key)) {
                e.preventDefault();
            }
        });
    
        // Denied characters handler (to restrict first character to be a letter)
        function denyChar() 
        {
            showFeedback('The name must start with a letter', colorRed, false);
        }
    
        // Validate name
        function validateName() 
        {
            const nameValue = nameInput.value;
            const firstChar = nameValue.charAt(0);
    
            // Check if the name is empty
            if (nameValue.length === 0) 
            {
                showFeedback(String.fromCharCode(160) , 'black', false);
                nameVal = false;
                return;
            }
    
            // Check length
            if (nameValue.length < minLengthName || nameValue.length > maxLengthName) 
            {
                showFeedback(`The name must be between ${minLengthName} and ${maxLengthName} characters long`, colorRed, false);
                nameVal = false;
                return;
            }
    
            // Check if first character is a letter
            if (!/[a-zA-Zа-яА-ЯёЁіІїЇєЄ]/.test(firstChar)) 
            {
                showFeedback('The first character must be a letter', colorRed, false);
                denyChar();
                nameVal = false;
                return;
            }
    
            // Check for invalid characters
            if (!nameRegEx.test(nameValue)) 
            {
                showFeedback('The name can only contain letters, numbers, spaces, and symbols (._-)', colorRed, false);
                nameVal = false;
                return;
            }
    
            // Check if name starts with a letter and passes all checks
            showFeedback('The entered name is valid', 'green', true);
            nameVal = true;
        }
    
        // Validate name on various events
        ['input', 'blur', 'keydown', 'keyup', 'change'].forEach(event => {
            nameInput.addEventListener(event, validateName);
        });
    
        // Character validation during keypress
        nameInput.addEventListener('keypress', function (e) {
            const nameValue = nameInput.value;
            const key = String.fromCharCode(e.which);
    
            // Prevent first character from being anything other than a letter
            if (nameValue.length === 0 && !/[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(key)) {
                e.preventDefault();
                return;
            }
    
            // Prevent invalid characters based on the regex pattern
            if (!/[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9.\-_ ]/.test(key)) {
                e.preventDefault();
                return;
            }
        });
    });
    


    
    document.addEventListener('DOMContentLoaded', function() 
    {
        // Constants for validation
        const minLength = 8;
        const maxLength = 50;
        const emailRegEx = /^([a-zA-Z0-9._\-]+|[a-zA-Z0-9]+(?:[._\-][a-zA-Z0-9]+)*)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const input = document.querySelector('#email');
        const info = document.querySelector('.valid_info_email');
      
        let emailVal = false;
    
        // Helper function to handle validation feedback
        function showFeedback(message, color, isValid) 
        {
            input.classList.remove('valid', 'invalid');
            info.textContent = message;
            info.style.color = color;
            input.classList.add(isValid ? 'valid' : 'invalid');
        }
    
        // Max length check
        input.addEventListener('keydown', function(e) 
        {
            if (input.value.length >= maxLength && !['Backspace', 'Delete'].includes(e.key)) {
                e.preventDefault();
            }
        });
    
        // Denied characters handler
        function denyChar() {
            showFeedback('Latin letters, numbers and some symbols are allowed in this field', colorRed, false);
        }
    
        // Validate email structure
        function validateEmail() {
            const value = input.value;
    
            if (value.length === 0) 
            {
                showFeedback(String.fromCharCode(160), 'black', false);
                emailVal = false;
                return;
            }
    
            if (value.length < minLength || value.length > maxLength) {
                showFeedback(`The address entered is invalid, valid from ${minLength} to ${maxLength} characters`, colorRed, false);
                emailVal = false;
                return;
            }
    
            let regexFirst = /^[a-zA-Z0-9]+$/;
            let regexD = /(.)\1{6}/;  // Too many identical characters
    
            // Check for '@' and the structure of the email
            if (value.includes('@')) {
                const atIndex = value.indexOf('@');
                const domain = value.split('@')[1];
    
                // Check for invalid multiple dots
                if (/@.*?\.{2,}/.test(value)) {
                    showFeedback('The address entered is invalid. Check the address you entered', colorRed, false);
                    denyChar();
                    emailVal = false;
                    return;
                }
    
                // Too many dots after '@'
                const numDots = (domain.match(/\./g) || []).length;
                if (numDots >= 3) {
                    showFeedback('The address entered is invalid. Too many dots after "@"', colorRed, false);
                    denyChar();
                    emailVal = false;
                    return;
                }
    
                // Check first character
                if (!regexFirst.test(value.charAt(0))) {
                    showFeedback('The address entered is invalid. The first character can only be a letter or a number', colorRed, false);
                    denyChar();
                    emailVal = false;
                    return;
                }
    
                // Check for too many identical characters in a row
                if (regexD.test(value)) {
                    showFeedback('The address entered is invalid. Too many identical characters', colorRed, false);
                    denyChar();
                    emailVal = false;
                    return;
                }
    
                // Final check against regex
                if (emailRegEx.test(value)) {
                    showFeedback('The entered address is valid', colorGreen, true);
                    emailVal = true;
                } else {
                    showFeedback('The address entered is invalid', colorRed, false);
                    denyChar();
                    emailVal = false;
                }
            } else {
                showFeedback('The address entered is invalid. Missing "@" symbol', colorRed, false);
                denyChar();
                emailVal = false;
            }
        }
    
        // Character validation during keypress
        input.addEventListener('keypress', function(e) {
            const value = input.value;
            const key = String.fromCharCode(e.which);
    
            // Allow only valid characters in the email
            if (!/[a-zA-Z0-9.\-_@]/.test(key)) {
                e.preventDefault();
                denyChar();
                return;
            }
    
            // Prevent multiple "@" characters
            if (key === '@' && value.includes('@')) {
                e.preventDefault();
            }
    
            // Prevent consecutive dots
            if (key === '.' && value.slice(-1) === '.') {
                e.preventDefault();
            }
    
            // Prevent too many identical characters in a row
            if (/(.)\1{6}/.test(value)) {
                e.preventDefault();
            }
    
            // Specific validation after "@"
            if (value.includes('@')) {
                if (value.slice(-1) === '@' && !/[a-zA-Z0-9]/.test(key)) {
                    e.preventDefault();
                }
                if (value.includes('.') && !/[a-zA-Z0-9.\-_]/.test(key)) {
                    e.preventDefault();
                }
            }
        });
    
        // Additional key restrictions and input checks
        input.addEventListener('keydown', function(e) {
            // Max length enforcement
            if (input.value.length >= maxLength && !['Backspace', 'Delete'].includes(e.key)) {
                e.preventDefault();
            }
        });
    
        // Attach validation to multiple events
        ['input', 'keypress', 'blur', 'change', 'keydown', 'keyup'].forEach(event => {
            input.addEventListener(event, validateEmail);
        });
    });
    