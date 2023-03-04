import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import Image from './Image'
import CustomLink from './Link'
import { BlogNewsletterForm } from './NewsletterForm'
import Pre from './Pre'
import TOCInline from './TOCInline'

const _jsx_runtime = require('react/jsx-runtime')

export const getMDXComponent = (code) => {
  const scope = { React, ReactDOM, _jsx_runtime }
  const fn = new Function(...Object.keys(scope), code)
  return fn(...Object.values(scope)).default
}

const Wrapper: React.ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout {...rest} />
}

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  BlogNewsletterForm,
}

interface Props {
  layout: string
  mdxSource: string
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
