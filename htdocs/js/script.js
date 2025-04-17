// Simple interactivity for the demo widget
document.addEventListener('DOMContentLoaded', () => {
    const demoButton = document.getElementById('demoButton');
    const demoWidget = document.getElementById('demoWidget');

    demoButton.addEventListener('click', () => {
        demoWidget.classList.toggle('hidden');
    });
});