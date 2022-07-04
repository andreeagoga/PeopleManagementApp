import { Job } from "./job";

export interface Company
    {   
        id?: number;
        name?: string;
        description?: string;
        location?: string; 
        jobs?: Job[];
        
        preparingDelete?: boolean;
        isEditing?: boolean;
    }
