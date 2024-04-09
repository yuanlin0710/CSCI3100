import { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import MessageContext from '../../Context/contextMessage'

import MessageProfile from './MessageProfile/MessageProfile'

import PhotoUser from '../../shared/Components/PhotoUser/PhotoUser'

import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined'
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined'
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'

import './InsideMessage.scss'

const InsideMessage = () => {
	const { userMessage, setUserMessage } = useContext(MessageContext)
	const { userID, chatWithID } = useParams() // Get userID and chatWithID from URL
	const [input, setInput] = useState('')
	const [intervalId, setIntervalId] = useState(null)


	// Assume userMessage structure includes selectedUserId and chatWith
	const { messages } = userMessage[0].chat
	console.log(messages)

	const sendMessage = () => {
		if (!input.trim()) return
		const messageData = { sender: userID, receiver: chatWithID, text: input }

		fetch('http://localhost:3001/send', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(messageData),
		})
			.then(() => {
				setInput('')
				setUserMessage(prevState => {
					let newState = [...prevState]
					const newMessage = { ...messageData, timestamp: new Date().toISOString() }
					if (!newState[0].chat.messages) newState[0].chat.messages = []
					newState[0].chat.messages.push(newMessage)
					return newState
				})
			})
			.catch(console.error)
	}

	return (
		<div className="insideMessage__container">
			<MessageProfile post={userMessage[0]} />
			<div className="container__messageList">
				{messages?.map((message, id) => (
					<div key={id} className={`messageList__container ${message.sender === userID ? 'userMessage' : 'friendMessage'}`}>
						<div className="messageList__photo-text">
							<div className="messageList__photo">
								<PhotoUser url={userMessage[0].user_photo} size="40" />
							</div>
							<div className="messageList__text">
								{message.text}
							</div>
						</div>
						<div className="messageList__sendTime">
							{message.sendTime}
						</div>
					</div>
				))}
			</div>
			<div className="container__writeMessage">
				<label><BrokenImageOutlinedIcon /></label>
				<label><GifBoxOutlinedIcon /></label>
				<div className="writeMessage__input">
					<input
						type="text"
						placeholder="Start a new message"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					></input>
					<label><SentimentSatisfiedOutlinedIcon /></label>
				</div>
				<label onClick={sendMessage}><SendOutlinedIcon style={{ cursor: 'pointer' }} /></label>
			</div>
		</div>
	)
}

export default InsideMessage