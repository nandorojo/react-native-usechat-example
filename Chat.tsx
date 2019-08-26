import React, { useEffect, useRef, useState } from 'react'
import { ChatProvider, useMessages, Room, useRoom, useTyping } from 'usechat'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import firebase from 'firebase'

const ravenConfig = {
	apiKey: 'AIzaSyAdfgwTpU-R0bYN8_FWt3JWudOhQS3UF6c',
	authDomain: 'mercury-2000.firebaseapp.com',
	databaseURL: 'https://mercury-2000.firebaseio.com',
	projectId: 'mercury-2000',
	storageBucket: 'mercury-2000.appspot.com',
	messagingSenderId: '409156383659',
}

export default () => {
	return (
		<ChatProvider chatConfig={{ roomsCollection: 'test_rooms' }} fuegoConfig={ravenConfig}>
			<Messages id="test" />
		</ChatProvider>
	)
}

const Messages = ({ id }) => {
	const [ready, setReady] = useState(false)
	useEffect(() => {
		const start = async () => {
			try {
				// firebase.initializeApp(ravenConfig)
				await firebase.auth().signInAnonymously()
				setReady(true)
			} catch (e) {
				console.error('sign in error', e)
			}
		}
		start()
	}, [])

	const [{ data }, { send }] = useMessages({ id })
	const [{ data: roomData }] = useRoom({ id, listen: true })
	const [text, setText] = useState('')
	useTyping({ text, id })

	if (!ready) return null

	console.log('MEMBERS', roomData)

	return (
		<GiftedChat
			messages={data as IMessage[]}
			onSend={send}
			showAvatarForEveryMessage={false}
			renderAvatar={null}
			isAnimated={false}
			onInputTextChanged={setText}
			text={text}
		/>
	)
}
