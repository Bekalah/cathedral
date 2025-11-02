use godot::prelude::*;

#[derive(GodotClass)]
#[class(base=Node)]
struct CathedralCore {
    #[base]
    base: Base<Node>,
}

#[godot_api]
impl INode for CathedralCore {
    fn init(base: Base<Node>) -> Self {
        Self { base }
    }

    fn ready(&mut self) {
        godot_print!("CathedralCore ready: Rust GDExtension loaded ✅");
    }
}

#[gdextension]
unsafe impl ExtensionLibrary for CathedralCore {}
