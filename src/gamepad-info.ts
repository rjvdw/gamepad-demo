import { html } from 'lit-html'
import classNames from 'classnames'
import { GamepadConfig } from './gamepads/config.ts'
import { xboxConfig } from './gamepads/xbox.ts'
import { dualsenseConfig } from './gamepads/dualsense.ts'

export function GamepadInfo(gamepad: Gamepad) {
  let info
  if (isXboxController(gamepad)) {
    info = renderController(gamepad, xboxConfig)
  } else if (isDualSenseController(gamepad)) {
    info = renderController(gamepad, dualsenseConfig)
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

function isDualSenseController(gamepad: Gamepad): boolean {
  return gamepad.id.toLowerCase().indexOf('dualsense') !== -1
}

function renderController(gamepad: Gamepad, config: GamepadConfig) {
  return html`
    <div class=${classNames('gamepad', config.className)}>
      ${config.buttons?.map(([label, idx, valueTransformer = false]) => {
        const value =
          typeof valueTransformer === 'function'
            ? valueTransformer(gamepad)
            : gamepad.buttons[idx].value

        return html`<div
          title="${label}"
          class="${classNames('button', `button-${label.replace(/ /g, '-')}`, {
            'button-active': !valueTransformer && value === 1,
            'button-analog': valueTransformer,
          })}"
          style="--button-value: ${value}"
        >
          ${label}
        </div>`
      })}
      ${config.sticks?.map(([label, buttonIdx, axis1Idx, axis2Idx]) => {
        const buttonValue = gamepad.buttons[buttonIdx].value
        const xValue = gamepad.axes[axis1Idx]
        const yValue = gamepad.axes[axis2Idx]

        return html`<div
          title="${label}"
          class="${classNames('stick', `stick-${label.replace(/ /g, '-')}`, {
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
