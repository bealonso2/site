const links = [
  {
    name: "X",
    url: "https://x.com/thebrianalonso",
  },
  {
    name: "Blog",
    url: "https://blog.balonso.com",
  },
  {
    name: "Projects",
    links: [
      {
        name: "Premier League Prediction",
        url: "/pl-prediction",
      },
      // {
      //   name: "Random Footballer",
      //   url: "https://randomfootballer.com",
      // },
      {
        name: "Life in 24 Hours Calculator",
        url: "/24-hours",
      },
    ],
  },
  // {
  //   name: "Products",
  //   links: [
  //     {
  //       name: "Gmail Cleanup",
  //       url: "https://gmailcleanup.com",
  //     },
  //     {
  //       name: "LuckyLink",
  //       url: "https://luckylink.app",
  //     },
  //     {
  //       name: "EarthWallet",
  //       url: "https://earthwallet.app",
  //     },
  //   ],
  // },
];

export const NavMenu = ({ className }: { className: string }) => {
  const determineTarget = (url: string) => {
    return url.startsWith("/") ? "_self" : "_blank";
  };
  return (
    <ul className={className} style={{ zIndex: 100 }}>
      {links.map((link) => (
        <li key={link.name}>
          {link.links ? (
            <details>
              <summary>{link.name}</summary>
              <ul className="bg-base-200">
                {link.links.map((sublink) => (
                  <li key={sublink.name}>
                    <a href={sublink.url} target={determineTarget(sublink.url)}>
                      {sublink.name}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ) : (
            <a href={link.url} target={determineTarget(link.url)}>
              {link.name}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};
