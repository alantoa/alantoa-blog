import Link from './Link'

const ProjectItem = ({ title, description, imgSrc, href }) => (
  <div>
    <h3 className="text-lg font-bold tracking-tight">
      {href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          {title}
        </Link>
      ) : (
        title
      )}
    </h3>
    <p className="prose text-sm text-gray-500 dark:text-gray-400">{description}</p>
  </div>
)

export default ProjectItem
