// @flow
import type { Config } from "config/flowtypes";
import * as types from "config/types";
import { mdi, rawMdi } from "config/icon";
import { hex } from "config/colors";

const topicBulb = (bulb: string, argument: string) => ({
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

const topicHomeBoolean = (name: string, topic: string) => ({
  [`${name}`]: {
    state: {
      name: `home-rust/${topic}`,
      type: types.option({ true: "on", false: "off" })
    },
    command: {
      name: `home-rust/${topic}/set`,
      type: types.option({ on: "true", off: "false" })
    },
    defaultValue: "OFF"
  }
});

const topicHomeNumber = (name: string, topic: string) => ({
  [`${name}`]: {
    state: {
      name: `home-rust/${topic}`,
      type: types.string
    },
    command: {
      name: `home-rust/${topic}/set`,
      type: types.string
    },
    defaultValue: 0
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
    icon: mdi("brightness-7"),
    topic: `${bulb}${argument}`
  }]
);
const sliderH = (bulb: string, argument: string) => (
  [{
    type: "slider",
    min: 0,
    max: 360,
    text: argument,
    icon: mdi("brightness-7"),
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
    icon: mdi("brightness-7"),
    topic: `${bulb}${argument}`
  }]
);

const config: Config = {
  space: {
    name: "Home",
    color: "orange",
    mqtt: "ws://192.168.0.12:1884"
  },
  topics: [
    {

      /*
       *zigbee2mqtt/bulb_livingroom
       *zigbee2mqtt/bulb_hallway
       *zigbee2mqtt/bulb_bedroom
       */

      ...topicBulb("livingroom", "r"),
      ...topicBulb("livingroom", "g"),
      ...topicBulb("livingroom", "b"),
      ...topicBulb("livingroom", "h"),
      ...topicBulb("livingroom", "s"),
      ...topicBulb("livingroom", "v"),
      ...topicBulb("livingroom", "x"),
      ...topicBulb("livingroom", "y"),
      ...topicBulb("livingroom", "animation-speed"),
      ...topicBulb("livingroom", "mode"),
      livingroomBrightness: {
        state: {
          name: "home-rust/bulb/livingroom/brightness",
          type: types.string
        },
        command: {
          name: "zigbee2mqtt/bulb_livingroom/set",
          type: (value) => JSON.stringify({ brightness: value.toString() })
        },
        defaultValue: "0"
      },
      livingroomState: {
        state: {
          name: "home-rust/bulb/livingroom/state",
          type: types.option({
            OFF: "off",
            ON: "on"
          })
        },
        command: {
          name: "zigbee2mqtt/bulb_livingroom/set",
          type: (value) => JSON.stringify({ state: value.toString() })
        },
        defaultValue: "OFF"
      },
      ...topicHomeBoolean("livingroomKodiControlled",
        "bulb/livingroom/kodi-controlled"),
      ...topicHomeBoolean("bedroomWakeup", "wakeup"),
      bedroomBrightness: {
        state: {
          name: "home-rust/bulb/bedroom/brightness",
          type: types.string
        },
        command: {
          name: "zigbee2mqtt/bulb_bedroom/set",
          type: (value) => JSON.stringify({ brightness: value.toString() })
        },
        defaultValue: "0"
      },
      bedroomColorTemp: {
        state: {
          name: "home-rust/bulb/bedroom/color_temp",
          type: types.string
        },
        command: {
          name: "zigbee2mqtt/bulb_bedroom/set",
          type: (value) => JSON.stringify({ "color_temp": value.toString() })
        },
        defaultValue: "0"
      },
      bedroomState: {
        state: {
          name: "home-rust/bulb/bedroom/state",
          type: types.option({
            OFF: "off",
            ON: "on"
          })
        },
        command: {
          name: "zigbee2mqtt/bulb_bedroom/set",
          type: (value) => JSON.stringify({ state: value.toString() })
        },
        defaultValue: "OFF"
      },
      ...topicTasmota("fanBedroom", "sonoff-bedroom-fan"),
      ...topicHomeBoolean("fanBedroomAuto", "temperature-control/bedroom"),
      ...topicHomeNumber("fanBedroomTarget",
        "temperature-control/bedroom/target"),
      ...topicTasmota("fanOffice", "sonoff-office-fan"),
      ...topicHomeBoolean("fanOfficeAuto", "temperature-control/office"),
      ...topicHomeNumber("fanOfficeTarget",
        "temperature-control/office/target"),
      hallwayBrightness: {
        state: {
          name: "home-rust/bulb/hallway/brightness",
          type: types.string
        },
        command: {
          name: "zigbee2mqtt/bulb_hallway/set",
          type: (value) => JSON.stringify({ brightness: value.toString() })
        },
        defaultValue: "0"
      },
      hallwayState: {
        state: {
          name: "home-rust/bulb/hallway/state",
          type: types.option({
            OFF: "off",
            ON: "on"
          })
        },
        command: {
          name: "zigbee2mqtt/bulb_hallway/set",
          type: (value) => JSON.stringify({ state: value.toString() })
        },
        defaultValue: "OFF"
      },
      ...topicTasmota("speakerOffice", "sonoff-office-speaker")
    }
  ],
  controls: {
    bedroomLight: {
      name: "Schlafzimmer",
      position: [300, 400],
      icon: mdi("ceiling-light"),
      ui: [
        {
          type: "toggle",
          topic: "bedroomState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: mdi("brightness-7"),
          topic: "bedroomBrightness"
        },
        {
          type: "toggle",
          topic: "bedroomWakeup",
          text: "Lichtwecker",
          icon: mdi("weather-sunset-up")
        },
        {
          type: "slider",
          min: 250,
          max: 454,
          text: "Farbtemperatur",
          icon: mdi("weather-sunset-down"),
          topic: "bedroomColorTemp"
        }
      ]
    },
    bedroomFan: {
      name: "Lüftung Schlafzimmer",
      position: [200, 400],
      icon: mdi("fan"),
      iconColor: ({fanBedroomState}) =>
        (fanBedroomState === "on" ? hex("#00FF00") : hex("#000000")),
      ui: [
        {
          type: "toggle",
          topic: "fanBedroomState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "toggle",
          topic: "fanBedroomAuto",
          text: "Automatik",
          icon: mdi("air-conditioner")
        },
        {
          type: "text",
          text: "Zieltemperatur",
          icon: mdi("temperature-celsius"),
          topic: "fanBedroomTarget"
        },
        {
          type: "slider",
          min: 10,
          max: 21.5,
          text: "Zieltemperatur",
          icon: mdi("oil-temperature"),
          topic: "fanBedroomTarget"
        }
      ]
    },
    officeSpeaker: {
      name: "Lautsprecher",
      position: [550, 400],
      icon: ({speakerOfficeState}) =>
        (speakerOfficeState === "on" ? rawMdi("volume-high")
          : rawMdi("volume-off")),
      iconColor: ({speakerOfficeState}) =>
        (speakerOfficeState === "on" ? hex("#00FF00") : hex("#000000")),
      ui: [
        {
          type: "toggle",
          topic: "speakerOfficeState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        }
      ]
    },
    officeFan: {
      name: "Lüftung Büro",
      position: [600, 400],
      icon: mdi("fan"),
      iconColor: ({fanOfficeState}) =>
        (fanOfficeState === "on" ? hex("#00FF00") : hex("#000000")),
      ui: [
        {
          type: "toggle",
          topic: "fanOfficeState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "toggle",
          topic: "fanOfficeAuto",
          text: "Automatik",
          icon: mdi("air-conditioner")
        },
        {
          type: "text",
          text: "Zieltemperatur",
          icon: mdi("temperature-celsius"),
          topic: "fanOfficeTarget"
        },
        {
          type: "slider",
          min: 10,
          max: 21.5,
          text: "Zieltemperatur",
          icon: mdi("oil-temperature"),
          topic: "fanOfficeTarget"
        }
      ]
    },
    hallwayLight: {
      name: "Flur",
      position: [400, 200],
      icon: mdi("ceiling-light"),
      ui: [
        {
          type: "toggle",
          topic: "hallwayState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: mdi("brightness-7"),
          topic: "hallwayBrightness"
        }
      ]
    },
    livingroomLight: {
      name: "Wohnzimmer",
      position: [300, 200],
      icon: mdi("ceiling-light"),
      ui: ([
        {
          type: "toggle",
          topic: "livingroomState",
          text: "Ein/Ausschalten",
          icon: mdi("power")
        },
        {
          type: "toggle",
          topic: "livingroomKodiControlled",
          text: "Kodi Einbindung",
          icon: mdi("brightness-auto")
        },
        {
          type: "slider",
          min: 0,
          max: 255,
          text: "Helligkeit",
          icon: mdi("brightness-7"),
          topic: "livingroomBrightness"
        },
        {
          type: "slider",
          max: 1,
          min: 300,
          step: -1,
          text: "Speed",
          icon: mdi("speedometer"),
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
          icon: mdi("settings")
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
    }
  },
  layers: [
    {
      image: require("./assets/layers/rooms.svg"),
      baseLayer: true,
      name: "Entropia",
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