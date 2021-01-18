export const GAME_IDENTIFIER = {
  COLORS: "colors",
  SLINGSHOT: "slingshot",
  MARBLE: "marble",
  CATAPULT: "catapult"
};

export const game = {
  namespaced: true,
  state: {
    games: [
      {
        identifier: GAME_IDENTIFIER.COLORS,
        name: "Farbmischung",
        description: "Mische Farben und löse interessante Aufgaben.",
        image:
          "https://images.unsplash.com/photo-1558470598-a5dda9640f68?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1651&q=80"
      },
      {
        identifier: GAME_IDENTIFIER.SLINGSHOT,
        name: "Schleuder",
        description: "Schleuder ",
        image:
          "https://images.unsplash.com/photo-1543260735-6f22c95ae571?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
      },
      {
        identifier: GAME_IDENTIFIER.MARBLE,
        name: "Murmelbahn",
        description: "Schaffst du es, dass die Murmeln das Ziel erreichen?",
        image:
          "https://images.unsplash.com/photo-1519786632971-829b4ac6ecce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80"
      },
      {
        identifier: GAME_IDENTIFIER.CATAPULT,
        name: "Katapult",
        description: "Sei ein Meister der Ballistik und triff die Ziele mit deinem Katapult.",
        image: "https://resize.hswstatic.com/w_796/gif/trebuchet.jpg"
      }
    ]
  }
};
