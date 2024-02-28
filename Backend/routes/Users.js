const express = require("express");
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
const { Op } = require("sequelize");

router.use(bodyParser.json());
router.use(cors());
const {
  Users,
  main_restaurantview,
  main_supermarketview,
  main_taxiview,
  Main,
} = require("../models");

router.post("/filtered-data", async (req, res) => {
  try {
    const {
      Province,
      District,
      City,
      Age,
      Gender,
      DayOfWeek,
      Time,
      Service,
      Amount,
      AmountOption,
      Service_Providers,
      travelTimeOption,
      travelTime,
      travelFeeOption,
      travelFeeAmount,
    } = req.body;

    const { search } = req.query;

    let responseData;
    if (Service == "") {
      let filter = {
        Province: Province,
        District: District,
        City: City,
        Gender: Gender,
        Age: Age,
      };

      const lowercaseProvinces = Province.map((p) => p.toLowerCase());
      const lowercaseDistricts = District.map((d) => d.toLowerCase());
      const lowercaseCities = City.map((c) => c.toLowerCase());

      filter.Province = {
        [Op.or]: lowercaseProvinces.map((p) => ({ [Op.like]: `%${p}%` })),
      };

      filter.District = {
        [Op.or]: lowercaseDistricts.map((d) => ({ [Op.like]: `%${d}%` })),
      };

      filter.City = {
        [Op.or]: lowercaseCities.map((c) => ({ [Op.like]: `%${c}%` })),
      };

      if (Gender === "All") {
        filter.Gender = {
          [Op.or]: ["Male", "Female", "Unknown"],
        };
      } else {
        filter.Gender = Gender;
      }

      filter.Age = {
        [Op.gte]: Age[0],
        [Op.lte]: Age[1],
      };

      if (search) {
        filter.Contact_No = {
          [Op.like]: `${search}%`,
        };
      }

      const userCount = await Main.count({
        where: filter,
        col: "Contact_No",
        distinct: true,
      });

      const userCountByAge = await Main.findAll({
        attributes: [
          "Age",
          [
            Main.sequelize.fn(
              "COUNT",
              Main.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
      });
      const allUsersInSelectedProvince = await Main.findAll({
        attributes: [
          "Province",
          [
            Main.sequelize.fn(
              "COUNT",
              Main.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        District: Province,
        group: ["Province"],
      });

      const allUsersInSelectedDistrict = await Main.findAll({
        attributes: [
          "District",
          [
            Main.sequelize.fn(
              "COUNT",
              Main.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        District: District,
        group: ["District"],
      });

      const userCountByProvince = await Main.findAll({
        attributes: [
          "Province",
          [
            Main.sequelize.fn(
              "COUNT",
              Main.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
        group: ["Province"],
      });

      const userCountByDistrict = await Main.findAll({
        attributes: [
          "District",
          [
            Main.sequelize.fn(
              "COUNT",
              Main.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
        group: ["District"],
      });

      const userCountByCity = await Main.findAll({
        attributes: [
          "City",
          [
            Main.sequelize.fn(
              "COUNT",
              Main.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
        group: ["City"],
      });

      const userCountByGender = await Main.findAll({
        attributes: [
          [
            Main.sequelize.literal(
              "CASE WHEN Gender = 'All' THEN 'All' ELSE Gender END"
            ),
            "Gender",
          ],
          [
            Main.sequelize.fn(
              "COUNT",
              Main.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
      });

      let totalCount = 0;
      if (Gender === "All") {
        userCountByGender.forEach((genderCount) => {
          totalCount += genderCount.dataValues.userCount;
        });
      }
      responseData = {
        userCount,
        allUsersInSelectedProvince,
        allUsersInSelectedDistrict,
        userCountByProvince,
        userCountByDistrict,
        userCountByCity,
        userCountByAge,
        userCountByGender:
          totalCount !== 0
            ? [{ Gender: "All", userCount: totalCount }]
            : userCountByGender,
      };
    } else if (Service === "Restaurant") {
      let filter = {
        Province: Province,
        District: District,
        City: City,
        Age: Age,
        Gender: Gender,
        DayOfWeek: DayOfWeek,
        Time: Time,
        Restaurant_Name: Service_Providers,
      };

      const lowercaseProvinces = Province.map((p) => p.toLowerCase());
      const lowercaseDistricts = District.map((d) => d.toLowerCase());
      const lowercaseCities = City.map((c) => c.toLowerCase());
      const lowercaseDayNames = DayOfWeek.map((day) => day.toLowerCase());
      const lowercaseServiceProviders = Service_Providers.map((sc) =>
        sc.toLowerCase()
      );

      filter.DayOfWeek = {
        [Op.or]: lowercaseDayNames.map((day) => ({ [Op.like]: `%${day}%` })),
      };

      filter.Province = {
        [Op.or]: lowercaseProvinces.map((p) => ({ [Op.like]: `%${p}%` })),
      };

      filter.District = {
        [Op.or]: lowercaseDistricts.map((d) => ({ [Op.like]: `%${d}%` })),
      };

      filter.City = {
        [Op.or]: lowercaseCities.map((c) => ({ [Op.like]: `%${c}%` })),
      };

      filter.Restaurant_Name = {
        [Op.or]: lowercaseServiceProviders.map((sc) => ({
          [Op.like]: `%${sc}%`,
        })),
      };

      if (Amount[0] != "") {
        filter.Amount = Amount;

        if (AmountOption == "Equal") {
          filter.Amount = { [Op.eq]: Amount[0] };
        } else if (AmountOption == "Grater than") {
          filter.Amount = { [Op.gte]: Amount[0] };
        } else if (AmountOption == "Less than") {
          filter.Amount = { [Op.lte]: Amount[0] };
        } else {
          filter.Amount = {
            [Op.gte]: Amount[0],
            [Op.lte]: Amount[1],
          };
        }
      }

      if (Gender === "All") {
        filter.Gender = {
          [Op.or]: ["Male", "Female", "Unknown"],
        };
      } else {
        filter.Gender = Gender;
      }

      filter.Age = {
        [Op.gte]: Age[0],
        [Op.lte]: Age[1],
      };

      filter.Time = {
        [Op.gte]: Time[0],
        [Op.lte]: Time[1],
      };

      if (search) {
        filter.Contact_No = {
          [Op.like]: `${search}%`,
        };
      }

      const userCount = await main_restaurantview.count({
        where: filter,
        col: "Contact_No",
        distinct: true,
      });

      const userCountByAge = await main_restaurantview.findAll({
        attributes: [
          "Age",
          [
            main_restaurantview.sequelize.fn(
              "COUNT",
              main_restaurantview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
      });
      const allUsersInSelectedProvince = await main_restaurantview.findAll({
        attributes: [
          "Province",
          [
            main_restaurantview.sequelize.fn(
              "COUNT",
              main_restaurantview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        District: Province,
        group: ["Province"],
      });

      const allUsersInSelectedDistrict = await main_restaurantview.findAll({
        attributes: [
          "District",
          [
            main_restaurantview.sequelize.fn(
              "COUNT",
              main_restaurantview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        District: District,
        group: ["District"],
      });

      const userCountByProvince = await main_restaurantview.findAll({
        attributes: [
          "Province",
          [
            main_restaurantview.sequelize.fn(
              "COUNT",
              main_restaurantview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
        group: ["Province"],
      });

      const userCountByDistrict = await main_restaurantview.findAll({
        attributes: [
          "District",
          [
            main_restaurantview.sequelize.fn(
              "COUNT",
              main_restaurantview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
        group: ["District"],
      });

      const userCountByCity = await main_restaurantview.findAll({
        attributes: [
          "City",
          [
            main_restaurantview.sequelize.fn(
              "COUNT",
              main_restaurantview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
        group: ["City"],
      });

      const userCountByGender = await main_restaurantview.findAll({
        attributes: [
          [
            main_restaurantview.sequelize.literal(
              "CASE WHEN Gender = 'All' THEN 'All' ELSE Gender END"
            ),
            "Gender",
          ],
          [
            main_restaurantview.sequelize.fn(
              "COUNT",
              main_restaurantview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
      });

      let totalCount = 0;
      if (Gender === "All") {
        userCountByGender.forEach((genderCount) => {
          totalCount += genderCount.dataValues.userCount;
        });
      }
      responseData = {
        userCount,
        allUsersInSelectedProvince,
        allUsersInSelectedDistrict,
        userCountByProvince,
        userCountByDistrict,
        userCountByCity,
        userCountByAge,
        userCountByGender:
          totalCount !== 0
            ? [{ Gender: "All", userCount: totalCount }]
            : userCountByGender,
      };
    } else if (Service === "Supermarket") {
      let filter = {
        Province: Province,
        District: District,
        City: City,
        Gender: Gender,
        DayOfWeek: DayOfWeek,
        Age: Age,
        Time: Time,
        Supermarket_Name: Service_Providers,
      };

      const lowercaseProvinces = Province.map((p) => p.toLowerCase());
      const lowercaseDistricts = District.map((d) => d.toLowerCase());
      const lowercaseCities = City.map((c) => c.toLowerCase());
      const lowercaseDayNames = DayOfWeek.map((day) => day.toLowerCase());
      const lowercaseServiceCenters = Service_Providers.map((sc) =>
        sc.toLowerCase()
      );

      filter.DayOfWeek = {
        [Op.or]: lowercaseDayNames.map((day) => ({ [Op.like]: `%${day}%` })),
      };

      filter.Province = {
        [Op.or]: lowercaseProvinces.map((p) => ({ [Op.like]: `%${p}%` })),
      };

      filter.District = {
        [Op.or]: lowercaseDistricts.map((d) => ({ [Op.like]: `%${d}%` })),
      };

      filter.City = {
        [Op.or]: lowercaseCities.map((c) => ({ [Op.like]: `%${c}%` })),
      };

      filter.Supermarket_Name = {
        [Op.or]: lowercaseServiceCenters.map((sc) => ({
          [Op.like]: `%${sc}%`,
        })),
      };

      if (Amount[0] != "") {
        filter.Amount = Amount;

        if (AmountOption == "Equal") {
          filter.Amount = { [Op.eq]: Amount[0] };
        } else if (AmountOption == "Grater than") {
          filter.Amount = { [Op.gte]: Amount[0] };
        } else if (AmountOption == "Less than") {
          filter.Amount = { [Op.lte]: Amount[0] };
        } else {
          filter.Amount = {
            [Op.gte]: Amount[0],
            [Op.lte]: Amount[1],
          };
        }
      }

      if (Gender === "All") {
        filter.Gender = {
          [Op.or]: ["Male", "Female", "Unknown"],
        };
      } else {
        filter.Gender = Gender;
      }

      filter.Age = {
        [Op.gte]: Age[0],
        [Op.lte]: Age[1],
      };

      filter.Time = {
        [Op.gte]: Time[0],
        [Op.lte]: Time[1],
      };

      if (search) {
        filter.Contact_No = {
          [Op.like]: `${search}%`,
        };
      }

      const userCount = await main_supermarketview.count({
        where: filter,
        col: "Contact_No",
        distinct: true,
      });

      const userCountByAge = await main_supermarketview.findAll({
        attributes: [
          "Age",
          [
            main_supermarketview.sequelize.fn(
              "COUNT",
              main_supermarketview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
      });
      const allUsersInSelectedProvince = await main_supermarketview.findAll({
        attributes: [
          "Province",
          [
            main_supermarketview.sequelize.fn(
              "COUNT",
              main_supermarketview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        District: Province,
        group: ["Province"],
      });

      const allUsersInSelectedDistrict = await main_supermarketview.findAll({
        attributes: [
          "District",
          [
            main_supermarketview.sequelize.fn(
              "COUNT",
              main_supermarketview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        District: District,
        group: ["District"],
      });

      const userCountByProvince = await main_supermarketview.findAll({
        attributes: [
          "Province",
          [
            main_supermarketview.sequelize.fn(
              "COUNT",
              main_supermarketview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
        group: ["Province"],
      });

      const userCountByDistrict = await main_supermarketview.findAll({
        attributes: [
          "District",
          [
            main_supermarketview.sequelize.fn(
              "COUNT",
              main_supermarketview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
        group: ["District"],
      });

      const userCountByCity = await main_supermarketview.findAll({
        attributes: [
          "City",
          [
            main_supermarketview.sequelize.fn(
              "COUNT",
              main_supermarketview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
        group: ["City"],
      });

      const userCountByGender = await main_supermarketview.findAll({
        attributes: [
          [
            main_supermarketview.sequelize.literal(
              "CASE WHEN Gender = 'All' THEN 'All' ELSE Gender END"
            ),
            "Gender",
          ],
          [
            main_supermarketview.sequelize.fn(
              "COUNT",
              main_supermarketview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
      });

      let totalCount = 0;
      if (Gender === "All") {
        userCountByGender.forEach((genderCount) => {
          totalCount += genderCount.dataValues.userCount;
        });
      }
      responseData = {
        userCount,
        allUsersInSelectedProvince,
        allUsersInSelectedDistrict,
        userCountByProvince,
        userCountByDistrict,
        userCountByCity,
        userCountByAge,
        userCountByGender:
          totalCount !== 0
            ? [{ Gender: "All", userCount: totalCount }]
            : userCountByGender,
      };
    } else if (Service === "Taxi") {
      let filter = {
        Province: Province,
        District: District,
        City: City,
        Gender: Gender,
        DayOfWeek: DayOfWeek,
        Age: Age,
        Taxi_Name: Service_Providers,
      };

      const lowercaseProvinces = Province.map((p) => p.toLowerCase());
      const lowercaseDistricts = District.map((d) => d.toLowerCase());
      const lowercaseCities = City.map((c) => c.toLowerCase());
      const lowercaseDayNames = DayOfWeek.map((day) => day.toLowerCase());
      const lowercaseServiceCenters = Service_Providers.map((sc) =>
        sc.toLowerCase()
      );

      filter.DayOfWeek = {
        [Op.or]: lowercaseDayNames.map((day) => ({ [Op.like]: `%${day}%` })),
      };

      filter.Province = {
        [Op.or]: lowercaseProvinces.map((p) => ({ [Op.like]: `%${p}%` })),
      };

      filter.District = {
        [Op.or]: lowercaseDistricts.map((d) => ({ [Op.like]: `%${d}%` })),
      };

      filter.City = {
        [Op.or]: lowercaseCities.map((c) => ({ [Op.like]: `%${c}%` })),
      };

      filter.Taxi_Name = {
        [Op.or]: lowercaseServiceCenters.map((sc) => ({
          [Op.like]: `%${sc}%`,
        })),
      };

      if (travelFeeAmount[0] !== "") {
        filter.travelFeeAmount = travelFeeAmount;

        if (travelFeeOption === "Equal") {
          filter.travelFeeAmount = { [Op.eq]: travelFeeAmount[0] };
        } else if (travelFeeOption === "Grater than") {
          filter.travelFeeAmount = { [Op.gte]: travelFeeAmount[0] };
        } else if (travelFeeOption === "Less than") {
          filter.travelFeeAmount = { [Op.lte]: travelFeeAmount[0] };
        } else {
          filter.travelFeeAmount = {
            [Op.gte]: travelFeeAmount[0],
            [Op.lte]: travelFeeAmount[1],
          };
        }
      }

      if (travelTime[0] != "") {
        filter.travelTime = travelTime;

        if (travelTimeOption == "Equal") {
          filter.travelTime = { [Op.eq]: travelTime[0] };
        } else if (travelTimeOption == "Grater than") {
          filter.travelTime = { [Op.gte]: travelTime[0] };
        } else if (travelTimeOption == "Less than") {
          filter.travelTime = { [Op.lte]: travelTime[0] };
        } else {
          filter.travelFeeAmount = {
            [Op.gte]: travelTime[0],
            [Op.lte]: travelTime[1],
          };
        }
      }

      if (Gender === "All") {
        filter.Gender = {
          [Op.or]: ["Male", "Female", "Unknown"],
        };
      } else {
        filter.Gender = Gender;
      }

      filter.Age = {
        [Op.gte]: Age[0],
        [Op.lte]: Age[1],
      };

      if (search) {
        filter.Contact_No = {
          [Op.like]: `${search}%`,
        };
      }

      const userCount = await main_taxiview.count({
        where: filter,
        col: "Contact_No",
        distinct: true,
      });

      const userCountByAge = await main_taxiview.findAll({
        attributes: [
          "Age",
          [
            main_taxiview.sequelize.fn(
              "COUNT",
              main_taxiview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
      });
      const allUsersInSelectedProvince = await main_taxiview.findAll({
        attributes: [
          "Province",
          [
            main_taxiview.sequelize.fn(
              "COUNT",
              main_taxiview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        District: Province,
        group: ["Province"],
      });

      const allUsersInSelectedDistrict = await main_taxiview.findAll({
        attributes: [
          "District",
          [
            main_taxiview.sequelize.fn(
              "COUNT",
              main_taxiview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        District: District,
        group: ["District"],
      });

      const userCountByProvince = await main_taxiview.findAll({
        attributes: [
          "Province",
          [
            main_taxiview.sequelize.fn(
              "COUNT",
              main_taxiview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
        group: ["Province"],
      });

      const userCountByDistrict = await main_taxiview.findAll({
        attributes: [
          "District",
          [
            main_taxiview.sequelize.fn(
              "COUNT",
              main_taxiview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
        group: ["District"],
      });

      const userCountByCity = await main_taxiview.findAll({
        attributes: [
          "City",
          [
            main_taxiview.sequelize.fn(
              "COUNT",
              main_taxiview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
        group: ["City"],
      });

      const userCountByGender = await main_taxiview.findAll({
        attributes: [
          [
            main_taxiview.sequelize.literal(
              "CASE WHEN Gender = 'All' THEN 'All' ELSE Gender END"
            ),
            "Gender",
          ],
          [
            main_taxiview.sequelize.fn(
              "COUNT",
              main_taxiview.sequelize.literal("DISTINCT Contact_No")
            ),
            "userCount",
          ],
        ],
        where: filter,
      });

      let totalCount = 0;
      if (Gender === "All") {
        userCountByGender.forEach((genderCount) => {
          totalCount += genderCount.dataValues.userCount;
        });
      }
      responseData = {
        userCount,
        allUsersInSelectedProvince,
        allUsersInSelectedDistrict,
        userCountByProvince,
        userCountByDistrict,
        userCountByCity,
        userCountByAge,
        userCountByGender:
          totalCount !== 0
            ? [{ Gender: "All", userCount: totalCount }]
            : userCountByGender,
      };
    }
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post("/filtered-data", async (req, res) => {
//   try {
//     const {
//       Province,
//       District,
//       City,
//       Age,
//       Gender,
//       DayOfWeek,
//       Time,
//       Service,
//       Amount,
//       AmountOption,
//       Service_Providers,
//       travelTimeOption,
//       travelTime,
//       travelFeeOption,
//       travelFeeAmount,
//     } = req.body;
//     const { search } = req.query;

//     let filter = {
//       Province: Province,
//       District: District,
//       City: City,
//       Gender: Gender,
//       DayOfWeek: DayOfWeek,
//       Age: Age,
//       Time: Time,
//     };

//     const lowercaseProvinces = Province.map((p) => p.toLowerCase());
//     const lowercaseDistricts = District.map((d) => d.toLowerCase());
//     const lowercaseCities = City.map((c) => c.toLowerCase());
//     const lowercaseDayNames = DayOfWeek.map((day) => day.toLowerCase());
//     const lowercaseServiceCenters = Service_Providers.map((sc) =>
//       sc.toLowerCase()
//     );

//     filter.DayOfWeek = {
//       [Op.or]: lowercaseDayNames.map((day) => ({ [Op.like]: `%${day}%` })),
//     };

//     filter.Province = {
//       [Op.or]: lowercaseProvinces.map((p) => ({ [Op.like]: `%${p}%` })),
//     };

//     filter.District = {
//       [Op.or]: lowercaseDistricts.map((d) => ({ [Op.like]: `%${d}%` })),
//     };

//     filter.City = {
//       [Op.or]: lowercaseCities.map((c) => ({ [Op.like]: `%${c}%` })),
//     };

//     filter.Service_Providers = {
//       [Op.or]: lowercaseServiceCenters.map((sc) => ({
//         [Op.like]: `%${sc}%`,
//       })),
//     };

//     if (Service != null) {
//       filter.Service = Service;
//     } else {
//       filter;
//     }

//     if (Amount[0] != "") {
//       filter.Amount = Amount;

//       if (AmountOption == "Equal") {
//         filter.Amount = { [Op.eq]: Amount[0] };
//       } else if (AmountOption == "Grater than") {
//         filter.Amount = { [Op.gte]: Amount[0] };
//       } else if (AmountOption == "Less than") {
//         filter.Amount = { [Op.lte]: Amount[0] };
//       } else {
//         filter.Amount = {
//           [Op.gte]: Amount[0],
//           [Op.lte]: Amount[1],
//         };
//       }
//     }

//     if (Gender === "All") {
//       filter.Gender = {
//         [Op.or]: ["Male", "Female", "Unknown"],
//       };
//     } else {
//       filter.Gender = Gender;
//     }

//     filter.Age = {
//       [Op.gte]: Age[0],
//       [Op.lte]: Age[1],
//     };

//     filter.Time = {
//       [Op.gte]: Time[0],
//       [Op.lte]: Time[1],
//     };

//     if (search) {
//       filter.Contact_No = {
//         [Op.like]: `${search}%`,
//       };
//     }

//     const userCount = await Users.count({
//       where: filter,
//       col: "Contact_No",
//       distinct: true,
//     });

//     const userCountByAge = await Users.findAll({
//       attributes: [
//         "Age",
//         [
//           Users.sequelize.fn(
//             "COUNT",
//             Users.sequelize.literal("DISTINCT Contact_No")
//           ),
//           "userCount",
//         ],
//       ],
//       where: filter,
//     });
//     const allUsersInSelectedProvince = await Users.findAll({
//       attributes: [
//         "Province",
//         [
//           Users.sequelize.fn(
//             "COUNT",
//             Users.sequelize.literal("DISTINCT Contact_No")
//           ),
//           "userCount",
//         ],
//       ],
//       District: Province,
//       group: ["Province"],
//     });

//     const allUsersInSelectedDistrict = await Users.findAll({
//       attributes: [
//         "District",
//         [
//           Users.sequelize.fn(
//             "COUNT",
//             Users.sequelize.literal("DISTINCT Contact_No")
//           ),
//           "userCount",
//         ],
//       ],
//       District: District,
//       group: ["District"],
//     });

//     const userCountByProvince = await Users.findAll({
//       attributes: [
//         "Province",
//         [
//           Users.sequelize.fn(
//             "COUNT",
//             Users.sequelize.literal("DISTINCT Contact_No")
//           ),
//           "userCount",
//         ],
//       ],
//       where: filter,
//       group: ["Province"],
//     });

//     const userCountByDistrict = await Users.findAll({
//       attributes: [
//         "District",
//         [
//           Users.sequelize.fn(
//             "COUNT",
//             Users.sequelize.literal("DISTINCT Contact_No")
//           ),
//           "userCount",
//         ],
//       ],
//       where: filter,
//       group: ["District"],
//     });

//     const userCountByCity = await Users.findAll({
//       attributes: [
//         "City",
//         [
//           Users.sequelize.fn(
//             "COUNT",
//             Users.sequelize.literal("DISTINCT Contact_No")
//           ),
//           "userCount",
//         ],
//       ],
//       where: filter,
//       group: ["City"],
//     });

//     const userCountByGender = await Users.findAll({
//       attributes: [
//         [
//           Users.sequelize.literal(
//             "CASE WHEN Gender = 'All' THEN 'All' ELSE Gender END"
//           ),
//           "Gender",
//         ],
//         [
//           Users.sequelize.fn(
//             "COUNT",
//             Users.sequelize.literal("DISTINCT Contact_No")
//           ),
//           "userCount",
//         ],
//       ],
//       where: filter,
//     });

//     let totalCount = 0;
//     if (Gender === "All") {
//       userCountByGender.forEach((genderCount) => {
//         totalCount += genderCount.dataValues.userCount;
//       });
//     }
//     res.json({
//       userCount,
//       // userList,
//       allUsersInSelectedProvince,
//       allUsersInSelectedDistrict,
//       userCountByProvince,
//       userCountByDistrict,
//       userCountByCity,
//       userCountByAge,
//       userCountByGender:
//         totalCount !== 0
//           ? [{ Gender: "All", userCount: totalCount }]
//           : userCountByGender,
//     });
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.post("/filtered-data/view/userlist", async (req, res) => {
//   try {
//     const {
//       Province,
//       District,
//       City,
//       Age,
//       Gender,
//       DayOfWeek,
//       Time,
//       Service,
//       Amount,
//       AmountOption,
//       Service_Providers,
//       travelTimeOption,
//       travelTime,
//       travelFeeOption,
//       travelFeeAmount,
//     } = req.body;

//     let filter = {
//       Province: Province,
//       District: District,
//       City: City,
//       Gender: Gender,
//       DayOfWeek: DayOfWeek,
//       Age: Age,
//       Time: Time,
//     };

//     const lowercaseProvinces = Province.map((p) => p.toLowerCase());
//     const lowercaseDistricts = District.map((d) => d.toLowerCase());
//     const lowercaseCities = City.map((c) => c.toLowerCase());
//     const lowercaseDayNames = DayOfWeek.map((day) => day.toLowerCase());
//     const lowercaseServiceCenters = Service_Providers.map((sc) =>
//       sc.toLowerCase()
//     );

//     filter.DayOfWeek = {
//       [Op.or]: lowercaseDayNames.map((day) => ({ [Op.like]: `%${day}%` })),
//     };

//     filter.Province = {
//       [Op.or]: lowercaseProvinces.map((p) => ({ [Op.like]: `%${p}%` })),
//     };

//     filter.District = {
//       [Op.or]: lowercaseDistricts.map((d) => ({ [Op.like]: `%${d}%` })),
//     };

//     filter.City = {
//       [Op.or]: lowercaseCities.map((c) => ({ [Op.like]: `%${c}%` })),
//     };

//     filter.Service_Providers = {
//       [Op.or]: lowercaseServiceCenters.map((sc) => ({
//         [Op.like]: `%${sc}%`,
//       })),
//     };

//     if (Service != null) {
//       filter.Service = Service;
//     } else {
//       filter;
//     }

//     if (Amount[0] != "") {
//       filter.Amount = Amount;

//       if (AmountOption == "Equal") {
//         filter.Amount = { [Op.eq]: Amount[0] };
//       } else if (AmountOption == "Grater than") {
//         filter.Amount = { [Op.gte]: Amount[0] };
//       } else if (AmountOption == "Less than") {
//         filter.Amount = { [Op.lte]: Amount[0] };
//       } else {
//         filter.Amount = {
//           [Op.gte]: Amount[0],
//           [Op.lte]: Amount[1],
//         };
//       }
//     }

//     if (Gender === "All") {
//       filter.Gender = {
//         [Op.or]: ["Male", "Female", "Unknown"],
//       };
//     } else {
//       filter.Gender = Gender;
//     }

//     filter.Age = {
//       [Op.gte]: Age[0],
//       [Op.lte]: Age[1],
//     };

//     filter.Time = {
//       [Op.gte]: Time[0],
//       [Op.lte]: Time[1],
//     };

//     const userList = await Users.findAll({
//       where: filter,
//       group: ["Contact_No"],
//     });

//     res.json({
//       userList,
//     });
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.post("/filtered-data/view/userlist", async (req, res) => {
  try {
    const {
      Province,
      District,
      City,
      Age,
      Gender,
      DayOfWeek,
      Time,
      Service,
      Amount,
      AmountOption,
      Service_Providers,
      travelTimeOption,
      travelTime,
      travelFeeOption,
      travelFeeAmount,
    } = req.body;

    const { search } = req.query;

    let responseData;
    if (Service == "") {
      let filter = {
        Province: Province,
        District: District,
        City: City,
        Gender: Gender,
        Age: Age,
      };

      const lowercaseProvinces = Province.map((p) => p.toLowerCase());
      const lowercaseDistricts = District.map((d) => d.toLowerCase());
      const lowercaseCities = City.map((c) => c.toLowerCase());

      filter.Province = {
        [Op.or]: lowercaseProvinces.map((p) => ({ [Op.like]: `%${p}%` })),
      };

      filter.District = {
        [Op.or]: lowercaseDistricts.map((d) => ({ [Op.like]: `%${d}%` })),
      };

      filter.City = {
        [Op.or]: lowercaseCities.map((c) => ({ [Op.like]: `%${c}%` })),
      };

      if (Gender === "All") {
        filter.Gender = {
          [Op.or]: ["Male", "Female", "Unknown"],
        };
      } else {
        filter.Gender = Gender;
      }

      filter.Age = {
        [Op.gte]: Age[0],
        [Op.lte]: Age[1],
      };

      if (search) {
        filter.Contact_No = {
          [Op.like]: `${search}%`,
        };
      }

      const userList = await Main.findAll({
        where: filter,
        group: ["Contact_No"],
      });
      responseData = {
        userList,
      };
    } else if (Service === "Restaurant") {
      let filter = {
        Province: Province,
        District: District,
        City: City,
        Age: Age,
        Gender: Gender,
        DayOfWeek: DayOfWeek,
        Time: Time,
        Restaurant_Name: Service_Providers,
      };

      const lowercaseProvinces = Province.map((p) => p.toLowerCase());
      const lowercaseDistricts = District.map((d) => d.toLowerCase());
      const lowercaseCities = City.map((c) => c.toLowerCase());
      const lowercaseDayNames = DayOfWeek.map((day) => day.toLowerCase());
      const lowercaseServiceProviders = Service_Providers.map((sc) =>
        sc.toLowerCase()
      );

      filter.DayOfWeek = {
        [Op.or]: lowercaseDayNames.map((day) => ({ [Op.like]: `%${day}%` })),
      };

      filter.Province = {
        [Op.or]: lowercaseProvinces.map((p) => ({ [Op.like]: `%${p}%` })),
      };

      filter.District = {
        [Op.or]: lowercaseDistricts.map((d) => ({ [Op.like]: `%${d}%` })),
      };

      filter.City = {
        [Op.or]: lowercaseCities.map((c) => ({ [Op.like]: `%${c}%` })),
      };

      filter.Restaurant_Name = {
        [Op.or]: lowercaseServiceProviders.map((sc) => ({
          [Op.like]: `%${sc}%`,
        })),
      };

      if (Amount[0] != "") {
        filter.Amount = Amount;

        if (AmountOption == "Equal") {
          filter.Amount = { [Op.eq]: Amount[0] };
        } else if (AmountOption == "Grater than") {
          filter.Amount = { [Op.gte]: Amount[0] };
        } else if (AmountOption == "Less than") {
          filter.Amount = { [Op.lte]: Amount[0] };
        } else {
          filter.Amount = {
            [Op.gte]: Amount[0],
            [Op.lte]: Amount[1],
          };
        }
      }

      if (Gender === "All") {
        filter.Gender = {
          [Op.or]: ["Male", "Female", "Unknown"],
        };
      } else {
        filter.Gender = Gender;
      }

      filter.Age = {
        [Op.gte]: Age[0],
        [Op.lte]: Age[1],
      };

      filter.Time = {
        [Op.gte]: Time[0],
        [Op.lte]: Time[1],
      };

      if (search) {
        filter.Contact_No = {
          [Op.like]: `${search}%`,
        };
      }

      const userList = await main_restaurantview.findAll({
        where: filter,
        group: ["Contact_No"],
      });
      responseData = {
        userList,
      };
    } else if (Service === "Supermarket") {
      let filter = {
        Province: Province,
        District: District,
        City: City,
        Gender: Gender,
        DayOfWeek: DayOfWeek,
        Age: Age,
        Time: Time,
        Supermarket_Name: Service_Providers,
      };

      const lowercaseProvinces = Province.map((p) => p.toLowerCase());
      const lowercaseDistricts = District.map((d) => d.toLowerCase());
      const lowercaseCities = City.map((c) => c.toLowerCase());
      const lowercaseDayNames = DayOfWeek.map((day) => day.toLowerCase());
      const lowercaseServiceCenters = Service_Providers.map((sc) =>
        sc.toLowerCase()
      );

      filter.DayOfWeek = {
        [Op.or]: lowercaseDayNames.map((day) => ({ [Op.like]: `%${day}%` })),
      };

      filter.Province = {
        [Op.or]: lowercaseProvinces.map((p) => ({ [Op.like]: `%${p}%` })),
      };

      filter.District = {
        [Op.or]: lowercaseDistricts.map((d) => ({ [Op.like]: `%${d}%` })),
      };

      filter.City = {
        [Op.or]: lowercaseCities.map((c) => ({ [Op.like]: `%${c}%` })),
      };

      filter.Supermarket_Name = {
        [Op.or]: lowercaseServiceCenters.map((sc) => ({
          [Op.like]: `%${sc}%`,
        })),
      };

      if (Amount[0] != "") {
        filter.Amount = Amount;

        if (AmountOption == "Equal") {
          filter.Amount = { [Op.eq]: Amount[0] };
        } else if (AmountOption == "Grater than") {
          filter.Amount = { [Op.gte]: Amount[0] };
        } else if (AmountOption == "Less than") {
          filter.Amount = { [Op.lte]: Amount[0] };
        } else {
          filter.Amount = {
            [Op.gte]: Amount[0],
            [Op.lte]: Amount[1],
          };
        }
      }

      if (Gender === "All") {
        filter.Gender = {
          [Op.or]: ["Male", "Female", "Unknown"],
        };
      } else {
        filter.Gender = Gender;
      }

      filter.Age = {
        [Op.gte]: Age[0],
        [Op.lte]: Age[1],
      };

      filter.Time = {
        [Op.gte]: Time[0],
        [Op.lte]: Time[1],
      };

      if (search) {
        filter.Contact_No = {
          [Op.like]: `${search}%`,
        };
      }

      const userList = await main_supermarketview.findAll({
        where: filter,
        group: ["Contact_No"],
      });
      responseData = {
        userList,
      };
    } else if (Service === "Taxi") {
      let filter = {
        Province: Province,
        District: District,
        City: City,
        Gender: Gender,
        DayOfWeek: DayOfWeek,
        Age: Age,
        Taxi_Name: Service_Providers,
      };

      const lowercaseProvinces = Province.map((p) => p.toLowerCase());
      const lowercaseDistricts = District.map((d) => d.toLowerCase());
      const lowercaseCities = City.map((c) => c.toLowerCase());
      const lowercaseDayNames = DayOfWeek.map((day) => day.toLowerCase());
      const lowercaseServiceCenters = Service_Providers.map((sc) =>
        sc.toLowerCase()
      );

      filter.DayOfWeek = {
        [Op.or]: lowercaseDayNames.map((day) => ({ [Op.like]: `%${day}%` })),
      };

      filter.Province = {
        [Op.or]: lowercaseProvinces.map((p) => ({ [Op.like]: `%${p}%` })),
      };

      filter.District = {
        [Op.or]: lowercaseDistricts.map((d) => ({ [Op.like]: `%${d}%` })),
      };

      filter.City = {
        [Op.or]: lowercaseCities.map((c) => ({ [Op.like]: `%${c}%` })),
      };

      filter.Taxi_Name = {
        [Op.or]: lowercaseServiceCenters.map((sc) => ({
          [Op.like]: `%${sc}%`,
        })),
      };

      if (travelFeeAmount[0] !== "") {
        filter.travelFeeAmount = travelFeeAmount;

        if (travelFeeOption === "Equal") {
          filter.travelFeeAmount = { [Op.eq]: travelFeeAmount[0] };
        } else if (travelFeeOption === "Grater than") {
          filter.travelFeeAmount = { [Op.gte]: travelFeeAmount[0] };
        } else if (travelFeeOption === "Less than") {
          filter.travelFeeAmount = { [Op.lte]: travelFeeAmount[0] };
        } else {
          filter.travelFeeAmount = {
            [Op.gte]: travelFeeAmount[0],
            [Op.lte]: travelFeeAmount[1],
          };
        }
      }

      if (travelTime[0] != "") {
        filter.travelTime = travelTime;

        if (travelTimeOption == "Equal") {
          filter.travelTime = { [Op.eq]: travelTime[0] };
        } else if (travelTimeOption == "Grater than") {
          filter.travelTime = { [Op.gte]: travelTime[0] };
        } else if (travelTimeOption == "Less than") {
          filter.travelTime = { [Op.lte]: travelTime[0] };
        } else {
          filter.travelFeeAmount = {
            [Op.gte]: travelTime[0],
            [Op.lte]: travelTime[1],
          };
        }
      }

      if (Gender === "All") {
        filter.Gender = {
          [Op.or]: ["Male", "Female", "Unknown"],
        };
      } else {
        filter.Gender = Gender;
      }

      filter.Age = {
        [Op.gte]: Age[0],
        [Op.lte]: Age[1],
      };

      if (search) {
        filter.Contact_No = {
          [Op.like]: `${search}%`,
        };
      }

      const userList = await main_taxiview.findAll({
        where: filter,
        group: ["Contact_No"],
      });
      responseData = {
        userList,
      };
    }
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
