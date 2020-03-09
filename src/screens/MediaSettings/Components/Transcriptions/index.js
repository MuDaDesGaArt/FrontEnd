import React, { useEffect } from 'react'
import { PlaceHolder } from '../../../Instructor/Components'
import './index.scss'
// utils
import { 
  connectWithRedux, // used to connect this component w/ redux state container
  transControl,
} from '../../Utils'

////////////////////////////////////////////////////
// Check out `MediaSettings/Utils/trans.contol.js` for more details
// The following code is just an example
// Please feel free to create more sub-components for this tab
// The /Transcriptions directory is yours now!
////////////////////////////////////////////////////

function TranscriptionsWithRedux({
  media,
  captions=[],
  transcriptions=[],
  currTrans,
}) {

  useEffect(() => {
    if (media && media.id) {
      console.log(media)
      transControl.setUpTranscriptionsData(media.transcriptions)
    }

    // [OPTIONAL] 
    // When this component is unmounted, reset data
    return () => {
      transControl.transcriptions([])
      transControl.captions([])
    }
  }, [media])

  return (
    <div className="msp-trans-con">
      <div className="msp-trans-content">
        {
          captions.length > 0
          ?
          <ul>
            {captions.map(cap => (
              <li key={'cap-' + cap.id}>
                {cap.begin} : {cap.end} : {cap.text}
              </li>
            ))}
          </ul>
          :
          <PlaceHolder/>
        }
      </div>
    </div>
  )
}

export const Transcriptions = connectWithRedux(
  TranscriptionsWithRedux,
  [ // the redux states
    'media', 
    'captions', 
    'transcriptions', 
    'currTrans'
  ],
  [] // the dispatch functions
)



