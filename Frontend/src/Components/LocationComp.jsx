import React, { useState } from "react";
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
  Sabaragamuwa: ["Ratnapura", "Kegalle"],
  Eastern: ["Ampara", "Batticaloa", "Trincomalee"],
  Uva: ["Badulla", "Monaragala"],
  Southern: ["Galle", "Matara", "Hambantota"],
};

const MainCitiesData = {
  Colombo: [
    "Bambalapitiya",
    "Dehiwala",
    "Fort",
    "Attidiya",
    "Union Place",
    "Havelock",
    "Rajagiriya",
    "Maharagama",
    "Panadura",
    "Moratuwa",
    "Avissawella",
    "Kotahena",
    "Kottawa",
    "Kotikawaththa",
    "Athurugiriya",
    "piliyandala",
    "Thalawathugoda",
    "Kaduwela",
    "Malabe",
    "Nawala",
    "Nugegoda",
    "Pelawatta",
  ],
  Gampaha: ["Gampaha", "Negambo", "Ja-Ela", "Kiribathgoda", "Kadawatha","yakkala","Wattala"],
  Kalutara: ["Kalutara", "Beruwala", "Aluthgama", "Panadura"],
  Kandy: ["Kandy City", "Peradeniya", "Katugastota","Gampola"],
  NuwaraEliya: ["Nuwara Eliya"],
  Matale: ["Matale"],
  Kilinochchi: ["Kilinochchi"],
  Jaffna: ["Jaffna"],
  Mannar: ["Mannar"],
  Mullaitivu: ["Mullaitivu"],
  Vavuniya: ["Vavuniya"],
  Puttalam: ["Puttalam","Kurunegala"],
  Kurunegala: ["Kurunegala", "Kuliyapitiya"],
  Anuradhapura: ["Anuradhapura"],
  Polonnaruwa: ["Polonnaruwa"],
  Ratnapura: ["Ratnapura", "Eheliyagoda"],
  Kegalle: ["Kegalle"],
  Ampara: ["Ampara"],
  Batticaloa: ["Batticaloa"],
  Trincomalee: ["Trincomalee"],
  Badulla: ["Badulla"],
  Monaragala: ["Monaragala"],
  Galle: ["Galle", "Ambalangoda"],
  Matara: ["Matara", "Akuressa"],
  Hambantota: ["Hambantota", ""],
};

