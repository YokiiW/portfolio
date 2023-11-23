const imageContainer = document.querySelector('.video-container');
const overlay = document.querySelector('.overlay');

imageContainer.addEventListener('mousemove', (event) => {
  const rect = imageContainer.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width * 100;
  const y = (event.clientY - rect.top) / rect.height * 100;

   overlay.style.clipPath = `circle(5% at ${x}% ${y}%)`;
   
});

imageContainer.addEventListener('mouseleave', () => {
  overlay.style.clipPath = 'circle(0% at 0% 0%)';
});