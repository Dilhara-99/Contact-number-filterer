import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import LocationComp from "../Components/LocationComp";
import AgeSlider from "../Components/AgeSlider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import NavigationBar from "../Components/NavigationBar";
import MainSlider from "../Components/MainSlider";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import Restaurant from "../Components/Restaurant";
import Taxi from "../Components/Taxi";
import Supermarket from "../Components/Supermarket";
import Logistic from "../Components/Logistic";
import GenderComp from "../Components/GenderComp";
import Modal from "@mui/material/Modal";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import downloadCSV from "../utils/downloadCSV";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 730,
  height: 800,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 3,
};
const API_ENDPOINT = "http://localhost:3001";

const Home = () => {
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedAge, setSelectedAge] = useState([15, 60]);
  const [selectedGender, setSelectedGender] = useState("All");
  const [submittedUserList, setSubmittedUserList] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userCountByProvince, setUserCountByProvince] = useState(0);
  const [userCountByDistrict, setUserCountByDistrict] = useState(0);
  const [userCountByCity, setUserCountByCity] = useState(0);
  const [userCountByGender, setUserCountByGender] = useState(0);
  const [userCountByAge, setUserCountByAge] = useState("null");
  const [allUsersInSelectedProvince, setAllUsersInSelectedProvince] =
    useState(0);
  const [allUsersInSelectedDistrict, setAllUsersInSelectedDistrict] =
    useState(0);
  const [value, setValue] = React.useState([1, 0]);
  const [selectedDays, setSelectedDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const [selectedTime, setSelectedTime] = useState(["00:00:00", "23:59:00"]);
  const [amountOption, setAmountOption] = useState("");
  const [amountValues, setAmountValues] = useState([""]);
  const [selectedServiceProvider, setSelectedServiceProvider] = useState([]);
  const usersPerPage = 60;

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        API_ENDPOINT + "/userdata/filtered-data",
        {
          Province: selectedProvince,
          District: selectedDistrict,
          City: selectedCity,
          Age: selectedAge,
          Day_Name: selectedDays,
          Time: selectedTime,
          Gender: selectedGender,
          Service: selectedService,
          Amount: amountValues,
          AmountOption: amountOption,
          Service_Providers: selectedServiceProvider,
        }
      );

      setUserList(response.data.userList);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          API_ENDPOINT + "/userdata/filtered-data",
          {
            Province: selectedProvince,
            District: selectedDistrict,
            City: selectedCity,
            Age: selectedAge,
            Gender: selectedGender,
            Day_Name: selectedDays,
            Time: selectedTime,
            Service: selectedService,
            Amount: amountValues,
            AmountOption: amountOption,
            Service_Providers: selectedServiceProvider,
          }
        );
        setUserList(response.data.userList);
        setUserCount(response.data.userCount);
        setUserCountByCity(response.data.userCountByCity);
        setUserCountByDistrict(response.data.userCountByDistrict);
        setUserCountByProvince(response.data.userCountByProvince);
        setUserCountByGender(response.data.userCountByGender);
        setUserCountByAge(response.data.userCountByAge);
        setAllUsersInSelectedProvince(response.data.allUsersInSelectedProvince);
        setAllUsersInSelectedDistrict(response.data.allUsersInSelectedDistrict);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [
    selectedProvince,
    selectedDistrict,
    selectedCity,
    selectedAge,
    selectedGender,
    selectedService,
    selectedDays,
    selectedTime,
    amountOption,
    amountValues,
    selectedServiceProvider,
  ]);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleViewModalOpen = () => {
    setViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
  };

  const handleCancelModal = () => {
    setViewModalOpen(false);
  };

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage - 1;
  const displayedUsers = userList.slice(startIndex, endIndex + 1);

  const [filteredUsers, setFilteredUsers] = useState(displayedUsers);
  // console.log("page0", filteredUsers);
  const [viewFilteredUsers, setViewFilteredUsers] = useState(filteredUsers);
  // console.log("page", viewFilteredUsers);
  const handleFilter = (start, end) => {
    const newFilteredUsers = userList.slice(start - 1, end);

    setFilteredUsers(newFilteredUsers);
  };

  const handlePageChange = (event, value) => {
    const startIndex = (value - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const newFilteredUsers = filteredUsers.slice(startIndex, endIndex);

    setCurrentPage(value);
    setViewFilteredUsers(newFilteredUsers);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        API_ENDPOINT + "/userdata/filtered-data",
        {
          Province: selectedProvince,
          District: selectedDistrict,
          City: selectedCity,
          Age: selectedAge,
          Gender: selectedGender,
          Day_Name: selectedDays,
          Time: selectedTime,
          Amount: amountValues,
          AmountOption: amountOption,
          Service: selectedService,
          Service_Providers: selectedServiceProvider,
        },
        {
          params: { search: searchTerm },
        }
      );
      setUserCount(response.data.userCount);
      setUserList(response.data.userList);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    handleFilter(value[0], value[1]);
  }, [value]);

  const handleDownload = () => {
    const selectedFieldsLabels = {
      Province: "Province",
      District: "District",
      City: "City",
      Age: "Age",
      Day_Name: "Day",
      Time: "Time",
      Gender: "Gender",
      Service: "Service",
      Amount: "Amount",
      AmountOption: "Amount Option",
      Service_Providers: "Service Providers",
    };

    const selectedLabels = Object.keys(selectedFieldsLabels)
      .filter((field) => {
        return (
          selectedProvince.includes(field) ||
          selectedDistrict.includes(field) ||
          selectedCity.includes(field) ||
          selectedAge.includes(field) ||
          selectedDays.includes(field) ||
          selectedTime.includes(field) ||
          selectedGender.includes(field) ||
          selectedService === field ||
          amountValues.includes(field) ||
          amountOption === field ||
          selectedServiceProvider.includes(field)
        );
      })
      .map((field) => selectedFieldsLabels[field]);

    const columns = ["Contact_No", ...selectedLabels];

    downloadCSV({
      filename: "filtered_users.csv",
      columns,
      data: filteredUsers,
    });
    window.location.reload();
  };

  const renderSelectedComponent = () => {
    switch (selectedService) {
      case "Restaurant":
        return (
          <Restaurant
            setSelectedDays={setSelectedDays}
            setSelectedTime={setSelectedTime}
            amountOption={amountOption}
            setAmountOption={setAmountOption}
            amountValues={amountValues}
            setAmountValues={setAmountValues}
            selectedServiceProvider={selectedServiceProvider}
            setSelectedServiceProvider={setSelectedServiceProvider}
          />
        );
      case "Taxi":
        return (
          <Taxi
            setSelectedDays={setSelectedDays}
            selectedServiceProvider={selectedServiceProvider}
            setSelectedServiceProvider={setSelectedServiceProvider}
          />
        );
      case "Supermarket":
        return (
          <Supermarket
            setSelectedDays={setSelectedDays}
            setSelectedTime={setSelectedTime}
            amountOption={amountOption}
            setAmountOption={setAmountOption}
            amountValues={amountValues}
            setAmountValues={setAmountValues}
            selectedServiceProvider={selectedServiceProvider}
            setSelectedServiceProvider={setSelectedServiceProvider}
          />
        );
      case "Logistic":
        return (
          <Logistic
            setSelectedDays={setSelectedDays}
            setSelectedTime={setSelectedTime}
            amountOption={amountOption}
            setAmountOption={setAmountOption}
            amountValues={amountValues}
            setAmountValues={setAmountValues}
            selectedServiceProvider={selectedServiceProvider}
            setSelectedServiceProvider={setSelectedServiceProvider}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ marginBottom: "20px" }}>
        <NavigationBar />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: " 0 15px 15px 15px",
          backgroundColor: "#ebedf0",
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={6} sm={12} container spacing={2}>
            <Grid item md={12} xs={6}>
              <Item sx={{ borderRadius: "12px" }}>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "18px",
                      padding: "12px 12px 0 12px",
                    }}
                  >
                    Location
                  </Typography>
                  <Divider>Select Location</Divider>
                  <Box sx={{ height: "410px", overflowY: "scroll" }}>
                    <LocationComp
                      onSelectProvince={(province) =>
                        setSelectedProvince(province)
                      }
                      onSelectDistrict={(district) =>
                        setSelectedDistrict(district)
                      }
                      onSelectCity={(city) => setSelectedCity(city)}
                      userCountByProvince={userCountByProvince}
                      userCountByDistrict={userCountByDistrict}
                      userCountByCity={userCountByCity}
                      allUsersInSelectedDistrict={allUsersInSelectedDistrict}
                      allUsersInSelectedProvince={allUsersInSelectedProvince}
                    />
                  </Box>
                </Box>
              </Item>
            </Grid>

            <Grid item md={12} sm={6}>
              <Item sx={{ borderRadius: "12px" }}>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "18px",
                      padding: "0 12px 0 12px",
                    }}
                  >
                    Age
                  </Typography>
                  <Divider>Age Range</Divider>
                  <Box sx={{ marginLeft: "25px", padding: "0 20px 20px 20px" }}>
                    <AgeSlider
                      onSelectAge={(age) => setSelectedAge(age)}
                      userCountByAge={userCountByAge}
                    />
                  </Box>
                </Box>
              </Item>
            </Grid>
            <Grid item md={12} sm={6}>
              <Item sx={{ borderRadius: "12px" }}>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "18px",
                      padding: "0px 12px 0 12px",
                    }}
                  >
                    Gender
                  </Typography>
                  <Divider>Select Gender</Divider>
                  <GenderComp
                    onSelectGender={(gender) => setSelectedGender(gender)}
                    userCountByGender={userCountByGender}
                  />
                </Box>
              </Item>
            </Grid>
          </Grid>
          <Grid item md={6} sm={12} container spacing={2}>
            <Grid item md={12} sm={6}>
              <Item sx={{ borderRadius: "12px" }}>
                <Grid container>
                  <Grid item xs={3}>
                    <Typography
                      sx={{
                        fontWeight: "light",
                        color: "black",
                        fontSize: "18px",
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      User Count :
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      sx={{
                        fontWeight: "light",
                        color: "#06398c",
                        fontSize: "30px",
                        textAlign: "center",
                        padding: "10px",
                      }}
                    >
                      {userCount}
                    </Typography>
                  </Grid>
                </Grid>
              </Item>
              <Item sx={{ marginTop: "18px", borderRadius: "12px" }}>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "18px",
                      padding: "12px 12px 0 12px",
                    }}
                  >
                    Services
                  </Typography>
                  <Divider>Select Service</Divider>
                  <Box
                    sx={{
                      marginLeft: "23px",
                      marginTop: "15px",
                      height: "130px",
                      overflowY: "scroll",
                    }}
                  >
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={selectedService}
                        onChange={handleServiceChange}
                      >
                        <Grid container>
                          <Grid item xs={4}>
                            <Grid container>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="Restaurant"
                                  control={<Radio />}
                                  label="Restaurant"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="Taxi"
                                  control={<Radio />}
                                  label="Taxi"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="Supermarket"
                                  control={<Radio />}
                                  label="Supermarket"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={4}>
                            <Grid container>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="Logistic"
                                  control={<Radio />}
                                  label="Logistic"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="Education"
                                  control={<Radio />}
                                  label="Education"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="Other"
                                  control={<Radio />}
                                  label="Other"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={4}>
                            <Grid container>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="1111"
                                  control={<Radio />}
                                  label="1111"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="2222"
                                  control={<Radio />}
                                  label="2222"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <FormControlLabel
                                  value="3333"
                                  control={<Radio />}
                                  label="3333"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
              </Item>
              <Item
                sx={{
                  marginTop: "18px",
                  borderRadius: "12px",
                  height: "625px",
                }}
              >
                {selectedService ? (
                  renderSelectedComponent()
                ) : (
                  <Typography
                    sx={{
                      fontWeight: "light",
                      color: "#8f8e8d",
                      fontSize: "18px",
                      textAlign: "center",
                      marginTop: "120px",
                    }}
                  >
                    Please select a service
                  </Typography>
                )}
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item
              sx={{
                borderRadius: "12px",
                height: "60px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button
                variant="contained"
                style={{ width: "20%", alignContent: "center" }}
                onClick={handleSubmit}
              >
                Get Data
              </Button>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item sx={{ borderRadius: "12px" }}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: "18px",
                    padding: "12px 12px 0 12px",
                  }}
                >
                  Filtered Users
                </Typography>
                <Divider>User Count</Divider>
                <Grid container>
                  <Grid item xs={8}>
                    <MainSlider
                      userCount={userCount}
                      value={value}
                      setValue={setValue}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container>
                      <Grid item={6}>
                        <Box style={{ margin: "45px 0 0 25px" }}>
                          <Button
                            variant="contained"
                            startIcon={<VisibilityIcon />}
                            onClick={() =>
                              handleViewModalOpen(submittedUserList)
                            }
                          >
                            View
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item={6}>
                        <Box style={{ margin: "45px 0 0 25px" }}>
                          <Button
                            variant="contained"
                            startIcon={<DownloadForOfflineIcon />}
                            onClick={handleDownload}
                          >
                            Download
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                    <Modal
                      open={viewModalOpen}
                      onClose={handleViewModalClose}
                      aria-labelledby="view-modal"
                      aria-describedby="modal-view-description"
                    >
                      <Grid container>
                        <Box sx={style}>
                          <Grid item xs={12}>
                            <Box>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                textAlign="center"
                                paddingBottom="30px"
                              >
                                Filtered Users
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box
                              sx={{
                                height: "570px",
                                padding: "10px",
                              }}
                            >
                              <Grid container>
                                <Grid item xs={6}>
                                  <TextField
                                    label="Search"
                                    variant="outlined"
                                    value={searchTerm}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <Button
                                            variant="contained"
                                            onClick={handleSearch}
                                          >
                                            Search
                                          </Button>
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}>
                                  <Typography
                                    sx={{
                                      fontWeight: "bold",
                                      fontSize: "30px",
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {/* {userCount} */}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginTop: "15px",
                                }}
                              >
                                {[0, 1, 2].map((column) => (
                                  <Box
                                    key={column}
                                    sx={{
                                      flex: 1,
                                      padding: "10px",
                                      boxSizing: "border-box",
                                    }}
                                  >
                                    {viewFilteredUsers
                                      .slice(
                                        column * (usersPerPage / 3),
                                        (column + 1) * (usersPerPage / 3)
                                      )
                                      .map((user) => (
                                        <div
                                          key={user.id}
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          {user.Contact_No}
                                        </div>
                                      ))}
                                    {viewFilteredUsers.length === 0 && (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          marginTop: "10px",
                                        }}
                                      >
                                        No users here.
                                      </div>
                                    )}
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box sx={{ padding: "20px" }}>
                              <Pagination
                                count={Math.ceil(
                                  filteredUsers.length / usersPerPage
                                )}
                                page={currentPage}
                                onChange={handlePageChange}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              />
                            </Box>
                            <Box
                              sx={{
                                margin: "5px 5px 5px 5px",
                                textAlign: "right",
                              }}
                            >
                              <Button
                                variant="contained"
                                onClick={handleCancelModal}
                              >
                                Cancel
                              </Button>
                            </Box>
                          </Grid>
                        </Box>
                      </Grid>
                    </Modal>
                  </Grid>
                </Grid>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
