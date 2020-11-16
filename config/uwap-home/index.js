// @flow
import type { Config } from "config/flowtypes";
import * as types from "config/types";
import { svg, withState } from "config/icon";
import { hex } from "config/colors";
import * as icons from "@mdi/js";
import { Buffer } from "bl";

const topicBulbHomeRust = (bulb: string, argument: string) => ({
  [`${bulb}${argument}`]: {
    state: {
      name: `home-rust/bulb/${bulb}/${argument}`,
      type: types.string
    },
    command: {
      name: `home-rust/bulb/${bulb}/${argument}/set`,
      type: types.string
    },
    defaultValue: "0"
  }
});

const topicBulbState = (bulb: string) => ({
  [`${bulb}State`]: {
    state: {
      name: `zigbee2mqtt/bulb_${bulb}/state`,
      type: types.option({
        OFF: "off",
        ON: "on"
      })
    },
    command: {
      name: `zigbee2mqtt/bulb_${bulb}/set/state`,
      type: types.string
    },
    defaultValue: "OFF"
  }
});

const topicBulbNumber = (bulb: string, parameter: string) => ({
  [`${bulb}${parameter}`]: {
    state: {
      name: `zigbee2mqtt/bulb_${bulb}/${parameter}`,
      type: types.string
    },
    command: {
      name: `zigbee2mqtt/bulb_${bulb}/set/${parameter}`,
      type: types.string
    },
    defaultValue: "0"
  }
});

const topicHomeBoolean = (name: string, topic: string,
  defaultValue: boolean = false) => ({
  [`${name}`]: {
    state: {
      name: `home-rust/${topic}`,
      type: types.option({ true: "on", false: "off" })
    },
    command: {
      name: `home-rust/${topic}/set`,
      type: types.option({ on: "true", off: "false" })
    },
    defaultValue: defaultValue ? "on" : "off"
  }
});

const topicHomeNumber = (name: string, topic: string,
  defaultValue: number = 0) => ({
  [`${name}`]: {
    state: {
      name: `home-rust/${topic}`,
      type: types.string
    },
    command: {
      name: `home-rust/${topic}/set`,
      type: types.string
    },
    defaultValue: defaultValue
  }
});

const topicTasmota = (name: string, topic: string) => ({
  [`${name}State`]: {
    state: {
      name: `stat/${topic}/POWER`,
      type: types.option({
        OFF: "off",
        ON: "on"
      })
    },
    command: {
      name: `cmnd/${topic}/POWER`,
      type: types.string
    },
    defaultValue: "OFF"
  }
});

const sliderRGB = (bulb: string, argument: string) => (
  [{
    type: "slider",
    min: 0,
    max: 255,
    text: argument,
    icon: svg(icons.mdiBrightness7),
    topic: `${bulb}${argument}`
  }]
);
const sliderH = (bulb: string, argument: string) => (
  [{
    type: "slider",
    min: 0,
    max: 360,
    text: argument,
    icon: svg(icons.mdiBrightness7),
    topic: `${bulb}${argument}`
  }]
);
const sliderSVXY = (bulb: string, argument: string) => (
  [{
    type: "slider",
    min: 0,
    max: 1,
    step: 0.01,
    text: argument,
    icon: svg(icons.mdiBrightness7),
    topic: `${bulb}${argument}`
  }]
);

