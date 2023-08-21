# url: https://cds.climate.copernicus.eu/api/v2
# key: 194760:1d68b23e-3621-4c23-b31a-bbb20a26e263

import cdsapi, json

c = cdsapi.Client()

def retrieve(c1, c2, c3, c4, name):
    name = name + ".nc"
    try:
        result = c.retrieve(
            'reanalysis-era5-single-levels',
            {
                'product_type': 'reanalysis',
                'format': 'netcdf',
                'day': [
                    '01', '02', '03',
                    '04', '05', '06',
                    '07', '08', '09',
                    '10', '11', '12',
                    '13', '14', '15',
                    '16', '17', '18',
                    '19', '20', '21',
                    '22', '23', '24',
                    '25', '26', '27',
                    '28', '29', '30',
                    '31',
                ],
                'time': [
                    '00:00', '01:00', '02:00',
                    '03:00', '04:00', '05:00',
                    '06:00', '07:00', '08:00',
                    '09:00', '10:00', '11:00',
                    '12:00', '13:00', '14:00',
                    '15:00', '16:00', '17:00',
                    '18:00', '19:00', '20:00',
                    '21:00', '22:00', '23:00',
                ],
                'area': [
                    c1, c2, c3, c4
                ],
                'month': [
                    '01', 
                ],
                'year': [
                    '2023'
                ],
                'variable': [
                    '100m_u_component_of_wind', '100m_v_component_of_wind', 'cloud_base_height',
                    'significant_height_of_combined_wind_waves_and_swell', 'total_cloud_cover',
                ]
            }, name)
        return "OK", 200

    except Exception as e:
        return "NOT OK :(", 400