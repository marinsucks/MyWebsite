const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        if (entry.target.classList.contains('alternate')) {
          entry.target.classList.add('show-right');
        }
        observer.unobserve(entry.target); // Stops observing element once visible
      } else {
        entry.target.classList.remove('show', 'show-right');
      }
    });
  }, { once: true });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el, index) => {
  observer.observe(el);
  if (index % 2 === 1) {
    el.classList.add('alternate');
  }
});
