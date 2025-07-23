import About from "./pages/about";
import Contact from "./pages/contact";
import Home from "./pages/home";
import Projects from "./pages/projects"; // renamed to match class case

class App {
    constructor() {
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.cacheDOM();
        this.createPages();
        this.addLinkListeners();
    }

    cacheDOM() {
        this.content = document.querySelector("#content");
        this.template = this.content?.getAttribute("data-template");
    }

    createPages() {
        this.pages = {
            home: new Home(),
            about: new About(),
            projects: new Projects(),
            contact: new Contact(),
        };

        this.currentPage = this.pages[this.template];
        this.currentPage?.create();
        this.currentPage?.show();
    }

    async onChange(href, push = true) {
        if (this.isTransitioning || href === window.location.href) return;
        this.isTransitioning = true;

        await this.currentPage?.hide();

        if (push) window.history.pushState({}, "", href);

        try {
            const res = await fetch(href);
            if (!res.ok) throw new Error("Fetch failed");

            const html = await res.text();
            this.updateContent(html);

            this.currentPage = this.pages[this.template];
            this.currentPage?.create();
            this.currentPage?.show();
        } catch (err) {
            console.error("Navigation error:", err);
        } finally {
            this.isTransitioning = false;
        }
    }

    updateContent(html) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        const newContent = tempDiv.querySelector("#content");
        if (!newContent) return;

        this.content.innerHTML = newContent.innerHTML;
        this.template = newContent.getAttribute("data-template");
        this.content.setAttribute("data-template", this.template);
    }

    addLinkListeners() {
        document.body.addEventListener("click", (e) => {
            const link = e.target.closest("a");
            if (!link || !link.href.startsWith(window.location.origin)) return;

            e.preventDefault();
            this.onChange(link.href);
        });

        window.addEventListener("popstate", () => {
            this.onChange(window.location.href, false);
        });
    }
}

new App();
