# Iron Out

## Overview

This idea started with just a family vacation. My cousin and her husband will be turning 40 next year and they want to do have a big celebration at a destination where the whole extended family can have a good time. When you have a large group, it's very difficult to appease everyone. But it doesn't have to be that way.

The idea of Iron Out is an application that will essentially get rid of the need for a travel agent of sorts. One of the biggest things large groups of people have difficulty with is decided what they going to eat. Iron Out will send the alerted members of that specific group a list of cuisine types around the destination area and send it as a voting feature. When voting is completed, the administrator can see the tally of votes and narrow down the scope of options to a smaller data collection taking the top 2 choices and then matching those 2 picks with any restaurant that matches within a certain radius.

## Primary Features (MVP)

- As a user, I want to be able to vote on what cuisine I want to eat.
- As a user, I want to see the options of the top 2 winning votes in a certain radius.
- As a user, I want to filter through the list of restaurants according to cost.
- As a user, I want to be able to filter if an establishment is kid-friendly.
- As a user, I want to be able to engage in discussion with the group regarding the final choice of the restaurant.

---

- As an administrator, I want to be able to participate as a user.
- As an administrator, I want to be able to add a member to group.
- As an administrator, I want to be able to delete person from group.

---

- As an administrator, I can see all registered members.
- As a user, I can only see my specific itinerary.

## Secondary Features (Stretch)

- As a user, I want to be able to narrow the scope by just regions of the country if a specific location is not set.
- As a user, I want to be able to check attractions in the region chosen to map all the viable options of activities.
- As a user, I want to be able to be able to sort through types of activities in the area tailored to specific interests of the group.

## Bonus Features (Super Stretch)

- As a user, I want to be able to expand the scope to the entire world.
- As a user, I want to be able to book hotel and flight accommodations.

## Data Sample and Schema

### Sample Data

I'm using a 3rd party API for this application. The data is already set up to be read this way as the tech is used in other facets of travel applications.

#### Groups

```json
[
  {
    "group id": 1,
    "group name": "Melissa's 40th",
    "lat": 343.33,
    "long": 333.22,
    "radius": 20,
    "votes": {
      "glutenFree": 3,
      "vegetarian": 2
    },
    "isOpen": true,
    "results": []
  }
]
```

### Mongoose Schema

```json
const VoteSchema = new mongoose.Schema({
  cuisineType (or do by name of Restaurant?): String,
  votes: {type: Number, default: 0}
})

const GroupSchema = new mongoose.Schema ({
 date: { type: String, required: true},
 group name: { type: String, required: true},
 voting: [VoteSchema]
});

const UserSchema = new mongoose.Schema ({
 name: { type: String, required: true },
 email: { type: String, required: true },
 password: { type: String, required: true },
 dietRestrictions { type: [String], Use an enum to restrict choices? },
 group: [GroupSchema]
});

const AdminSchema = new mongoose.Schema ({
 isAdmin: { type: Boolean },
 group: [GroupSchema]
});
```

## MVP API Endpoints

- `POST /api/user/login` - Login a user
- `POST /api/user/logout` - Logout a user
- `GET /api/user/group` - Get all users for group (admin only)
- `PUT /api/user/:userId` - Update a user (user update own, admin can make user an admin)
- `PUT /api/user/group/vote` - Update with vote cuisine tally
- `DELETE /api/user/:userId` - Delete user from group
