/*
 * Progressive enhancements for Zen of DevOps.
 *
 * 1. Parallax scroll for background scene.
 * 2. Anchor link copy-to-clipboard.
 * 3. Back-to-top button show/hide.
 *
 * Without JS: bg-scene is fixed at top:0, anchor links are normal
 * <a href="#id"> elements, back-to-top button is hidden via CSS.
 */
;(function () {
  // Add js-enabled class for CSS hooks
  document.documentElement.classList.add('js-enabled')

  /* -------------------------------------------------
     Parallax
     ------------------------------------------------- */

  var scenes = document.querySelectorAll('.bg-scene')
  if (scenes.length) {
    var ticking = false

    function getMaxShift() {
      return scenes[0].offsetHeight - window.innerHeight
    }

    function updateParallax() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop
      var maxScroll = document.documentElement.scrollHeight - window.innerHeight
      var fullShift = getMaxShift()

      // On tall pages, use the full background shift for smooth all-the-way movement.
      // On short pages, limit the shift to a fraction of the scroll distance,
      // so the background moves gently rather than racing ahead.
      var maxShift = Math.min(fullShift, maxScroll * 0.5)

      var progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0
      var shift = progress * maxShift

      var transform = 'translateY(' + (-shift) + 'px)'
      for (var i = 0; i < scenes.length; i++) {
        scenes[i].style.transform = transform
      }
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          updateParallax()
          updateBackToTop()
          ticking = false
        })
        ticking = true
      }
    }, { passive: true })

    window.addEventListener('resize', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          updateParallax()
          updateBackToTop()
          ticking = false
        })
        ticking = true
      }
    }, { passive: true })
  }

  /* -------------------------------------------------
     Anchor link copy-to-clipboard
     ------------------------------------------------- */

  document.addEventListener('click', function (e) {
    var link = e.target.closest('.anchor-link')
    if (!link) return

    e.preventDefault()

    var id = link.getAttribute('href')
    var url = window.location.origin + window.location.pathname + id

    // Update URL hash without scrolling
    history.replaceState(null, '', id)

    // Copy to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
    }

    // Show tooltip
    link.classList.add('copied')
    setTimeout(function () {
      link.classList.remove('copied')
    }, 2000)
  })

  /* -------------------------------------------------
     Back to top
     ------------------------------------------------- */

  var backToTop = document.querySelector('.back-to-top')
  var showThreshold = 400

  function updateBackToTop() {
    if (!backToTop) return
    var scrollY = window.pageYOffset || document.documentElement.scrollTop
    if (scrollY > showThreshold) {
      backToTop.classList.add('visible')
    } else {
      backToTop.classList.remove('visible')
    }
  }

  // Fast scroll to top — smoother than instant, faster than 'smooth'
  function scrollToTop() {
    var start = window.pageYOffset
    var startTime = performance.now()
    var duration = Math.min(400, start * 0.3) // Faster for short distances, caps at 400ms

    function step(now) {
      var elapsed = now - startTime
      var progress = Math.min(elapsed / duration, 1)
      // Ease-out curve
      var ease = 1 - Math.pow(1 - progress, 3)
      window.scrollTo(0, start * (1 - ease))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
    history.replaceState(null, '', window.location.pathname)
  }

  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault()
      scrollToTop()
    })
  }

  /* -------------------------------------------------
     Title link clears hash
     ------------------------------------------------- */

  var titleLink = document.querySelector('.title-link')
  if (titleLink) {
    titleLink.addEventListener('click', function (e) {
      e.preventDefault()
      scrollToTop()
    })
  }
})()
