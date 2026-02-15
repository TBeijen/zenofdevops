/*
 * Parallax scroll for background scene.
 * Progressive enhancement: without JS, .bg-scene is fixed via CSS.
 * With JS, a subtle translateY shift is applied on scroll.
 */
;(function () {
  var scene = document.querySelector('.bg-scene')
  if (!scene) return

  // Parallax factor: how much the bg moves relative to scroll.
  // 0 = fully fixed, 1 = scrolls with page. 0.15 = subtle drift.
  var factor = 0.15
  var ticking = false

  function update() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop
    scene.style.transform = 'translateY(' + (scrollY * factor) + 'px)'
    ticking = false
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update)
      ticking = true
    }
  }, { passive: true })

  // Add js-enabled class for potential CSS hooks
  document.documentElement.classList.add('js-enabled')
})()
