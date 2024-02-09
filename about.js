 
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
 
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
window.onscroll = () => {
    navbar.classList.remove('active');
    menu.classList.remove('bx-x');
}

const prev = document.getElementById('prev-btn')
const next = document.getElementById('next-btn')
const list = document.getElementById('item-list')

const itemWidth = 200
const padding = 10

prev.addEventListener('click',()=>{
  list.scrollLeft -= itemWidth + padding
})

next.addEventListener('click',()=>{
  list.scrollLeft += itemWidth + padding
})

document.addEventListener("DOMContentLoaded", function() {
  var scrollToTopButton = document.querySelector(".scroll-to-top");


  window.addEventListener("scroll", function() {
      if (window.pageYOffset > 100) {
          scrollToTopButton.classList.add("show");
      } else {
          scrollToTopButton.classList.remove("show");
      }
  });


  scrollToTopButton.addEventListener("click", function() {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
  });
});