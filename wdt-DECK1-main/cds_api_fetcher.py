import cdsapi
import pupygrib
import json
import math
import os
import dotenv

dotenv.load_dotenv()
API_URL = os.getenv("API_URL")
API_KEY = os.getenv("API_KEY")



c = cdsapi.Client(url=API_URL, key=API_KEY)

DAYS = [str(i).zfill(2) for i in range(1, 32)]
TIMES = [f"{i:02d}:00" for i in range(24)]
MONTHS = [str(i).zfill(2) for i in range(1, 13)]

VARIABLES = [
    "100m_u_component_of_wind",
    "100m_v_component_of_wind",
    "significant_height_of_combined_wind_waves_and_swell",
    "total_cloud_cover",
    "cloud_base_height",
]

def retrieve(c1, c2, c3, c4, name, year):
    name = name + str(year) + ".grib"
    try:
        response = c.retrieve(
            'reanalysis-era5-single-levels',
            {
                'product_type': 'reanalysis',
                'format': 'grib',
                'day': DAYS,
                'time': TIMES,
                'area': [c1, c2, c3, c4],
                'month': MONTHS,
                'year': year,
                'variable': VARIABLES
            }, name)

        jsonData = []

        with open('./' + name, 'rb') as stream:
            j = 0
            for i, msg in enumerate(pupygrib.read(stream), 1):
                lons, lats = msg.get_coordinates()
                time = msg.get_time()
                values = msg.get_values()
                variable_name = VARIABLES[j]
                j += 1

                year = time.year
                month = time.month
                day = time.day
                hour = time.hour
                if variable_name == "significant_height_of_combined_wind_waves_and_swell":
                    waveHeight = round(values.mean(), 3)
                if variable_name == "100m_u_component_of_wind":
                    windU = round(values.mean(), 3)
                if variable_name == "100m_v_component_of_wind":
                    windV = round(values.mean(), 3)
                if variable_name == "total_cloud_cover":
                    cloudbase = round(values.mean(), 3)
                if variable_name == "cloud_base_height":
                    visibility = values

                if j == len(VARIABLES):
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
                        "Visibility": visibility,
                        "Cloud base": cloudbase
                    }
                    # Add the message data to the list
                    jsonData.append(message_data)
                    jsonDatas = json.dumps(jsonData, indent=2)
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

        return jsonDatas, 200

    except Exception as e:
        print(str(e))
        return f"Data processing error at {name}, error: {response.error}"


def deleteJson(name):
    folder_name = "static"
    file_path = os.path.join(folder_name, name)

    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"File '{name}' deleted successfully.")
    else:
        print(f"File '{name}' does not exist.")
