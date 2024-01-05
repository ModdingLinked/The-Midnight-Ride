class TitleBar extends HTMLElement {
  render() {
    const type = this.getAttribute('type');
    const sideButtonIcon = `<i class="fa-solid fa-bars"></i>`
    this.innerHTML = `<div class="titlecontainer ${type ? type : ''}">
    <div id="sideButton">
        ${type !== 'transparent' ? sideButtonIcon : ''}
    </div>
    <img src="./img/logo.webp" alt="Logo">
    <a href="./index.html">The Midnight Ride</a>
    <div class="guideLinks">
        <a href="https://vivanewvegas.moddinglinked.com" target="_blank" rel="nofollow">Fallout New Vegas</a>
        <a href="https://thebestoftimes.moddinglinked.com" target="_blank" rel="nofollow">Tale of Two Wastelands</a>
        <a href="https://dragonbornsfate.moddinglinked.com" target="_blank" rel="nofollow">Skyrim Special Edition</a>
    </div>
</div>`;
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }
}

customElements.define('title-bar', TitleBar);
