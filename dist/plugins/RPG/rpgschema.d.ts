export const player: mongoose.Model<{
    id: string;
    name?: string | null;
    inventory?: {
        wood: number;
        iron: number;
        goldenApple: number;
        stone: number;
        diamonds: number;
        diamondpickaxe: number;
        ironpickaxe: number;
        stonepickaxe: number;
        woodenaxe: number;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    id: string;
    name?: string | null;
    inventory?: {
        wood: number;
        iron: number;
        goldenApple: number;
        stone: number;
        diamonds: number;
        diamondpickaxe: number;
        ironpickaxe: number;
        stonepickaxe: number;
        woodenaxe: number;
    } | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    id: string;
    name?: string | null;
    inventory?: {
        wood: number;
        iron: number;
        goldenApple: number;
        stone: number;
        diamonds: number;
        diamondpickaxe: number;
        ironpickaxe: number;
        stonepickaxe: number;
        woodenaxe: number;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    id: string;
    name?: string | null;
    inventory?: {
        wood: number;
        iron: number;
        goldenApple: number;
        stone: number;
        diamonds: number;
        diamondpickaxe: number;
        ironpickaxe: number;
        stonepickaxe: number;
        woodenaxe: number;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    id: string;
    name?: string | null;
    inventory?: {
        wood: number;
        iron: number;
        goldenApple: number;
        stone: number;
        diamonds: number;
        diamondpickaxe: number;
        ironpickaxe: number;
        stonepickaxe: number;
        woodenaxe: number;
    } | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    id: string;
    name?: string | null;
    inventory?: {
        wood: number;
        iron: number;
        goldenApple: number;
        stone: number;
        diamonds: number;
        diamondpickaxe: number;
        ironpickaxe: number;
        stonepickaxe: number;
        woodenaxe: number;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose = require("mongoose");
//# sourceMappingURL=rpgschema.d.ts.map