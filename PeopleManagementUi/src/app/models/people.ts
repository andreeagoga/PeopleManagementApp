import { Skill } from "./skill";

export interface People
    {   
        id?: number;
        firstName?: string;
        lastName?: string;
        phone?: string;
        location?: string;
        email?: string;
        yearsOfExperience?: number;
        skills?: Skill[];

        preparingDelete?: boolean;
        isEditing?: boolean;
    }