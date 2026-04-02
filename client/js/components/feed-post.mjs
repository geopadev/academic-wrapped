class FeedPost extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = document.getElementById("feed-post-template");
    const templateContent = template.content.cloneNode(true);
    this.shadowRoot.appendChild(templateContent);

    for (const attribute of FeedPost.observedAttributes) {
      this.attributeChangedCallback(attribute, null, this.getAttribute(attribute));
    }
  }

  static get observedAttributes() {
    return ["avatar", "username", "action", "subject", "duration", "datetime"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const element = this.shadowRoot.querySelector(`.activity-feed__post-${name}`);
    if (!element) return;
    switch (name) {
      case "datetime":
        element.setAttribute("datetime", newValue);
        element.textContent = new Date(
          newValue,
        ).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        break;
      case "avatar":
        element.setAttribute("src", newValue);
        break;
      default:
        element.textContent = newValue;
    }
  }
}

customElements.define("feed-post", FeedPost);
