import React from 'react';
import { CTForm } from 'components';
import { epub } from 'screens/MediaSettings/controllers/epub';

import UploadButton from './UploadButton';

function UploadTab({
  setImgUrl,
  imgUrl,
}) {
  const onUpload = image => {
    let url = URL.createObjectURL(image)
    setImgUrl(url);
  }

  return (
    <div className="msp-ee-cp-con">
      <div className="ee-cp-imgs" data-scroll>
        <div className="w-100">
          <div className="w-100 mb-3">
            <UploadButton onUpload={onUpload} />
          </div>

          <hr />

          <div className="w-100 pr-3">
            <CTForm
              label="Insert Image by URL"
              color="grey"
              placeholder="Image URL"
              onChange={url => setImgUrl(url)}
              defaultValue=""
            />
          </div>
        </div>
        
      </div>
      <div className="ee-cp-cover">
        {
          imgUrl
          ?
            <img src={epub.getImageUrl(imgUrl)} alt="Selected Cover" />
          :
            <div className="w-100 text-center">No image picked.</div>
        }
      </div>
    </div>
  )
}

export default UploadTab;
