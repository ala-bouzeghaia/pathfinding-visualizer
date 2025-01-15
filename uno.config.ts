import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      cdn: "https://esm.sh/",
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  content: {
    filesystem: ["src/**/*"],
  },
  theme: {
    animation: {
      keyframes: {
        wallAnimation:
          "{0% { transform: scale(0.3); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } 0%, 50%, 100% {background-color: rgb(12, 53, 71); outline: 1px solid rgb(12, 53, 71); }}",
        duration: {
          wallAnimation: "0.3s",
        },
        timingFunction: {
          wallAnimation: "ease-out",
        },
        delay: {
          wallAnimation: "0s",
        },
        iterationCount: {
          wallAnimation: "1",
        },
        direction: {
          wallAnimation: "alternate",
        },
        fillMode: {
          wallAnimation: "forwards",
        },
        playState: {
          wallAnimation: "running",
        },
      },
    },
  },
});
