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

////////
////
//// SCROLL MAGIC
////
///////

// const controller = new ScrollMagic.Controller()

// const exploreScene = new ScrollMagic.Scene({
//   triggerElement: '.hike-exp',
//   triggerHook: 0.5,
// })
//   .addIndicators({ colorStart: 'white', colorTrigger: 'white' })
//   .setClassToggle('.hike-exp', 'active')
//   .addTo(controller)

////////
////
//// GSAP
////
///////

let controller
let slideScene
let pageScene

function animateSlides() {
  controller = new ScrollMagic.Controller()
  const sliders = document.querySelectorAll('.slide')
  const nav = document.querySelector('.nav-header')
  // loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector('.reveal-img')
    const img = slide.querySelector('img')
    const revealText = slide.querySelector('.reveal-text')
    // GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: 'power2.inOut' },
    })
    slideTl.fromTo(revealImg, { x: '0%' }, { x: '100%' })
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, '-=1')
    slideTl.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=0.75')
    slideTl.fromTo(nav, { y: '-100%' }, { y: '0%' }, '-=0.5')
    // Scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      .addIndicators({
        colorStart: 'white',
        colorTrigger: 'white',
        name: 'slide',
      })
      .addTo(controller)
    // New animation
    const pageTl = gsap.timeline()
    let nextSlide = slide.length - 1 === index ? 'end' : slides[index + 1]
    pageTl.fromTo(nextSlide, { y: '0%' }, { y: '100%' })
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 })
    pageTl.fromTo(nextSlide, { y: '50%' }, { y: '0%' }, '-= 0.5')
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: '100%',
      triggerHook: 0,
    })
      .addIndicators({
        colorStart: 'white',
        colorTrigger: 'white',
        name: 'page',
        indent: 200,
      })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller)
  })
}

const mouse = document.querySelector('.cursor')
const mouseTxt = document.querySelector('span')
const burger = document.querySelector('.burger')

function cursor(e) {
  mouse.style.top = e.pageY + 'px'
  mouse.style.left = e.pageX + 'px'
}

function activeCursor(e) {
  const item = e.target
  if (item.id === 'logo' || item.classList.contains('burger')) {
    mouse.classList.add('nav-active')
  } else {
    mouse.classList.remove('nav-active')
  }
  if (item.classList.contains('explore')) {
    gsap.to('.title-swipe', 1, { y: '0%' })
    mouse.classList.add('explore-active')
    mouseTxt.innerText = 'tap'
  } else {
    gsap.to('.title-swipe', 1, { y: '100%' })
    mouse.classList.remove('explore-active')
    mouseTxt.innerText = ''
  }
}

function navToggle(e) {
  if (!e.target.classList.contains('active')) {
    e.target.classList.add('active')
    gsap.to('.line1', 0.5, { rotate: '45', y: 5, background: 'black' })
    gsap.to('.line2', 0.5, { rotate: '-45', y: -5, background: 'black' })
    gsap.to('.nav-bar', 0.5, { clipPath: 'circle(2500px at 100% -10%' })
    gsap.to('#logo', 1, { color: 'black' })
    document.body.classList.add('hide')
  } else {
    e.target.classList.remove('active')
    gsap.to('.line1', 0.5, { rotate: '0', y: 0, background: 'white' })
    gsap.to('.line2', 0.5, { rotate: '0', y: 0, background: 'white' })
    gsap.to('.nav-bar', 0.5, { clipPath: 'circle(50px at 100% -10%' })
    gsap.to('#logo', 1, { color: 'white' })
    document.body.classList.remove('hide')
  }
}

burger.addEventListener('click', navToggle)
window.addEventListener('mousemove', cursor)
window.addEventListener('mouseover', activeCursor)

animateSlides()
