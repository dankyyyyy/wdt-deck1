# url: https://cds.climate.copernicus.eu/api/v2
# key: 194760:1d68b23e-3621-4c23-b31a-bbb20a26e263

import cdsapi
import pupygrib
import json
import math
import os

c = cdsapi.Client(url="https://cds.climate.copernicus.eu/api/v2",
                  key="194760:1d68b23e-3621-4c23-b31a-bbb20a26e263")

def retrieve(c1, c2, c3, c4, name, year):
    previousYear = int(year)-1
    name = name + year + "-" + str(previousYear) + ".grib"
    years = [ year, str(previousYear) ]
    variables = [
        '100m_u_component_of_wind', '100m_v_component_of_wind', 'significant_height_of_combined_wind_waves_and_swell', 'total_cloud_cover'
    ]
    try:
        response = c.retrieve(
            'reanalysis-era5-single-levels',
            {
                'product_type': 'reanalysis',
                'format': 'grib',
                'day': [
                    '01', 
                    # '02', '03',
                    # '04', '05', '06',
                    # '07', '08', '09',
                    # '10', '11', '12',
                    # '13', '14', '15',
                    # '16', '17', '18',
                    # '19', '20', '21',
                    # '22', '23', '24',
                    # '25', '26', '27',
                    # '28', '29', '30',
                    # '31',
                ],
                'time': [
                    '00:00', 
                    # '01:00', '02:00',
                    # '03:00', '04:00', '05:00',
                    # '06:00', '07:00', '08:00',
                    # '09:00', '10:00', '11:00',
                    # '12:00', '13:00', '14:00',
                    # '15:00', '16:00', '17:00',
                    # '18:00', '19:00', '20:00',
                    # '21:00', '22:00', '23:00',
                ],
                'area': [
                    c1, c2, c3, c4
                ],
                'month': [
                    '01', 
                    # '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
                ],
                'year': years,
                'variable': variables
            }, name)

        if not response.error:
            print("Data succesfully fetched")
        else:
            print(response.error)

        jsonData = []

        with open('./' + name, 'rb') as stream:
            j = 0
            for i, msg in enumerate(pupygrib.read(stream), 1):
                lons, lats = msg.get_coordinates()
                time = msg.get_time()
                values = msg.get_values()
                variable_name = variables[j]
                j += 1
                # print("Message {}: {} {} - {:.3f} {}".format(i, time, variable_name, values.mean(), lons.shape))

                # Collect the required data
                year = time.year
                month = time.month
                day = time.day
                hour = time.hour
                if variable_name == "significant_height_of_combined_wind_waves_and_swell":
                    waveHeight = round(values.mean(), 3)
                if variable_name == "100m_u_component_of_wind":
                    windU = round(values.mean(), 3)
                    # print(year," ",month," ",day," ",hour)
                    # print("wind component U: ",windU)
                if variable_name == "100m_v_component_of_wind":
                    windV = round(values.mean(), 3)
                    # print("wind component V: ",windV)
                    # print("Calculated wind speed: ", round(math.sqrt(windU**2 + windV**2), 3))
                if variable_name == "total_cloud_cover":
                    cloudbase = round(values.mean(), 3)

                if j == len(variables):
                    j = 0
                    # Calculate windspeed from the wind components through: windspeed = sqrt(u^2 + v^2).
                    windspeed = round(math.sqrt(windU**2 + windV**2), 3)
                    # Create a dictionary for the current message's data
                    message_data = {
                        "Year": year,
                        "Month": month,
                        "Day": day,
                        "Hour": hour,
                        "Wave height": waveHeight,
                        "Wind speed": windspeed,
                        "Cloud base": cloudbase
                    }
                    # Add the message data to the list
                    jsonData.append(message_data)

        #--------------------------------------------Write json to static folder OLD SOLUTION
        # # Specify the folder name
        # folder_name = "static"

        # # Ensure the folder exists, create it if not
        # if not os.path.exists(folder_name):
        #     os.makedirs(folder_name)

        # # Construct the output filename with the folder path
        # output_filename = os.path.join(
        #     folder_name, name.replace(".grib", ".json"))

        # # Write the collected data to the JSON file in the "static" folder
        # with open(output_filename, 'w') as json_file:
        #     json.dump(data_list, json_file, indent=4)

        # print(f'Data written to {output_filename}')
        #--------------------------------------------

        if os.path.exists(name):
            os.remove(name)
            print(f"File '{name}' deleted successfully.")
        else:
            print(f"File '{name}' does not exist.")

        return jsonData, 200

    except Exception as e:
        return "NOT OK :(", 400


def deleteJson(name):
    folder_name = "static"
    file_path = os.path.join(folder_name, name)

    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"File '{name}' deleted successfully.")
    else:
        print(f"File '{name}' does not exist.")
