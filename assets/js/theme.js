(function () {
    var html = document.documentElement;
    html.classList.add('js-enabled');

    var STORAGE_KEY = 'theme';
    var CYCLE = ['auto', 'dark', 'light'];
    var ICONS = { auto: '\u25D1', dark: '\u263E', light: '\u2600' };

    function getPreference() {
        return localStorage.getItem(STORAGE_KEY) || 'auto';
    }

    function getEffective(pref) {
        if (pref !== 'auto') return pref;
        return matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark' : 'light';
    }

    function apply(pref) {
        var effective = getEffective(pref);

        // Set data-theme for CSS — always "light" or "dark"
        html.dataset.theme = effective;

        // Update toggle button
        var btn = document.querySelector('.theme-toggle');
        if (btn) {
            btn.textContent = ICONS[pref];
            btn.setAttribute('aria-label',
                'Theme: ' + pref + '. Click to change.');
            btn.title = 'Theme: ' + pref;
        }
    }

    function cycle() {
        var current = getPreference();
        var next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];
        localStorage.setItem(STORAGE_KEY, next);
        apply(next);
    }

    // Apply on load
    apply(getPreference());

    // React to OS theme changes (relevant when set to "auto")
    matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', function () {
            apply(getPreference());
        });

    // Wire up toggle button when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        var btn = document.querySelector('.theme-toggle');
        if (btn) {
            btn.addEventListener('click', cycle);
            // Re-apply to update button text (button may not exist at first apply)
            apply(getPreference());
        }
    });
})();
