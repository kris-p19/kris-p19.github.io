---
layout: default
title: "Random Strong Password Generator"
description: "Random Strong Password Generator"
keywords: "Random Strong Password Generator"
urlx: "https://fintechxhub.com/technology/password"
image: "https://cdn.pixabay.com/photo/2017/04/29/22/47/password-2271736_1280.jpg"
navTechnology: "active"
---
<div class="tags-widget widget-item">
    <h2 class="text-center mb-4">Random Strong Password Generator</h2>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="mb-3">
                <label for="passwordLength" class="form-label">Password Length</label>
                <input type="number" class="form-control" id="passwordLength" value="12" min="8" max="20">
            </div>
            <div class="mb-3">
                <label class="form-label">Include</label>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="includeNumbers" checked>
                    <label class="form-check-label" for="includeNumbers">
                        Numbers (0-9)
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="includeUppercase" checked>
                    <label class="form-check-label" for="includeUppercase">
                        Uppercase Letters (A-Z)
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="includeLowercase" checked>
                    <label class="form-check-label" for="includeLowercase">
                        Lowercase Letters (a-z)
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="includeSymbols" checked>
                    <label class="form-check-label" for="includeSymbols">
                        Special Characters (!@#$%^&*)
                    </label>
                </div>
            </div>
            <div class="mb-3">
                <button class="btn btn-primary w-100" id="generatePassword">Generate Password</button>
            </div>
            <div class="mb-3">
                <label for="generatedPassword" class="form-label">Generated Password</label>
                <input type="text" class="form-control" id="generatedPassword" readonly>
            </div>
        </div>
    </div>
</div>
<script>
    // Function to generate random strong password
        function generatePassword(length, useNumbers, useUppercase, useLowercase, useSymbols) {
            let characters = "";
            if (useNumbers) characters += "0123456789";
            if (useUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            if (useLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
            if (useSymbols) characters += "!@#$%^&*()_+[]{}|;:,.<>?/";
            if (characters === "") return ""; // If no character set is selected
            let password = "";
            for (let i = 0; i < length; i++) {
                password += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return password;
        }
    // Event listener for the generate button
        document.getElementById('generatePassword').addEventListener('click', function () {
            const length = parseInt(document.getElementById('passwordLength').value);
            const useNumbers = document.getElementById('includeNumbers').checked;
            const useUppercase = document.getElementById('includeUppercase').checked;
            const useLowercase = document.getElementById('includeLowercase').checked;
            const useSymbols = document.getElementById('includeSymbols').checked;
            const password = generatePassword(length, useNumbers, useUppercase, useLowercase, useSymbols);
            document.getElementById('generatedPassword').value = password;
        });
</script>