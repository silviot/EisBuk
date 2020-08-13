const firebase = require('@firebase/testing');
const projectId = 'test-project';
const databaseName = 'test-db';
var app;

beforeEach(async () => {
    app = firebase.initializeTestApp({ projectId, databaseName, auth: null });
});

after(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
});


describe('general', () => {
    it('runs an empty test', () => {});

    it('checks rules on the database', async () => {
      const rules = `
            {
                "rules": {
                    ".read": false,
                    ".write": false
                }
            }
          `;
          await firebase.loadDatabaseRules({ databaseName, rules });
          const db = app.database();
          await firebase.assertFails(
            db.ref('foo/bar').set({ baz: 'bat' }),
          );
        });
});
