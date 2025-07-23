import Page from "../Page";

export default class Contact extends Page {
    constructor() {
        super({
            id: "contact",
            element: ".contact",
            elements: { button: "cta" },
        });
    }
}
