import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import ETH from './eth.svg'
import Polygon from './polygon.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: MdEmail,
  github: AiFillGithub,
  twitter: AiOutlineTwitter,
  eth: ETH,
  polygon: Polygon,
}

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
