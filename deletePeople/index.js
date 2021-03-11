const dynamoose = require('dynamoose');
const peopleModel = require('./people.schema.js');

exports.handler = async (event) => {

  let data;
  let id = event.pathParameters && event.pathParameters.id;

  try {

    data = await peopleModel.query('id').eq(id).exec();
    const { name, phone } = JSON.parse(event.body);

    let record = new peopleModel({ id, name, phone });
    data = await record.delete();

  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    }
  }

  let response = {
    statusCode: 200,
    body: JSON.stringify(data),
  }

  return response;
}
