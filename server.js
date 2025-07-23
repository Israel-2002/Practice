import express from "express";
import path from "path";
import fs from "fs";
import url from "url";
import { createServer as createViteServer } from "vite";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src/views"));

let manifest = {};

if (process.env.NODE_ENV === "development") {
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom",
    });

    app.use(vite.middlewares);
} else {
    app.use("/assets", express.static(path.join(__dirname, "dist/assets")));

    const manifestPath = path.join(__dirname, "dist/assets/manifest.json");

    if (fs.existsSync(manifestPath)) {
        manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    }
}

app.use((req, res, next) => {
    res.locals.manifest = manifest;
    res.locals.env = process.env.NODE_ENV;
    next();
});

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/assets  ", express.static(path.join(__dirname, "src/assets")));
app.use("/styles", express.static(path.join(__dirname, "src/styles")));
app.use("/scripts", express.static(path.join(__dirname, "src/scripts")));
app.use("/views", express.static(path.join(__dirname, "src/views")));

app.get("/", (req, res) => {
    res.render("pages/home");
});

app.get("/about", (req, res) => {
    res.render("pages/about");
});

app.get("/projects", (req, res) => {
    res.render("pages/projects");
});

app.get("/contact", (req, res) => {
    res.render("pages/contact");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
