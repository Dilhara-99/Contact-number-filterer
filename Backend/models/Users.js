module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
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
      Time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DayOfWeek: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Amount: {
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
      Service: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Service_Providers: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Users;
};

