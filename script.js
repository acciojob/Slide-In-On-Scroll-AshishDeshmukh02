// Your JS code here.
// Get all the images that need to slide in
const images = document.querySelectorAll('.slide-in');

// Debounce function to improve performance
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Function that will add the active classname to the image when scrolled to it
function checkSlide(e) {
  images.forEach(image => {
    // Get the slide-in image's half height
    const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;

    // Get the image's bottom position
    const imageBottom = image.offsetTop + image.height;

    // Check if the image should slide in
    const isHalfShown = slideInAt > image.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }
  });
}

// Pass the `checkSlide` function to the debounced function
window.addEventListener('scroll', debounce(checkSlide));
