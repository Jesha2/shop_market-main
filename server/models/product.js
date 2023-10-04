const { DataTypes } = require("sequelize");
const {sequelize} = require("../util/database");

module.exports= {
    Product :sequelize.define('product',{
        id:{
            type :  DataTypes.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey: true
        },
        productName: DataTypes.STRING,
        description: DataTypes.TEXT,
        price : DataTypes.DECIMAL,
        stockQuantity : DataTypes.INTEGER,
        category:DataTypes.STRING,
        imageUrl: DataTypes.STRING ,
        ratings:DataTypes.INTEGER,

    }

    )
}