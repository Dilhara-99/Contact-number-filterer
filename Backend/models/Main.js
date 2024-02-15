module.exports = (sequelize, DataTypes) => {
    const Main = sequelize.define(
      "Main",
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
      },
      {
        timestamps: false,
      }
    );
    Main.associate = (models) => {
        Main.hasMany(models.New_Restaurant_2, {
          foreignKey: "Send_Id_R_Fk",
          sourceKey: "Send_Id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        });
      };
      Main.associate = (models) => {
        Main.hasMany(models.New_Supermarket_2, {
          foreignKey: "Send_Id_S_Fk",
          sourceKey: "Send_Id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        });
      };
    return Main;
  };
  
  