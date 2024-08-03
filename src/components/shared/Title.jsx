import React from 'react'
import {Helmet } from 'react-helmet-async'
const Title = ({
    title="Chat App",
    description="this is a chat app called LETSTALK",
}) => {
  return (
  <Helmet> 
  <title>{title}</title>
  <meta name="description" content='' />
  </Helmet>
  )

}

export default Title