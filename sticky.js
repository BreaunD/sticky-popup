(function() {
    'use strict';

    const selector = 'div.problemmatching.react-draggable'; //id found in discovery
    const positionKey = 'haloPopupPosition';

    //find last position
    function applyStickyPosition(el) { //el = element
        const stored = JSON.parse(localStorage.getItem(positionKey));
        if (stored && el) {
            el.style.transform = `translate(${stored.x}px, ${stored.y}px)`;
        }
    }

    //Finds the popup, checks if draggable, lets you move it, and saves where you put it.
    function watchForPopup() {
        const popup = document.querySelector(selector);
        if (!popup) return;

        applyStickyPosition(popup); //Calls earlier function to move the popup to its last known spot

        let isDragging = false;
        let offset = { x: 0, y: 0 };

        // Get the initial values when drag starts
        popup.addEventListener('mousedown', (e) => {
            if (!e.target.closest('.header')) return;
            isDragging = true;
            const match = popup.style.transform.match(/translate\((.*)px, (.*)px\)/);
            offset.x = parseFloat(match?.[1] || 0) - e.clientX;
            offset.y = parseFloat(match?.[2] || 0) - e.clientY;
        });

        window.addEventListener('mouseup', () => { isDragging = false; });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const x = e.clientX + offset.x;
            const y = e.clientY + offset.y;
            popup.style.transform = `translate(${x}px, ${y}px)`;
            localStorage.setItem(positionKey, JSON.stringify({ x, y }));
        });
    } //save location x,y in local

    // Wait for popup to load after each ticket open
    const observer = new MutationObserver(() => watchForPopup());
    observer.observe(document.body, { childList: true, subtree: true });

})();
