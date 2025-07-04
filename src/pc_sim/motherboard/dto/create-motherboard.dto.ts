export class CreateMotherboardDto {
    motherboard_name: string;
    chipset: string;
    form_factor: string;
    socket: string;
    ram_slots: number;
    max_ram_capacity: number;
    max_ram_speed: number;
    pci_slots: number;
    m2_slots: number;
    sata_ports: number;
    usb_ports: number;
    ethernet_port: boolean;
    wifi_enabled: boolean;
    bluetooth_enabled: boolean;
    audio_chipset: string;
}
