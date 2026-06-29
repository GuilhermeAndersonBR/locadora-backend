import { RowDataPacket } from "mysql2";

import ImageEntityType from "@locadora/shared/image/types/image-entity.type.js";

export interface ImageRow extends RowDataPacket {

    id: number;

    entity_type: ImageEntityType;

    entity_id: number;

    variant: string;

    storage_key: string;

    mime_type: string;

    size: number;

    width: number;

    height: number;

    created_at: Date;

    updated_at: Date;

    deleted_at: Date | null;

};