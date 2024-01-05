class RightSideBar extends HTMLElement {
  createAnchorList() {
    const contentHeading = document.querySelectorAll('.content h2, .content h3, .content h4');
    const anchorList = document.createElement('ul');
    contentHeading.forEach(heading => {
      if (heading.id) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#${heading.id}">${heading.textContent}</a>`;
        listItem.classList.add(`side-nav-${heading.tagName}`);
        anchorList.appendChild(listItem);
      }
    });
    return anchorList.outerHTML;
  }

  render() {
    this.innerHTML = this.createAnchorList();
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }
}

customElements.define('right-side-bar', RightSideBar);
