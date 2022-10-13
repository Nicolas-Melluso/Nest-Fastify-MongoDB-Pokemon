import { Document } from "mongoose";
export interface Pokemon extends Document {
    readonly name: string;
    readonly level: number;
    readonly elements: Array<string>;
    readonly imageUrl: string;
    readonly createdAt: Date;
}
