export const playlist: mongoose.Model<{
    name: string;
    owner: string;
    songs: mongoose.Types.DocumentArray<{
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }> & {
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }>;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    owner: string;
    songs: mongoose.Types.DocumentArray<{
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }> & {
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }>;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    owner: string;
    songs: mongoose.Types.DocumentArray<{
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }> & {
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }>;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    owner: string;
    songs: mongoose.Types.DocumentArray<{
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }> & {
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }>;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    owner: string;
    songs: mongoose.Types.DocumentArray<{
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }> & {
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }>;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    owner: string;
    songs: mongoose.Types.DocumentArray<{
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }> & {
        savedAt: NativeDate;
        url?: string | null;
        title?: string | null;
    }>;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose = require("mongoose");
//# sourceMappingURL=playliist.d.ts.map