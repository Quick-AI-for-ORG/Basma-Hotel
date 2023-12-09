const crudInterface = {
    create: async function (data, model, compareKey) {
        try {
          const compareClause = {[compareKey]: data[compareKey]};
          const existingRecord = await model.findOne({ where: compareClause });
          if (!existingRecord) {
             data = await model.create(data);
            console.log(`Created new record with ${compareKey}: ${data[compareKey]}`);
            return data
          } else {
            console.log(`Record with ${compareKey}: ${data[compareKey]} already exists. Skipping creation.`);
          }
        } catch (error) {
          console.error(`Error adding data: ${error}`);
        }
      },
    modify: async function (primaryKey,newData,model,compareKey) {
        try {
          const compareClause = {[compareKey]: primaryKey};
          const record = await model.findOne({ where: compareClause });
          if (!record) {
            console.error(`Record with ${compareKey}: ${primaryKey} not found. Skipping modification.`);
          } else {
            record = await record.update(newData);
            console.log(`Updated record with ${compareKey}: ${newData[compareKey]}`);
            return record;
          }
        } catch (error) {
          console.error(`Error modifying data: ${error}`);
        }
      } ,
    remove: async function (primaryKey, model, compareKey) {
        try {
          const compareClause = {[compareKey]: primaryKey};
          const deletedCount = await model.destroy({ where: compareClause });
          if (deletedCount > 0) {
            console.log(`Deleted record with ${compareKey}: ${primaryKey}`);
            return true
          } else {
            console.log(`Record with ${compareKey}: ${primaryKey} not found. Skipping deletion.`);
          }
        } catch (error) {
          console.error(`Error removing data: ${error}`);
        }
      },
    get: async function (primaryKey, model, compareKey) {
        try {
          const compareClause = {[compareKey]: primaryKey};
          const record = await model.findOne({ where: compareClause });
          if (record) {
            console.log(`Found record with ${compareKey}: ${primaryKey}`);
            return record;
          } else {
            console.log(`Record with ${compareKey}: ${primaryKey} not found.`);
            return null;
          }
        } catch (error) {
          console.error(`Error getting data: ${error}`);
          return null;
        }
    },
    getAll: async function (model) {
        try {
          const records = await model.findAll();
          console.log(`Found ${records.length} records.`);
          return records;
        } catch (error) {
          console.error(`Error getting all data: ${error}`);
          return [];
        }
      }
}
module.exports = crudInterface;