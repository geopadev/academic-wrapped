class GoalCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = document.getElementById("goal-card-template");
    const templateContent = template.content.cloneNode(true);
    this.shadowRoot.appendChild(templateContent);

    for (const attribute of GoalCard.observedAttributes) {
      this.attributeChangedCallback(
        attribute,
        null,
        this.getAttribute(attribute),
      );
    }
  }

  static get observedAttributes() {
    return ["title", "value", "max"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    
    switch (name) {
      case "value": {
        const element = this.shadowRoot.querySelector(".goals-list__item-progress");
        if (!element) return;
        element.setAttribute("value", newValue);
        break;
      }

      case "max": {
        const element = this.shadowRoot.querySelector(".goals-list__item-progress");
        if (!element) return;

        element.setAttribute("max", newValue);
        break;
      }

      case "title": {
        const element = this.shadowRoot.querySelector(".goals-list__item-title");
        if (!element) return;
        element.textContent = newValue;
        break;
      }

      
    }
  }
}

customElements.define("goal-card", GoalCard);
