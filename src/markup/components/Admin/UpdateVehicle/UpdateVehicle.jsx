import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import {
updateVehicle,
  getVehicleByVehicleId,
} from "../../../../services/vehicle.service";

function UpdateVehicle({ vehicleId }) {
const navigate = useNavigate()
  const [singleCustomer, setSingleCustomer] = useState(null);
  const [apiError, setApiError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState("");
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [vehicleInfo, setVehicleInfo] = useState({
    vehicle_year: '',
    vehicle_make: "",
    vehicle_model: "",
    vehicle_type: "",
    vehicle_mileage: "",
    vehicle_tag: "",
    vehicle_serial: "",
    vehicle_color: "",
  });

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
console.log(vehicleInfo);
useEffect(() => {
  const fetchData = async () => {
    try {
      const vehiclesResponse = await getVehicleByVehicleId(
        vehicleId,
        token
      );
      console.log(vehiclesResponse);
      if (!vehiclesResponse.ok) {
        throw new Error("Failed to fetch vehicles");
      }
      const vehicleData = await vehiclesResponse.json();
      if (vehicleData && vehicleData.length > 0) {
        const fetchedVehicle = vehicleData[0];
        setVehicle(fetchedVehicle);
        setVehicleInfo({
          ...vehicleInfo,
          vehicle_year: fetchedVehicle.vehicle_year,
          vehicle_make: fetchedVehicle.vehicle_make,
          vehicle_model: fetchedVehicle.vehicle_model,
          vehicle_type: fetchedVehicle.vehicle_type,
          vehicle_mileage: fetchedVehicle.vehicle_mileage,
          vehicle_tag: fetchedVehicle.vehicle_tag,
          vehicle_serial: fetchedVehicle.vehicle_serial,
          vehicle_color: fetchedVehicle.vehicle_color,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data.");
      setApiError(true);
      if (error.response && error.response.status === 401) {
        setApiErrorMessage("Please login again");
      } else if (error.response && error.response.status === 403) {
        setApiErrorMessage("You are not authorized to view this page");
      } else {
        setApiErrorMessage("Please try again later");
      }
    }
  };

  fetchData();
}, [vehicleId, token]);


const handleSubmit = async (e) => {
  e.preventDefault();

  const updatedVehicleInfo = { ...vehicleInfo }; // Create a copy of vehicleInfo

  try {
    // Pass the form data to the service
    const response = await updateVehicle(
      vehicleId,
      updatedVehicleInfo,
      token
    );

    if (!response.ok) {
      throw new Error("Failed to update vehicle");
    }

    // Handle successful response
    setSuccess(true);
    setServerError("");
    toast.success("Vehicle updated successfully");
    navigate("/admin/customers");
  } catch (error) {
    console.error(error);
    const resMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
      toast.error(resMessage);
    setServerError(resMessage);
  }
};


console.log(vehicle);
  return (
    <div className="form-Wrapper">
      <div className="new-form-wrapper">
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <h3>
              {vehicle?.vehicle_make + " "} {vehicle?.vehicle_model}
            </h3>
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="number"
                        name="vehicle_year"
                        value={vehicleInfo?.vehicle_year}
                        onChange={(event) =>
                          setVehicleInfo({
                            ...vehicleInfo,
                            vehicle_year: event.target.value,
                          })
                        }
                        placeholder="Year"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_make"
                        value={vehicleInfo?.vehicle_make}
                        onChange={(event) =>
                          setVehicleInfo({
                            ...vehicleInfo,
                            vehicle_make: event.target.value,
                          })
                        }
                        placeholder="Make"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_model"
                        value={vehicleInfo.vehicle_model}
                        onChange={(event) =>
                          setVehicleInfo({
                            ...vehicleInfo,
                            vehicle_model: event.target.value,
                          })
                        }
                        placeholder="Model"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_type"
                        value={vehicleInfo.vehicle_type}
                        onChange={(event) =>
                          setVehicleInfo({
                            ...vehicleInfo,
                            vehicle_type: event.target.value,
                          })
                        }
                        placeholder="Type"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="number"
                        name="vehicle_mileage"
                        value={vehicleInfo.vehicle_mileage}
                        onChange={(event) =>
                          setVehicleInfo({
                            ...vehicleInfo,
                            vehicle_mileage: event.target.value,
                          })
                        }
                        placeholder="Mileage"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_tag"
                        value={vehicleInfo.vehicle_tag}
                        onChange={(event) =>
                          setVehicleInfo({
                            ...vehicleInfo,
                            vehicle_tag: event.target.value,
                          })
                        }
                        placeholder="Tag"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_serial"
                        value={vehicleInfo.vehicle_serial}
                        onChange={(event) =>
                          setVehicleInfo({
                            ...vehicleInfo,
                            vehicle_serial: event.target.value,
                          })
                        }
                        placeholder="VIN"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_color"
                        value={vehicleInfo.vehicle_color}
                        onChange={(event) =>
                          setVehicleInfo({
                            ...vehicleInfo,
                            vehicle_color: event.target.value,
                          })
                        }
                        placeholder="Color"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Update Vehicle</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateVehicle;
