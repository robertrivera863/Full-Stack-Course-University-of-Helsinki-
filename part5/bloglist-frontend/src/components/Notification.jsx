import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
`

const NotificationWrapper = styled.div`
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  font-size: 0.95rem;
  animation: ${fadeIn} 0.3s ease-out;

  ${({ type }) =>
    type === 'success'
      ? `
        background: #e6f4ea;
        color: #137333;
        border: 1px solid #137333;
      `
      : `
        background: #fce8e6;
        color: #c5221f;
        border: 1px solid #c5221f;
      `}
`

const Notification = ({ message }) => {
  if (!message) return null

  return (
    <NotificationWrapper type={message.type}>
      {message.text}
    </NotificationWrapper>
  )
}

Notification.propTypes = {
  message: PropTypes.object
}

export default Notification
