import _ from 'lodash'
import { api, util } from '../../../utils'
import { /* your contants */ } from './constants'


////////////////////////////////////////////////////
// In the src/redux/media-settings
// I have created 3 states - `transcriptions`, `currTrans` and `captions` in `msp.state.js`
// And their dispatch functions in `msp.actions.js`
// Check them out!
////////////////////////////////////////////////////


class TransSettings {
  constructor() {
    this.redux = {} // your redux dispatch functions will be placed here

    // some default data
    // for details of the data schema, see - https://classtranscribe.ncsa.illinois.edu/swag/index.html
    this.transcriptions_ = [] // trans w/ different languages, each has a ID for its captions
    this.currTrans_ = null // the selected current transcription w/ a specific language
    this.captions_ = [] // the list of captions of currTrans
  }

  /**
   * Function used to register redux functions for trans settings
   * @param {Object} props 
   */
  init(props) { 
    // This function has been registered at `src/screens/MediaSettings/index.js`
    const { 
      setTranscriptions, setCurrTrans, setCaptions
      // your redux dispatch functions
    } = props

    this.redux = { 
      setTranscriptions, setCurrTrans, setCaptions
      // your redux dispatch functions
    }
  }

  // functions used to get/set variables
  // ----------------------------------------------------------

  transcriptions(transcriptions_) {
    if (transcriptions_ === undefined) return this.transcriptions_
    const { setTranscriptions } = this.redux
    if (setTranscriptions) {
      setTranscriptions(transcriptions_) // set the real redux data
      this.transcriptions_ = transcriptions_ // update local data for future use
    }
  }

  currTrans(currTrans_) {
    if (currTrans_ === undefined) return this.currTrans_
    const { setCurrTrans } = this.redux
    if (setCurrTrans) {
      setCurrTrans(currTrans_)
      this.currTrans_ = currTrans_
    }
  }

  captions(captions_) {
    if (captions_ === undefined) return this.captions_
    const { setCaptions } = this.redux
    if (setCaptions) {
      setCaptions(captions_)
      this.captions_ = captions_
    }
  }

  // functions used to setup data
  // -----------------------------------------------------------

  /**
   * Function used to get captions by transcriptionId
   * @param {String} transcriptionId 
   */
  async getCaptions(transcriptionId) {
    try {
      let { data } = await api.getCaptionsByTranscriptionId(transcriptionId)
      return data
    } catch (error) {
      console.error("Failed to get captions.")
      return []
    }
  }

  /**
   * An example function to setup the transcriptions tab, 
   * modify it if needed
   */
  async setUpTranscriptionsData(transcriptions_=[]) {
    try {
      if (transcriptions_.length === 0) return
      this.transcriptions(transcriptions_)
      
      let currTrans_ = this.findTransByLanguage('en-US') // Set English as default lang
      if (!currTrans_) return

      let captions_ = await this.getCaptions(currTrans_.id)
      if (captions_.length === 0) return
      this.captions(captions_)

    } catch (error) {
      console.error("Failed to setup transcriptions data.")
    }
  }

  // Helpers
  /**
   * Function used to find the transcription that matches the language
   */
  findTransByLanguage(language) {
    const transcriptions = this.transcriptions()
    return _.find(transcriptions, { language })
  }

  // Your functions here
}

export const transControl = new TransSettings()