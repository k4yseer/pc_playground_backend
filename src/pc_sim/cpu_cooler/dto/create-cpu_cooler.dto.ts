export class CreateCpuCoolerDto {
    cpu_cooler_id: number;
    cooler_name: string;
    intel_socket: string;
    amd_socket: string;
    reccomended_tdp: number;
    dimension: string;
}
