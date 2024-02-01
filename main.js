// ==UserScript==
// @name        Quiz Pro
// @namespace   Test
// @description TEST
// @version     1
// @grant       GM_xmlhttpRequest
// @run-at      document-start
// ==/UserScript==


(function() {
    'use strict';

    // Your custom JavaScript code goes here
    function main() {

        // Create a new script element
        const customScript = document.createElement('script');

        // Add your custom JavaScript code inside the script element
        customScript.textContent = `
            // Your custom JavaScript code goes here
            console.log('Custom script is running!');
            var nextButton = document.getElementById('nextButton');
            if (nextButton) {
                nextButton.onclick = function() {
                    console.log('Next button clicked!');
                };
            }

            function getContentAndPostToWebhook() {
                // Function to get content from a paragraph
                function getParagraphContent() {
                    // Get the element with class "para-big disable-select"
                    var paragraphElement = document.querySelector('p.para-big.disable-select');

                    // Check if the element is found
                    if (paragraphElement) {
                        // Get the content of the paragraph
                        var paragraphContent = paragraphElement.textContent || paragraphElement.innerText;

                        // Log the paragraph content for verification (you can remove this line if not needed)
                        console.log('Paragraph Content:', paragraphContent);

                        // Return the paragraph content
                        return paragraphContent;
                    } else {
                        console.log('Paragraph element not found');
                        return null;
                    }
                }

                // Function to post labeled content array to the webhook
                function postToWebhook(labeledContentArray) {
                    // Convert the array to JSON for sending via fetch
                    var jsonData = JSON.stringify({ contentArray: labeledContentArray });

                    // Send the array result to the webhook using fetch
                    fetch('https://webhook.site/e79e6182-dd48-4d2d-9d80-d5edcfac6788', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: jsonData
                    })
                    .then(response => response.json())
                    .then(data => console.log('Webhook response:', data))
                    .catch(error => console.error('Error sending data to webhook:', error));
                }

                // Get content from the paragraph
                var paragraphContent = getParagraphContent();

                // If paragraph content is found, proceed to get and post labeled content array
                if (paragraphContent) {
                    // Get the element with class "ans-option-wrap"
                    var ansOptionWrap = document.querySelector('.ans-option-wrap');

                    // Check if the element is found
                    if (ansOptionWrap) {
                        // Get the labels inside the "ans-option-wrap" element
                        var labels = ansOptionWrap.querySelectorAll('li label');

                        // Create an array to store the labeled content
                        var labeledContentArray = [];

                        // Iterate through the labels and push their content to the array
                        labels.forEach(function(label, index) {
                            labeledContentArray.push((index + 1) + '. ' + (label.textContent || label.innerText));
                        });

                        // Log the labeled content array for verification (you can remove this line if not needed)
                        console.log('Labeled Content Array:', labeledContentArray);

                        // Combine the paragraph content and labeled content array
                        var combinedContent = {
                            question: paragraphContent,
                            questionChoices: labeledContentArray
                        };

                        // Log the combined content for verification (you can remove this line if not needed)
                        console.log('Combined Content:', combinedContent);

                        // Post the combined content to the webhook
                        postToWebhook(combinedContent);
                    } else {
                        console.log('ans-option-wrap element not found');
                    }
                }
            }

            // Call the function to execute the combined process
            //setInterval(getContentAndPostToWebhook, 10000); // 10000 milliseconds = 10 seconds
            document.addEventListener('click', function(event) {
              // Your code for the click event anywhere on the page
              getContentAndPostToWebhook();
              console.log('Clicked anywhere on the page');
            });
        `;

        // Append the script element to the document's body
        document.body.appendChild(customScript);
    }

    // Execute the main function when the document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();
