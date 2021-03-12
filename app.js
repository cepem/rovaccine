const cron = require("node-cron");
const fetch = require("node-fetch");
const notifier = require("node-notifier");

const PROFILE_DATA = {
  cookie:
    "",
  countyID: 35,
  localityID: "",
  identificationCode: "",
  masterPersonnelCategoryID: -4,
  personnelCategoryID: 32,
  recipientID: "",
};

// Available types are the following:
// 1: Pfizer-BioNTech
// 2: Moderna
// 3: AstraZeneca
const VACCINE_TYPE = 3;

const getVaccineSlotsData = () => {
  return new Promise((resolve, reject) => {
    fetch(
      "https://programare.vaccinare-covid.gov.ro/scheduling/api/centres?page=0&size=10&sort=,",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "sec-ch-ua":
            '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          cookie: PROFILE_DATA.cookie,
        },
        referrer: "https://programare.vaccinare-covid.gov.ro/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `{"countyID":${PROFILE_DATA.countyID},"localityID":${PROFILE_DATA.localityID},"name":null,"identificationCode":${PROFILE_DATA.identificationCode},"masterPersonnelCategoryID":${PROFILE_DATA.masterPersonnelCategoryID},"personnelCategoryID":${PROFILE_DATA.personnelCategoryID},"recipientID":${PROFILE_DATA.recipientID}}`,
        method: "POST",
        mode: "cors",
      }
    )
      .then((r) => resolve(r))
      .catch((err) => reject(err));
  });
};

const parseVaccineResponse = (vaccineResponse) => {
  const availableLocations = vaccineResponse.filter(
    (item, index) => item.availableSlots > 0 && item.boosterID === VACCINE_TYPE
  );

  if (availableLocations.length > 0) {
    availableLocations.forEach((item, index) => {
      notifier.notify({
        title: "Sloturi de vaccine disponibile!",
        message: `${item.availableSlots} Sloturi la: ${item.name} | ${item.address} `,
      });
    });
  }

  if (availableLocations.length === 0) {
    console.log("N-au fost găsite slot-uri");
  }
};

cron.schedule("*/30 * * * * *", () => {
  getVaccineSlotsData()
    .then((r) => r.text())
    .then((r2) => parseVaccineResponse(JSON.parse(r2).content));
});
