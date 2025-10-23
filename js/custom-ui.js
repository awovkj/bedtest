/* Custom UI helpers to tweak login form and enhance visuals */
(function () {
  const hidePasswordLabels = () => {
    try {
      const inputs = document.querySelectorAll('input[type="password"]');
      inputs.forEach((input) => {
        const formItem = input.closest('.el-form-item');
        if (formItem) {
          const label = formItem.querySelector('.el-form-item__label');
          if (label && label.style.display !== 'none') {
            label.style.display = 'none';
          }
        } else {
          const maybeLabel = input.previousElementSibling;
          if (maybeLabel && maybeLabel.tagName === 'LABEL') {
            maybeLabel.style.display = 'none';
          }
        }
      });
    } catch (e) {
      // no-op
    }
  };

  // Run once when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hidePasswordLabels);
  } else {
    hidePasswordLabels();
  }

  // Observe SPA route/component changes to re-apply when login form mounts
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'childList' && (m.addedNodes && m.addedNodes.length)) {
        hidePasswordLabels();
      }
    }
  });
  observer.observe(document.body, { subtree: true, childList: true });
})();