/* export GOOGLE_APPLICATION_CREDENTIALS=chatbot-app.json */
/* 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 */
import React, { useEffect } from 'react';
import axios from 'axios';
import instance from './instance.js';

function Chatbot() {
    
    useEffect(() => {
       eventQuery('welcomeToMyWebsite')
    }, [])
    
    const textQuery = async (text) => {
        
        let conversations = []    
            
        // Frist Need to take care of message I sent
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }  
            }
        }
        // We need to take care of the message chatbot sent
        
        const textQueryVariables = {
            text
        }
        
        try {
            // I will send request to the textQuery ROUTE
            const response = await instance.post('/api/dialogflow/textQuery', textQueryVariables)
            const content = response.data.fulfillmentMessages[0] 
            conversation = {
                who: 'bot',
                content: content
            }     
            console.log(conversation)
        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: "Error just occured, please check the problem."
                    }  
                }
            }
            console.log(conversation)
        }
    }
    
    const eventQuery = async (event) => {

        // We need to take care of the message chatbot sent
        const eventQueryVariables = {
            event
        }
        
        try {
            // I will send request to the textQuery ROUTE
            const response = await instance.post('/api/dialogflow/eventQuery', eventQueryVariables)
            const content = response.data.fulfillmentMessages[0] 
            let conversation = {
                who: 'bot',
                content: content
            }     
            console.log(conversation)
        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: "Error just occured, please check the problem."
                    }  
                }
            }
            console.log(conversation)
        }
    }
    
    
    const keyPressHandler = (e) => {
        if (e.key === "Enter") {
            
            if (!e.target.value) {
                return alert('you need to type something first')
            }
            
            // we will send request to textQueryRoute
            textQuery(e.target.value)
            
            e.target.value = "";
        }
    }
    
    return (
        <div style={{
                height: 700, width: 700,
                border: '3px solid black', borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>
                
            </div>
            
            <input style={{
                    margin: 0, width: '100%', height: 50, 
                    borderRadius: '3px', padding: '5px', fontSize: '1rem'
                }}
                placeholder="Send a message..."
                onKeyPress={keyPressHandler}
                type="text"
            />
            
        </div>
    );
}

export default Chatbot;