/*const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        if (entry.target.classList.contains('alternate')) {
          entry.target.classList.add('show-right');
        }
      } else {
        entry.target.classList.remove('show', 'show-right');
      }
    });
  });
  
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el, index) => {
    observer.observe(el);
    if (index % 2 === 1) {
      el.classList.add('alternate');
    }
  });*/


const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        if (entry.target.classList.contains('alternate')) {
          entry.target.classList.add('show-right');
        }
        observer.unobserve(entry.target); // Arrête d'observer l'élément une fois qu'il est visible
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
