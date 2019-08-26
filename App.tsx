import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Chat from './Chat'

export default function App() {
	return <Chat />
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
