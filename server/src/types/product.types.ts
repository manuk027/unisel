import { Types } from "mongoose"

export type CreateProductDTO = {
    name: string;
    userId: Types.ObjectId;
    category: string;
    price: number;
    description: string;
    image: string;
    isSold: boolean;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;