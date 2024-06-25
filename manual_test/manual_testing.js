const axios = require('axios');

const BASE_URL = 'http://localhost:3000'; // Replace with your API's base URL

// Helper function to measure time taken by an async function
async function measureTime(fn) {
  const start = process.hrtime();
  await fn();
  const end = process.hrtime(start);
  const timeInSeconds = end[0] + end[1] / 1e9;
  return timeInSeconds;
}

// Function to add companies
async function addCompanies(numCompanies, parentCompanyId = null) {
  for (let i = 1; i <= numCompanies; i++) {
    const companyData = {
      name: `Company ${parentCompanyId}_${i}`,
      parent_company: parentCompanyId, // Adjust if you have parent companies
    };

    try {
      await axios.post(`${BASE_URL}/company`, companyData);
      console.log(`Company ${parentCompanyId}_${i} created.`);
    } catch (error) {
      console.error(
        `Error creating Company ${parentCompanyId}_${i}:`,
        error.message,
      );
    }
  }
}

// Function to add stations
async function addStations(numStations, companyIds) {
  for (let i = 1; i <= numStations; i++) {
    const key = Math.floor(Math.random() * companyIds.length);
    const stationData = {
      name: `Station ${i}`,
      company: companyIds[key],
      latitude: Math.random() * 180 - 90,
      longitude: Math.random() * 360 - 180,
      address: `Address ${i}`,
      status: 'active',
    };

    try {
      await axios.post(`${BASE_URL}/station`, stationData);
      console.log(`Station ${i} created.`);
    } catch (error) {
      console.error(`Error creating Station ${i}:`, error.message);
    }
  }
}

// Function to search stations and measure time taken
async function searchStations(
  companyId = 504,
  lat,
  long,
  radius,
  searchEndpoint = 'search',
) {
  try {
    const timeTaken = await measureTime(async () => {
      const response = await axios.get(
        `${BASE_URL}/station/${searchEndpoint}`,
        {
          params: { company_id: companyId, lat, long, distance: radius },
        },
      );
      //   console.log('Search results:', response.data);
    });

    console.log(`Search completed in ${timeTaken.toFixed(3)} seconds.`);
  } catch (error) {
    console.error('Error during search:', error.message);
  }
}

// Main function to run the script
async function runTest() {
  const numCompanies = 5;

  console.log('Adding parent companies...');
  await addCompanies(numCompanies);

  // Retrieve company IDs
  const companiesResponse = await axios.get(`${BASE_URL}/company`);
  const companyIds = companiesResponse.data.map((company) => company.id);

  console.log('Adding child companies...');
  for (let i = 1; i <= companyIds.length; i++) {
    await addCompanies(numCompanies, companyIds[i - 1]);
  }

  // Retrieve company IDs
  const companiesResponse2 = await axios.get(`${BASE_URL}/company`);
  const companyIds2 = companiesResponse.data.map((company) => company.id);

  console.log('Adding child companies...');
  for (let i = 1; i <= companyIds2.length; i++) {
    await addCompanies(numCompanies, companyIds2[i - 1]);
  }

  const companiesResponse3 = await axios.get(`${BASE_URL}/company`);
  const companyIds3 = companiesResponse.data.map((company) => company.id);

  console.log('Adding child companies...');
  for (let i = 1; i <= companyIds3.length; i++) {
    await addCompanies(numCompanies, companyIds3[i - 1]);
  }

  //   console.log('Adding stations...');
  //   await addStations(numStations, companyIds);

  //   console.log('Searching stations...');
  //   await searchStations();
}

async function runPopulateStations() {
  const numStations = 3000;

  const companiesResponse = await axios.get(`${BASE_URL}/company`);
  const companyIds = companiesResponse.data.map((company) => company.id);

  console.log('Adding stations...');
  await addStations(numStations, companyIds);
}

async function runSearchTest() {
  console.log('Searching stations in DB...');
  await searchStations(545, 37.774929, 26.419418, 10000);

  console.log('Searching stations in Typesense...');
  await searchStations(545, 37.774929, 26.419418, 10000, 'search-typesense');
}

// Run the main function

// runTest().catch((error) => {
//     console.error('Error running test script:', error.message);
//   });

// runPopulateStations().catch((error) => {
//     console.error('Error running test script:', error.message);
//   });

// runSearchTest().catch((error) => {
//   console.error('Error running test script:', error.message);
// });
