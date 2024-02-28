module.exports = (sequelize, DataTypes) => {
    const New_Supermarket_2s = sequelize.define(
      "New_Supermarket_2",
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
        Amount: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        Supermarket_Name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
    // New_Supermarket_2s.associate = (models) => {
    //     New_Supermarket_2s.belongsTo(models.Mains, {
    //       foreignKey: "Send_Id_S_Fk",
    //       targetKey: "Send_Id",
    //       onUpdate: "CASCADE",
    //       onDelete: "CASCADE",
    //     });
    //   };
    return New_Supermarket_2s;
  };
  
  