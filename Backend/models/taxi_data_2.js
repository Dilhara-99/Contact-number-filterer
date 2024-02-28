module.exports = (sequelize, DataTypes) => {
    const taxi_data_2s = sequelize.define(
      "taxi_data_2",
      {
        Send_Id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        Time: {
          type: DataTypes.STRING,
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
        Taxi_Name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
      },
      {
        timestamps: false,
      }
    );
    return taxi_data_2s;
  };
  
  