const MultiLevelCheckbox = () => {
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

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

    setSelectedCities(updatedCities);
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
  };

  const handleCityChange = (city) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];

    setSelectedCities(updatedCities);
  };

  return (
    <div style={{ margin: "0 0 0 40px" }}>
      <FormControl component="fieldset">
        <FormGroup>
          <Typography sx={{ fontWeight: "bolder" }}>Province</Typography>
          {Object.keys(provincesData).map((province) => (
            <div key={province}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedProvinces.includes(province)}
                    onChange={() => handleProvinceChange(province)}
                  />
                }
                label={province}
              />
              {selectedProvinces.includes(province) && (
                <div style={{ marginLeft: 40 }}>
                  <Typography sx={{ fontWeight: "bolder" }}>
                    District
                  </Typography>
                  {provincesData[province].map((district) => (
                    <div key={district}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDistricts.includes(district)}
                            onChange={() => handleDistrictChange(district)}
                          />
                        }
                        label={district}
                      />
                      {selectedDistricts.includes(district) && (
                        <div style={{ marginLeft: 40 }}>
                          <FormGroup>
                            <Typography sx={{ fontWeight: "bolder" }}>
                              City
                            </Typography>
                            {MainCitiesData[district].map((city) => (
                              <FormControlLabel
                                key={city}
                                control={
                                  <Checkbox
                                    checked={selectedCities.includes(city)}
                                    onChange={() => handleCityChange(city)}
                                  />
                                }
                                label={city}
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

export default MultiLevelCheckbox;

// import React, { useState } from "react";
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
//   Sabaragamuwa: ["Ratnapura", "Kegalle"],
//   Eastern: ["Ampara", "Batticaloa", "Trincomalee"],
//   Uva: ["Badulla", "Monaragala"],
//   Southern: ["Galle", "Matara", "Hambantota"],
// };

// const MainCitiesData = {
//   Colombo: [
//     "Bambalapitiya",
//     "Dehiwala",
//     "Fort",
//     "Mount Lavinia",
//     "Union Place",
//     "havelock",
//     "Rajagiriya",
//     "Maharagama",
//   ],
//   Gampaha: ["Gampaha", "Negombo", "Kelaniya", "Minuwangoda", "Kadawatha"],
//   Kalutara: ["Kalutara", "Beruwala", "Aluthgama", "Panadura"],
//   Kandy: ["Kandy City", "Peradeniya", "Katugastota"],
//   NuwaraEliya: ["Nuwara Eliya"],
//   Matale: ["matale"],
//   Kilinochchi: ["Kilinochchi"],
//   Jaffna: ["Jaffna"],
//   Mannar: ["Mannar"],
//   Mullaitivu: ["Mullaitivu"],
//   Vavuniya: ["Vavuniya"],
//   Puttalam: ["Puttalam"],
//   Kurunegala: ["Kurunegala", "Kuliyapitiya"],
//   Anuradhapura: ["Anuradhapura"],
//   Polonnaruwa: ["Polonnaruwa"],
//   Ratnapura: ["Ratnapura", "Eheliyagoda"],
//   Kegalle: ["Kegalle"],
//   Ampara: ["Ampara"],
//   Batticaloa: ["Batticaloa"],
//   Trincomalee: ["Trincomalee"],
//   Badulla: ["Badulla"],
//   Monaragala: ["Monaragala"],
//   Galle: ["Galle", "Ambalangoda"],
//   Matara: ["Matara", "Akuressa"],
//   Hambantota: ["Hambantota", ""],
// };

// const MultiLevelCheckbox = () => {
//   const [selectedProvinces, setSelectedProvinces] = useState([]);
//   const [selectedDistricts, setSelectedDistricts] = useState({});
//   const [selectedCities, setSelectedCities] = useState([]);

//   const handleProvinceChange = (province) => {
//     const updatedProvinces = selectedProvinces.includes(province)
//       ? selectedProvinces.filter((p) => p !== province)
//       : [...selectedProvinces, province];

//     setSelectedProvinces(updatedProvinces);

//     const updatedDistricts = updatedProvinces.includes(province)
//       ? { ...selectedDistricts, [province]: provincesData[province] }
//       : { ...selectedDistricts };

//     setSelectedDistricts(updatedDistricts);

//     const updatedCities = Object.values(updatedDistricts).reduce(
//       (cities, districts) =>
//         districts.reduce(
//           (cityList, district) =>
//             updatedDistricts[province].includes(district)
//               ? [...cityList, ...MainCitiesData[district]]
//               : cityList.filter((c) => !MainCitiesData[district].includes(c)),
//           cities
//         ),
//       []
//     );

//     setSelectedCities(updatedCities);
//   };

//   const handleDistrictChange = (province, district) => {
//     const updatedDistricts = { ...selectedDistricts };

//     if (!updatedDistricts[province]) {
//       updatedDistricts[province] = [];
//     }

//     const index = updatedDistricts[province].indexOf(district);

//     if (index !== -1) {
//       updatedDistricts[province].splice(index, 1);
//     } else {
//       updatedDistricts[province].push(district);
//     }

//     setSelectedDistricts(updatedDistricts);

//     const updatedCities = Object.values(updatedDistricts).reduce(
//       (cities, districts) =>
//         districts.reduce(
//           (cityList, district) =>
//             updatedDistricts[province].includes(district)
//               ? [...cityList, ...MainCitiesData[district]]
//               : cityList.filter((c) => !MainCitiesData[district].includes(c)),
//           cities
//         ),
//       []
//     );

//     setSelectedCities(updatedCities);
//   };

//   const handleCityChange = (city) => {
//     const updatedCities = selectedCities.includes(city)
//       ? selectedCities.filter((c) => c !== city)
//       : [...selectedCities, city];

//     setSelectedCities(updatedCities);
//   };

//   return (
//     <div style={{ margin: "0 0 0 40px" }}>
//       <FormControl component="fieldset">
//         <FormGroup>
//           <Typography sx={{ fontWeight: "bolder" }}>Province</Typography>
//           {Object.keys(provincesData).map((province) => (
//             <div key={province}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={selectedProvinces.includes(province)}
//                     onChange={() => handleProvinceChange(province)}
//                   />
//                 }
//                 label={province}
//               />
//               {selectedProvinces.includes(province) && (
//                 <div style={{ marginLeft: 20 }}>
//                   <Typography sx={{ fontWeight: "bolder" }}>
//                     District
//                   </Typography>
//                   {provincesData[province].map((district) => (
//                     <div key={district}>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             checked={selectedDistricts[province]?.includes(
//                               district
//                             )}
//                             onChange={() =>
//                               handleDistrictChange(province, district)
//                             }
//                           />
//                         }
//                         label={district}
//                       />
//                       {selectedDistricts[province]?.includes(district) && (
//                         <div style={{ marginLeft: 20 }}>
//                           <FormGroup>
//                             <Typography sx={{ fontWeight: "bolder" }}>
//                               City
//                             </Typography>
//                             {MainCitiesData[district].map((city) => (
//                               <FormControlLabel
//                                 key={city}
//                                 control={
//                                   <Checkbox
//                                     checked={selectedCities.includes(city)}
//                                     onChange={() => handleCityChange(city)}
//                                   />
//                                 }
//                                 label={city}
//                               />
//                             ))}
//                           </FormGroup>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </FormGroup>
//       </FormControl>
//     </div>
//   );
// };

// export default MultiLevelCheckbox;
