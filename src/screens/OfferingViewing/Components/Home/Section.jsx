import React from 'react'
import { Link } from 'react-router-dom'
// UI
import { Card } from 'react-bootstrap'
import { OfferingCardHolder } from './PlaceHolder'
import { StarredButton } from './Overlays'
// Vars
import { handleData, search, util, user } from 'utils'
const imgHolder = require('images/Video-Placeholder.jpg')

function isThisSection(offering, departmentId) {
  if (handleData.find(offering.courses, { departmentId })) return true
  return false
}

export default function Section({ depart, state, displaySearchHeader }) {
  var { offerings, universities } = state
  const uni = universities.length ? handleData.findById(universities, depart.universityId) : ''
  const getKey = (offering, index) => depart.id + (offering.id || offering.offering.id) + index

  offerings = offerings.filter( offering => isThisSection(offering, depart.id))
  const offeringLen = offerings.length
  const breakAt = Math.floor(offerings.length / 2)
  const shouldBreak = offeringLen >= 10 || displaySearchHeader
  const offerings1 = shouldBreak ? offerings.slice(0, breakAt) : offerings
  const offerings2 = shouldBreak ? offerings.slice(breakAt, offeringLen) : []

  return (
    <div className="section" id={depart.acronym}>
      <hr/>
      <h2 className="title" as="a" href={`#${depart.acronym}`}>
        {depart.name}&emsp;<span>{uni.name}</span>
      </h2>
      <div className="offerings">
        {offerings1.map( (offering, index) => 
          offering.courses ? 
          <SectionItem 
            {...state}
            key={getKey(offering, index)}
            depart={depart}  
            offering={offering} 
          />
          : 
          <OfferingCardHolder key={getKey(offering, index)} />
        )}
      </div>
      {
        offerings2.length > 0
        &&
        <div className="offerings">
          {offerings2.map( (offering, index) => 
            offering.courses ? 
            <SectionItem 
              {...state}
              key={getKey(offering, index)}
              offering={offering} depart={depart}  
            />
            : 
            <OfferingCardHolder key={getKey(offering, index)} />
          )}
        </div>
      }
    </div>
  )
}

function SectionItem({offering, depart, termSelected}) {
  // if the full offering data has not yet loaded
  if (!offering.courses || offering.isTestCourse) return null
  if (termSelected.length && !handleData.includes(termSelected, offering.offering.termId)) return null;
  // if loaded set the fullCourse
  var fullCourse = null
  const course = handleData.find(offering.courses, { departmentId: depart.id })
  if (course) {
    fullCourse = {
      ...course, 
      key: offering.id || offering.offering.id,
      courseNumber: depart.acronym + course.courseNumber,
      fullNumber: search.getFullNumber(offering.courses),
      termName: offering.offering.termName,
      section: offering.offering.sectionName,
      accessType: offering.offering.accessType,
    }
  }

  const isLoggedIn = user.isLoggedIn()

  return !fullCourse ? null :
    <div className="offering-card-container">
      {isLoggedIn && <StarredButton offeringId={fullCourse.key} />}
      <Card 
        className="offeringCard" as={Link} 
        to={{
          pathname: util.links.offeringDetail(fullCourse.key),
          state: { hash: fullCourse.acronym, from: 'home', fullCourse: fullCourse }
        }}
        title={`${fullCourse.courseNumber} ${fullCourse.courseName}`}
        aria-describedby={"offering-info-" + fullCourse.key}
      >
        <Card.Img 
          className="img" variant="top" 
          src={imgHolder} style={{pointerEvents: 'none'}}
          alt=""
        />
        <p id={"offering-info-" + fullCourse.key} className="accessbility_hide">{fullCourse.courseNumber + ' ' + fullCourse.courseName + ' ' + fullCourse.termName + ' ' + fullCourse.section}</p>
        <Card.Body>
          <Card.Title className="title">
            <strong>{fullCourse.courseNumber} </strong> <br/>{fullCourse.courseName}
          </Card.Title>
          <Card.Text className="info">
            {fullCourse.termName} - {fullCourse.section}
          </Card.Text>
          <Card.Text className="description">
            {fullCourse.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
}