require('dotenv').config();
const { default: mongoose } = require("mongoose");
const url=process.env.dataBase_url


const uri =url
mongoose.set("strictQuery", false);
const mongoDB = async () => {
  await mongoose.connect(uri, { useNewUrlParser: true }, async function (err) {
    if (!err) {
      console.log("Sucessfully connected to database");
      const fetched_data = await mongoose.connection.db.collection(
        "Food_items"
      );
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection(
          "FoodCategory"
        );
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.food_items = data;
            global.foodCategory = catData;
          }
        });
      });
    }
  });
};

module.exports = mongoDB;
