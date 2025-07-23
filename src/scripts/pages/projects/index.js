import Page from "../Page";

export default class projects extends Page {
    constructor() {
        super({
            id: "projects",
            element: ".projects",
            elements: { button: "cta" },
        });
    }
}
