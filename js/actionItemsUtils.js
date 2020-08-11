class ActionItems {

    static collectionName = 'action-items';

    static async get() {
        return await db.collection(ActionItems.collectionName).get().then(function(querySnapshot) {
            return querySnapshot.docs;
        });
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