module.exports = (sequelize, DataTypes) => {
    const New_Supermarket_2 = sequelize.define(
      "New_Supermarket_2",
      {
        Send_Id_S_Fk: {
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
    New_Supermarket_2.associate = (models) => {
        New_Supermarket_2.belongsTo(models.Main, {
          foreignKey: "Send_Id_S_Fk",
          targetKey: "Send_Id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        });
      };
    return New_Supermarket_2;
  };
  
  