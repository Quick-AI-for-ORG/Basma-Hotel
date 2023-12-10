const {characteristicModel} = require('./DBsequelize')
const crudInterface = require('./CRUD');
class Characteristic {
    static crudInterface = crudInterface;
    constructor(characteristicJSON) {
       this.jsonToObject(characteristicJSON)
    }
     jsonToObject(characteristicJSON){
        this.characteristic = characteristicJSON.Characteristic;
        this.icon = characteristicJSON.icon;
    }
     async create(){ 
        await Characteristic.crudInterface.create(this,characteristicModel,"Characteristic") 
    }
    static async modify(characteristic,newCharacteristic){
        return new Characteristic(await Characteristic.crudInterface.modify(characteristic,newCharacteristic,characteristicModel,"Characteristic"))
    }
    static async remove(characteristic){
        await Characteristic.crudInterface.remove(characteristic,characteristicModel,"Characteristic") 
        return null
    }
    static async get(characteristic){
        return new Characteristic( await Characteristic.crudInterface.get(characteristic,characteristicModel,"Characteristic") )
    }
    static async getAll(){
        const records = await Characteristic.crudInterface.getAll(characteristicModel) 
        let characteristics = []
        if(records.length > 0){
        for(let i=0; i<records.length; i++){
            characteristics.push(new Characteristic(records[i]))
        }
        return characteristics
        }
    return null
    }
}
module.exports = Characteristic