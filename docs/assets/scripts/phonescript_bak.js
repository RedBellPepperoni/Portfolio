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



document.addEventListener('DOMContentLoaded', function() 
{
    // keypress enter - false
    ['name', 'email', 'message'].forEach(function(id) {
        document.getElementById(id).addEventListener('keypress', function(key) {
            if (key.code === 13) {
                key.preventDefault();
            }
        });
    });

    // Name Validation Begin
    var nameVal = false;

    document.getElementById('name').addEventListener('input', validateName);
    document.getElementById('name').addEventListener('blur', validateName);
    document.getElementById('name').addEventListener('keydown', validateName);
    document.getElementById('name').addEventListener('keyup', validateName);
    document.getElementById('name').addEventListener('change', validateName);



    function validateName() 
    {
        var name = document.getElementById('name');
        var regex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9.\-_ ]+$/;
        var minLengthName = 2;
        var maxLengthName = 30;
        var firstChar = name.value.charAt(0);
        var tempNameContent = String.fromCharCode(160);
        var finalNameColor = '';


        function clearValidation()
        {
            name.classList.remove('valid', 'invalid');
        }

        function setValid()
        {
            clearValidation();
            name.classList.add('valid');
        }

        function setInValid()
        {
            clearValidation();
            name.classList.add('invalid');
        }

        // check max len
        name.addEventListener('keydown', function(e) 
        {
            if (name.value.length >= maxLengthName && e.code !== 8 && e.code !== 46) 
            {
                e.preventDefault();
            }
        });

        // Empty String Check (when Backspaced to nothing)
        if (name.value.length === 0) 
        {
            clearValidation();
            tempNameContent = String.fromCharCode(160);
            nameVal = false;
        }

        // First Char Check (only one character enterd of backspaced till one character)
        else if (!(/[a-zA-Zа-яА-ЯёЁіІїЇєЄ]/).test(firstChar)) 
        {
           
            tempNameContent = "The name entered is invalid. The first character must be a letter";
            finalNameColor = '#FF3D3D';
            setInValid()
            nameVal = false;
        }

        // length check
        else if ((0 < name.value.length && name.value.length < minLengthName) || (name.value.length > maxLengthName)) 
        {
            
            tempNameContent = "The name entered is invalid. The name must be between " + minLengthName + " and " + maxLengthName + " characters";
            finalNameColor = '#FF3D3D';
            setInValid();
            nameVal = false;

        }        
       
        // checking for valid characters
        else if (!regex.test(name.value)) 
        {
            
            tempNameContent = "The name entered is invalid. The name can only contain letters, numbers, spaces and symbols (._-)";
            finalNameColor = '#FF3D3D';
            setValid();
            nameVal = false;
        }

        else 
        {
           
            tempNameContent = "The entered name is valid";
            finalNameColor = 'green';
            setValid();

            // check first character
            if (!(/[a-zA-Zа-яА-ЯёЁіІїЇєЄ]/).test(firstChar)) 
                {
                
                tempNameContent = "The name entered invalid. The first character must be a letter";
                finalNameColor = '#FF3D3D';
                setInValid();
                nameVal = false;
            } 

            else 
            {
                nameVal = true;
            }
        }


        document.querySelector('.valid_info_name').textContent = tempNameContent;
        document.querySelector('.valid_info_name').style.color = finalNameColor;
    }

 
    // first character can only be [a-zA-Zа-яА-ЯіІїЇєЄ]
    document.getElementById('name').addEventListener('keypress', function(e) 
    {
        var inputName = document.getElementById('name');
        var valueName = inputName.value;
        var nameKey = String.fromCharCode(e.which);
        if (valueName.length === 0 && !/[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(nameKey)) {
            e.preventDefault();
        }
    });

    // allowed chars
    document.getElementById('name').addEventListener('keypress', function(e) {
        var allowedChars = /[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9'\-_ .]/;
        var charCode = (typeof e.which === "number") ? e.which : e.keyCode;
        if (!allowedChars.test(String.fromCharCode(charCode))) {
            e.preventDefault();
        }
    });

    // Name Validation End



    // Constants for validation
var minLength = 8;
var maxLength = 50;
var emailRegEx = /^([a-zA-Z0-9._\-]+|[a-zA-Z0-9]+(?:[._\-][a-zA-Z0-9]+)*)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var input = document.querySelector('#email');

// Check max length
input.addEventListener('keydown', function(e) {
  let val = input.value;
  if (val.length >= maxLength && e.key !== 'Backspace' && e.key !== 'Delete') {
    e.preventDefault();
  }
});

// Check denied characters
function denyChar(infoCallback) {
  input.addEventListener('keypress', function(event) {
    let regex = /[a-zA-Z0-9.\-_@]/;
    let char = String.fromCharCode(event.which);
    if (!regex.test(char)) {
      setTimeout(function() {
        event.preventDefault();
        document.querySelector('.valid_info_email').textContent = 'Latin letters, numbers and some symbols are allowed in this field';
        document.querySelector('.valid_info_email').style.color = 'red';
        setTimeout(function() {
          infoCallback();
        }, 1000);
      }, 1000);
    } else {
      infoCallback();
    }
  });
}

// Validate email
input.addEventListener('input', validateEmail);
input.addEventListener('keypress', validateEmail);
input.addEventListener('blur', validateEmail);
input.addEventListener('keydown', validateEmail);
input.addEventListener('keyup', validateEmail);
input.addEventListener('change', validateEmail);

let emailVal = false;

function validateEmail() 
{
    if (input.value.length >= minLength && input.value.length <= maxLength) 
    {
        let regexFirst = /^[a-zA-Z0-9]+$/;
        let regexD = /(.)\1{6}/;

        // Check char "@"
        if (input.value.indexOf('@') !== -1) 
        {
            let email = input.value;
            let atIndex = email.indexOf('@');

            // Check dots 
            if (atIndex >= 0) 
            {
                let domain = email.split('@')[1];
                let numDots = (domain.match(/\./g) || []).length;
                
                // Check more than 2 dots in a row after "@"
                if (/@.*?\.{2,}/.test(email)) 
                {
                    input.classList.remove('valid', 'invalid');
                    document.querySelector('.valid_info_email').textContent = 'The address entered is invalid. Check the address you entered';
                    document.querySelector('.valid_info_email').style.color = 'red';
                    input.classList.add('invalid');

                    let infoCallback = function() 
                    {
                        document.querySelector('.valid_info_email').textContent = 'The address entered is invalid. Check the address you entered';
                        document.querySelector('.valid_info_email').style.color = 'red';
                    };

                    denyChar(infoCallback);
                    emailVal = false;
                    return false;
                }

                // Check more than 2 dots after "@"
                else if (numDots >= 3) 
                {
                    input.classList.remove('valid', 'invalid');
                    document.querySelector('.valid_info_email').textContent = 'The address entered is invalid. Too many dots after "@"';
                    document.querySelector('.valid_info_email').style.color = 'red';
                    
                    input.classList.add('invalid');
                    let infoCallback = function() 
                    {
                        document.querySelector('.valid_info_email').textContent = 'The address entered is invalid. Too many dots after "@"';
                        document.querySelector('.valid_info_email').style.color = 'red';
                    };

                    denyChar(infoCallback);
                    emailVal = false;
                    return false;
                }
                // Check first char
                else if (!regexFirst.test(input.value.charAt(0))) 
                {
                    input.classList.remove('valid', 'invalid');
                    document.querySelector('.valid_info_email').textContent = 'The address entered is invalid. The first character can only be a letter or a number';
                    document.querySelector('.valid_info_email').style.color = 'red';
                    input.classList.add('invalid');
                
                    let infoCallback = function() 
                    {
                        document.querySelector('.valid_info_email').textContent = 'The address entered is invalid. The first character can only be a letter or a number';
                        document.querySelector('.valid_info_email').style.color = 'red';
                    };
                    
                    denyChar(infoCallback);
                    emailVal = false;
                    return false;
                }
                // Check duplicates
                else if (regexD.test(input.value)) 
                {
                    input.classList.remove('valid', 'invalid');
                    document.querySelector('.valid_info_email').textContent = 'The address entered is invalid. Too many identical characters';
                    document.querySelector('.valid_info_email').style.color = 'red';
                    input.classList.add('invalid');
                    let infoCallback = function() {
                        document.querySelector('.valid_info_email').textContent = 'The address entered is invalid. Too many identical characters';
                        document.querySelector('.valid_info_email').style.color = 'red';
                    };
                    denyChar(infoCallback);
                    emailVal = false;
                    return false;
                }
                else 
                {
                    if (emailRegEx.test(input.value)) 
                    {
                        if (!regexFirst.test(input.value.charAt(0))) 
                        {
                            input.classList.remove('valid', 'invalid');
                            document.querySelector('.valid_info_email').textContent = 'The address entered is invalid. The first character can only be a letter or a number';
                            document.querySelector('.valid_info_email').style.color = 'red';
                            input.classList.add('invalid');
                            let infoCallback = function() {
                                document.querySelector('.valid_info_email').textContent = 'The address entered is invalid. The first character can only be a letter or a number';
                                document.querySelector('.valid_info_email').style.color = 'red';
                            };
                            denyChar(infoCallback);
                            emailVal = false;
                            return false;
                        } 
                        else if (regexD.test(input.value)) 
                        {
                            input.classList.remove('valid', 'invalid');
                            document.querySelector('.valid_info_email').textContent = 'The address entered is invalid. Too many identical characters';
                            document.querySelector('.valid_info_email').style.color = 'red';
                            input.classList.add('invalid');
                            let infoCallback = function() {
                                document.querySelector('.valid_info_email').textContent = 'The address entered is invalid. Too many identical characters';
                                document.querySelector('.valid_info_email').style.color = 'red';
                            };
                            denyChar(infoCallback);
                            emailVal = false;
                            return false;
                        }

                        else {
                            input.classList.remove('valid', 'invalid');
                            document.querySelector('.valid_info_email').textContent = 'The entered address is valid';
                            document.querySelector('.valid_info_email').style.color = 'green';
                            input.classList.add('valid');
                            let infoCallback = function() {
                                document.querySelector('.valid_info_email').textContent = 'The entered address is valid';
                                document.querySelector('.valid_info_email').style.color = 'green';
                            };
                            denyChar(infoCallback);
                            emailVal = true;
                            return true;
                        }
                    } 
                    else 
                    {
                        input.classList.remove('valid', 'invalid');
                        document.querySelector('.valid_info_email').textContent = 'The address entered is invalid';
                        document.querySelector('.valid_info_email').style.color = 'red';
                        input.classList.add('invalid');
                        let infoCallback = function() {
                        document.querySelector('.valid_info_email').textContent = 'The address entered is invalid';
                        document.querySelector('.valid_info_email').style.color = 'red';
                        };
                        denyChar(infoCallback);
                        emailVal = false;
                        return false;
                    }
                }
            }
        }
    }
    else if (input.value.length === 0) 
    {
        input.classList.remove('valid', 'invalid');
        document.querySelector('.valid_info_email').textContent = '';
        let infoCallback = function() {
        document.querySelector('.valid_info_email').textContent = '';
        };
        denyChar(infoCallback);
        emailVal = false;
        return false;
    }
    else {
        if (input.value.length > 0 && (input.value.length < minLength || input.value.length > maxLength)) 
        {
            input.classList.remove('valid', 'invalid');
            document.querySelector('.valid_info_email').textContent = `The address entered is invalid, valid from ${minLength} to ${maxLength} characters`;
            document.querySelector('.valid_info_email').style.color = 'red';
            input.classList.add('invalid');
            let infoCallback = function() {
                document.querySelector('.valid_info_email').textContent = `The address entered is invalid, valid from ${minLength} to ${maxLength} characters`;
                document.querySelector('.valid_info_email').style.color = 'red';
            };
            denyChar(infoCallback);
            emailVal = false;
            return false;
        }
    }
}

// Additional input parameters
input.addEventListener('keypress', function(event) {
  let value = input.value;
  let key = String.fromCharCode(event.which);

  if (value.length === 0 && !/[a-zA-Z0-9]/.test(key)) {
    event.preventDefault();
    return false;
  }
  if (value.length === 1 && !/[a-zA-Z0-9\-_.]/.test(key)) {
    event.preventDefault();
    return false;
  }
  if (value.length >= 2 && !/[a-zA-Z0-9.\-_@]/.test(key)) {
    event.preventDefault();
    return false;
  }
  if (key === '.' && value.slice(-1) === '.') {
    event.preventDefault();
    return false;
  }
  if (/(.)\1{6}/.test(value)) {
    input.value = value.slice(0, -1);
  }
  if (value.indexOf('@') !== -1 && value.indexOf('.') === -1 && value.slice(-1) === '@' && !/[a-zA-Z0-9]/.test(key)) {
    event.preventDefault();
    return false;
  }
  if (value.indexOf('@') !== -1 && !/[a-zA-Z0-9.\-_]/.test(key)) {
    event.preventDefault();
    return false;
  }
  if (value.indexOf('@') !== -1 && value.indexOf('.', value.indexOf('@') + 1) !== -1 && !/[a-zA-Z0-9.\-_]/.test(key)) {
    event.preventDefault();
    return false;
  }
  if (value.indexOf('@') !== -1 && value.indexOf('.', value.indexOf('@') + 1) !== -1 && value.indexOf('.', value.indexOf('@') + 1) !== value.lastIndexOf('.') && !/[a-zA-Z]/.test(key)) {
    event.preventDefault();
    return false;
  }
  if (value.indexOf('@') !== -1 && value.indexOf('.', value.indexOf('@') + 1) === value.lastIndexOf('.') && !/[a-zA-Z0-9.\-_]/.test(key)) {
    event.preventDefault();
    return false;
  }
  if (value.indexOf('@') !== -1 && value.indexOf('.', value.indexOf('@') + 1) !== value.lastIndexOf('.') && !/[a-zA-Z]/.test(key)) {
    event.preventDefault();
    return false;
  }
});

// Allow "@" only once
input.addEventListener('keypress', function(e) {
  let currentValue = input.value;
  if (e.which === 64 && currentValue.indexOf('@') !== -1) {
    e.preventDefault();
  }
});

// Allowed characters
input.addEventListener('keypress', function(e) {
  let allowedChars = /[a-zA-Z0-9._@-]/;
  let charCode = (typeof e.which === "number") ? e.which : e.keyCode;
  if (!allowedChars.test(String.fromCharCode(charCode))) {
    e.preventDefault();
  }
});

    
    



  
});

