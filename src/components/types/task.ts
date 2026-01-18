// types/task.ts
export interface BillOfMaterial {
    unit: string;
    price: string;
    category: string;
    material: string;
    quantity: string;
    description: string;
}

export interface TaskPrice {
    Labor: number;
    Total: number;
    Materials: number;
}

export interface Task {
    id: string;
    user_id: string;
    customer_name: string;
    phone_number: string;
    address: string;
    task_description: string;
    bill_of_materials: BillOfMaterial[];
    time: string;
    resource: string;
    status: string;
    materials_ordered: boolean;
    price: TaskPrice;
    timestamp: string;
    created_at: string;
    updated_at: string;
}

export interface ApiResponse {
    status: string;
    total_offers: number;
    total_price: number;
    tasks: Task[];
}