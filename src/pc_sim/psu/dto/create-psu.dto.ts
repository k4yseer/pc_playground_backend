export class CreatePsuDto {
    psu_name: string;
    wattage: number;
    efficiency_rating: string; // e.g., 80 Plus Bronze, Silver, Gold, Platinum, Titanium
    modularity: string; // e.g., Non-Modular, Semi-Modular, Fully Modular
    form_factor: string; // e.g., ATX, SFX
    fan_size: number; // Size of the PSU fan in mm
    dimensions: string; // Dimensions of the PSU (e.g., "150mm x 140mm x 86mm")
    cables_included: string[]; // List of cables included with the PSU
}
