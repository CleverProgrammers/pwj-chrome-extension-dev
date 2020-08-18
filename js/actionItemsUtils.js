class ActionItems {

    static collectionName = 'action-items';

    static get(callback) {
        db.collection(ActionItems.collectionName).orderBy('added', 'asc').onSnapshot((snapshot)=>{
            let changes = snapshot.docChanges();
            callback(changes);
        })
    }

    static async getCurrentItems(){
        
    }

    static add(actionItem){
        db.collection(ActionItems.collectionName).add(actionItem);
    }

    static markUnmarkCompleted(docId, completedStatus) {
        db.collection(ActionItems.collectionName).doc(docId).update({
            completed: completedStatus
        })

    }

    static remove(docId){
        db.collection(ActionItems.collectionName).doc(docId).delete();
    }
}