class SideBar extends HTMLElement {
  render() {
    this.innerHTML = `<div>
  <ul>
    <li>
      <a href="./index.html">Home</a>
    </li>
    <li>
      <a href="./intro.html">Introduction</a>
    </li>
    <li>
      <a href="./setup.html">Setup</a>
    </li>
    <li>
      <a href="./mo2.html">MO2</a>
    </li>
    <li>
      <a href="./utilities.html">Utilities</a>
    </li>
    <li>
      <a href="./bugfix.html">Bug Fixes</a>
    </li>
    <li>
      <a href="./basefinish.html">Base Finish</a>
    </li>
  </ul>
  <hr>
</div>
<div class="extended-background">
  <h3 id="extended-separator">TMR Extended</h3>
  <ul>
    <li>
      <a href="./tweaks.html">Tweaks</a>
    </li>
    <li>
      <a href="./hud.html">User Interface</a>
    </li>
    <li>
      <a href="./gameplay.html">Gameplay</a>
    </li>
    <li>
      <a href="./visuals.html">Visuals</a>
    </li>
    <li>
      <a href="./finish.html">TMRE Finish</a>
    </li>
  </ul>
</div>
<div>
  <hr>
  <ul>
    <li>
      <a href="./appendix.html">Appendix</a>
    </li>
    <li>
      <a href="./faq.html">FAQ</a>
    </li>
    <li>
      <a href="./avoid-tools.html">Tools to Avoid</a>
    </li>
    <li>
      <a href="./avoid-mods.html">Mods to Avoid</a>
    </li>
  </ul>
</div>

<!-- Guide Links -->
<div class="guideLinks">
  <hr>
  <ul>
    <li>
      <a href="https://vivanewvegas.moddinglinked.com" target="_blank" rel="nofollow">Fallout New Vegas</a>
    </li>
    <li>
      <a href="https://thebestoftimes.moddinglinked.com" target="_blank" rel="nofollow">Tale of Two Wastelands</a>
    </li>
    <li>
      <a href="https://dragonbornsfate.moddinglinked.com" target="_blank" rel="nofollow">Skyrim Special Edition</a>
    </li>
  </ul>
</div>

<!-- Footer -->
<div id="footer">
  <ul>
    <li>
      <a href="https://discord.gg/S99Ary5eba" target="_blank" aria-label="Go to TMR Discord">
        <i class="fab fa-discord"></i>
      </a>
    </li>
    <li>
      <button id="paypalMenuBtn" aria-label="Open Dono by PayPal menu" type="button"><i class="fa fa-paypal"></i></button>
      <div class="donoMenu hidden">
        <a href="https://www.paypal.com/paypalme/VishVadeva" target="_blank">
          VishVadeva
        </a>
        <a href="https://www.paypal.com/paypalme/wallsogb" target="_blank">
          Wall SoGB
        </a>
      </div>
    </li>
    <li>
      <button id="kofiMenuBtn" aria-label="Open Dono by Ko-fi menu" type="button"><i class="fa fa-coffee"></i></button>
      <div class="donoMenu hidden">
        <a href="https://ko-fi.com/vishvadeva" target="_blank">
          VishVadeva
        </a>
        <a href="https://ko-fi.com/wall_sogb" target="_blank">
          Wall SoGB
        </a>
      </div>
    </li>
    <li>
      <a href="https://github.com/ModdingLinked/The-Midnight-Ride" target="_blank">
        <i class="fab fa-github"></i>
      </a>
    </li>
  </ul>
</div>`
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }

    // Adding single dot to make this works is pretty weird but fuck it 
    const currentPage = `.${window.location.pathname}`;
    this.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      if (currentPage.endsWith(href)) {
        link.classList.add('active');
      }
    })

    // Same as above but for extended-background container. Might not be the best way,
    const extendedBackground = document.querySelector('.extended-background');
    extendedBackground.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      if (currentPage.endsWith(href)) {
        extendedBackground.classList.add('active');
      }
    });
  }
}

customElements.define('side-bar', SideBar)

