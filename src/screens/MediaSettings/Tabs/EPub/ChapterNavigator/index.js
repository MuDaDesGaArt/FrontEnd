import React, { useEffect } from 'react';
import { Button } from 'pico-ui';
import { util } from 'utils';
import { connectWithRedux, epub } from '../../../Utils/epub';
import './index.scss';

function ChapterNavigatorWithRedux({
  step,
  chapters,
  currChapter,
  navId,
  showNav
}) {
  const currChapterId = navId || currChapter.id;
  
  const isStep1 = step === epub.EPUB_STEP_SPLIT;
  const isStep3 = step === epub.EPUB_STEP_DOWNLOAD;

  useEffect(() => {
    // if (isStep3) return null;
    epub.onShowNavChange(currChapterId);
  }, [showNav]);

  useEffect(() => {
    // if (isStep3) return null;
    if (isStep1 && showNav) {
      epub.state.setShowNav(epub.NAV_CLOSE);
    } else if (!isStep1 && !showNav) {
      epub.state.setShowNav(epub.NAV_SHOW);
    }

    epub.state.setNavId(currChapter.id);
  }, [step]);

  useEffect(() => {
    if (isStep3) return;
    util.elem.scrollIntoCenter('ee-cn-ch-' + navId);
  }, [navId])

  if (isStep3) return null;


  return showNav ? (
    <div 
      className="msp-ee-cn-con" 
      data-managing={isStep1}
      data-step={step}
    >
      <div className="ee-cn-wrapper" onClick={epub.hideNavihator}></div>
      <div className={"ee-cn-ch-con" + showNav}>
        <div className="ee-cn-ch-scroll-con" data-scroll>
          <div className="ct-d-r-center-v ee-cn-h">
            <h3>Chapters</h3>
            {
              isStep1
              &&
              <Button round
                icon="close"
                color="transparent"
                onClick={epub.hideNavihator} 
              />
            }
          </div>
          <div className="ee-cn-ch-ul ct-d-c">
            {chapters.map( (chapter, chapterIndex) => (
              <div key={`ee-cn-ch-${chapter.id}`} className="ee-cn-ch-li">
                <Button round
                  id={`ee-cn-ch-${chapter.id}`}
                  classNames="ee-cn-ch-li-ch"
                  color={currChapterId === chapter.id ? "teal" : 'transparent'}
                  onClick={epub.navigateChapter(chapter)}
                >
                  {isStep1 ? '' : `${chapterIndex + 1} - `} {chapter.title}
                </Button>
                {
                  (isStep1 || currChapter.id === chapter.id)
                  &&
                  chapter.subChapters.map((subChapter, subChapterIndex) => (
                    <Button round
                      id={`ee-cn-ch-${subChapter.id}`}
                      key={`ee-cn-sub-ch-${subChapter.id}`}
                      classNames="ee-cn-ch-li-sub-ch"
                      color={currChapterId === subChapter.id ? "teal" : 'transparent'}
                      onClick={epub.navigateSubChapter(subChapter, chapter)}
                    >
                      {
                        isStep1 
                        ? ('--- ' + subChapter.title)
                        : `${chapterIndex + 1}.${subChapterIndex + 1} - ${subChapter.title}`
                      }
                    </Button>
                  ))
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  ) : (

    <div className="msp-ee-cn-con">
      <Button round
        classNames="ee-cn-open-btn"
        icon="list"
        color="teal"
        onClick={epub.showNavigator}
      />
    </div>
  );
}

export default connectWithRedux(
  ChapterNavigatorWithRedux,
  [
    'step',
    'chapters',
    'currChapter',
    'navId',
    'showNav'
  ]
);