export class CreateSsdDto {
    ssd_name: string;
    interface: string;
    m2_format: string;
    capacity: string;
    ssdFilepath?: string | null; // Optional field for the file path of the SSD
}
