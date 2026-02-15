/*
 * Parallax scroll for background scene.
 * Progressive enhancement: without JS, .bg-scene is fixed via CSS
 * at top:0, oversized to 140vh so the lower ~40vh overflows below
 * the viewport.
 * With JS, the scene is translated upward as the user scrolls,
 * revealing the lower part of the image. The max shift equals the
 * overflow (height - 100vh), so the bottom edge aligns with the
 * viewport bottom at full scroll.
 */
;(function () {
  var scene = document.querySelector('.bg-scene')
  if (!scene) return

  var ticking = false

  function getMaxShift() {
    // The overflow: how much taller the scene is than the viewport
    return scene.offsetHeight - window.innerHeight
  }

  function update() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight
    var maxShift = getMaxShift()

    var progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0
    var shift = progress * maxShift

    scene.style.transform = 'translateY(' + (-shift) + 'px)'
    ticking = false
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update)
      ticking = true
    }
  }, { passive: true })

  // Recalculate on resize
  window.addEventListener('resize', function () {
    if (!ticking) {
      requestAnimationFrame(update)
      ticking = true
    }
  }, { passive: true })

  // Add js-enabled class for potential CSS hooks
  document.documentElement.classList.add('js-enabled')
})()
