const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseenter', () => {
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) {
      new bootstrap.Dropdown(dropdown).show();
    }
  });

  dropdown.addEventListener('mouseleave', () => {
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) {
      new bootstrap.Dropdown(dropdown).hide();
    }
  });
});