export class CreateCpuCaseDto {
    index: number;
    case_name: string;
    case_type: string;
    motherboard_support: string;
    psu_size_clearance: number;
    gpu_size_clearance: number;
    cpu_cooler_clearance: number;
    dimension: string;
    cpuCaseFilepath?: string | null; // Optional field for the file path of the CPU case
}