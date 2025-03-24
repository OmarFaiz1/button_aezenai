// Create the chat button
const button = document.createElement('button');
button.innerHTML = getChatIcon(); // Set initial chat icon

// Apply base styles to chat button
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
button.style.zIndex = '1000'; // Ensure chat button stays above iframe
button.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';

// Create iframe container
const iframeContainer = document.createElement('div');
iframeContainer.style.position = 'fixed';
iframeContainer.style.background = '#fff';
iframeContainer.style.borderRadius = '8px';
iframeContainer.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
iframeContainer.style.zIndex = '999'; // Below chat button
iframeContainer.style.display = 'none'; // Hidden by default (toggles with button)
iframeContainer.style.overflow = 'hidden';

// Responsive styles for Shopify
function updateStyles() {
    if (window.innerWidth <= 768) {
        // Mobile: Full width of mobile screen
        button.style.width = '45px';
        button.style.height = '45px';
        button.style.right = '15px';
        button.style.bottom = '15px';
        iframeContainer.style.width = '100vw'; // Full mobile screen width
        iframeContainer.style.height = 'calc(100vh - 60px)'; // Above chat button
        iframeContainer.style.right = '0'; // Align to right edge
        iframeContainer.style.bottom = '60px'; // Above chat button
    } else {
        // Desktop: Increased by 15% from 300x450px
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.right = '20px';
        button.style.bottom = '20px';
        iframeContainer.style.width = '345px'; // 300px * 1.15
        iframeContainer.style.height = '518px'; // 450px * 1.15
        iframeContainer.style.right = '20px';
        iframeContainer.style.bottom = '80px';
    }
}

updateStyles();
window.addEventListener('resize', updateStyles);

// Create iframe content with both buttons from index.html
iframeContainer.innerHTML = `
    <iframe id="chat-iframe" src="https://chat.aezenai.com?aid=af2a896a-5517-48eb-b8f3-014eec338f38&lang=en" 
            style="width: 100%; height: calc(100% - 30px); border: none;"></iframe>
    <div style="text-align: center; padding: 5px; font-size: 14px; background: #f1f1f1; color: #333;">
        Powered by <a href="https://aezenai.com" target="_blank" style="color: #007bff; text-decoration: none;">aezenai.com</a>
    </div>
    <button id="floating-btn" 
            style="position: absolute; bottom: 30px; left: 9px; width: 34px; height: 54px; 
                   background: transparent; border: none; border-radius: 50%; 
                   cursor: pointer; display: flex; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" 
             fill="none" stroke="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
    </button>
    <button id="track-order-btn" 
            style="position: absolute; top: 20px; right: 10px; padding: 10px 16px; 
                   background: #f8f9fa; border: 1px solid #007bff; border-radius: 4px; 
                   color: #007bff; font-size: 16px; cursor: pointer;">
        Track Order
    </button>
`;

document.body.appendChild(button);
document.body.appendChild(iframeContainer);

// Add functionality to floating button
const floatingBtn = iframeContainer.querySelector('#floating-btn');
const trackOrderBtn = iframeContainer.querySelector('#track-order-btn');
const chatIframe = iframeContainer.querySelector('#chat-iframe');

// Function to toggle Track Order button visibility based on iframe URL
function toggleTrackOrderButton() {
    if (chatIframe.src === "https://dockerautomation-production.up.railway.app/") {
        trackOrderBtn.style.display = 'none';
    } else {
        trackOrderBtn.style.display = 'block';
    }
}

// Initial check for Track Order button visibility
toggleTrackOrderButton();

floatingBtn.addEventListener('click', (event) => {
    event.preventDefault();
    chatIframe.src = "https://dockerautomation-production.up.railway.app/";
    console.log('Iframe URL changed to:', chatIframe.src);
    toggleTrackOrderButton(); // Update button visibility after URL change
});

// Add functionality to Track Order button (logs click for now)
trackOrderBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Track Order button clicked');
    // Add Shopify-specific functionality here if needed
});

// Toggle iframe visibility with chat button
let isOpen = false;
button.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
        iframeContainer.style.display = 'block';
        button.innerHTML = getCloseIcon();
        toggleTrackOrderButton(); // Check URL when iframe opens
    } else {
        iframeContainer.style.display = 'none';
        button.innerHTML = getChatIcon();
    }
});

// Chat and Close icons
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
