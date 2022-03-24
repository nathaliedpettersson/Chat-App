import { db } from "./modules/firebaseApp";
import { onValue, ref, remove, push, update } from "firebase/database";
import { Chat } from "./modules/chatClass";

const dbRef = ref(db, '/messages');

// Hämtar array för klasskonstruktorn
let chats:Chat[] = [];


// Hämtar och pushar det vi lägger till i konstruktorn
onValue(dbRef, snapshot => {
    const chatData = snapshot.val();
    
    removeMessageAbove25();

      // Ta bort från DOM
      for(const chat of chats){
        chat.clearChat();
    }

    // Visa max 25 meddelanden
    function removeMessageAbove25(){
        const chatArray = Object.values(chatData);
        const index0 = Object.keys(chatData)[0];
        
        for (let i=0; i<chatArray.length; i++){

        }if (chatArray.length>25){
            const test = ref(db, '/messages/'+index0);
            remove(test);
        } else {
            console.log(chatArray.length);
        }
    }

    chats = [];

    for(const key in chatData){
        chats.push(new Chat(key, chatData[key].name, chatData[key].message));
    }
    
})

// Knapp för att lägga till sitt meddelande
const addBtn = document.querySelector('#add');

// När användaren klickar på knappen efter att ha angett namn och meddelande så visas det i DOM:en och skickas till databasen
addBtn.addEventListener('click', (e) => {
    const nameInput:HTMLInputElement = document.querySelector('#name');
    const messageInput:HTMLInputElement = document.querySelector('#message');
    e.preventDefault();

    const addToChat = {
        name: nameInput.value,
        message: messageInput.value
    }

    // Tar bort föregående meddelande i message-ruta
    messageInput.value = '';

    const newKey:string = push(dbRef).key;
    const newChatMessage = {};
    newChatMessage[newKey] = addToChat;

    // Uppdatera databas
    update(dbRef, newChatMessage);
})

