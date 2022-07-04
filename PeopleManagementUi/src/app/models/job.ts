import { People } from "./people";

export interface Job
    {   
        id?: number;
        title?: string;
        description?: string;
        location?: string;
        type?: string;
        people?: People[];

        preparingDelete?: boolean;
        isEditing?: boolean;
    }