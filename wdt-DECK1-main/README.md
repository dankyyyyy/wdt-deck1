# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# Using pythonAPI for acessing the CSD API:

1. Login to CDS (or Login to ADS)
2. Copy a 2 line code, which shows a url and your own uid:API key details like this:
```bash
url: https://cds.climate.copernicus.eu/api/v2
key: <api_key>
```
  - For CDS users, Go to this page and copy the 2 line code displayed in the black box in the "Install the CDS API key" section.
3. Paste the 2 line code into a ".cdsapirc" file, where in your windows environment, %USERPROFILE% is usually located at C:\Users\Username folder). The CDS API expects to find the .cdsapirc file in your home directory.
  - For instructions on how to create a dot file on Windows, please see here or check the instructions provided by one of users on the User Forum.

4. Install the CDS API client by running the following command in a Command Prompt window:

```bash
pip3 install cdsapi # for Python 3
pip3 install flask
```

5. Once the CDS API client is installed, it can be used to request data from the datasets listed in the CDS and ADS catalogues. It is necessary to agree to the Terms of Use of every datasets that you intend to download. Attached to each dataset download form, the "Show API request" button displays the python code to be used.

