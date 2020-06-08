function setCSSProps() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setCSSProps);
window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.style.setProperty(
    '--initial-vh',
    `${window.innerHeight * 0.01}px`
  );

  setCSSProps();
});
