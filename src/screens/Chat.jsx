import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { api } from '../lib/axios';


export function Chat() {

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');

    function handleInputTextChange(text) {
        setInputText(text);
    };

    async function handleButtonClick(){
        if(inputText == ""){
            return
        }
        setMessages(messages => [...messages, { id: 1, message: inputText }])
        var command = inputText
        setInputText('')

        try {
            const response = await api.post('/chatbot', {
                command: command
            });
            if(response.data.response_text){
                setResponseText(response.data.response_text);
                setMessages(messages => [...messages, { id: 0, message: responseText }])
            }
            return
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View className="flex-1 bg-background">
            <Header />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                <View id='chatArea' className="h-4/5 ml-5 mr-5">
                    {messages.map((message, i) => (
                        message.id == 1 ?
                            <View key={i} className="w-2/3 self-end justify-end  bg-blue-500 flex-row p-3 rounded mb-4">
                                <Text className="text-zinc-50 mr-6">{message.message}</Text>
                                <FontAwesome5
                                    name='smile'
                                    color={colors.white}
                                    size={20}
                                />
                            </View>
                            :
                            <View key={i} className="w-2/3  bg-blue-700 flex-row p-3 rounded mb-4">
                                <FontAwesome5
                                    name='robot'
                                    color={colors.white}
                                    size={20}
                                />
                                <Text className="text-zinc-50 ml-6">{responseText}</Text>
                            </View>
                    ))}
                </View>
            </ScrollView>
            <View className="flex-row justify-between m-2 border-0.5 rounded-2xl p-2 content-end">
                <TextInput
                    className="w-3/4"
                    placeholder="Digite sua mensagem"
                    value={inputText}
                    onChangeText={handleInputTextChange}
                />
                <TouchableOpacity
                    className="bg-blue-500 rounded-3xl p-3"
                    activeOpacity={0.7}
                    onPress={handleButtonClick}
                >
                    <Feather
                        name='send'
                        color={colors.white}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}