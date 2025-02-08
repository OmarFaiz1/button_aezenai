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
    if (window.innerWidth <= 768) {
        button.style.width = '45px';
        button.style.height = '45px';
        button.style.right = '15px';
        button.style.bottom = '15px';
    } else {
        button.style.width = '50px';
        button.style.height = '50px';
    }
}

updateButtonStyle();
window.addEventListener('resize', updateButtonStyle);

document.body.appendChild(button);

let popup = null;

button.addEventListener('click', () => {
    if (popup && !popup.closed) {
        popup.close();
        popup = null;
        button.innerHTML = getChatIcon();
    } else {
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

        const buttonBottom = 20;
        const buttonHeight = parseInt(button.style.height);
        const popupBottom = buttonBottom + buttonHeight - height;
        const buttonRight = 20;
        const buttonWidth = parseInt(button.style.width);
        const extraSpacing = 20;
        const popupRight = buttonRight + width + buttonWidth + extraSpacing;
        const left = Math.max(10, screenWidth - popupRight);
        const top = Math.max(10, screenHeight - height - popupBottom);

        popup = window.open(
            '',
            'Chat Window',
            `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no,menubar=no,toolbar=no,status=no`
        );

        if (popup) {
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
                            position: relative;
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
                        .floating-btn {
                            position: absolute;
                            bottom: 44px;
                            left: 9px;
                            width: 30px;
                            height: 30px;
                            background: blue;
                            color: white;
                            border: none;
                            border-radius: 50%;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 16px;
                            font-weight: bold;
                            user-select: none;
                            pointer-events: auto; /* Ensure it captures all clicks */
                        }
                    </style>
                </head>
                <body>
                    <iframe src="https://chat.aezenai.com?aid=af2a896a-5517-48eb-b8f3-014eec338f38&lang=en"></iframe>
                    <button class="floating-btn" id="floating-btn">+</button>
                    <div class="footer">
                        Powered by <a href="https://aezenai.com" target="_blank">aezenai.com</a>
                    </div>

                    <script>
                        document.addEventListener("DOMContentLoaded", function () {
                            let floatingBtn = document.getElementById("floating-btn");

                            floatingBtn.addEventListener("click", function (event) {
                                event.preventDefault(); // Prevents any default behavior
                                event.stopImmediatePropagation(); // Ensures only this event runs
                                window.location.href = "https://siliconpix.com"; // Redirects user
                            });
                        });
                    </script>

                </body>
                </html>
            `);
            popup.document.close();
            button.innerHTML = getCloseIcon();
            popup.onbeforeunload = () => {
                button.innerHTML = getChatIcon();
            };
            popup.focus();
        } else {
            alert('Popup blocked. Please enable popups for this site.');
        }
    }
});

function getChatIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>`;
}

function getCloseIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>`;
}
