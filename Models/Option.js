const {optionModel} = require('./DBsequelize');
const crudInterface = require('./CRUD');
class Option {
  static crudInterface = crudInterface;
  constructor(optionJSON) {
    this.jsonToObject(optionJSON)
  }
   jsonToObject(optionJSON) {
    this.option = optionJSON.option;
    this.price = optionJSON.price;
    this.id = null
  }
  static async generateID() {
    if(optionModel.max('id') == null) return 0
      return await optionModel.max('id')
  }
   async create(){ 
    this.id = Option.generateID()+1;
    await Option.crudInterface.create(this,optionModel,"id") 
  }
  static async modify(option,newOption){
    const record = await Option.crudInterface.modify(option,newOption,optionModel,"option") 
    let modifiedOption = new Option(record)
    modifiedOption.id = record.id
    return modifiedOption
  }
  static async remove(id){
    await Option.crudInterface.remove(id,optionModel,"id") 
    return null
  }
  static async get(option){
    const record = await Option.crudInterface.get(option,optionModel,"option") 
    let searchedOption = new Option(record)
    searchedOption.id = record.id
    return searchedOption 
  }
  static async getAll(){
    const records = await Option.crudInterface.getAll(optionModel) 
    let options= []
    if(records.length>0){
    for(let i=0;i<records.length; i++){
      options.push(new Option(records[i]))
      options[i].id = records[i].id
    }
    return options
  }
  return null
}
}
module.exports = Option