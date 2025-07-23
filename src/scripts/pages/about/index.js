import Page from "../Page";

export default class About extends Page {
    constructor() {
        super({ id: "about", element: ".about", elements: { button: "cta" } });
    }
}
