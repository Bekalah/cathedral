// Minimal TypeScript helper for Achad integration specs
// Replace placeholders with your app's types as needed.

export type AchadSpec = {
  individual: {
    name: string;
    motto: string;
    star: string;
    aeon: string;
    will: string;
    grade: string;
  };
  design: {
    palette: string;
    geometries: string[];
    fractal: string;
    template: string;
  };
  oath: {
    available: boolean;
    ordeals: string[];
  };
};

export function parseAchadSpec(json: string): AchadSpec | null {
  try {
    const data = JSON.parse(json);
    if (!data?.design || !data?.individual) return null;
    return data as AchadSpec;
  } catch {
    return null;
  }
}
