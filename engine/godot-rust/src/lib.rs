use godot::prelude::*;
use godot::engine::{Input, Node, Node3D};

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

#[derive(GodotClass)]
#[class(base=Node3D)]
struct PlayerController {
    #[base]
    base: Base<Node3D>,
    speed: f32,
}

#[godot_api]
impl INode3D for PlayerController {
    fn init(base: Base<Node3D>) -> Self {
        Self { base, speed: 5.0 }
    }

    fn ready(&mut self) {
        godot_print!("PlayerController ready: WASD to move");
    }

    fn process(&mut self, delta: f64) {
        let input = Input::singleton();
        let mut dx = 0.0_f32;
        let mut dz = 0.0_f32;

        if input.is_action_pressed("move_forward".into()) { dz -= 1.0; }
        if input.is_action_pressed("move_back".into())    { dz += 1.0; }
        if input.is_action_pressed("move_left".into())    { dx -= 1.0; }
        if input.is_action_pressed("move_right".into())   { dx += 1.0; }

        if dx != 0.0 || dz != 0.0 {
            let len = (dx*dx + dz*dz).sqrt();
            if len > 0.0 { dx /= len; dz /= len; }
            let step = self.speed * delta as f32;
            let v = Vector3::new(dx * step, 0.0, dz * step);
            // Move in local space
            self.base_mut().translate_local(v);
        }
    }
}

#[gdextension]
unsafe impl ExtensionLibrary for CathedralCore {}
