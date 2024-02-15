const express = require("express");
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
const { Op } = require("sequelize");

router.use(bodyParser.json());
router.use(cors());
const { Users,Main,NewRestaurant_2,New_Supermarket_2 } = require("../models");

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

    let filter = {
      Province: Province,
      District: District,
      City: City,
      Gender: Gender,
      DayOfWeek: DayOfWeek,
      Time: Time,
      Age: Age,
      Service_Providers: Service_Providers,
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

    filter.Service_Providers = {
      [Op.or]: lowercaseServiceCenters.map((sc) => ({
        [Op.like]: `%${sc}%`,
      })),
    };

    if (Service != null) {
      filter.Service = Service;
    } else {
      filter;
    }

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

    const userCount = await Users.count({
      where: filter,
      col: "Contact_No",
      distinct: true,
    });

    const userCountByAge = await Users.findAll({
      attributes: [
        "Age",
        [
          Users.sequelize.fn(
            "COUNT",
            Users.sequelize.literal("DISTINCT Contact_No")
          ),
          "userCount",
        ],
      ],
      where: filter,
    });
    const allUsersInSelectedProvince = await Users.findAll({
      attributes: [
        "Province",
        [
          Users.sequelize.fn(
            "COUNT",
            Users.sequelize.literal("DISTINCT Contact_No")
          ),
          "userCount",
        ],
      ],
      District: Province,
      group: ["Province"],
    });

    const allUsersInSelectedDistrict = await Users.findAll({
      attributes: [
        "District",
        [
          Users.sequelize.fn(
            "COUNT",
            Users.sequelize.literal("DISTINCT Contact_No")
          ),
          "userCount",
        ],
      ],
      District: District,
      group: ["District"],
    });

    const userCountByProvince = await Users.findAll({
      attributes: [
        "Province",
        [
          Users.sequelize.fn(
            "COUNT",
            Users.sequelize.literal("DISTINCT Contact_No")
          ),
          "userCount",
        ],
      ],
      where: filter,
      group: ["Province"],
    });

    const userCountByDistrict = await Users.findAll({
      attributes: [
        "District",
        [
          Users.sequelize.fn(
            "COUNT",
            Users.sequelize.literal("DISTINCT Contact_No")
          ),
          "userCount",
        ],
      ],
      where: filter,
      group: ["District"],
    });

    const userCountByCity = await Users.findAll({
      attributes: [
        "City",
        [
          Users.sequelize.fn(
            "COUNT",
            Users.sequelize.literal("DISTINCT Contact_No")
          ),
          "userCount",
        ],
      ],
      where: filter,
      group: ["City"],
    });

    const userCountByGender = await Users.findAll({
      attributes: [
        [
          Users.sequelize.literal(
            "CASE WHEN Gender = 'All' THEN 'All' ELSE Gender END"
          ),
          "Gender",
        ],
        [
          Users.sequelize.fn(
            "COUNT",
            Users.sequelize.literal("DISTINCT Contact_No")
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
    console.log(travelTimeOption, travelTime, travelFeeOption, travelFeeAmount);
    res.json({
      userCount,
      // userList,
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
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

    let filter = {
      Province: Province,
      District: District,
      City: City,
      Gender: Gender,
      DayOfWeek: DayOfWeek,
      Time: Time,
      Age: Age,
      Service_Providers: Service_Providers,
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

    filter.Service_Providers = {
      [Op.or]: lowercaseServiceCenters.map((sc) => ({
        [Op.like]: `%${sc}%`,
      })),
    };

    if (Service != null) {
      filter.Service = Service;
    } else {
      filter;
    }

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

    const userList = await Users.findAll({
      where: filter,
      group: ["Contact_No"],
    });

    console.log(travelTimeOption, travelTime, travelFeeOption, travelFeeAmount);
    res.json({
      userList,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
