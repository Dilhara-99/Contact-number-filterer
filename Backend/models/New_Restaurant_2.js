module.exports = (sequelize, DataTypes) => {
    const New_Restaurant_2 = sequelize.define(
      "New_Restaurant_2",
      {
        Send_Id_R_Fk: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        Time: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Amount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
    New_Restaurant_2.associate = (models) => {
        New_Restaurant_2.belongsTo(models.Main, {
          foreignKey: "Send_Id_R_Fk",
          targetKey: "Send_Id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        });
      };
    return New_Restaurant_2;
  };
  
  