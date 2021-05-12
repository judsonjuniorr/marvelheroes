import { useRef, useEffect } from 'react'

const useDocumentTitle = (title?: string, retainOnUnmount = false): void => {
  const defaultTitle = useRef(document.title)

  useEffect(() => {
    let dTitle = defaultTitle.current
    dTitle = dTitle.includes(' | ') ? dTitle.split(' | ')[1] : dTitle
    if (!title) document.title = dTitle
    else document.title = `${title} | ${dTitle}`
  }, [title])

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const dTitle = defaultTitle.current
      if (!retainOnUnmount)
        document.title = dTitle.includes(' | ')
          ? dTitle.split(' | ')[1]
          : dTitle
    }
  }, [retainOnUnmount])
}

export default useDocumentTitle
