const moment = require('moment');
const uuid = require('uuid/v4');
const loremIpsum = require('lorem-ipsum');
const random_name = require('node-random-name');

let donations = [];
let personalGoal = 3000;
let teamGoal = 30000;

const loadTime = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ');

const randomDonationAmount = function() {
  const chance = Math.floor(Math.random() * 100);

  if (chance <= 80) {
    return (Math.floor(Math.random() * 5000) + 1) / 100;
  } else if (chance <= 95) {
    return (Math.floor(Math.random() * 25000) + 5000) / 100;
  } else {
    return (Math.floor(Math.random() * 300000) + 25000) / 100;
  }
}

module.exports.addDonation = function() {
  donations.unshift(
    {
      displayName: random_name(),
      message: loremIpsum(),
      participantID: Math.floor(Math.random() * 800000) + 600000,
      amount: randomDonationAmount(),
      donorID: uuid(),
      avatarImageURL: '//assets.donordrive.com/clients/extralife/img/avatar-constituent-default.gif',
      createdDateUTC: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
    },
  )
};

module.exports.changeGoal = function(newGoal) {
  personalGoal = newGoal;
};

module.exports.changeTeamGoal = function(newGoal) {
  teamGoal = newGoal;
};

module.exports.getUserInfo = async function(participantId) {
  return {
    displayName: 'Joe Smith',
    participantID: 506571,
    teamName: 'My Awesome Team',
    eventName: 'Extra Life 2019',
    avatarImageURL: 'https://assets.donordrive.com/extralife/images/$avatars$/constituent_42BB6E88-C292-13D6-00FFFD8987560FD1538.jpg',
    createdDateUTC: loadTime,
    eventID: 539,
    teamID: 38961,
    isTeamCaptain: false,
    teamURL: 'https://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=38961',
    donateURL: 'https://www.extra-life.org/index.cfm?fuseaction=donate.participant&participantID=506571',
    fundraisingGoal: personalGoal,
    sumDonations: donations.reduce((sum, current) => { return sum + current.amount; }, 0),
    numDonations: donations.length
  }
};

module.exports.getUserDonations = async function(participantId, limit = 100, page = 1) {
  if (limit > 100) {
    limit = 100;
  }

  // Hardcode zero here because the real module seems to not return valid things here anyways
  return {
    countDonations: 0,
    countPages: 0,
    donations: donations.reverse().slice((page - 1) * limit, ((page - 1) * limit) + limit).map(item => {
      // clone the object so modifying it doesnt alter the other results
      return JSON.parse(JSON.stringify(item));
    })
  }
};

module.exports.getTeamInfo = async function(teamId, fetchRoster = false) {
  return {
    fundraisingGoal: teamGoal,
    eventName: 'Extra Life 2019',
    avatarImageURL: 'http://assets.donordrive.com/extralife/images/$event539$/avatar_team_38961.jpg',
    createdDateUTC: loadTime,
    eventID: 539,
    sumDonations: donations.reduce((sum, current) => { return sum + current.amount; }, 0),
    teamID: 38961,
    name: 'Extra Life Nerds',
    numDonations: donations.length,
    teamURL: 'https://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=38961',
    members: []
  }
};
