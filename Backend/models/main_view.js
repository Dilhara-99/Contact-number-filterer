module.exports = (sequelize, DataTypes) => {
    const main_view = sequelize.define(
      "main_view",
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
        Time_Restaurant: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Amount_Restaurant: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        Restaurant_Name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Time_Supermarket: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Amount_Supermarket: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        Supermarket_Name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Time_Taxi: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Fee_Taxi: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        Travel_Time_Taxi: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        Taxi_Name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "main_view",
        timestamps: false,
      }
    );
    return main_view;
  };
  