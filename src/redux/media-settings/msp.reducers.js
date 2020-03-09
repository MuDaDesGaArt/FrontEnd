import {
  SET_MEDIA,
  SET_TAB,
  // ePub
  SET_EPUB_DATA,
  SET_IS_SETTING_EPUB,
  // Trans
  SET_TRANSCRIPTIONS,
  SET_CURR_TRANS,
  SET_CAPTIONS,
} from './msp.action.types'
import { initialState } from './msp.state'

const mspReducer = (
  state=initialState,
  action
) => {

  const { type, value } = action

  switch (type) {
    case SET_MEDIA            : return { ...state, media: value }
    case SET_TAB              : return { ...state, tab: value }

    // ePub
    case SET_EPUB_DATA        : return { ...state, epubData: value }
    case SET_IS_SETTING_EPUB  : return { ...state, isSettingEpub: value }

    // Trans
    case SET_TRANSCRIPTIONS   : return { ...state, transcriptions: value }
    case SET_CURR_TRANS       : return { ...state, currTrans: value }
    case SET_CAPTIONS         : return { ...state, captions: value }
    
    default                   : return state
  }
}

export default mspReducer