import { checkForName } from './js/nameChecker'
import { handleSubmit, handleClear } from './js/formHandler'
import { drawHappyFace } from './js/happyFace'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

let canvas = document.getElementById("faceUI");

drawHappyFace(canvas, {
    fill: '#FFFF00',
    lineColor: '#6F0047',
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius : 100
});

export {
  checkForName,
  handleSubmit,
  handleClear,
}
