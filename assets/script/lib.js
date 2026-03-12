export const escapeHTML = (str) => {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

export const showNotification = (message, options = {}) => {
    const {
        title = "Notice",
        variant = "dark",
        delay = 3000,
        id = "app-toast-stack"
    } = options;

    let stack = document.getElementById(id);
    if (!stack) {
        stack = document.createElement("div");
        stack.id = id;
        stack.className = "position-fixed bottom-0 end-0 p-3 d-flex flex-column gap-2";
        stack.style.zIndex = "1080";
        document.body.appendChild(stack);
    }

    const card = document.createElement("div");
    card.className = `card border-0 shadow-sm text-bg-${variant}`;
    card.innerHTML = `
        <div class="card-body d-flex align-items-start gap-2">
            <div class="flex-grow-1">
                <div class="fw-semibold">${escapeHTML(title)}</div>
                <div class="small">${escapeHTML(message)}</div>
            </div>
            <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
        </div>
    `;

    const closeBtn = card.querySelector(".btn-close");
    closeBtn.addEventListener("click", () => card.remove());

    stack.appendChild(card);

    if (delay > 0) {
        window.setTimeout(() => {
            card.remove();
            if (stack.childElementCount === 0) {
                stack.remove();
            }
        }, delay);
    }
};
