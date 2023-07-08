import { GamepadConfig } from './config.ts'

export const xboxConfig: GamepadConfig = {
  className: 'gamepad-xbox',
  buttons: [
    ['A', 0],
    ['B', 1],
    ['X', 2],
    ['Y', 3],
    ['LB', 4],
    ['RB', 5],
    ['LT', 6, true],
    ['RT', 7, true],
    ['select', 8],
    ['start', 9],
    ['up', 12],
    ['down', 13],
    ['left', 14],
    ['right', 15],
    ['home', 16],
  ],
  sticks: [
    ['LS', 10, 0, 1],
    ['RS', 11, 2, 3],
  ],
}
