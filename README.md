# rovaccine

[![](https://i.imgur.com/CpIMJBM.png)](https://i.imgur.com/CpIMJBM.pnghttp://)

Simple Node.js cron that checks the Official Romanian Covid Vaccine platform for available slots in your area.

Disclaimer:

I developed this bot for my personal usage and I will not be responding to issues or code-style comments. If you have any improvements, feel free to open a pull request and I'll be happy to accept your changes.

**Usage:**

1. Clone this repo
2. `npm install`
3. Change the PROFILE_DATA object with your data.
4. `node app.js`

The script will make a request every 30 seconds and it'll notify you once it finds an availble slot

#### How to pick the vaccine ?

In app.js on line 20 you have an array named VACCINE_TYPES. Depending on your vaccine prefference insert the following values into it:

- 1 for Pfizer-BioNTech
- 2 for Moderna
- 3 for AstraZeneca\*

## FAQ

**Where do I get the data for the PROFILE_DATA object ?**

This script is already extremly easy to setup and use therefore I'll let you figure that one on your own.
