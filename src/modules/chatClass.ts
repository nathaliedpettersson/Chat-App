import { db } from "./firebaseApp";
import { ref, remove} from "firebase/database";

// Klass-konstruktor
class Chat {
    constructor (
        public readonly id: string,
        public readonly name: string,
        public readonly message: string
    ) {

        this.displayChat();

    }
    
    // Metod som skapar och visar element
    private displayChat():void {
        const chatDiv:HTMLElement = document.querySelector('#chat');
        const myNameInput: any = document.getElementById('name');
        const myName = myNameInput.value;
        const divChild:HTMLElement = document.createElement('div');
        const pName:HTMLElement = document.createElement('p');
        const pMessage:HTMLElement = document.createElement('p');
        const delBtn:HTMLButtonElement = document.createElement('button');

        pName.innerText = this.name + ' ' + 'says: ';
        pMessage.innerText = this.message;
        divChild.className = 'div-child';
        divChild.id = this.id;
        delBtn.innerText = 'X';
        delBtn.className = 'delete';

        delBtn.addEventListener('click', () => {
             const deleteMyMessage = ref(db, '/messages/' + this.id);
             remove(deleteMyMessage); 
        })

        if(myName != this.name) {
              delBtn.style.display = 'none';

          }

        divChild.append(pName,pMessage, delBtn);
        chatDiv.append(divChild);
        document.body.append(chatDiv);
    }

    //Metod som rensar DOM:en
    public clearChat():void{
        document.querySelector(`#${this.id}`).remove();
    }
}

export {Chat};
