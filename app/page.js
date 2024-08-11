'use client'
import { Box, Stack, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'; // Import the airplane icon
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your personal Academic Advisor, how can I assist you today?",
    }
  ])

  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: '' },
    ])

  const response = await fetch('/api/chat', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([...messages, { role: 'user', content: message }]),
    })
    

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let result = ''
    return reader.read().then(function processText({ done, value }) {
      if (done) {
        return result
      }
      const text = decoder.decode(value || new Int8Array(), { stream: true })
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1]
        let otherMessages = messages.slice(0, messages.length - 1)
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: lastMessage.content + text,
          },
        ]
      })
      return reader.read().then(processText)
    })
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ 
        background: 'linear-gradient(45deg, #8D4E85, #4B0082)' // #9370DB #483D8B #8A2BE2 Ombre effect for the send button
      }}
      //bgcolor="#E6E6FA" // Background color: lilac purple
    >
      <Stack
        direction="column"
        width="700px"
        height="700px"
        border="3px solid #9370DB" // Darker lilac purple border
        borderRadius={12} // Rounded corners for the container
        p={2}
        spacing={3}
        // bgcolor="#D8AADD" // #DDB0E1 #D8AADD #D4A5D7 #C8A2C8
        sx={{
          background: 'linear-gradient(to bottom, #D8AADD, #D4A5D7)' // Ombre effect from pink to purple for the chatbox background
        }}
        /*
        sx={{
          background: 'linear-gradient(to bottom, #FFC0CB, #9370DB)' // Ombre effect from pink to purple for the chatbox background
        }}
        */
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                sx={{ 
                  background: 'linear-gradient(200deg, #8D4E85, #4B0082)' // #9370DB #483D8B #8A2BE2 Ombre effect for the send button
                }}
                // bgcolor="#663399" // #880085 #663399 #673AB7 #9400D3 #9932CC #9966CC
                color="white"
                borderRadius={10}
                p={3}
                boxShadow="0 3px 5px 2px rgba(75, 0, 130, .3)" // Slight shadow to enhance the effect
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Type your message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              borderRadius: '20px', // Make the TextField rounded
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px', // Apply rounded corners to the input field
              }
            }}
          />
          <Button
            variant="contained" 
            onClick={sendMessage} 
            sx={{ 
              minWidth: 'auto', // Removes extra space around the icon
              padding: '16px', // Adjust padding to ensure a snug fit around the icon
              background: 'linear-gradient(45deg, #8D4E85, #4B0082)', // Background gradient
              borderRadius: '30px' // Make the button rounded
            }}
            //endIcon={<SendIcon sx={{ transform: 'rotate(-45deg)' }} />}
            // endIcon={<SendIcon />} 
            /*
            sx={{ 
              background: 'linear-gradient(45deg, #8D4E85, #4B0082)', // #9370DB #483D8B #8A2BE2 Ombre effect for the send button
              borderRadius: '30px'
            }}
            */
          >
            <SendIcon sx={{ transform: 'rotate(-45deg)' }} /> {/* Rotating the SendIcon */}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}




/*
'use client'
import { Box, Stack, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'; // Import the airplane icon
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi I'm your personal Academic Advisor, how can I assist you today?",
    }
  ])

  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: '' },
    ])

  const response = await fetch('/api/chat', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([...messages, { role: 'user', content: message }]),
    })
    

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let result = ''
    return reader.read().then(function processText({ done, value }) {
      if (done) {
        return result
      }
      const text = decoder.decode(value || new Int8Array(), { stream: true })
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1]
        let otherMessages = messages.slice(0, messages.length - 1)
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: lastMessage.content + text,
          },
        ]
      })
      return reader.read().then(processText)
    })
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#E6E6FA" // Background color: lilac purple
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="3px solid #9370DB" // Darker lilac purple border
        borderRadius={12} // Rounded corners for the container
        p={2}
        spacing={3}
        sx={{
          background: 'linear-gradient(to bottom, #FFC0CB, #9370DB)' // Ombre effect from pink to purple for the chatbox background
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor="#4B0082" // Darker purple for both assistant and user messages
                color="white"
                borderRadius={16}
                p={3}
                boxShadow="0 3px 5px 2px rgba(75, 0, 130, .3)" // Slight shadow to enhance the effect
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage} 
            endIcon={<SendIcon />} 
            sx={{ 
              background: 'linear-gradient(45deg, #9370DB, #8A2BE2)' // Ombre effect for the send button
            }} 
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
*/


