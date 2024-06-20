export type entityType = {
    id: number;
    created_at?: string;
    updated_at?: string;
}

export type TaskType = {
    done: boolean;
    name: string;
    description: string | null;
    status_id: number;
    user_id: number;
    status: {
        id: number;
        name: string;
    };
    user: {
        id: number;
        email: string;
    }
} & entityType