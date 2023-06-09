
/**
 * Contains various device data including device type and support.
 */
export interface IDeviceSensor {

    /**
     * Identifier.
     */
    id: number;

    /**
     * Device sensor type.
     */
    type: DeviceSensorType;

    /**
     * Device sensor name.
     */
    name: string;

    /**
     * Device sensor description.
     */
    description: string;

    /**
     * Minimum value.
     */
    min: number;

    /**
     * Maximum value.
     */
    max: number;

    /**
     * Step value.
     */
    step: number;

    /**
     * Latest value.
     */
    value: number;
}

export enum DeviceSensorType {
    INVALID,
    BOOL,
    INTEGER,
    FLOAT,
    VOLTAGE,
    CURRENT,
    TEMPERATURE,
    FAN_RPM
}
