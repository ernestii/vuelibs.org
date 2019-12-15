import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import Mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';
import Component from './models/component';

const PORT = process.env.PORT || 3000;

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../dist')));

Mongoose.connect(process.env.MONGODB_URL || 'mongodb://mongo:27017/vuelibs');

const db = Mongoose.connection;

db.on('error', () => {
    console.error('Could not connect to mongo');
})

db.on('open', () => {
    /** Categories and subcategories */
    app.get('/categories', async(req, res) => {
        return 'must be cached @ front end';

        const results = await Component.find({}).distinct('category').exec();
        // subcategories
        const subcats = await results.map(async i => {
            return Component.find({ category: i }).distinct('subcategory').exec();
        });

        Promise.all(subcats).then(completed => {
            return res.json(results.reduce((acc, cur, idx) => {
                acc[cur] = completed[idx];
                return acc;
            }, {}));
        });
    });

    /** Get list */
    app.get('/api', async (req, res) => {
        let limit = parseInt(req.query.limit) || 20;
        let skip = parseInt(req.query.skip) || 0;
        let sortby = sanitize(req.query.sortby);
        let category = sanitize(req.query.category);
        let subcategory = sanitize(req.query.subcategory);
        let search = sanitize(req.query.search);
        let asc = req.query.asc != undefined;

        if (limit < 0 || limit > 100) {
            return res.status(403).json({ error: 'Limit is too big. Sorry.' })
        }

        if (skip < 0 || skip > 1000000) {
            return res.status(403).json({ error: 'Skip is too big (how is that even possible lol). Sorry.' })
        }

        let query = {};
        if (!!category) query.category = category;
        if (!!subcategory) query.subcategory = subcategory;
        if (!!search) query.$text = { $search: search };

        Promise.all([
            Component
                .find(query)
                .sort(sortby ? { [sortby]: (asc ? 1 : -1) } : undefined)
                .count()
                .exec(),
            Component.find(query)
                .sort(sortby ? { [sortby]: (asc ? 1 : -1) } : undefined)
                .skip(skip)
                .limit(limit)
                .exec()
        ]).then(([count, results]) => {
            return res.json({
                items: results,
                count: count
            });
        });
    });

    app.get('*', function(request, response) {
        response.sendFile(path.resolve(__dirname, '../dist/index.html'));
    });

    app.listen(PORT, () => console.log(`Linstening at ${PORT}`));
});

export default app;
