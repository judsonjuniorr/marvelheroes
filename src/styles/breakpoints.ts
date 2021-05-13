// eslint-disable-next-line no-shadow
enum Breakpoints {
  smOnly = '@media (min-width: 481px) and (max-width: 768.9px) ',
  sm = '@media (min-width: 481px) ',
  smDown = '@media (max-width: 480.9px) ',

  md = '@media (min-width: 769px) ',
  mdOnly = '@media (min-width: 769px) and (max-width: 1024.9px) ',
  mdDown = '@media (max-width: 768.9px) ',

  lg = '@media (min-width: 1025px) ',
  lgDown = '@media (max-width: 1024.9px) ',
  xl = '@media (min-width: 1201px) '
}

export default Breakpoints
