import styled from 'styled-components'

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`

export const Button = styled.button`
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1557b0;
  }

  &:disabled {
    background: #a0a0a0;
    cursor: not-allowed;
  }
`

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.25rem 0 0.75rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  margin: 1rem 0;
`

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
`
