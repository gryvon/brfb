export const MODULE_ID = "brfb";

export const FART_COOLDOWN = 15000;
export const FU_COOLDOWN = 15000;

export const FART_MESSAGES = [
  "Harry Dresden would like it known that this wasn't magic.",
  "Bob finds this fascinating and deeply disturbing.",
  "Even Mister has left the room.",
  "Mouse is disappointed.",
  "The White Council has opened an investigation.",
  "Mab raises a single, disapproving eyebrow.",
  "Winter's chill cannot suppress that odor.",
  "Summer has formally declined involvement.",
  "Toot-Toot believes this deserves a military medal.",
  "The Za Lord's Guard stands ready against this threat.",
  "This somehow violates the Unseelie Accords.",
  "Ancient Mai has added another item to your file.",
  "A Warden felt a disturbance and immediately regretted asking why.",
  "The smell has been classified as thaumaturgy-adjacent.",
  "Even the Outsiders think that's a bit much.",
  "Demonreach would appreciate some advance notice next time.",
  "Alfred has chosen not to acknowledge this event.",
  "Several nearby spirits have crossed over voluntarily.",
  "This is why nobody lets Harry have nice things.",
  "The Archive already knows and wishes she didn't.",
  "The smell has achieved sentience.",
  "Chicago's supernatural community has issued a statement.",
  "Lara Raith is still smiling, somehow.",
  "Thomas has suddenly remembered a prior engagement.",
  "Michael Carpenter quietly begins praying.",
  "Charity Carpenter blames Dresden anyway.",
  "Sanya thinks this is hilarious.",
  "Butters is taking notes for science.",
  "Waldo Butters has diagnosed this as medically concerning.",
  "That fart definitely broke one of the Laws of Magic.",
  "The Gatekeeper saw this coming and chose silence.",
  "Rashid is too tired for this.",
  "Ebenezar just added another reason to hate modern life.",
  "A nearby Sidhe has mistaken this for a challenge.",
  "The Erlking is intrigued.",
  "The Wild Hunt has altered its course.",
  "Kincaid would like hazard pay.",
  "Nicodemus is filing for emotional damages.",
  "Even fallen angels have standards.",
  "The Denarians have declined responsibility.",
  "Uriel is pretending not to notice.",
  "Mister wants you to know this is unacceptable.",
  "Mouse has judged you and found you wanting.",
  "The smell crits for emotional damage.",
  "This incident has been forwarded to Mac.",
  "Mac says nothing, but somehow says plenty.",
  "The beer at Mac's went flat out of sympathy.",
  "Paranet forums are already discussing the phenomenon.",
  "Somewhere in Chicago, a building permit was revoked.",
  "This is considerably worse than zombie T-Rex related property damage.",
  "Even Sue would have noticed that one.",
  "The smell arrived three chapters before the sound.",
  "A nearby threshold has been breached.",
  "Several ectoplasmic entities have become physical just to leave.",
  "The Nevernever has closed for cleaning.",
  "Reality requests a brief intermission.",
  "Mab files this under 'Harry's Problem.'",
  "The Leanansidhe is strangely proud.",
  "Winter applauds. Summer is horrified.",
  "The Blackstaff refuses to discuss the matter.",
  "This is now part of Harry's permanent record.",
  "The smell has enough power to fuel a Darkhallow.",
  "That wasn't gas. That was a declaration of intent.",
  "The room immediately fails its Endurance check.",
  "The smell gains two Fate Points.",
  "Several nearby gargoyles have resigned.",
  "The local spirits are demanding combat pay.",
  "You have successfully weaponized regret.",
  "A lesser warlock has taken inspiration from this event.",
  "The smell has legendary actions.",
  "Everybody in Cook County takes one point of morale damage.",
  "Dresden blames technology.",
  "Murphy would've had something rude to say about that.",
  "Bob rates this a seven out of ten on the apocalypse scale.",
  "Even the Red Court thought it was excessive.",
  "The smell has breached containment.",
  "There is now a quest marker over the odor.",
  "The smell knows your true name.",
  "Several nearby demons have become concerned for your health.",
  "You can now smell colors.",
  "History will remember this as an avoidable tragedy.",
  "The room enters a fail state.",
  "That fart had a second phase.",
  "The atmosphere has lawyered up.",
  "The smell is visible from the Nevernever.",
  "The building inspector has become a religious figure.",
  "This incident cannot be solved with fire, and that's saying something.",
  "Somewhere, Dresden just yelled 'Parkour!' for no reason.",
  "The smell rolled boxcars.",
  "Reality suffers stress.",
  "The fart invokes the Law of Unintended Consequences.",
  "The White God looks elsewhere for a moment.",
  "The smell has become plot-relevant.",
  "Everyone nearby gains the Aspect: Can't Unsmell That.",
  "The message has been delivered."
];

