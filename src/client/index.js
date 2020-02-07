import { handleSubmit, handleClear } from './js/formHandler'
import homeIcon from '../client/assets/smallIcon.png';

let homeImg = document.getElementById('logo');
homeImg.src = homeIcon;

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

export {
  handleSubmit,
  handleClear,
}
