import mongoose from 'mongoose';

const ComponentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
    , desc: { type: String }
    , category: { type: String }
    , subcategory: { type: String }
    , author: { type: String }
    , url: { type: String, required: true }
    , urls: {
        github: { type: String }
        , demo: { type: String }
        , docs: { type: String }
        , website: { type: String }
    }
    , tags: [String]
    , images: [String]
    , recommended: { type: Boolean }
    , stats: {
        updated: { type: Date }
        , stars: { type: Number }
        , monthlyDownloads: { type: Number }
        , issues: { type: Number }
        , created: { type: Date }
        , forks: { type: Number }
        , watchers: { type: Number }
    }
});
ComponentSchema.index({
    name: 'text'
    , desc: 'text'
    , subcategory: 'text'
    , url: 'text'
});

export default mongoose.model('Component', ComponentSchema);
