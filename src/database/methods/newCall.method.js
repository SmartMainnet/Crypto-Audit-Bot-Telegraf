const { UserModel } = require('../models')

exports.newCall = async (id, address) => {
  UserModel.findOneAndUpdate(
    { id },
    {
      $push: {
        calls: {
          call: address
        }
      }
    }
  ).catch(e => console.log(e))
}