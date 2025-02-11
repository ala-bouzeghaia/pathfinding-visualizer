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
        wallAnimation: `{
          0% { transform: scale(0.3); } 
          50% { transform: scale(1.1); } 
          100% { transform: scale(1); background-color: rgb(12, 53, 71); border: 1px solid rgb(12, 53, 71); } 
          }`,
        resetWallAnimation: `{
          0% { transform: scale(1); background-color: rgb(12, 53, 71); border: 1px solid rgb(12, 53, 71); } 
          25% { transform: scale(0.5); } 
          100% { transform: scale(0.3); background-color: white; border: 1px solid rgb(59, 130, 246); } 
          0%, 25%, 100% {background-color: rgb(12, 53, 71); border: 1px solid rgb(12, 53, 71); }
          }`,
        visitedAnimation: `{
          0% { transform: scale(0.3); background-color: rgba(0, 0, 66, 0.75); border-radius: 100%; } 
          50% { background-color: rgba(17, 104, 217, 0.75); }
          75% { transform: scale(1.2); background-color: rgba(0, 217, 159, 0.75); }
          100% { transform: scale(1); background-color: rgba(0, 190, 218, 0.75); outline: 1px solid white;}
          }`,
        pathAnimation: `{
          0% { transform: scale(0.6); background-color: rgb(255, 254, 106); }
          50% { transform: scale(1.2); background-color: rgb(255, 254, 106); }
          100% { transform: scale(1); background-color: rgb(255, 254, 106); border: 1px solid white;}
          }`,
      },
      durations: {
        wallAnimation: "0.3s",
        resetWallAnimation: "0.5s",
        visitedAnimation: "1.5s",
        pathAnimation: "1.5s",
      },
      timingFns: {
        wallAnimation: "ease-in-out",
        resetWallAnimation: "ease-out",
        visitedAnimation: "ease-out",
        pathAnimation: "ease-out",
      },
      properties: {
        wallAnimation: {
          "animation-direction": "alternate",
          "animation-iteration-count": 1,
          "animation-fill-mode": "forwards",
          "animation-play-state": "running",
        },
        resetWallAnimation: {
          "animation-direction": "alternate",
          "animation-iteration-count": 1,
          "animation-fill-mode": "forwards",
          "animation-play-state": "running",
        },
        visitedAnimation: {
          "animation-direction": "alternate",
          "animation-iteration-count": 1,
          "animation-fill-mode": "forwards",
          "animation-play-state": "running",
        },
        pathAnimation: {
          "animation-direction": "alternate",
          "animation-iteration-count": 1,
          "animation-fill-mode": "forwards",
          "animation-play-state": "running",
        },
      },
    },
  },
});
