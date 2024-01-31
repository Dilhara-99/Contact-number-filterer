import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

const provincesData = {
  Northern: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
  NorthWestern: ["Puttalam", "Kurunegala"],
  Western: ["Colombo", "Gampaha", "Kalutara"],
  NorthCentral: ["Anuradhapura", "Polonnaruwa"],
  Central: ["Kandy", "Matale", "NuwaraEliya"],
  Sabaragamuwa: ["Rathnapura", "Kegalle"],
  Eastern: ["Ampara", "Batticaloa", "Trincomalee"],
  Uva: ["Badulla", "Monaragala"],
  Southern: ["Galle", "Matara", "Hambantota"],
};

const MainCitiesData = {
  Colombo: [
    "Bambalapitiya",
    "Dehiwela",
    "Fort",
    "Attidiya",
    "Union Place",
    "Havelock",
    "Rajagiriya",
    "Maharagama",
    "Moratuwa",
    "Avissawella",
    "Kotahena",
    "Kottawa",
    "Kotikawaththa",
    "Athurugiriya",
    "Piliyandala",
    "Thalawathugoda",
    "Kaduwela",
    "Malabe",
    "Nawala",
    "Nugegoda",
    "Pelawaththa",
  ],
  Gampaha: [
    "Gampaha",
    "Negambo",
    "Ja-Ela",
    "Kiribathgoda",
    "Kadawatha",
    "Yakkala",
    "Wattala",
  ],
  Kalutara: ["Kalutara", "Beruwala", "Aluthgama", "Panadura"],
  Kandy: ["Kandy", "Peradeniya", "Katugastota", "Gampola"],
  NuwaraEliya: ["Nuwara Eliya"],
  Matale: ["Matale"],
  Kilinochchi: ["Kilinochchi"],
  Jaffna: ["Jaffna"],
  Mannar: ["Mannar"],
  Mullaitivu: ["Mullaitivu"],
  Vavuniya: ["Vavuniya"],
  Puttalam: ["Puttalam", "Wennappuwa"],
  Kurunegala: ["Kurunegala", "Kuliyapitiya"],
  Anuradhapura: ["Anuradhapura"],
  Polonnaruwa: ["Polonnaruwa"],
  Rathnapura: ["Rathnapura", "Eheliyagoda"],
  Kegalle: ["Kegalle"],
  Ampara: ["Ampara"],
  Batticaloa: ["Batticaloa"],
  Trincomalee: ["Trincomalee"],
  Badulla: ["Badulla"],
  Monaragala: ["Monaragala"],
  Galle: ["Galle", "Ambalangoda"],
  Matara: ["Matara", "Akuressa"],
  Hambantota: ["Hambantota"],
};

