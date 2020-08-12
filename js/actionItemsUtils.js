class ActionItems {

    static collectionName = 'action-items';

    static get(callback) {
        db.collection(ActionItems.collectionName).orderBy('added', 'asc').onSnapshot((snapshot)=>{
            let changes = snapshot.docChanges();
            callback(changes);
        })
    }

    static add(actionItem){
        db.collection(ActionItems.collectionName).add(actionItem);
    }

    static markCompleted(docId) {
        db.collection(ActionItems.collectionName).doc(docId).set({
            completed: new Date()
        })

    }

    static remove(docId){
        db.collection(ActionItems.collectionName).doc(docId).delete();
    }
}