import { api } from '../../utils'

export const initialState = {
  media: api.parseMedia(),
  tab: '',

  // Epub
  epubData: [],
  isSettingEpub: false,

  // Transcriptions
  transcriptions: [],
  currTrans: null,
  captions: [],
}
