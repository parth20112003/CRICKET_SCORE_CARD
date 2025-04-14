// Mock data for development without MongoDB

export const teams = [
  {
    _id: "team1",
    name: "India",
    shortName: "IND",
    logo: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/313100/313128.logo.png",
    players: ["player1", "player2", "player3"]
  },
  {
    _id: "team2",
    name: "Australia",
    shortName: "AUS",
    logo: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/340400/340493.png",
    players: ["player4", "player5", "player6"]
  },
  {
    _id: "team3",
    name: "England",
    shortName: "ENG",
    logo: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/313100/313114.logo.png",
    players: ["player7", "player8", "player9"]
  }
];

export const players = [
  {
    _id: "player1",
    name: "Virat Kohli",
    team: "team1",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    stats: {
      matches: 102,
      runs: 8074,
      wickets: 4,
      highestScore: 183,
      bestBowling: "1/15"
    },
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316600/316605.png"
  },
  {
    _id: "player2",
    name: "Rohit Sharma",
    team: "team1",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm off break",
    stats: {
      matches: 95,
      runs: 7368,
      wickets: 8,
      highestScore: 264,
      bestBowling: "2/27"
    },
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316600/316608.png"
  },
  {
    _id: "player3",
    name: "Jasprit Bumrah",
    team: "team1",
    role: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm fast",
    stats: {
      matches: 72,
      runs: 19,
      wickets: 128,
      highestScore: 10,
      bestBowling: "6/19"
    },
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316600/316619.png"
  },
  {
    _id: "player4",
    name: "Steve Smith",
    team: "team2",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm leg break",
    stats: {
      matches: 87,
      runs: 4378,
      wickets: 27,
      highestScore: 164,
      bestBowling: "3/16"
    },
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316500/316584.png"
  },
  {
    _id: "player5",
    name: "Pat Cummins",
    team: "team2",
    role: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm fast",
    stats: {
      matches: 73,
      runs: 573,
      wickets: 141,
      highestScore: 36,
      bestBowling: "6/23"
    },
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316500/316486.png"
  },
  {
    _id: "player6",
    name: "Mitchell Starc",
    team: "team2",
    role: "Bowler",
    battingStyle: "Left-handed",
    bowlingStyle: "Left-arm fast",
    stats: {
      matches: 110,
      runs: 619,
      wickets: 219,
      highestScore: 52,
      bestBowling: "6/28"
    },
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316500/316580.png"
  },
  {
    _id: "player7",
    name: "Joe Root",
    team: "team3",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm off break",
    stats: {
      matches: 158,
      runs: 6190,
      wickets: 26,
      highestScore: 180,
      bestBowling: "2/9"
    },
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316500/316598.png"
  },
  {
    _id: "player8",
    name: "Ben Stokes",
    team: "team3",
    role: "All-rounder",
    battingStyle: "Left-handed",
    bowlingStyle: "Right-arm fast-medium",
    stats: {
      matches: 89,
      runs: 3159,
      wickets: 95,
      highestScore: 102,
      bestBowling: "5/61"
    },
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316500/316590.png"
  },
  {
    _id: "player9",
    name: "Jofra Archer",
    team: "team3",
    role: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm fast",
    stats: {
      matches: 17,
      runs: 58,
      wickets: 30,
      highestScore: 27,
      bestBowling: "3/27"
    },
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316500/316583.png"
  }
];

