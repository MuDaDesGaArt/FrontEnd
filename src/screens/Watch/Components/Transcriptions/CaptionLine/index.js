import React, { useRef } from 'react';
import { isMobile } from 'react-device-detect';

import {
  transControl,
  videoControl,
  timeStrToSec,
  prettierTimeStr,
  WEBVTT_DESCRIPTIONS,
} from '../../../Utils';
import './index.css';

function CaptionLine({ isCurrent = false, isEditing = false, shouldHide = false, caption = {} }) {
  const { text = '', id, begin, kind } = caption;
  const ref = useRef();

  const blurFromInput = () => {
    if (ref && ref.current && typeof ref.current.blur === 'function') {
      if (document.activeElement.id === ref.current.id) {
        ref.current.blur();
      }
    }
  };

  const handleSeek = () => {
    const time = timeStrToSec(begin);
    videoControl.currTime(time);
  };

  const handleChange = ({ target }) => {
    // console.log(target.innerText)
    transControl.handleChange(target.innerText);
    // console.log(target.value)
  };

  const handleFocus = ({ target }) => {
    // console.error(e.target.innerText)
    transControl.edit(caption, target.innerText);
  };

  const handleBlur = () => {
    transControl.handleBlur();
  };

  const handleSave = (cap) => {
    transControl.handleSaveEditing(cap);
  };

  const handleCancel = () => {
    ref.current.innerHTML = text;
    transControl.handleCancelEditing();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSave();
      blurFromInput();
    }
  };

  const timeStr = prettierTimeStr(begin);
  const hasUnsavedChanges = ref && ref.current && ref.current.innerText !== text;

  return (
    <div
      id={`caption-line-${id}`}
      className="watch-caption-line"
      current={isCurrent.toString()}
      editing={isEditing.toString()}
      hide={shouldHide.toString()}
      kind={kind}
      data-unsaved={hasUnsavedChanges}
    >
      <div className="caption-line-content">
        {/* Time Seeking Button */}
        <button
          className="plain-btn caption-line-time-display"
          onClick={handleSeek}
          aria-label={`Jump to ${timeStr}`}
        >
          <span tabIndex="-1">{timeStr}</span>
        </button>

        {/* Caption Line */}
        {kind === WEBVTT_DESCRIPTIONS ? (
          <div className="description-line-text">
            {text}
            <br />
            <span className="description-line-text-title">(Description)</span>
          </div>
        ) : (
          <div
            ref={ref}
            contentEditable={!isMobile}
            id={`caption-line-textarea-${id}`}
            className="caption-line-text"
            dangerouslySetInnerHTML={{ __html: text }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInput={handleChange}
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="caption-line-btns">
        {hasUnsavedChanges && (
          <div className="mt-2 mr-3 caption-line-prompt">Hit return to save changes</div>
        )}

        {/* Save Button */}
        <button
          className="plain-btn caption-line-save-btn"
          onClick={handleSave}
          tabIndex={-1}
          aria-hidden
        >
          Save
        </button>
        <button
          className="plain-btn caption-line-save-btn"
          onClick={handleCancel}
          tabIndex={-1}
          aria-hidden
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CaptionLine;
