import { Container } from './styles'

const Footer: React.FC = () => {
  return (
    <Container>
      <a
        href="http://marvel.com"
        target="_blank"
        rel="noopener noreferer noreferrer"
      >
        Data provided by Marvel. © 2021 MARVEL
      </a>
      <p>
        Desenvolvido por{' '}
        <a
          href="https://www.linkedin.com/in/judson-cairo/"
          target="_blank"
          rel="noopener noreferer noreferrer"
        >
          Judson Cairo
        </a>
      </p>
    </Container>
  )
}

export default Footer