const config: Config = {
  space: {
    name: "Home",
    color: "teal",
    mqtt: "ws://192.168.0.12:1884"
  },
  topics: [
    {
      ...topicBulbHomeRust("livingroom", "r"),
      ...topicBulbHomeRust("livingroom", "g"),
      ...topicBulbHomeRust("livingroom", "b"),
      ...topicBulbHomeRust("livingroom", "h"),
      ...topicBulbHomeRust("livingroom", "s"),
      ...topicBulbHomeRust("livingroom", "v"),
      ...topicBulbHomeRust("livingroom", "x"),
      ...topicBulbHomeRust("livingroom", "y"),
      ...topicBulbHomeRust("livingroom", "animation-speed"),
      ...topicBulbHomeRust("livingroom", "mode"),
      ...topicBulbNumber("livingroom", "brightness"),
      ...topicBulbState("livingroom"),
      ...topicBulbHomeRust("ledstrip_livingroom", "r"),
      ...topicBulbHomeRust("ledstrip_livingroom", "g"),
      ...topicBulbHomeRust("ledstrip_livingroom", "b"),
      ...topicBulbHomeRust("ledstrip_livingroom", "h"),
      ...topicBulbHomeRust("ledstrip_livingroom", "s"),
      ...topicBulbHomeRust("ledstrip_livingroom", "v"),
      ...topicBulbHomeRust("ledstrip_livingroom", "x"),
      ...topicBulbHomeRust("ledstrip_livingroom", "y"),
      ...topicBulbNumber("ledstrip_livingroom", "brightness"),
      ...topicBulbState("ledstrip_livingroom"),
      nasPower: {
        state: {
          name: "nas/online",
          type: types.string
        },
        command: {
          name: "home-rust/wake/nas",
          type: types.string
        },
        defaultValue: "OFF"
      },
      heaterOfficeTsoll: {
        state: {
          name: "tele/home-rust/fritzbox/device/office/tsoll",
          type: (msg) => (msg.toString().split(" ")[1])
        },
        command: {
          name: "home-rust/fritzbox/device/office/tsoll/set",
          type: types.string
        },
        defaultValue: "253"
      },
      heaterDiningroomTsoll: {
        state: {
          name: "tele/home-rust/fritzbox/device/diningroom/tsoll",
          type: (msg) => ((parseFloat(msg.toString().split(" ")[1])
          /2).toString())
        },
        command: {
          name: "home-rust/fritzbox/device/diningroom/tsoll/set",
          type: (msg) => (Buffer.from((parseFloat(msg) * 2).toString()))
        },
        defaultValue: "126.5"
      },
      heaterBedroomTsoll: {
        state: {
          name: "tele/home-rust/fritzbox/device/bedroom/tsoll",
          type: (msg) => ((parseFloat(msg.toString().split(" ")[1])
          /2).toString())
        },
        command: {
          name: "home-rust/fritzbox/device/bedroom/tsoll/set",
          type: (msg) => (Buffer.from((parseFloat(msg) * 2).toString()))
        },
        defaultValue: "126.5"
      },
      heaterBedroomSummermode: {
        state: {
          name: "tele/home-rust/fritzbox/device/bedroom",
          type: types.json("summeractive")
        },
        defaultValue: "1"
      },
      heaterOfficeNachtabsenkung: {
        state: {
          name: "home-rust/temperature-control/office_heating/heat_request/4",
          type: types.option({ true: "off", false: "on" })
        },
        command: {
          name: "home-rust/temperature-control/office_heating/heat_request/4",
          type: types.option({ off: "true", on: "false" })
        },
        defaultValue: "on"
      },
      tucanaPower: {
        state: {
          name: "home-rust/switch/office/8",
          type: types.option({
            "0": "Link Down",
            "6": "1000M",
            "5": "100M",
            "4": "100M (Half Duplex)",
            "3": "10M",
            "2": "10M (Half Duplex)"
          })
        },
        command: {
          name: "home-rust/wake/tucana",
          type: types.string
        },
        defaultValue: "0"
      },
      ...topicHomeBoolean("livingroomKodiControlled",
        "bulb/livingroom/kodi-controlled"),
      ...topicHomeBoolean("bedroomWakeup", "wakeup"),
      ...topicBulbNumber("bedroom", "brightness"),
      ...topicBulbNumber("bedroom", "color_temp"),
      ...topicBulbNumber("hallway", "brightness"),
      ...topicBulbState("bedroom"),
      ...topicTasmota("fanBedroom", "sonoff-bedroom-fan"),
      ...topicHomeBoolean("fanBedroomAuto", "temperature-control/bedroom"),
      ...topicHomeNumber("fanBedroomTarget",
        "temperature-control/bedroom/target", 21.5),
      ...topicTasmota("fanOffice", "sonoff-office-fan"),
      ...topicHomeBoolean("fanOfficeAuto", "temperature-control/office"),
      ...topicHomeBoolean("heaterOfficeAuto",
        "temperature-control/office_heating"),
      ...topicHomeBoolean("lueftenHint", "lueften"),
      ...topicHomeNumber("fanOfficeTarget",
        "temperature-control/office/target", 21.5),
      ...topicHomeNumber("heaterOfficeTarget",
        "temperature-control/office_heating/target", 21.5),
      ...topicBulbNumber("hallway", "brightness"),
      ...topicBulbState("hallway"),
      ...topicBulbNumber("hallway2", "brightness"),
      ...topicBulbState("hallway2"),
      ...topicBulbNumber("diningroom", "brightness"),
      ...topicBulbState("diningroom"),
      ...topicBulbState("office"),
      ...topicBulbNumber("office", "brightness"),
      ...topicTasmota("speakerOffice", "sonoff-office-speaker"),
      ...topicHomeBoolean("officeSwitchPollingActive", "switch/office/polling",
        true)
    }
  ],
  controls: {
    bedroomLight: {
      name: "Schlafzimmer",
      position: [180, 130],
      icon: svg(icons.mdiCeilingLight).color(({bedroomState}) =>
        (bedroomState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "bedroomState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "bedroombrightness"
        },
        {
          type: "toggle",
          topic: "bedroomWakeup",
          text: "Lichtwecker",
          icon: svg(icons.mdiWeatherSunsetUp)
        },
        {
          type: "slider",
          min: 250,
          max: 454,
          text: "Farbtemperatur",
          icon: svg(icons.mdiWeatherSunsetDown),
          topic: "bedroomcolor_temp"
        }
      ]
    },
    bedroomFan: {
      name: "Lüftung/Heizung Schlafzimmer",
      position: [140, 25],
      icon: withState((s) => (
        s["heaterBedroomSummermode"] === "1" ?

          //Sommermodus => Lüftungsstatus anzeigen
          svg(icons.mdiFan).color(({fanBedroomState}) =>
            (fanBedroomState === "on" ? hex("#00FF00") : hex("#000000")))

          //Wintermodus => Heizungsstatus anzeigen
          : s["heaterBedroomTsoll"] === "126.5" ?
            //Solltemperatur == aus
            svg(icons.mdiRadiatorDisabled)
            //Normalbetrieb
            : svg(icons.mdiRadiator)
      )),
      ui: [
        {
          type: "section",
          text: "Lüftung"
        },
        {
          type: "toggle",
          topic: "fanBedroomState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "toggle",
          topic: "fanBedroomAuto",
          text: "Automatik",
          icon: svg(icons.mdiAirConditioner)
        },
        {
          type: "slider",
          min: 15,
          max: 25,
          step: 0.1,
          text: "Zieltemperatur",
          icon: svg(icons.mdiOilTemperature),
          topic: "fanBedroomTarget",
          marks: [
            { value: 15, label: "15°C" },
            { value: 20, label: "20°C" },
            { value: 25, label: "25°C" }
          ]
        },
        {
          type: "section",
          text: "Heizung"
        },
        {
          type: "toggle",
          topic: "heaterBedroomTsoll",
          text: "Volle Power",
          icon: svg(icons.mdiRadiator),
          on: "127",
          off: "25"
        },
        {
          type: "toggle",
          topic: "heaterBedroomTsoll",
          text: "Ausschalten",
          icon: svg(icons.mdiRadiatorDisabled),
          on: "126.5",
          off: "25"
        },
        {
          type: "slider",
          min: 8,
          max: 28,
          step: 0.5,
          text: "Zieltemperatur",
          icon: svg(icons.mdiOilTemperature),
          topic: "heaterBedroomTsoll",
          marks: [
            { value: 8, label: "8°C" },
            { value: 18, label: "18°C" },
            { value: 28, label: "28°C" }
          ]
        }
      ]
    },
    officeSpeaker: {
      name: "Lautsprecher",
      position: [245, 658],
      icon: withState(({speakerOfficeState}) =>
        (speakerOfficeState !== "on" ? svg(icons.mdiVolumeOff)
          : svg(icons.mdiVolumeHigh).color(hex("#00FF00")))
      ),
      ui: [
        {
          type: "toggle",
          topic: "speakerOfficeState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        }
      ]
    },
    officeFan: {
      name: "Lüftung/Heizung Büro",
      position: [140, 658],
      icon: withState(({heaterOfficeAuto}) => (

        heaterOfficeAuto === "on" ?

          svg(icons.mdiRadiator).color(({heaterOfficeTsoll}) =>
            (heaterOfficeTsoll === "254" ? hex("#FF0000") : hex("#000000")))

          : svg(icons.mdiFan).color(({fanOfficeState}) =>
            (fanOfficeState === "on" ? hex("#00FF00") : hex("#000000")))
      )),
      ui: [
        {
          type: "section",
          text: "Lüftung"
        },
        {
          type: "toggle",
          topic: "fanOfficeState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "toggle",
          topic: "fanOfficeAuto",
          text: "Automatik",
          icon: svg(icons.mdiAirConditioner)
        },
        {
          type: "slider",
          min: 15,
          max: 25,
          step: 0.1,
          text: "Zieltemperatur",
          icon: svg(icons.mdiOilTemperature),
          topic: "fanOfficeTarget",
          marks: [
            { value: 15, label: "15°C" },
            { value: 20, label: "20°C" },
            { value: 25, label: "25°C" }
          ]
        },
        {
          type: "section",
          text: "Heizung"
        },
        {
          type: "toggle",
          topic: "heaterOfficeAuto",
          text: "Automatik",
          icon: svg(icons.mdiRadiator)
        },
        {
          type: "toggle",
          topic: "heaterOfficeNachtabsenkung",
          text: "Nachtabsekung",
          icon: svg(icons.mdiWeatherNight)
        },
        {
          type: "slider",
          min: 15,
          max: 25,
          step: 0.1,
          text: "Zieltemperatur",
          icon: svg(icons.mdiOilTemperature),
          topic: "heaterOfficeTarget",
          marks: [
            { value: 15, label: "15°C" },
            { value: 20, label: "20°C" },
            { value: 25, label: "25°C" }
          ]
        }
      ]
    },
    tucana: {
      name: "tucana",
      position: [110, 658],
      icon: svg(icons.mdiDesktopTower).color(({tucanaPower}) =>
        ({
          "Link Down": hex("#888888"),
          "1000M": hex("#00ff00"),
          "10M": hex("#000000")
        })[tucanaPower] || hex("#ff0000")),
      ui: [
        {
          type: "toggle",
          topic: "tucanaPower",
          text: "Einschalten",
          icon: svg(icons.mdiPower),
          on: "1000M"
        },
        {
          type: "text",
          text: "Link Speed",
          icon: svg(icons.mdiEthernet),
          topic: "tucanaPower"
        }
      ]
    },
    officeSwitch: {
      name: "Switch Büro",
      position: [200, 540],
      icon: svg(icons.mdiLan),
      ui: [
        {
          type: "toggle",
          topic: "officeSwitchPollingActive",
          text: "Poll switch status",
          icon: svg(icons.mdiPower)
        },
        {
          type: "link",
          link: "http://192.168.0.189/",
          text: "Open Webinterface",
          icon: svg(icons.mdiOpenInNew)
        }

      ]
    },
    officeLight: {
      name: "Büro",
      position: [210, 570],
      icon: svg(icons.mdiCeilingLight).color(({officeState}) =>
        (officeState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "officeState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "officebrightness"
        }
      ]
    },
    hallwayLight: {
      name: "Flur",
      position: [520, 370],
      icon: svg(icons.mdiCeilingLight).color(({hallwayState}) =>
        (hallwayState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "hallwayState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "hallwaybrightness"
        }
      ]
    },
    hallway2Light: {
      name: "Flur",
      position: [250, 370],
      icon: svg(icons.mdiCeilingLight).color(({hallway2State}) =>
        (hallway2State === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "hallway2State",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "hallway2brightness"
        }
      ]
    },
    diningroomLight: {
      name: "Esszimmer",
      position: [410, 570],
      icon: svg(icons.mdiCeilingLight).color(({diningroomState}) =>
        (diningroomState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "diningroomState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "diningroombrightness"
        }
      ]
    },
    diningroomHeater: {
      name: "Heizung Esszimmer",
      position: [410, 658],
      icon: withState(({heaterDiningroomTsoll}) => (
        heaterDiningroomTsoll === "126.5" ?
          svg(icons.mdiRadiatorDisabled) : svg(icons.mdiRadiator)
      )),
      ui: [
        {
          type: "toggle",
          topic: "heaterDiningroomTsoll",
          text: "Volle Power",
          icon: svg(icons.mdiRadiator),
          on: "127",
          off: "25"
        },
        {
          type: "toggle",
          topic: "heaterDiningroomTsoll",
          text: "Ausschalten",
          icon: svg(icons.mdiRadiatorDisabled),
          on: "126.5",
          off: "25"
        },
        {
          type: "slider",
          min: 8,
          max: 28,
          step: 0.5,
          text: "Zieltemperatur",
          icon: svg(icons.mdiOilTemperature),
          topic: "heaterDiningroomTsoll",
          marks: [
            { value: 8, label: "8°C" },
            { value: 18, label: "18°C" },
            { value: 28, label: "28°C" }
          ]
        }
      ]
    },
    pi: {
      name: "Pi",
      position: [550, 75],
      icon: svg(icons.mdiRaspberryPi),
      ui: [
        {
          type: "toggle",
          topic: "lueftenHint",
          text: "Lüften Erinnerung",
          icon: svg(icons.mdiFan)
        },
        {
          type: "link",
          link: "http://192.168.0.12:3000/",
          text: "Grafana",
          icon: svg(icons.mdiOpenInNew)
        }
      ]
    },
    nas: {
      name: "NAS",
      position: [550, 100],
      icon: svg(icons.mdiNas).color(({nasPower}) =>
        (nasPower === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: [
        {
          type: "toggle",
          topic: "nasPower",
          text: "Einschalten",
          icon: svg(icons.mdiPower)
        }
      ]
    },
    livingroomLight: {
      name: "Wohnzimmer",
      position: [450, 200],
      icon: svg(icons.mdiCeilingLight).color(({livingroomState}) =>
        (livingroomState === "on" ? hex("#00FF00") : hex("#000000"))),
      ui: ([
        {
          type: "toggle",
          topic: "livingroomState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "toggle",
          topic: "livingroomKodiControlled",
          text: "Kodi Einbindung",
          icon: svg(icons.mdiBrightnessAuto)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          marks: [
            { value: 1, label: "Dunkel" },
            { value: 120, label: "Medium" },
            { value: 254, label: "Hell" }
          ],
          icon: svg(icons.mdiBrightness7),
          topic: "livingroombrightness"
        },
        {
          type: "slider",
          max: 1,
          min: 300,
          step: -1,
          text: "Speed",
          icon: svg(icons.mdiSpeedometer),
          topic: "livingroomanimation-speed"
        },
        {
          type: "dropDown",
          text: "Modus",
          topic: "livingroommode",
          options: {
            "-1": "Cancel Animation",
            "0": "Pink",
            "1": "Kodi",
            "2": "Sleep",
            "3": "RGB Fade",
            "4": "Work"
          },
          icon: svg(icons.mdiCog)
        },
        {
          type: "section",
          text: "RGB"
        }
      ]).concat(sliderRGB("livingroom", "r"))
        .concat(sliderRGB("livingroom", "g"))
        .concat(sliderRGB("livingroom", "b"))
        .concat([
          {
            type: "section",
            text: "HSV"
          }
        ]).concat(sliderH("livingroom", "h"))
        .concat(sliderSVXY("livingroom", "s"))
        .concat(sliderSVXY("livingroom", "v"))
        .concat([
          {
            type: "section",
            text: "XY"
          }
        ]).concat(sliderSVXY("livingroom", "x"))
        .concat(sliderSVXY("livingroom", "y"))
    },
    livingroomLedStrip: {
      name: "Ledstreifen Wohnzimmer",
      position: [450, 73],
      icon: svg(icons.mdiWhiteBalanceIridescent),
      /* eslint-disable camelcase */
      iconColor: ({ledstrip_livingroomState}) =>
        (ledstrip_livingroomState === "on" ? hex("#00FF00") : hex("#000000")),
      /* eslint-enable camelcase */
      ui: ([
        {
          type: "toggle",
          topic: "ledstrip_livingroomState",
          text: "Ein/Ausschalten",
          icon: svg(icons.mdiPower)
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: svg(icons.mdiBrightness7),
          topic: "ledstrip_livingroombrightness"
        },
        {
          type: "dropDown",
          text: "Modus",
          topic: "livingroommode",
          options: {
            "-1": "Cancel Animation",
            "0": "Pink",
            "1": "Kodi",
            "2": "Sleep",
            "3": "RGB Fade",
            "4": "Work"
          },
          icon: svg(icons.mdiCog)
        },
        {
          type: "section",
          text: "RGB"
        }
      ]).concat(sliderRGB("ledstrip_livingroom", "r"))
        .concat(sliderRGB("ledstrip_livingroom", "g"))
        .concat(sliderRGB("ledstrip_livingroom", "b"))
        .concat([
          {
            type: "section",
            text: "HSV"
          }
        ]).concat(sliderH("ledstrip_livingroom", "h"))
        .concat(sliderSVXY("ledstrip_livingroom", "s"))
        .concat(sliderSVXY("ledstrip_livingroom", "v"))
        .concat([
          {
            type: "section",
            text: "XY"
          }
        ]).concat(sliderSVXY("ledstrip_livingroom", "x"))
        .concat(sliderSVXY("ledstrip_livingroom", "y"))
    }
  },
  layers: [
    {
      image: require("./assets/layers/rooms.svg"),
      baseLayer: true,
      name: "Rooms",
      defaultVisibility: "visible",
      opacity: 0.7,
      bounds: {
        topLeft: [0, 0],
        bottomRight: [720, 680]
      }
    }
  ]
};

window.config = config;
