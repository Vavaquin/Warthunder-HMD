window.electronAPI.onToggleOverlay((event, isOverlay) => {
    document.getElementById('overlay-status').textContent = isOverlay ? 'ON' : 'OFF';
  });

  