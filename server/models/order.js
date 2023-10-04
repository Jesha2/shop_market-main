const { DataTypes } = require("sequelize");
const {sequelize} = require("../util/database");

module.exports= {
    Order :sequelize.define('order',{
        id:{
            type :  DataTypes.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey: true
        },
        orderDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Set the default value to the current date and time
          },
        status: DataTypes.STRING,
        total: DataTypes.DECIMAL(10, 2)
    }

    )
}
//module.exports = Order;