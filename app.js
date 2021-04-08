////////
////
//// Old method trigger
////
///////

// const hikeExp = document.querySelector('.hike-exp')

// window.addEventListener('scroll', scrollReveal)

// function scrollReveal() {
//   const windowHeight = window.innerHeight / 2
//   const hikePos = hikeExp.getBoundingClientRect().top
//   if (hikePos < windowHeight) {
//     hikeExp.style.color = 'red'
//   }
// }

////////
////
//// actual method trigger
////
///////

// const slide = document.querySelector('.hike')

// let options = {
//   threshold: 0.5,
// }

// let observer = new IntersectionObserver(slideAnimation, options)

// function slideAnimation(entries) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       slide.style.background = 'red'
//     }
//   })
// }

// observer.observe(slide)
