import {Message} from 'iview';

const DelayWarning = (str, time =3) =>{
  Message.warning({
    content: str,
    duration: time,
  })
}
const DelayError = (str, time =3) =>{
  Message.error({
    content: str,
    duration: time,
  })
}
export {DelayWarning,DelayError}
