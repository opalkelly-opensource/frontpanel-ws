/**
 * Describes several attributes of a connected device.
 */

/**
 * Contains various device data including device type and support.
 */
export interface IDeviceInfo {
    /**
     * Device ID string, max length [[MAX_DEVICEID_LENGTH]].
     */
    deviceID: string;

    /**
     * Device serial number, max length [[MAX_SERIALNUMBER_LENGTH]].
     */
    serialNumber: string;

    /**
     * Product string, max length [[MAX_PRODUCT_NAME_LENGTH]].
     */
    productName: string;

    /**
     * Unique product identifier.
     */
    productID: ProductID;

    /**
     * Enumeration of the device interface type.
     */
    deviceInterface: DeviceInterface;

    /**
     * Enumeration of USB speed for USB devices.
     */
    usbSpeed: USBSpeed;

    /**
     * Device firmware major version.
     */
    deviceMajorVersion: number;

    /**
     * Device firmware minor version.
     */
    deviceMinorVersion: number;

    /**
     * Device host interface (HDL) major version.
     */
    hostInterfaceMajorVersion: number;

    /**
     * Device host interface (HDL) minor version.
     */
    hostInterfaceMinorVersion: number;

    /**
     * True if device contains a Cypress CY22150 PLL.
     */
    isPLL22150Supported: boolean;

    /**
     * True if device contains a Cypress CY22393 PLL.
     */
    isPLL22393Supported: boolean;

    /**
     * True if device indicates FrontPanel support in FPGA.
     */
    isFrontPanelEnabled: boolean;

    /**
     * Wire width in bits.
     */
    wireWidth: number;

    /**
     * Trigger width in bits.
     */
    triggerWidth: number;

    /**
     * Pipe width in bits.
     */
    pipeWidth: number;

    /**
     * RegisterBridge address width in bits (0 if unsupported).
     */
    registerAddressWidth: number;

    /**
     * RegisterBridge data width in bits (0 if unsupported).
     */
    registerDataWidth: number;

    /**
     * System Flash layout.
     */
    flashSystem: IFlashLayout;

    /**
     * FPGA Flash layout.
     */
    flashFPGA: IFlashLayout;

    /**
     * True if the device can have an attached FMC EEPROM.
     */
    hasFMCEEPROM: boolean;

    /**
     * True if the device supports reset profiles.
     */
    hasResetProfiles: boolean;

    /**
     * Vendor of the FPGA used for selecting the appropriate bitfile name.
     */
    fpgaVendor: FPGAVendor;

    /**
     * Number of total interface connections to this device, typically 1.
     */
    interfaceCount: number;

    /**
     * Index of this interface connection, in 0..interfaceCount-1 range.
     */
    interfaceIndex: number;

    /**
     * True if the device configures from its system flash. If false, the
     * device is configured from its FPGA flash.
     */
    configuresFromSystemFlash: boolean;

    /**
     * True if the device flash has quad SPI I/O.
     */
    hasQuadConfigFlash: boolean;
}

export enum ProductID {
    PRODUCT_UNKNOWN,
    PRODUCT_XEM3001V1,
    PRODUCT_XEM3001V2,
    PRODUCT_XEM3010,
    PRODUCT_XEM3005,
    PRODUCT_XEM3001CL,
    PRODUCT_XEM3020,
    PRODUCT_XEM3050,
    PRODUCT_XEM9002,
    PRODUCT_XEM3001RB,
    PRODUCT_XEM5010,
    PRODUCT_XEM6110LX45,
    PRODUCT_XEM6001,
    PRODUCT_XEM6010LX45,
    PRODUCT_XEM6010LX150,
    PRODUCT_XEM6110LX150,
    PRODUCT_XEM6006LX9,
    PRODUCT_XEM6006LX16,
    PRODUCT_XEM6006LX25,
    PRODUCT_XEM5010LX110,
    PRODUCT_ZEM4310,
    PRODUCT_XEM6310LX45,
    PRODUCT_XEM6310LX150,
    PRODUCT_XEM6110V2LX45,
    PRODUCT_XEM6110V2LX150,
    PRODUCT_XEM6002LX9,
    PRODUCT_XEM6310MTLX45T,
    PRODUCT_XEM6320LX130T,
    PRODUCT_XEM7350K70T,
    PRODUCT_XEM7350K160T,
    PRODUCT_XEM7350K410T,
    PRODUCT_XEM6310MTLX150T,
    PRODUCT_ZEM5305A2,
    PRODUCT_ZEM5305A7,
    PRODUCT_XEM7001A15,
    PRODUCT_XEM7001A35,
    PRODUCT_XEM7360K160T,
    PRODUCT_XEM7360K410T,
    PRODUCT_ZEM5310A4,
    PRODUCT_ZEM5310A7,
    PRODUCT_ZEM5370A5,
    PRODUCT_XEM7010A50,
    PRODUCT_XEM7010A200,
    PRODUCT_XEM7310A75,
    PRODUCT_XEM7310A200,
    PRODUCT_XEM7320A75T,
    PRODUCT_XEM7320A200T,
    PRODUCT_XEM7305,
    PRODUCT_FPXBARE,
    PRODUCT_XEM8350KU060,
    PRODUCT_XEM8350KU085,
    PRODUCT_XEM8350KU115,
    PRODUCT_XEM8350SECONDARY,
    PRODUCT_XEM7310MTA75,
    PRODUCT_XEM7310MTA200
}

export enum DeviceInterface {
    INTERFACE_UNKNOWN,
    INTERFACE_USB2,
    INTERFACE_PCIE,
    INTERFACE_USB3
}

export enum USBSpeed {
    USBSPEED_UNKNOWN,
    USBSPEED_FULL,
    USBSPEED_HIGH,
    USBSPEED_SUPER
}

export enum FPGAVendor {
    FPGAVENDOR_UNKNOWN,
    FPGAVENDOR_XILINX,
    FPGAVENDOR_INTEL
}

/**
 * Describes the layout of an available Flash memory on the device
 * sectorCount = 0 implies the flash is not present in system.
 *
 * User sectors are continuous from [[minUserSector]] to [[maxUserSector]].
 * All other sectors are reserved for system use and unavailable.
 */
export interface IFlashLayout {
    /**
     * Number of sectors in the device.
     */
    sectorCount: number;

    /**
     * Sector size (in bytes).
     */
    sectorSize: number;

    /**
     * Page size (in bytes).
     */
    pageSize: number;

    /**
     * First available user sector.
     */
    minUserSector: number;

    /**
     * Last available user sector.
     */
    maxUserSector: number;
}
