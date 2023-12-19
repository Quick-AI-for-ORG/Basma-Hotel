const {questionModel} = require('./DBsequelize')
const crudInterface = require('./CRUD');

class Question {
  static crudInterface = crudInterface;
  constructor(questionJSON) {
    this.jsonToObject(questionJSON)
  }
  jsonToObject(questionJSON){
    this.email = questionJSON.email;
    this.message = questionJSON.message;
  }
  static async generateID() {
    if(questionModel.max('id') == null) return 0
      return await questionModel.max('id')
  }
  async create(){ 
    this.id = await Question.generateID()+1
    await Question.crudInterface.create(this,questionModel,"id") 
  }
  static async getAll(){ 
    const records = await Question.crudInterface.getAll(questionModel) 
    let questions = []
    if(records.length>0){
    for(let i = 0; i < records.length; i++){
      questions.push(new Question(records[i]))
    }
    return questions
  }
  return null
}

}

module.exports = Question;

