const GAR = {
    get: async function(primaryKey,model,compareKey){
        const compareClause = {[compareKey]: primaryKey};
        const records = await model.findAll({where : compareClause})
        if(records.length > 0) return records
        return null
    },
    add: async function(primaryKey,model,compareKey, addition, additionKey){
        const createClause = {[compareKey]: primaryKey, [additionKey]: addition}
        await model.create(createClause)
    },
    remove: async function(primaryKey,model,compareKey, addition, additionKey){
        const whereClause = {[compareKey]: primaryKey, [additionKey]: addition}
        await reservationOptionModel.destroy({where : whereClause})
    }
}
module.exports = GAR