## RGB Alchemy Game
A React game where you have to mix together a correct color.

### How to run it:
##### Start server
Run the server from the `rgb-alchemy-server` folder to handle requests.
Go to the folder and run the following commands:
```
npm i
npm start
```
After this the server should be running on port 9876, you should see a `Server is running on port 9876` message.

##### Run Game App
Go to `rgb-alchemy-app` folder and run the following commands:
```
npm i
npm start
```
This should start the React app and run it on `localhost:3000`.

### Game Process:
User gets a limited number of moves, the first three moves user selects colors for Sources (color circles), which then populate tiles.
After that, user drag-and-drops tiles into the source cirlces to mix colors up.
The goal is to get a color close enough to the target color.

### Things to improve in future:
- Add Redux to have a Global State, instead of passing props to child components.
- Add handling for server request errors, so user doesn't have to reload the page if something goes wrong.
- Add some animations and visuals.