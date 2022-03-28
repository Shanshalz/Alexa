/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');


const messages = {
    WELCOME: 'Welcome to the Sample Alexa Person Profile API Skill! You can ask for your name, given name or your phone number. What do you want to ask?',
    WHAT_DO_YOU_WANT: 'What do you want to ask?',
    PROFILE_NOT_RECOGNIZED: 'Your profile is not recognized. If you haven\'t yet, please create and train a voice profile through the Alexa app and try again.',
    NOTIFY_MISSING_PERMISSIONS: 'Please enable Person Profile permissions in the Amazon Alexa app.',
    NAME_MISSING: 'It looks like we don\'t have your name. You can set your name through the Alexa App.',
    GIVEN_NAME_MISSING: 'It looks like we don\'t have your given name. You can set your given name through the Alexa App.',
    NUMBER_MISSING: 'It looks like we don\'t have your phone number. You can set your phone number through the Alexa App.',
    NAME_AVAILABLE: 'Your full name is: ',
    GIVEN_NAME_AVAILABLE: 'Your given name is: ',
    ABOUT_ACCOLITE: 'Accolite Digital is an innovative, best-in-class digital transformation services provider, successfully delivering design driven complex digital transformation initiatives to Fortune 500 clients. Accolite Digital is hiring! Apply to our roles by saying send my profile to accolite',
    WELCOME_ACCOLITE: 'Welcome to Accolite, what would you like to do today?',
    ERROR: 'Uh Oh. Looks like something went wrong.',
    API_FAILURE: 'There was an error with the Alexa Person Profile API. Please try again.',
    GOODBYE: 'Bye! Thanks for using the Sample Alexa Person Profile API Skill!',
    UNHANDLED: 'This skill doesn\'t support that. Please ask something else.',
};
const PERMISSIONS = ['alexa::profile:mobile_number:read', 'alexa::profile:name:read', 'alexa::profile:given_name:read'];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    
    handle(handlerInput) {
        return handlerInput.responseBuilder
                .speak(messages.WELCOME_ACCOLITE)
                .reprompt(messages.WELCOME_ACCOLITE)
                .getResponse();

    }
    
   /* async handle(handlerInput) {
        const person = handlerInput.requestEnvelope.context.System.person;
        const consentToken = handlerInput.requestEnvelope.context.System.apiAccessToken;

        if (person) {
            const personId = person.personId;
            console.log("Received personId: ", personId);
        } else {
            return handlerInput.responseBuilder
                .speak(messages.PROFILE_NOT_RECOGNIZED)
                .reprompt(messages.PROFILE_NOT_RECOGNIZED)
                .getResponse();
        }
        
        try {
            const client = handlerInput.serviceClientFactory.getUpsServiceClient();
            const name =   await client.getPersonsProfileName();

            console.log('Name successfully retrieved, now responding to user.' + name);

            let response;
            if (name == null) {
                response = handlerInput.responseBuilder.speak(messages.NAME_MISSING)
                    .getResponse();
            } else {
                const speechText = messages.WELCOME_ACCOLITE.format(name);
                response = handlerInput.responseBuilder.speak(speechText)
                    .getResponse();
            }
            return response;
        } catch (error) {
            if (error.name !== 'ServiceError') {
                const response = handlerInput.responseBuilder.speak(messages.ERROR).getResponse();
                return response;
            }
            throw error;
        }
    }*/
    
};

const AboutAccoliteIntentHandler =  {
    
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AboutAccoliteIntent';
    },

    handle(handlerInput) {
        return handlerInput.responseBuilder
                .speak(messages.ABOUT_ACCOLITE)
                .reprompt(messages.ABOUT_ACCOLITE)
                .getResponse();

    }
    
};

const SendProfileIntentHandler =  {

    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SendProfileIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say send profile or know more about accolite or even listen to our CEO! How can I help?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    async handle(handlerInput) {
        const person = handlerInput.requestEnvelope.context.System.person;
        const consentToken = handlerInput.requestEnvelope.context.System.apiAccessToken;

        if (person) {
            const personId = person.personId;
            console.log("Received personId: ", personId);
        } else {
            return handlerInput.responseBuilder
                .speak(messages.PROFILE_NOT_RECOGNIZED)
                .reprompt(messages.PROFILE_NOT_RECOGNIZED)
                .getResponse();
        }
        
        try {
            const client = handlerInput.serviceClientFactory.getUpsServiceClient();
            const name =   await client.getPersonsProfileName();

            console.log('Name successfully retrieved, now responding to user.' + name);

            let response;
            if (name == null) {
                response = handlerInput.responseBuilder.speak(messages.NAME_MISSING)
                    .getResponse();
            } else {
                const speechText = messages.WELCOME_ACCOLITE.format(name);
                response = handlerInput.responseBuilder.speak(speechText)
                    .getResponse();
            }
            return response;
        } catch (error) {
            if (error.name !== 'ServiceError') {
                const response = handlerInput.responseBuilder.speak(messages.ERROR).getResponse();
                return response;
            }
            throw error;
        }
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say send profile or know more about accolite or even listen to our CEO! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ProfileError = {
    canHandle(handlerInput, error) {
        return error.name === 'ServiceError';
    },
    handle(handlerInput, error) {
        if (error.statusCode === 403) {
            return handlerInput.responseBuilder
                .speak(messages.NOTIFY_MISSING_PERMISSIONS)
                .withAskForPermissionsConsentCard(PERMISSIONS)
                .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(messages.API_FAILURE)
            .reprompt(messages.API_FAILURE)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        AboutAccoliteIntentHandler,
        SendProfileIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler, 
        ProfileError)
    .withCustomUserAgent('sample/accolite/v1.2')
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();
