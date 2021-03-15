onmessage = ({ data }) => {
  console.log('Message received from main script')

  const result = `Hello,  ${data}`

  console.log('Posting message back to main script')

  postMessage(result)
}