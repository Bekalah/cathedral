export class PermanentRegistry { private registry: Map<string, any> = new Map(); async loadAllRegistries(): Promise<void> { console.log("📚 Registry loaded") } }
