import styled from 'styled-components'

export const Container = styled.div`
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1b212d;
  padding: 10px;

  a,
  p {
    color: #b3bdd3;
    text-decoration: none;
    font-size: 12px;
    transition: all 0.3s;
    + * {
      margin-top: 2px;
    }
  }

  a:hover {
    color: rgb(243, 20, 49);
  }
`
