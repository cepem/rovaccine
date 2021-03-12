// In order to get this data head to the page where you can see all the available slots ( On the Platform).
// Once you're there press on the "filtrează" button, you'll see an API Call in your dev tools.
const PROFILE_DATA = {
  cookie: "",
  countyID: 35,
  localityID: "",
  identificationCode: "",
  masterPersonnelCategoryID: -4,
  personnelCategoryID: 32,
  recipientID: "",
};

// Available types are the following
// 1: Pfizer-BioNTech
// 2: Moderna
// 3: AstraZeneca
// Pick only the ones you wanna be notified about
const VACCINE_TYPES = [1, 2];

module.exports = { PROFILE_DATA, VACCINE_TYPES };
