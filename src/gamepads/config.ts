export type GamepadValueTransformer = (gamepad: Gamepad) => number

export type GamepadConfig = {
  className: string
  buttons?: [string, number, (boolean | GamepadValueTransformer)?][]
  sticks?: [string, number, number, number][]
}
