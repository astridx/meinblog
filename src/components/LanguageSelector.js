import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
function LanguageSelector() {
  const location = useLocation()
  if (!location.pathname.includes('/en')) {
    return <Link to={`/en${location.pathname}`}>english</Link>
  } else {
    return <Link to={location.pathname.replace('/en/', '/')}>deutsch</Link>
  }
}
export default LanguageSelector
