const firebase = require('@firebase/testing');
const assert = require('assert');
const projectId = 'test-project';
const databaseName = 'test-db';
var app;

test_customers = [{
    id: "foo",
    name: "John",
    surname: "Doe",
    birthday: "21/07/1996"
}, {
    id: "bar",
    name: "Jane",
    surname: "Doe",
    birthday: ""
}]

describe('customers.crud', () => {
    before(async () => {
        app = firebase.initializeAdminApp({ projectId, databaseName, auth: null });
    });

    after(async () => {
      await Promise.all(firebase.apps().map((app) => app.delete()));
    });

it('creates customers', async () => {
        const db = app.database();
        await test_customers.map(async customer => await db.ref(`customers/${customer.id}`).set(customer));
        const fromDbFoo = await db.ref('customers/foo').once('value')
        assert.equal(fromDbFoo.val().name, "John");
        const fromDbBar = await db.ref('customers/bar').once('value')
        assert.equal(fromDbBar.val().name, "Jane");
    });
});