export const FART_SOUNDS = [
  `fart1.mp3`,
  `fart2.mp3`,
  `fart3.mp3`,
  `fart4.mp3`,
  `fart5.mp3`,
  `fart6.mp3`,
  `fart7.mp3`

];

export const FU_SOUNDS = [
  `fu1.mp3`
];

export const ACHIEVEMENTS = {

  fart_count: [
    {
      value: 50,
      tag: "fart_50",
      title: "Session Recap",
      subtitle: "50 Farts Released"
    },
    {
      value: 100,
      tag: "fart_100",
      title: "Chemical Warfare",
      subtitle: "100 Farts Released"
    },
    {
      value: 250,
      tag: "fart_250",
      title: "Biological Weapons Program",
      subtitle: "250 Farts Released"
    }
  ],

  fu_count: [
    {
      value: 50,
      tag: "fu_50",
      title: "Professional Hater",
      subtitle: "50 F.U.s Delivered"
    },
    {
      value: 100,
      tag: "fu_100",
      title: "Hatred Is A Craft",
      subtitle: "100 F.U.s Delivered"
    },
    {
      value: 250,
      tag: "fu_250",
      title: "The Message Has Been Delivered",
      subtitle: "250 F.U.s Delivered"
    }
  ],

  polka_count: [
    {
      value: 25,
      tag: "polka_25",
      title: "POLKA WILL NEVER DIE!",
      subtitle: "25 Polka Incidents Recorded"
    },
    {
      value: 100,
      tag: "polka_100",
      title: "Butters Approved",
      subtitle: "100 Polka Incidents Recorded"
    }
  ],

  crop_dusted_count: [
    {
      value: 50,
      tag: "crop_dust_50",
      title: "Wrong Place, Wrong Time",
      subtitle: "Affected by Crop Dusting 50 Times"
    },
    {
      value: 100,
      tag: "crop_dust_100",
      title: "Collateral Damage",
      subtitle: "Affected by Crop Dusting 100 Times"
    },
    {
      value: 250,
      tag: "crop_dust_250",
      title: "Area Denial Victim",
      subtitle: "Affected by Crop Dusting 250 Times"
    }
  ],

  fu_victim_count: [
    {
      value: 50,
      tag: "victim_50",
      title: "Why Me?",
      subtitle: "Received 50 F.U.s"
    },
    {
      value: 100,
      tag: "victim_100",
      title: "Rent Free",
      subtitle: "Received 100 F.U.s"
    },
    {
      value: 250,
      tag: "victim_250",
      title: "Frequent Recipient",
      subtitle: "Received 250 F.U.s"
    }
  ],

  silly_goose_count: [
    {
      value: 25,
      tag: "goose_25",
      title: "The Goose Notices",
      subtitle: "Visited by Goose 25 Times"
    },
    {
      value: 100,
      tag: "goose_100",
      title: "Chosen By Goose",
      subtitle: "Visited by Goose 100 Times"
    }
  ]

};