/*
'use client'
import { Box, Stack, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'; // Import the airplane icon
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi I'm your personal Academic Advisor, how can I assist you today?",
    }
  ])

  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: '' },
    ])

  const response = await fetch('/api/chat', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([...messages, { role: 'user', content: message }]),
    })
    

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let result = ''
    return reader.read().then(function processText({ done, value }) {
      if (done) {
        return result
      }
      const text = decoder.decode(value || new Int8Array(), { stream: true })
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1]
        let otherMessages = messages.slice(0, messages.length - 1)
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: lastMessage.content + text,
          },
        ]
      })
      return reader.read().then(processText)
    })
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#E6E6FA" // Background color: lilac purple
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="3px solid #9370DB" // Darker lilac purple border
        borderRadius={12} // Rounded corners for the container
        p={2}
        spacing={3}
        sx={{
          background: 'linear-gradient(to bottom, #FFC0CB, #9370DB)' // Ombre effect from pink to purple for the chatbox background
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'linear-gradient(45deg, #DDA0DD, #BA55D3)' // Ombre effect for assistant messages
                    : 'linear-gradient(45deg, #9370DB, #8A2BE2)' // Ombre effect for user messages
                }
                color="white"
                borderRadius={16}
                p={3}
                boxShadow="0 3px 5px 2px rgba(147, 112, 219, .3)" // Slight shadow to enhance the ombre effect
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage} 
            endIcon={<SendIcon />} 
            sx={{ 
              background: 'linear-gradient(45deg, #9370DB, #8A2BE2)' // Ombre effect for the send button
            }} 
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
*/


/*
'use client'
import { Box, Stack, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'; // Import the airplane icon
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi I'm your personal Academic Advisor, how can I assist you today?",
    }
  ])

  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: '' },
    ])

  const response = await fetch('/api/chat', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([...messages, { role: 'user', content: message }]),
    })
    

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let result = ''
    return reader.read().then(function processText({ done, value }) {
      if (done) {
        return result
      }
      const text = decoder.decode(value || new Int8Array(), { stream: true })
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1]
        let otherMessages = messages.slice(0, messages.length - 1)
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: lastMessage.content + text,
          },
        ]
      })
      return reader.read().then(processText)
    })
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#E6E6FA" // Background color: lilac purple
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="3px solid #9370DB" // Darker lilac purple border
        borderRadius={12} // Rounded corners for the container
        p={2}
        spacing={3}
        bgcolor="#D8BFD8" // Lighter shade for the chatbox background
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'linear-gradient(45deg, #DDA0DD, #BA55D3)' // Ombre effect for assistant messages
                    : 'linear-gradient(45deg, #9370DB, #8A2BE2)' // Ombre effect for user messages
                }
                color="white"
                borderRadius={16}
                p={3}
                boxShadow="0 3px 5px 2px rgba(147, 112, 219, .3)" // Slight shadow to enhance the ombre effect
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage} 
            endIcon={<SendIcon />} 
            sx={{ 
              background: 'linear-gradient(45deg, #9370DB, #8A2BE2)' // Ombre effect for the send button
            }} 
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
*/


/*
'use client'
import { Box, Stack, TextField, Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi I'm your personal Academic Advisor, how can I assist you today?",
    }
  ])

  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: '' },
    ])

  const response = await fetch('/api/chat', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([...messages, { role: 'user', content: message }]),
    })
    

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let result = ''
    return reader.read().then(function processText({ done, value }) {
      if (done) {
        return result
      }
      const text = decoder.decode(value || new Int8Array(), { stream: true })
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1]
        let otherMessages = messages.slice(0, messages.length - 1)
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: lastMessage.content + text,
          },
        ]
      })
      return reader.read().then(processText)
    })
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'primary.main'
                    : 'secondary.main'
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
*/



/*
'use client'
import { Box, Stack, TextField, Button} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi I'm the Headstarter Support Agent, how can I assist you today?",
    }
  ])

  const [message, setMessage] = useState('')

  const sendMessage = async() => {
    setMessage('')
    setMessages((messages)=>[
      ...messages,
      {role: "user", content: message},
      {role: "assistant", content: ''},
    ])
    const response = fetch('/api/chat', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, {role: 'user', content: message}]),
    }).then(async (res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let result = ''
      return reader.read().then(function proccessText({done, value}){
        if (done){
          return result
        }
        const text = decoder.decode(value || new Int8Array(), {stream:true})
        setMessages((messages)=>{
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ]
        })
        return reader.read().then(processText)
      })
    })
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box 
              key = {index} 
              display = 'flex' 
              justifyContent={
                message.role=== 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role=== 'assistant' 
                    ? 'primary.main' 
                    : 'secondary.main'
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction = "row" spacing ={2}>
          <TextField
            label = "message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
*/