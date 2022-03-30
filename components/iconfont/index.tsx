/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react'
import AGithubsquare from './AGithubsquare'
import ATwitter from './ATwitter'
import AAlantoa from './AAlantoa'
export { default as AGithubsquare } from './AGithubsquare'
export { default as ATwitter } from './ATwitter'
export { default as AAlantoa } from './AAlantoa'

export type IconNames = 'a-githubsquare' | 'a-twitter' | 'a-alantoa'

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: IconNames
  size?: number
  color?: string | string[]
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'a-githubsquare':
      return <AGithubsquare {...rest} />
    case 'a-twitter':
      return <ATwitter {...rest} />
    case 'a-alantoa':
      return <AAlantoa {...rest} />
  }

  return null
}

export default IconFont
