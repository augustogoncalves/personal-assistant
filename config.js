var CONFIG = {
    // app name
    appName: 'Jack', // we like Ironman

    // voice language
    voiceRecognitionLanguage: 'en-US',
    voiceSpeakingLanguage: 'US English Male',
    
    // uptime
    upTime: ['Yes I\'m alive since {0}', 'I\'m not breathing, but alive since {0}'],

    // greetings sentences
    greeting: ['hi there, how can I help?', 'yes sir, need any help?', 'I\'m here, my I assist you?'],

    // when asked about the IP address
    ipAddress: 'OK I found {0} IPs, take note.',
    dot: 'dot',
    
    addingToShoppingList : ['Got it, adding {0} to your shopping list.','Oh no, out of {0}, adding to your shopping list','Ok just added {0} to your shopping list'],

    voiceCommands: {
        // are you alive?
        'are you alive': areYouAlive,
        
        // wake-up calls
        '(hi) (good) (morning) (afternoon) (night) (evening) Jack': wakeUp, // can say any combination, but the appName is mandatory 

        // list of command
        'add *productName to (my) shopping list': addToShoopingList,

        // IP address of the application
        'what\'s your address': ipAddress,
        
        // just say the current hour
        'what time is it (please)': currentTime,
        
        // repeat last
        'repeat (please)' : repeatLastSentence
    },
}