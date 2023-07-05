import { html } from 'lit-html'
import { GamepadInfo } from './gamepad-info.ts'

export function App() {
  const gamepads = navigator.getGamepads().filter(isNotNull).filter(isConnected)

  return html`
    <h1>Gamepad demo</h1>

    ${gamepads.length === 0
      ? html`<p>No gamepads connected</p>`
      : html`
          <div class="gamepads">
            ${gamepads.map((gamepad) => GamepadInfo(gamepad))}
          </div>
        `}
  `
}

function isNotNull<T>(v: T | null): v is T {
  return v !== null
}

function isConnected(gamepad: Gamepad): boolean {
  return gamepad.connected
}
