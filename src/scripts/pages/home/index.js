import Page from "../Page";

export default class Home extends Page {
    constructor() {
        super({ id: "home", element: ".home", elements: { button: "cta" } });
    }
}
