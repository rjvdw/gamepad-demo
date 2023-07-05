import { html } from 'lit-html'
import classNames from 'classnames'

export function GamepadInfo(gamepad: Gamepad) {
  let info
  if (isXboxController(gamepad)) {
    info = XboxController(gamepad)
  } else {
    info = html`<p>Unknown controller</p>`
  }

  return html`
    <div class="gamepad">
      <h2>${gamepad.id}</h2>

      ${info}
    </div>
  `
}

function isXboxController(gamepad: Gamepad): boolean {
  return gamepad.id.toLowerCase().indexOf('xbox') !== -1
}

const XBOX_BUTTONS: [string, number, boolean?][] = [
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
]

const XBOX_STICKS: [string, number, number, number][] = [
  ['LS', 10, 0, 1],
  ['RS', 11, 2, 3],
]

function XboxController(gamepad: Gamepad) {
  return html`
    <div class="gamepad-xbox">
      ${XBOX_BUTTONS.map(([label, idx, isAnalog = false]) => {
        const value = gamepad.buttons[idx].value

        return html`<div
          title="${label}"
          class="${classNames('button', `button-${label}`, {
            'button-active': !isAnalog && value === 1,
            'button-analog': isAnalog,
          })}"
          style="--button-value: ${value}"
        >
          ${label}
        </div>`
      })}
      ${XBOX_STICKS.map(([label, buttonIdx, axis1Idx, axis2Idx]) => {
        const buttonValue = gamepad.buttons[buttonIdx].value
        const xValue = gamepad.axes[axis1Idx]
        const yValue = gamepad.axes[axis2Idx]

        return html`<div
          title="${label}"
          class="${classNames('stick', `stick-${label}`, {
            'stick-active': buttonValue === 1,
          })}"
          style="--button-value: ${buttonValue}; --x-value: ${xValue}; --y-value: ${yValue}"
        >
          ${label}
        </div>`
      })}
    </div>
  `
}
