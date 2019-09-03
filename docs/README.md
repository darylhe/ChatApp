### Documentation

1. Data Structures

    Since the frontend is written in TypeScript. The entities are defined as below:

    typescript

    class User {
      constructor(
        public username?: string,
        public email?: string,
        public superAdmin: boolean = false,
        public enabled: boolean = false
      ) { }
    }
    class Group {
      constructor(public name?: string,
                  public subGroup: Group[] = [],
                  public admin: string[] = [],
                  public assis: string[] = [],
                  public users: string[] = []
      ) { }
    }
    class Channel {
      constructor(public name: string,
                  public groupName: string,
                  public users: string[] = []
      ) { }
    }
    ```

2.  Angular architecture

    There are mainly 2 pages of this application: Login('/login') and Admin('/admin'). While the admin page contains many components such as UserManagement, GroupManagement and ChannelManagement

3. Server-side architecture

   The server-side contains mainly 3 parts:

   - The data store serializes data into JSON string and write to the file;
   - The controller handles user requests;
   - The bootstrapping starts a server instance and bind on a specific port;

4. Responsibilities divided

   Every decisions are made case by case. For the login and user authentication part, the username check and login is handled by the server to keep the security. However, the `Group` is a recursive representation. It's handled mainly by the client-size. The server is only acted as a persistent data store;

5. A list of routers

   `POST /api/login` : Login the user by the username;

   `GET /api/user` : Get all users;

   `POST /api/user` : Add a new user;

   `PUT /api/user` : Update a specific user;

   `DELETE /api/user`: Delete a specific user;

   `GET /api/group`: Get all groups;

   `PUT /api/group`: Update all groups at same time;

   `GET /api/channel`: Get all channels;

   `PUT /api/channel`: Update all channels at same time;

6. The interaction between server and client

   Angular's built in `HttpClient` is injected into each services and will be invoked at `ngAfterViewInit` hook. The `Observable` will be subscribed to assign to a local variable which is bound to the view.
