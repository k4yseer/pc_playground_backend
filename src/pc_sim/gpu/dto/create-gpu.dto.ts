export class CreateGpuDto {
    gpu_name: string;
    gpu_code: string;
    gpu_interface: string;
    power_connector: string;
    power_connector_slots: number;
    tdp: string;
    dimension: number;
    gpuFilepath?: string | null; // Optional field for the file path of the GPU
}
