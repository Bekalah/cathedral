use dioxus::prelude::*;

fn main() {
    dioxus::launch(App);
}

#[component]
fn App() -> Element {
    rsx! {
        div {
            class: "cathedral-app",
            style: "font-family: system-ui; padding: 2rem;",
            h1 { "🏰 Cathedral - Dioxus Rust App" }
            p { "Free, open-source Rust framework for Cathedral" }
            CathedralGame {}
        }
    }
}

#[component]
fn CathedralGame() -> Element {
    let mut count = use_signal(|| 0);
    
    rsx! {
        div {
            class: "game-interface",
            h2 { "Codex 144:99 Game" }
            p { "Count: {count}" }
            button {
                onclick: move |_| count += 1,
                "Increment"
            }
        }
    }
}
