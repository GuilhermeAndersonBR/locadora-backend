const ImageEntityType =  {

    USER: "USER",

    VEHICLE: "VEHICLE"

} as const;

type ImageEntityType = 
    typeof ImageEntityType[
        keyof typeof ImageEntityType
    ];

export default ImageEntityType;