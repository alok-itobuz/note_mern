class APIFeatures {
    constructor(queryMongoose, queryUrl) {
        this.queryMongoose = queryMongoose
        this.queryUrl = queryUrl
    }

    search() {
        if (this.queryUrl.search) {
            const key = Object.keys(this.queryUrl.search)[0]
            const value = Object.values(this.queryUrl.search)[0]
            const searchRegex = new RegExp(value, 'i')

            const mathingQuery = value !== 'true' && value !== 'false' ? { [key]: { $regex: searchRegex } } : { [key]: value === 'true' ? true : false }
            // const mathingQuery = key !== 'isHidden' ? { [key]: { $regex: searchRegex } } : { isHidden: value === 'true' ? true : false }

            this.queryMongoose = this.queryMongoose.find(mathingQuery)
        }

        return this;
    }

    sort() {
        if (this.queryUrl.sort) {
            const sortBy = this.queryUrl.sort.split(",").join(" ")
            this.queryMongoose = this.queryMongoose.sort(sortBy)
        } else {
            this.queryMongoose = this.queryMongoose.sort('-createdAt')
        }

        return this;
    }

    paginate() {
        const limit = this.queryUrl.limit || 3
        const page = this.queryUrl.page || 1
        const skip = (page - 1) * limit;

        this.queryMongoose = this.queryMongoose.skip(skip).limit(limit)

        return this;
    }

    updated() {
        console.log(this.paginate)
        if (this.queryUrl.updated === 'true') this.queryMongoose = this.queryMongoose.find({ $expr: { $lt: ['$createdAt', '$updatedAt'] } })
        else if (this.queryUrl.updated === 'false') this.queryMongoose = this.queryMongoose.find({ $expr: { $eq: ['$createdAt', '$updatedAt'] } })

        return this;
    }
}

export default APIFeatures

