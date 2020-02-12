import React from 'react'
import { connectWithRedux } from '../../../../../_redux/watch'
import { transControl, langMap, langOptions } from '../../../Utils'

function LanguageMenu({
  show=false,
  currTrans={},
  onClose=null
}) {

  const handleChooseLanguage = lang => () => {
    transControl.setLanguage(lang)
    setTimeout(() => onClose(), 200);
  }

  return show ? (
    <div id="watch-language-menu" role="menu" aria-label="Language Menu" className="watch-general-menu">
      <button className="plain-btn watch-menu-close-btn watch-screenmode-menu-close-btn" onClick={onClose}>
        <i className="material-icons">close</i>
      </button>

      <div className="watch-icon-list" >
        {langOptions.map( lang => (
          <button 
            key={`language-menu-item-${lang}`}
            className="plain-btn watch-icon-listitem"
            aria-label={langMap[lang]}
            active={Boolean(lang === currTrans.language).toString()}
            onClick={handleChooseLanguage(lang)}
            role="menuitem"
          >
            <span tabIndex="-1">
              <div className="watch-icon-listitem-checkmark">
                {
                  lang === currTrans.language
                  && 
                  <i className="material-icons">check</i>
                }
              </div>
              <i className="material-icons watch-icon-icon">closed_caption</i>
              <div className="watch-icon-name">{langMap[lang]}</div>
            </span>
          </button>
        ))}
      </div>
    </div>
  ) : null
}

export default connectWithRedux(
  LanguageMenu,
  ['currTrans'],
  []
)