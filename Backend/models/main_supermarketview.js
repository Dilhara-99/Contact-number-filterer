module.exports = (sequelize, DataTypes) => {
    const main_supermarketview = sequelize.define(
      "main_supermarketview",
      {
        Contact_No: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        Send_Id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        DayOfWeek: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        City: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        District: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Province: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Gender: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Age: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        Amount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        Time: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Supermarket_Name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "main_supermarketview",
        timestamps: false,
      }
    );
  
    return main_supermarketview;
  };