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

// Create iframe container
const iframeContainer = document.createElement('div');
iframeContainer.style.position = 'fixed';
iframeContainer.style.right = '20px';
iframeContainer.style.bottom = '80px';
iframeContainer.style.width = '350px';
iframeContainer.style.height = '480px';
iframeContainer.style.background = '#fff';
iframeContainer.style.borderRadius = '8px';
iframeContainer.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
iframeContainer.style.zIndex = '999';
iframeContainer.style.display = 'none';
iframeContainer.style.overflow = 'hidden';

// Responsive styles
function updateStyles() {
    if (window.innerWidth <= 768) {
        button.style.width = '45px';
        button.style.height = '45px';
        button.style.right = '15px';
        button.style.bottom = '15px';
        iframeContainer.style.width = '300px';
        iframeContainer.style.height = '400px';
        iframeContainer.style.right = '15px';
        iframeContainer.style.bottom = '70px';
    } else {
        button.style.width = '50px';
        button.style.height = '50px';
        iframeContainer.style.width = '350px';
        iframeContainer.style.height = '480px';
    }
}

updateStyles();
window.addEventListener('resize', updateStyles);

// Create iframe content
iframeContainer.innerHTML = `
    <iframe id="chat-iframe" src="https://chat.aezenai.com?aid=af2a896a-5517-48eb-b8f3-014eec338f38&lang=en" 
            style="width: 100%; height: calc(100% - 30px); border: none;"></iframe>
    <div style="text-align: center; padding: 5px; font-size: 14px; background: #f1f1f1; color: #333;">
        Powered by <a href="https://aezenai.com" target="_blank" style="color: #007bff; text-decoration: none;">aezenai.com</a>
    </div>
    <button id="floating-btn" 
            style="position: absolute; bottom: 40px; left: 9px; width: 30px; height: 30px; 
                   background: blue; color: white; border: none; border-radius: 50%; 
                   cursor: pointer; display: flex; align-items: center; justify-content: center; 
                   font-size: 16px; font-weight: bold;">+</button>
`;

document.body.appendChild(button);
document.body.appendChild(iframeContainer);

// Add floating button functionality
const floatingBtn = iframeContainer.querySelector('#floating-btn');
const chatIframe = iframeContainer.querySelector('#chat-iframe');

floatingBtn.addEventListener('click', (event) => {
    event.preventDefault();
    chatIframe.src = "https://dockerautomation-production.up.railway.app/";
});

let isOpen = false;

button.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
        iframeContainer.style.display = 'block';
        button.innerHTML = getCloseIcon();
    } else {
        iframeContainer.style.display = 'none';
        button.innerHTML = getChatIcon();
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