export const matches = [
  {
    _id: "match1",
    teams: [
      {
        _id: "team1",
        name: "India",
        shortName: "IND",
        logo: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/313100/313128.logo.png"
      },
      {
        _id: "team2",
        name: "Australia",
        shortName: "AUS",
        logo: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/340400/340493.png"
      }
    ],
    venue: "Melbourne Cricket Ground",
    date: "2025-04-10T09:30:00.000Z",
    matchType: "T20",
    series: "India Tour of Australia 2025",
    status: "Upcoming",
    innings: []
  },
  {
    _id: "match2",
    teams: [
      {
        _id: "team3",
        name: "England",
        shortName: "ENG",
        logo: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/313100/313114.logo.png"
      },
      {
        _id: "team1",
        name: "India",
        shortName: "IND",
        logo: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/313100/313128.logo.png"
      }
    ],
    venue: "Lord's Cricket Ground",
    date: "2025-04-08T10:00:00.000Z",
    matchType: "ODI",
    series: "India Tour of England 2025",
    status: "Live",
    innings: [
      {
        team: {
          _id: "team3",
          name: "England",
          shortName: "ENG"
        },
        totalRuns: 287,
        wickets: 10,
        overs: 50,
        extras: {
          wides: 8,
          noBalls: 2,
          byes: 4,
          legByes: 6,
          penalty: 0,
          total: 20
        },
        battingPerformances: [
          {
            player: {
              _id: "player7",
              name: "Joe Root"
            },
            runs: 105,
            balls: 112,
            fours: 8,
            sixes: 2,
            strikeRate: 93.75,
            dismissalType: "Caught",
            dismissedBy: {
              bowler: {
                _id: "player3",
                name: "Jasprit Bumrah"
              },
              fielder: {
                _id: "player2",
                name: "Rohit Sharma"
              }
            }
          },
          {
            player: {
              _id: "player8",
              name: "Ben Stokes"
            },
            runs: 78,
            balls: 65,
            fours: 6,
            sixes: 4,
            strikeRate: 120.00,
            dismissalType: "Bowled",
            dismissedBy: {
              bowler: {
                _id: "player3",
                name: "Jasprit Bumrah"
              }
            }
          }
        ],
        bowlingPerformances: [
          {
            player: {
              _id: "player3",
              name: "Jasprit Bumrah"
            },
            overs: 10,
            maidens: 1,
            runs: 49,
            wickets: 4,
            economy: 4.90,
            wides: 2,
            noBalls: 0
          }
        ]
      },
      {
        team: {
          _id: "team1",
          name: "India",
          shortName: "IND"
        },
        totalRuns: 156,
        wickets: 3,
        overs: 28.2,
        extras: {
          wides: 4,
          noBalls: 1,
          byes: 2,
          legByes: 3,
          penalty: 0,
          total: 10
        },
        battingPerformances: [
          {
            player: {
              _id: "player1",
              name: "Virat Kohli"
            },
            runs: 82,
            balls: 76,
            fours: 7,
            sixes: 3,
            strikeRate: 107.89,
            dismissalType: "Not Out"
          },
          {
            player: {
              _id: "player2",
              name: "Rohit Sharma"
            },
            runs: 45,
            balls: 52,
            fours: 5,
            sixes: 1,
            strikeRate: 86.54,
            dismissalType: "Caught",
            dismissedBy: {
              bowler: {
                _id: "player9",
                name: "Jofra Archer"
              },
              fielder: {
                _id: "player8",
                name: "Ben Stokes"
              }
            }
          }
        ],
        bowlingPerformances: [
          {
            player: {
              _id: "player9",
              name: "Jofra Archer"
            },
            overs: 8,
            maidens: 1,
            runs: 42,
            wickets: 2,
            economy: 5.25,
            wides: 3,
            noBalls: 0
          }
        ]
      }
    ],
    toss: {
      winner: {
        _id: "team3",
        name: "England"
      },
      decision: "Bat"
    },
    commentary: [
      {
        over: 28,
        ball: 2,
        text: "Archer to Kohli, FOUR! Beautiful cover drive, perfectly timed and placed between the fielders.",
        timestamp: "2025-04-08T13:45:22.000Z"
      },
      {
        over: 28,
        ball: 1,
        text: "Archer to Kohli, defended back to the bowler.",
        timestamp: "2025-04-08T13:44:45.000Z"
      },
      {
        over: 27,
        ball: 6,
        text: "Stokes to Pant, single taken with a push to mid-off.",
        timestamp: "2025-04-08T13:43:30.000Z"
      }
    ]
  },
  {
    _id: "match3",
    teams: [
      {
        _id: "team2",
        name: "Australia",
        shortName: "AUS",
        logo: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/340400/340493.png"
      },
      {
        _id: "team3",
        name: "England",
        shortName: "ENG",
        logo: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/313100/313114.logo.png"
      }
    ],
    venue: "Sydney Cricket Ground",
    date: "2025-04-05T08:00:00.000Z",
    matchType: "Test",
    series: "The Ashes 2025",
    status: "Completed",
    innings: [
      {
        team: {
          _id: "team2",
          name: "Australia",
          shortName: "AUS"
        },
        totalRuns: 328,
        wickets: 10,
        overs: 92.4,
        extras: {
          wides: 4,
          noBalls: 3,
          byes: 8,
          legByes: 5,
          penalty: 0,
          total: 20
        }
      },
      {
        team: {
          _id: "team3",
          name: "England",
          shortName: "ENG"
        },
        totalRuns: 246,
        wickets: 10,
        overs: 78.2,
        extras: {
          wides: 2,
          noBalls: 1,
          byes: 6,
          legByes: 4,
          penalty: 0,
          total: 13
        }
      },
      {
        team: {
          _id: "team2",
          name: "Australia",
          shortName: "AUS"
        },
        totalRuns: 217,
        wickets: 10,
        overs: 65.3,
        extras: {
          wides: 3,
          noBalls: 2,
          byes: 5,
          legByes: 3,
          penalty: 0,
          total: 13
        }
      },
      {
        team: {
          _id: "team3",
          name: "England",
          shortName: "ENG"
        },
        totalRuns: 193,
        wickets: 10,
        overs: 62.1,
        extras: {
          wides: 1,
          noBalls: 0,
          byes: 4,
          legByes: 2,
          penalty: 0,
          total: 7
        }
      }
    ],
    result: {
      winner: {
        _id: "team2",
        name: "Australia"
      },
      margin: "106 runs",
      description: "Australia won by 106 runs"
    },
    toss: {
      winner: {
        _id: "team2",
        name: "Australia"
      },
      decision: "Bat"
    },
    playerOfTheMatch: {
      _id: "player4",
      name: "Steve Smith"
    }
  }
];

export default {
  teams,
  players,
  matches
};
