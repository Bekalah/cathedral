use gdnative::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct CathedralGeometry {
    vertices: Vec<[f32; 3]>,
    edges: Vec<[usize; 2]>,
    metadata: String,
}

#[derive(NativeClass)]
#[inherit(Node)]
pub struct CathedralRenderer;

#[methods]
impl CathedralRenderer {
    fn new(_owner: &Node) -> Self {
        CathedralRenderer
    }

    #[export]
    fn load_cathedral_json(&self, _owner: &Node, json_path: String) -> Dictionary {
        godot_print!("Loading Cathedral JSON from: {}", json_path);
        
        match std::fs::read_to_string(&json_path) {
            Ok(json_data) => {
                match serde_json::from_str::<CathedralGeometry>(&json_data) {
                    Ok(geometry) => {
                        let mut dict = Dictionary::new();
                        dict.insert("vertices", geometry.vertices);
                        dict.insert("edges", geometry.edges);
                        dict.insert("metadata", geometry.metadata);
                        dict
                    },
                    Err(e) => {
                        godot_print!("JSON parse error: {}", e);
                        Dictionary::new()
                    }
                }
            },
            Err(e) => {
                godot_print!("File read error: {}", e);
                Dictionary::new()
            }
        }
    }

    #[export]
    fn generate_sacred_geometry(&self, _owner: &Node, geometry_type: String) -> Dictionary {
        godot_print!("Generating sacred geometry: {}", geometry_type);
        
        let mut dict = Dictionary::new();
        
        match geometry_type.as_str() {
            "vesica_piscis" => {
                // Basic vesica piscis vertices
                let vertices = vec![
                    [-1.0, 0.0, 0.0],
                    [1.0, 0.0, 0.0],
                    [0.0, 1.732, 0.0], // sqrt(3)
                    [0.0, -1.732, 0.0],
                ];
                dict.insert("vertices", vertices);
                dict.insert("type", "vesica_piscis");
            },
            "tree_of_life" => {
                // Basic tree of life sephiroth positions
                let vertices = vec![
                    [0.0, 3.0, 0.0],    // Kether
                    [-1.0, 2.0, 0.0],   // Binah
                    [1.0, 2.0, 0.0],    // Chokmah
                    [-1.0, 1.0, 0.0],   // Geburah
                    [1.0, 1.0, 0.0],    // Chesed
                    [0.0, 1.0, 0.0],    // Tiphareth
                    [-1.0, 0.0, 0.0],   // Hod
                    [1.0, 0.0, 0.0],    // Netzach
                    [0.0, 0.0, 0.0],    // Yesod
                    [0.0, -1.0, 0.0],   // Malkuth
                ];
                dict.insert("vertices", vertices);
                dict.insert("type", "tree_of_life");
            },
            _ => {
                dict.insert("error", format!("Unknown geometry type: {}", geometry_type));
            }
        }
        
        dict
    }
}

fn init(handle: InitHandle) {
    handle.add_class::<CathedralRenderer>();
    godot_print!("Cathedral Rust bindings initialized!");
}

godot_init!(init);