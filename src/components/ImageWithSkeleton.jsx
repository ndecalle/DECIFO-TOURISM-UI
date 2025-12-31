import { useState } from "react"
import Skeleton from "./Skeleton"

const ImageWithSkeleton = ({ src, alt = "", className = "", style = {} }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {!loaded && (
        <Skeleton className="w-full h-full absolute inset-0" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ display: 'block' }}
      />
    </div>
  )
}

export default ImageWithSkeleton
