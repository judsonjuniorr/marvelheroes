/* eslint-disable no-undef */
declare module 'react-lottie-player' {
  interface LottieProps
    extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > {
    animationData: object
    play?: boolean
    goTo?: number
    speed?: number
    direction?: 1 | -1
    loop?: number | bool
    segments?: Array<number> | boolean
    props?: object
    rendererSettings?: object
    renderer?: string
    onComplete?: function
    onLoopComplete?: function
    onEnterFrame?: function
    onSegmentStart?: function
  }

  const Lottie: React.FC<LottieProps>

  export default Lottie
}
