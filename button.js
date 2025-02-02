// Create the chat button
const button = document.createElement('button');
button.innerHTML = getChatIcon(); // Set initial chat icon

// Apply base styles
button.style.position = 'fixed';
button.style.right = '20px';
button.style.bottom = '20px';
button.style.backgroundColor = '#007bff';
button.style.color = '#fff';
button.style.border = 'none';
button.style.borderRadius = '50%';
button.style.display = 'flex';
button.style.alignItems = 'center';
button.style.justifyContent = 'center';
button.style.cursor = 'pointer';
button.style.zIndex = '1000';
button.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';

// Responsive styles
function updateButtonStyle() {
    if (window.innerWidth <= 768) { // Mobile & tablet adjustments
        button.style.width = '45px';
        button.style.height = '45px';
        button.style.right = '15px';
        button.style.bottom = '15px';
    } else { // Desktop version (unchanged)
        button.style.width = '50px';
        button.style.height = '50px';
    }
}

// Apply styles on load and resize
updateButtonStyle();
window.addEventListener('resize', updateButtonStyle);

// Append the button to the body
document.body.appendChild(button);

let popup = null; // Variable to store the popup window

// Add click event to the button
button.addEventListener('click', () => {
    if (popup && !popup.closed) {
        popup.close(); // Close the popup if it's open
        popup = null;
        button.innerHTML = getChatIcon(); // Restore chat icon
    } else {
        // Popup size (unchanged)
        let width, height;
        if (window.innerWidth <= 768) {
            width = 300;
            height = 400;
        } else {
            width = 350;
            height = 480;
        }

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Adjust popup position
        const buttonBottom = 20; // Distance of button from bottom
        const buttonHeight = parseInt(button.style.height); // Get button height
        const popupBottom = buttonBottom + buttonHeight - height; // Align popup with button bottom

        const buttonRight = 20; // Distance of button from right edge
        const buttonWidth = parseInt(button.style.width); // Get button width
        const extraSpacing = 20; // Additional spacing between button and popup

        const popupRight = buttonRight + width + buttonWidth + extraSpacing; // Ensure popup is far enough left
        const left = Math.max(10, screenWidth - popupRight);
        const top = Math.max(10, screenHeight - height - popupBottom); // Align popup bottom with button bottom

        popup = window.open(
            '',
            'Chat Window',
            `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no,menubar=no,toolbar=no,status=no`
        );

        if (popup) {
            // Write an iframe and footer directly to the popup document
            popup.document.write(`
                <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                        body, html {
                            margin: 0;
                            padding: 0;
                            overflow: hidden;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                        }
                        iframe {
                            flex: 1;
                            width: 100%;
                            border: none;
                        }
                        .footer {
                            text-align: center;
                            padding: 8px;
                            font-size: 14px;
                            background: #f1f1f1;
                            color: #333;
                        }
                        .footer a {
                            color: #007bff;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <iframe src="https://chat.aezenai.com?aid=af2a896a-5517-48eb-b8f3-014eec338f38&lang=en"></iframe>
                    <div class="footer">
                        Powered by <a href="https://aezenai.com" target="_blank">aezenai.com</a>
                    </div>
                </body>
                </html>
            `);
            popup.document.close();

            // Change button icon to "X" when chat is opened
            button.innerHTML = getCloseIcon();

            // Detect when popup is closed to restore chat icon
            popup.onbeforeunload = () => {
                button.innerHTML = getChatIcon();
            };

            popup.focus();
        } else {
            alert('Popup blocked. Please enable popups for this site.');
        }
    }
});

// Function to get the chat icon (blue chat bubble)
function getChatIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    `;
}

// Function to get the close (X) icon
function getCloseIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    `;
}
