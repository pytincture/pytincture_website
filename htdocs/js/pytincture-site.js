(() => {
    "use strict";

    document.documentElement.classList.add("js-enabled");

    const body = document.body;
    const header = document.querySelector("[data-header]");
    const menuButton = document.querySelector("[data-menu-button]");
    const nav = document.querySelector("[data-nav]");
    const toast = document.querySelector("[data-toast]");
    let toastTimer;

    const setMenu = (open) => {
        if (!menuButton || !nav) return;
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.querySelector(".sr-only").textContent = open ? "Close navigation" : "Open navigation";
        nav.classList.toggle("is-open", open);
        body.classList.toggle("menu-open", open);
    };

    menuButton?.addEventListener("click", () => {
        setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMenu(false);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) setMenu(false);
    });

    const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const showToast = (message = "Copied to clipboard") => {
        if (!toast) return;
        window.clearTimeout(toastTimer);
        toast.textContent = message;
        toast.classList.add("is-visible");
        toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
    };

    const copyText = async (value) => {
        try {
            await navigator.clipboard.writeText(value);
        } catch (error) {
            const textarea = document.createElement("textarea");
            textarea.value = value;
            textarea.setAttribute("readonly", "");
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            textarea.remove();
        }
        showToast();
    };

    document.querySelectorAll("[data-copy]").forEach((button) => {
        button.addEventListener("click", () => copyText(button.dataset.copy));
    });

    const initializeTabs = ({ tabs, panels = [], initial, nameForTab, nameForPanel, onActivate }) => {
        if (!tabs.length) return;

        const activate = (name, moveFocus = false) => {
            tabs.forEach((tab) => {
                const active = nameForTab(tab) === name;
                tab.setAttribute("aria-selected", String(active));
                tab.tabIndex = active ? 0 : -1;
                if (active && moveFocus) tab.focus();
            });

            panels.forEach((panel) => {
                panel.hidden = nameForPanel(panel) !== name;
            });

            onActivate?.(name);
        };

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => activate(nameForTab(tab)));
            tab.addEventListener("keydown", (event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                let targetIndex = index;
                if (event.key === "ArrowRight") targetIndex = (index + 1) % tabs.length;
                if (event.key === "ArrowLeft") targetIndex = (index - 1 + tabs.length) % tabs.length;
                if (event.key === "Home") targetIndex = 0;
                if (event.key === "End") targetIndex = tabs.length - 1;
                activate(nameForTab(tabs[targetIndex]), true);
            });
        });

        activate(initial);
        return activate;
    };

    const studio = document.querySelector("[data-studio]");
    const studioTabs = [...document.querySelectorAll("[data-studio-tab]")];
    const activateStudio = (name) => {
        studioTabs.forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.studioTab === name));
        });
        studio?.setAttribute("data-studio-state", name);
    };
    studioTabs.forEach((button) => {
        button.addEventListener("click", () => activateStudio(button.dataset.studioTab));
    });
    activateStudio("render");

    const showcaseTabs = [...document.querySelectorAll("[data-showcase-tab]")];
    const showcasePanels = [...document.querySelectorAll("[data-showcase-panel]")];
    initializeTabs({
        tabs: showcaseTabs,
        panels: showcasePanels,
        initial: "grid",
        nameForTab: (tab) => tab.dataset.showcaseTab,
        nameForPanel: (panel) => panel.dataset.showcasePanel,
    });

    const quickstartCode = {
        service: `from pathlib import Path
from pytincture import PytinctureConfig, create_app

HERE = Path(__file__).resolve().parent

app = create_app(
    PytinctureConfig(
        modules_path=str(HERE),
        default_application="hello",
    )
)`,
        hello: `import js
import widget
from dhxpyt.layout import MainWindow

class hello(MainWindow):
    def load_ui(self):
        js.document.getElementById("maindiv").innerHTML = (
            "<h1>Hello from Pytincture</h1>"
            "<p>Python is running in your browser.</p>"
        )`,
        widget: `__widgetset__ = "dhxpyt"
__version__ = "0.9.16"`,
    };

    let activeCode = "service";
    const codeTabs = [...document.querySelectorAll("[data-code-tab]")];
    const codePanels = [...document.querySelectorAll("[data-code-panel]")];
    initializeTabs({
        tabs: codeTabs,
        panels: codePanels,
        initial: activeCode,
        nameForTab: (tab) => tab.dataset.codeTab,
        nameForPanel: (panel) => panel.dataset.codePanel,
        onActivate: (name) => { activeCode = name; },
    });

    document.querySelector("[data-copy-active]")?.addEventListener("click", () => {
        copyText(quickstartCode[activeCode]);
    });

    document.querySelectorAll("[data-year]").forEach((node) => {
        node.textContent = String(new Date().getFullYear());
    });
})();
