export default {
    items: [
      {
        name: 'Overview',
        url: '/dashboard',
        icon: 'icon-speedometer',
        badge: {
          variant: 'info',
        },
      },
      {
        name: 'Batsman Score',
        url: '/batsmanscore',
        icon: 'icon-puzzle',
        children: [
            {
                name: 'Highest Score',
                url: '/batsmanscore/highest',
                icon: 'icon-pencil',
            },
            {
                name: 'Most Hundreds',
                url: '/batsman/hundreds',
                icon: 'icon-pencil',
            },
            {
                name: 'Most Fifties',
                url: '/batsman/fifties',
                icon: 'icon-pencil',
            },
            {
                name: 'Most Fours',
                url: '/batsman/fours',
                icon: 'icon-pencil',
            },
            {
                name: 'Most Sixes',
                url: '/batsman/sixes',
                icon: 'icon-pencil',
            },
            {
                name: 'Most Nineties',
                url: '/batsman/nineties',
                icon: 'icon-pencil',
            }

        ]
      },
      {
        name: 'Ranking Chart',
        url: '/teamrankingchart',
        icon: 'icon-puzzle'
      },
      {
        name: 'Team1 vs Team2 Chart',
        url: '/teamcompare',
        icon: 'icon-puzzle'
      }
    ]
  };
  