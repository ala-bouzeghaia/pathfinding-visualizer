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
          "{0% { transform: scale(0.3); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } 0%, 50%, 100% {background-color: rgb(12, 53, 71); outline: 1px solid rgb(12, 53, 71); }}",
        resetWallAnimation:
          "{0% { transform: scale(1); } 25% { transform: scale(0.5); } 100% { transform: scale(0); } 0%, 25%, 100% {background-color: rgb(12, 53, 71); outline: 1px solid rgb(12, 53, 71); }}",
      },

      durations: {
        wallAnimation: "0.3s",
        resetWallAnimation: "0.2s",
      },
      timingFunction: {
        wallAnimation: "ease-out",
        resetWallAnimation: "ease-out",
      },
      delay: {
        wallAnimation: "0s",
        resetWallAnimation: "0s",
      },
      iterationCount: {
        wallAnimation: "1",
        resetWallAnimation: "1",
      },
      direction: {
        wallAnimation: "alternate",
        resetWallAnimation: "alternate",
      },
      fillMode: {
        wallAnimation: "forwards",
        resetWallAnimation: "forwards",
      },
      playState: {
        wallAnimation: "running",
        resetWallAnimation: "running",
      },
    },
  },
});
