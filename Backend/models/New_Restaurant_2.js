module.exports = (sequelize, DataTypes) => {
    const New_Restaurant_2s = sequelize.define(
      "New_Restaurant_2",
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
        Restaurant_Name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
    // New_Restaurant_2s.associate = (models) => {
    //     New_Restaurant_2s.belongsTo(models.Mains, {
    //       foreignKey: "Send_Id_R_Fk",
    //       targetKey: "Send_Id",
    //       onUpdate: "CASCADE",
    //       onDelete: "CASCADE",
    //     });
    //   };
    return New_Restaurant_2s;
  };
  
  