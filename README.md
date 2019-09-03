# Tempo challenge

A React app to harvest Tempo's team REST service.

## Challenge

* Build a UI showing an overview of all the teams, and allow the current user to navigate between teams to see each team's members.
* At the top of the teams overview page, add an input field, which filters the teams when the input value changes. This input field could also be used in other pages of your app, e.g. for filtering out team members in the team page.

## Solution

The end points of Tempo's REST API provide segmented info of their teams and members. In order to display all information I structured the app into 3 levels:

1. A Home view with all teams
2. A Team view with all members of a selected team
3. A Member view with the info of a selected member

This structure allows segmentation of the API calls. For example, the call for a member's data is made only when the third view is loaded. Yet, many calls are done right when loading the first Home view, and the data retrieved there must be passed down to the other components.

To do so, I chose not to implement Redux, Redux-Saga nor similar solutions. Instead, I used react-router v4 with a structure to manage the transfer of props between components.

This choice favors simplicity and fits quite well for small applications, specially when using React Hooks, as is the case. 

Bigger applications would obviously make harder to track the passage of props between components, at which point it would be useful to implement a store to be the single source of truth for all the views of the app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App structure

The 3 main views cited above are stored in `src/views`.

The `src/components` holds the input field that filters results. It is used from the Home and the Team views. It also has a team list component.

The all-mighty router is in `src/components`.

```
.
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── components
│   │   ├── FilterForm.jsx
│   │   ├── FilterForm.scss
│   │   ├── Router.jsx
│   │   └── TeamList.jsx
│   ├── views
│   │   ├── __mocks__
│   │   │   └── axios.js
│   │   ├── Home.jsx
│   │   ├── Home.scss
│   │   ├── Home.test.js
│   │   ├── Member.jsx
│   │   ├── Member.scss
│   │   ├── Member.test.js
│   │   ├── Team.jsx
│   │   ├── Team.scss
│   │   └── Team.test.js
│   ├── App.js
│   ├── App.scss
│   ├── App.test.js
│   ├── config.json
│   ├── history.js
│   ├── index.css
│   ├── index.js
│   ├── serviceWorker.js
│   └── setupTests.js
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
└── pbcopy
```

## Requirements

Node JS and npm.

## Installation

Clone this repository

	git clone https://github.com/Rodrigoplp/tempo-rest-client.git

Install dependencies

	npm install

Start the app

	npm start

Open a browser and access `http://localhost:3000`.

## Tests

Test written with Jest and React Testing Library. To run tests:

	yarn test
