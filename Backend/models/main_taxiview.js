module.exports = (sequelize, DataTypes) => {
    const main_taxiview = sequelize.define(
      "main_taxiview",
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
        travelFeeAmount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        travelTime: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        Time: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Taxi_Name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "main_taxiview",
        timestamps: false,
      }
    );
  
    return main_taxiview;
  };