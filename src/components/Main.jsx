import React, { useState, useCallback } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native'

import Note from './Notes'

const Main = () => {

    const [notes, changeNotes] = useState([])
    const [input, changeInput] = useState('')

    const addNote = useCallback(() => {
        if (input.length) {
            const d = new Date()
            const payload = {
                date: `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`,
                note: input
            }
            changeNotes([payload, ...notes])
            changeInput('')
        }
    }, [notes, input])

    const onDelete = useCallback((i) => () => {
        notes.splice(i, 1)
        changeNotes([...notes])
    }, [notes])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Simple To Do's</Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
                {notes.map((item, i) => 
                    <Note key={i} data={item} onDelete={onDelete(i)}/>
                )}
            </ScrollView>
            <View style={styles.footer}>
                <TextInput
                    style={styles.textInput}
                    value={input}
                    placeholder="> Add Something"
                    placeholderTextColor="#DC143C"
                    underlineColorAndroid="transparent"
                    onChangeText={userInput => changeInput(userInput)}
                >
                </TextInput>
            </View>
            <TouchableOpacity onPress={addNote} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#3d3d3d',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
        paddingTop: 20
    },
    headerText: {
        color: '#DC143C',
        fontSize: 36,
        padding: 26,
        fontWeight: '500'
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#DC143C',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
        fontSize: 32
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 100,
        backgroundColor: '#3d3d3d',
        width: 80,
        height: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#FFD700',
        fontSize: 26,
        fontWeight: '700'
    }
})

export default Main