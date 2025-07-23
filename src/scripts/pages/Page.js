import gsap from "gsap";

export default class Page {
    constructor({ id, element, elements }) {
        this.id = id;
        this.selector = element;
        this.selectorChildren = elements;
    }

    create() {
        this.element = this.selector;
        this.elements = {};

        Object.entries(this.selectorChildren).forEach(([key, entry]) => {
            if (
                entry instanceof HTMLElement ||
                entry instanceof NodeList ||
                Array.isArray(entry)
            ) {
                this.elements[key] = entry;
            } else if (typeof entry === "string") {
                const els = document.querySelectorAll(entry);

                if (els.length === 0) return;

                if (els.length > 1) {
                    this.element[key] = entry;
                } else {
                    this.element[key] = entry[0];
                }
            }
        });
    }

    show() {
        return new Promise((resolve) => {
            gsap.from(this.element, {
                opacity: 0,
                onComplete: resolve,
            });
        });
    }

    hide() {
        return new Promise((resolve) => {
            gsap.to(this.element, {
                opacity: 0,
                onComplete: resolve,
            });
        });
    }
}
