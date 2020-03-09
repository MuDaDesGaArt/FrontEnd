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

export const setMedia           = value => ({ type: SET_MEDIA, value })
export const setTab             = value => ({ type: SET_TAB, value })

// Epub
export const setEpubData        = value => ({ type: SET_EPUB_DATA, value })
export const setIsSettingEpub   = value => ({ type: SET_IS_SETTING_EPUB, value })

// Trans
export const setTranscriptions  = value => ({ type: SET_TRANSCRIPTIONS, value })
export const setCurrTrans       = value => ({ type: SET_CURR_TRANS, value })
export const setCaptions        = value => ({ type: SET_CAPTIONS, value })