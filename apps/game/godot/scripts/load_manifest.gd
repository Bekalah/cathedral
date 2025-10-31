extends Node

const MANIFEST_URL = "https://bekalah.github.io/cathedral-research/apps/design/manifests/"
const R2_ASSETS_URL = "https://your-worker.your-subdomain.workers.dev/r2/"

var loaded_textures = {}
var loaded_scenes = {}

func _ready():
    load_manifest("rosslyn-tiffany-v1")

func load_manifest(asset_id: String):
    var manifest_path = MANIFEST_URL + asset_id + ".json"
    var http_request = HTTPRequest.new()
    add_child(http_request)
    http_request.request_completed.connect(_on_manifest_loaded.bind(http_request))
    http_request.request(manifest_path)

func _on_manifest_loaded(result, response_code, headers, body, http_request):
    if result != HTTPRequest.RESULT_SUCCESS:
        push_error("Manifest download failed: " + str(response_code))
        return

    var json = JSON.new()
    var parse_result = json.parse(body.get_string_from_utf8())

    if parse_result != OK:
        push_error("Failed to parse manifest JSON")
        return

    var manifest = json.data
    print("Loaded manifest for: ", manifest.assetId)

    # Load textures from R2
    if manifest.has("textures"):
        load_textures_from_manifest(manifest.textures)

    # Load 3D model if specified
    if manifest.has("gltf"):
        load_gltf_from_manifest(manifest.gltf)

    # Emit signal for other systems
    emit_signal("manifest_loaded", manifest)

func load_textures_from_manifest(textures: Dictionary):
    for texture_type in textures:
        var texture_url = textures[texture_type]
        if texture_url.begins_with("http"):
            load_texture_from_url(texture_url, texture_type)

func load_texture_from_url(url: String, texture_type: String):
    var img_request = HTTPRequest.new()
    add_child(img_request)
    img_request.request_completed.connect(
        func(result, response_code, headers, body):
            _on_texture_downloaded(result, body, url, texture_type)
    )
    img_request.request(url)

func _on_texture_downloaded(result, body, url, texture_type):
    if result != HTTPRequest.RESULT_SUCCESS:
        push_error("Failed to download texture: " + url)
        return

    var image = Image.new()
    var error = image.load_png_from_buffer(body)
    if error != OK:
        error = image.load_jpg_from_buffer(body)

    if error != OK:
        push_error("Failed to load image data")
        return

    var texture = ImageTexture.create_from_image(image)
    loaded_textures[texture_type] = texture
    print("Loaded texture: ", texture_type, " from ", url)

    # Emit signal when all textures are loaded
    check_all_textures_loaded()

func load_gltf_from_manifest(gltf_url: String):
    var gltf_request = HTTPRequest.new()
    add_child(gltf_request)
    gltf_request.request_completed.connect(
        func(result, response_code, headers, body):
            _on_gltf_downloaded(result, body, gltf_url)
    )
    gltf_request.request(gltf_url)

func _on_gltf_downloaded(result, body, url):
    if result != HTTPRequest.RESULT_SUCCESS:
        push_error("Failed to download GLTF: " + url)
        return

    # For now, just log that we downloaded the GLTF
    # In a real implementation, you'd use GLTFDocument to load the scene
    print("Downloaded GLTF data: ", url)
    loaded_scenes[url] = body

func check_all_textures_loaded():
    # This would check if all expected textures are loaded
    # and emit a signal when complete
    pass

# Signals
signal manifest_loaded(manifest)
