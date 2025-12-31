const Skeleton = ({ className = "", style = {} }) => {
  return (
    <div
      aria-hidden
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
      style={style}
    />
  )
}

export default Skeleton
