export interface Skill
    {   
        id?: number;
        name?: string;
        level?: number;
        type?: string;
        // people?: People[];
    

        preparingDelete?: boolean;
        isEditing?: boolean;
    }