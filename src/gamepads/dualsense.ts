import { GamepadConfig, GamepadValueTransformer } from './config.ts'

export const dualsenseConfig: GamepadConfig = {
  className: 'gamepad-dualsense',
  buttons: [
    ['square', 0],
    ['cross', 1],
    ['circle', 2],
    ['triangle', 3],
    ['L1', 4],
    ['R1', 5],
    ['L2', 6, getAnalogButtonValue(5)],
    ['R2', 7, getAnalogButtonValue(6)],
    ['create', 8],
    ['share', 9],
    ['PS5', 12],
    ['touch pad', 13],
    ['up', -1, getDPad(4, 'up')],
    ['down', -1, getDPad(4, 'down')],
    ['left', -1, getDPad(4, 'left')],
    ['right', -1, getDPad(4, 'right')],
  ],
  sticks: [
    ['LS', 10, 0, 1],
    ['RS', 11, 2, 3],
  ],
}

function getAnalogButtonValue(axisIdx: number): GamepadValueTransformer {
  return (gamepad) => (gamepad.axes[axisIdx] + 1) / 2
}

function getDPad(
  axisIdx: number,
  button: 'up' | 'down' | 'left' | 'right',
): GamepadValueTransformer {
  return (gamepad) => {
    const value = gamepad.axes[axisIdx]

    switch (button) {
      case 'up':
        return value === -1 || value === 1 || (value > -0.8 && value < -0.7)
          ? 1
          : 0
      case 'down':
        return (value > 0.4 && value < 0.5) ||
          (value > -0.2 && value < -0.1) ||
          (value > 0.1 && value < 0.2)
          ? 1
          : 0
      case 'left':
        return value === 1 ||
          (value > 0.4 && value < 0.5) ||
          (value > 0.7 && value < 0.8)
          ? 1
          : 0
      case 'right':
        return (value > -0.8 && value < -0.7) ||
          (value > -0.5 && value < -0.4) ||
          (value > -0.2 && value < -0.1)
          ? 1
          : 0
      default:
        return 0
    }
  }
}
