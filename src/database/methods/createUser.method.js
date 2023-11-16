const { UserModel } = require('../models')

exports.createUser = async user => {
  const userFromDb = await UserModel.findOne({ id: user.id })

  if (!userFromDb) {
    const user = new UserModel({
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name
    })
  
    user
      .save()
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }
}