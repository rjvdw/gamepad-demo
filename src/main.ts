import { render } from 'lit-html'
import { App } from './app.ts'

const renderApp = () => {
  render(App(), document.body)
  requestAnimationFrame(renderApp)
}

requestAnimationFrame(renderApp)
