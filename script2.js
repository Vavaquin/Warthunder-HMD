function toggleVisibility() {
    const mira = document.getElementById('mira');
    if (mira.style.display === 'none') {
        mira.style.display = 'block';
    } else {
        mira.style.display = 'none';
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'F10') {
        toggleVisibility();
    }
});