const LocationComp = ({
  onSelectProvince,
  onSelectDistrict,
  onSelectCity,
  userCountByProvince,
  userCountByDistrict,
  userCountByCity,
  allUsersInSelectedProvince,
  allUsersInSelectedDistrict,
}) => {
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
  }, [
    userCountByProvince,
    userCountByDistrict,
    userCountByCity,
    allUsersInSelectedProvince,
    allUsersInSelectedDistrict,
  ]);

  const handleProvinceChange = (province) => {
    const updatedProvinces = selectedProvinces.includes(province)
      ? selectedProvinces.filter((p) => p !== province)
      : [...selectedProvinces, province];

    setSelectedProvinces(updatedProvinces);

    const updatedDistricts = updatedProvinces.includes(province)
      ? [...new Set([...selectedDistricts, ...provincesData[province]])]
      : selectedDistricts.filter((d) => !provincesData[province].includes(d));

    setSelectedDistricts(updatedDistricts);

    const updatedCities = updatedDistricts.reduce(
      (cities, district) =>
        updatedDistricts.includes(district)
          ? [...cities, ...MainCitiesData[district]]
          : cities.filter((c) => !MainCitiesData[district].includes(c)),
      []
    );

    setSelectedProvinces(updatedProvinces);
    setSelectedDistricts(updatedDistricts);
    setSelectedCities(updatedCities);

    onSelectProvince(updatedProvinces);
    onSelectDistrict(updatedDistricts);
    onSelectCity(updatedCities);
  };

  const handleDistrictChange = (district) => {
    const updatedDistricts = selectedDistricts.includes(district)
      ? selectedDistricts.filter((d) => d !== district)
      : [...selectedDistricts, district];

    setSelectedDistricts(updatedDistricts);

    const updatedCities = Object.keys(MainCitiesData).reduce(
      (cities, currentDistrict) =>
        updatedDistricts.includes(currentDistrict)
          ? [...cities, ...MainCitiesData[currentDistrict]]
          : cities.filter((c) => !MainCitiesData[currentDistrict].includes(c)),
      []
    );

    setSelectedCities(updatedCities);
    onSelectDistrict(updatedDistricts);
    onSelectCity(updatedCities);

    const totalUserCountInDistrict = updatedCities.reduce(
      (count, city) => count + getUserCountCity(city, userCountByCity),
      0
    );

    const relatedProvince = Object.keys(provincesData).find((province) =>
      provincesData[province].includes(district)
    );
    if (
      relatedProvince &&
      updatedDistricts.every((d) => !provincesData[relatedProvince].includes(d))
    ) {
      handleProvinceChange(relatedProvince);
    }
  };

  const handleCityChange = (city) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];

    setSelectedCities(updatedCities);
    onSelectCity(updatedCities);

    const relatedDistrict = Object.keys(MainCitiesData).find((district) =>
      MainCitiesData[district].includes(city)
    );
    if (
      relatedDistrict &&
      updatedCities.every((c) => !MainCitiesData[relatedDistrict].includes(c))
    ) {
      handleDistrictChange(relatedDistrict);
    }
  };

  const getUserCountProvince = (location, userCounts) => {
    if (userCounts) {
      const countData = userCounts.find((count) => count.Province === location);
      return countData ? countData.userCount : 0;
    }
    return 0;
  };

  const getUserCountDistrict = (location, userCounts) => {
    if (userCounts) {
      const countData = userCounts.find((count) => count.District === location);
      return countData ? countData.userCount : 0;
    }
    return 0;
  };

  const getUserCountCity = (location, userCounts) => {
    if (userCounts) {
      const countData = userCounts.find((count) => count.City === location);
      return countData ? countData.userCount : 0;
    }
    return 0;
  };
  const getAllUserCountProvince = (location, userCounts) => {
    if (userCounts) {
      const countData = userCounts.find((count) => count.Province === location);
      return countData ? countData.userCount : 0;
    }
    return 0;
  };

  const getAllUserCountDistrict = (location, userCounts) => {
    if (userCounts) {
      const countData = userCounts.find((count) => count.District === location);
      return countData ? countData.userCount : 0;
    }
    return 0;
  };

  return (
    <div style={{ margin: "0 0 0 40px" }}>
      <FormControl component="fieldset">
        <FormGroup>
          <Typography sx={{ fontWeight: "bolder" }}>Province</Typography>
          {Object.keys(provincesData)
            .sort()
            .map((province) => (
              <div key={province}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedProvinces.includes(province)}
                      onChange={() => handleProvinceChange(province)}
                    />
                  }
                  label={
                    <span>
                      <span>{`${province} (${getAllUserCountProvince(
                        province,
                        allUsersInSelectedProvince
                      )})`}</span>
                      <Typography
                        component="span"
                        sx={{
                          fontWeight: "bolder",
                          marginLeft: "15px",
                          color: "#585959",
                          display: selectedProvinces.includes(province)
                            ? "inline"
                            : "none",
                        }}
                      >
                        Selected : (
                        {getUserCountProvince(province, userCountByProvince)})
                      </Typography>
                    </span>
                  }
                />
                {selectedProvinces.includes(province) && (
                  <div style={{ marginLeft: 40 }}>
                    <Typography sx={{ fontWeight: "bolder" }}>
                      District
                    </Typography>
                    {provincesData[province].sort().map((district) => (
                      <div key={district}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedDistricts.includes(district)}
                              onChange={() => handleDistrictChange(district)}
                            />
                          }
                          label={
                            <span>
                              <span>{`${district} (${getAllUserCountDistrict(
                                district,
                                allUsersInSelectedDistrict
                              )})`}</span>
                              <Typography
                                component="span"
                                sx={{
                                  fontWeight: "bolder",
                                  marginLeft: "15px",
                                  color: "#585959",
                                  display: selectedDistricts.includes(district)
                                    ? "inline"
                                    : "none",
                                }}
                              >
                                Selected : (
                                {getUserCountDistrict(
                                  district,
                                  userCountByDistrict
                                )}
                                )
                              </Typography>
                            </span>
                          }
                        />
                        {selectedDistricts.includes(district) && (
                          <div style={{ marginLeft: 40 }}>
                            <FormGroup>
                              <Typography sx={{ fontWeight: "bolder" }}>
                                City
                              </Typography>
                              {MainCitiesData[district].sort().map((city) => (
                                <FormControlLabel
                                  key={city}
                                  control={
                                    <Checkbox
                                      checked={selectedCities.includes(city)}
                                      onChange={() => handleCityChange(city)}
                                    />
                                  }
                                  label={`${city} (${getUserCountCity(
                                    city,
                                    userCountByCity
                                  )})`}
                                />
                              ))}
                            </FormGroup>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default LocationComp;

// import React, { useState, useEffect } from "react";
// import {
//   FormControl,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Typography,
// } from "@mui/material";

// const provincesData = {
//   Northern: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
//   NorthWestern: ["Puttalam", "Kurunegala"],
//   Western: ["Colombo", "Gampaha", "Kalutara"],
//   NorthCentral: ["Anuradhapura", "Polonnaruwa"],
//   Central: ["Kandy", "Matale", "NuwaraEliya"],
//   Sabaragamuwa: ["Rathnapura", "Kegalle"],
//   Eastern: ["Ampara", "Batticaloa", "Trincomalee"],
//   Uva: ["Badulla", "Monaragala"],
//   Southern: ["Galle", "Matara", "Hambantota"],
// };

// const MainCitiesData = {
//   Colombo: [
//     "Bambalapitiya",
//     "Dehiwela",
//     "Fort",
//     "Attidiya",
//     "Union Place",
//     "Havelock",
//     "Rajagiriya",
//     "Maharagama",
//     "Moratuwa",
//     "Avissawella",
//     "Kotahena",
//     "Kottawa",
//     "Kotikawaththa",
//     "Athurugiriya",
//     "Piliyandala",
//     "Thalawathugoda",
//     "Kaduwela",
//     "Malabe",
//     "Nawala",
//     "Nugegoda",
//     "Pelawaththa",
//   ],
//   Gampaha: [
//     "Gampaha",
//     "Negambo",
//     "Ja-Ela",
//     "Kiribathgoda",
//     "Kadawatha",
//     "Yakkala",
//     "Wattala",
//   ],
//   Kalutara: ["Kalutara", "Beruwala", "Aluthgama", "Panadura"],
//   Kandy: ["Kandy", "Peradeniya", "Katugastota", "Gampola"],
//   NuwaraEliya: ["Nuwara Eliya"],
//   Matale: ["Matale"],
//   Kilinochchi: ["Kilinochchi"],
//   Jaffna: ["Jaffna"],
//   Mannar: ["Mannar"],
//   Mullaitivu: ["Mullaitivu"],
//   Vavuniya: ["Vavuniya"],
//   Puttalam: ["Puttalam", "Wennappuwa"],
//   Kurunegala: ["Kurunegala", "Kuliyapitiya"],
//   Anuradhapura: ["Anuradhapura"],
//   Polonnaruwa: ["Polonnaruwa"],
//   Ratnapura: ["Rathnapura", "Eheliyagoda"],
//   Kegalle: ["Kegalle"],
//   Ampara: ["Ampara"],
//   Batticaloa: ["Batticaloa"],
//   Trincomalee: ["Trincomalee"],
//   Badulla: ["Badulla"],
//   Monaragala: ["Monaragala"],
//   Galle: ["Galle", "Ambalangoda"],
//   Matara: ["Matara", "Akuressa"],
//   Hambantota: ["Hambantota"],
// };

// const LocationComp = ({
//   onSelectProvince,
//   onSelectDistrict,
//   onSelectCity,
//   userCountByProvince,
//   userCountByDistrict,
//   userCountByCity,
// }) => {
//   const [selectedProvinces, setSelectedProvinces] = useState([]);
//   const [selectedDistricts, setSelectedDistricts] = useState([]);
//   const [selectedCities, setSelectedCities] = useState([]);

//   useEffect(() => {
//   }, [userCountByProvince, userCountByDistrict, userCountByCity]);

//   const handleProvinceChange = (province) => {
//     const updatedProvinces = selectedProvinces.includes(province)
//       ? selectedProvinces.filter((p) => p !== province)
//       : [...selectedProvinces, province];

//     setSelectedProvinces(updatedProvinces);

//     const updatedDistricts = updatedProvinces.includes(province)
//       ? [...new Set([...selectedDistricts, ...provincesData[province]])]
//       : selectedDistricts.filter((d) => !provincesData[province].includes(d));

//     setSelectedDistricts(updatedDistricts);

//     const updatedCities = updatedDistricts.reduce(
//       (cities, district) =>
//         updatedDistricts.includes(district)
//           ? [...cities, ...MainCitiesData[district]]
//           : cities.filter((c) => !MainCitiesData[district].includes(c)),
//       []
//     );

//     setSelectedProvinces(updatedProvinces);
//     setSelectedDistricts(updatedDistricts);
//     setSelectedCities(updatedCities);

//     onSelectProvince(updatedProvinces);
//     onSelectDistrict(updatedDistricts);
//     onSelectCity(updatedCities);
//   };

//   const getUserCount = (location, userCounts, key) => {
//     if (userCounts) {
//       const countData = userCounts.find((count) => count[key] === location);
//       return countData ? countData.userCount : 0;

//     }console.log(countData)
//     return 0;
//   };

//   const handleDistrictChange = (district) => {
//     const updatedDistricts = selectedDistricts.includes(district)
//       ? selectedDistricts.filter((d) => d !== district)
//       : [...selectedDistricts, district];

//     setSelectedDistricts(updatedDistricts);

//     const updatedCities = Object.keys(MainCitiesData).reduce(
//       (cities, currentDistrict) =>
//         updatedDistricts.includes(currentDistrict)
//           ? [...cities, ...MainCitiesData[currentDistrict]]
//           : cities.filter((c) => !MainCitiesData[currentDistrict].includes(c)),
//       []
//     );

//     setSelectedCities(updatedCities);
//     onSelectDistrict(updatedDistricts);
//     onSelectCity(updatedCities);

//     const relatedProvince = Object.keys(provincesData).find((province) =>
//       provincesData[province].includes(district)
//     );
//     if (
//       relatedProvince &&
//       updatedDistricts.every((d) => !provincesData[relatedProvince].includes(d))
//     ) {
//       handleProvinceChange(relatedProvince);
//     }
//   };

//   const handleCityChange = (city) => {
//     const updatedCities = selectedCities.includes(city)
//       ? selectedCities.filter((c) => c !== city)
//       : [...selectedCities, city];

//     setSelectedCities(updatedCities);
//     onSelectCity(updatedCities);

//     const relatedDistrict = Object.keys(MainCitiesData).find((district) =>
//       MainCitiesData[district].includes(city)
//     );
//     if (
//       relatedDistrict &&
//       updatedCities.every((c) => !MainCitiesData[relatedDistrict].includes(c))
//     ) {
//       handleDistrictChange(relatedDistrict);
//     }
//   };
//   const getUserCountCity = (location, userCounts) => {
//     if (userCounts) {
//       const countData = userCounts.find((count) => count.City === location);
//       return countData ? countData.userCount : 0;
//     }
//     return 0;
//   };

//   return (
//     <div style={{ margin: "0 0 0 40px" }}>
//       <FormControl component="fieldset">
//         <FormGroup>
//           <Typography sx={{ fontWeight: "bolder" }}>Province</Typography>
//           {Object.keys(provincesData)
//             .sort()
//             .map((province) => (
//               <div key={province}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={selectedProvinces.includes(province)}
//                       onChange={() => handleProvinceChange(province)}
//                     />
//                   }
//                   label={province}
//                 />
//                 {selectedProvinces.includes(province) && (
//                   <div style={{ marginLeft: 40 }}>
//                     <Typography sx={{ fontWeight: "bolder" }}>
//                       District
//                     </Typography>
//                     {provincesData[province].sort().map((district) => (
//                       <div key={district}>
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               checked={selectedDistricts.includes(district)}
//                               onChange={() => handleDistrictChange(district)}
//                             />
//                           }
//                           label={
//                             <span>
//                               <span>{`${district} `}</span>
//                               <Typography
//                                 component="span"
//                                 sx={{
//                                   fontWeight: "bolder",
//                                   marginLeft: "15px",
//                                   color: "#585959",
//                                 }}
//                               >
//                                 Selected count: (
//                                 {getUserCount(
//                                   district,
//                                   userCountByDistrict,
//                                   'District'
//                                 )}
//                                 )
//                               </Typography>
//                             </span>
//                           }
//                         />
//                         {selectedDistricts.includes(district) && (
//                           <div style={{ marginLeft: 40 }}>
//                             <FormGroup>
//                               <Typography sx={{ fontWeight: "bolder" }}>
//                                 City
//                               </Typography>
//                               {MainCitiesData[district].sort().map((city) => (
//                                 <FormControlLabel
//                                   key={city}
//                                   control={
//                                     <Checkbox
//                                       checked={selectedCities.includes(city)}
//                                       onChange={() => handleCityChange(city)}
//                                     />
//                                   }
//                                   label={`${city} (${getUserCountCity(
//                                     city,
//                                     userCountByCity
//                                   )})`}
//                                 />
//                               ))}
//                             </FormGroup>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//         </FormGroup>
//       </FormControl>
//     </div>
//   );
// };

// export default LocationComp;
