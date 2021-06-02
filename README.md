# **NOMAD COFFEE for CHALLENGE**

Is challenge for instaclone with Nomad Coders.

<br>

## _Week 1_

```
Task

▫ On this challenge we are going to build a whole project from start to finish named Nomad Coffee. ✅
▫ On this two day assignment we will set up our project. ✅
▫ Create a Github Repository named 'nomadcoffee-backend'. ✅
▫ Set up a Prisma project. ✅
▫ The project should follow the architecture outlined on the video (.typeDefs.js , .resolvers.js). ✅
▫ Use babel, nodemon and dotenv ✅
```

<br>

## _Week 2_

```
Task

Nomad Coffee will be an app where developers can go and find the best caffes to work from in 한국!!

▫ On your schema.prisma let's create the User model, the model must have the following fields: ✅

    id
    username
    email
    name
    location
    password
    avatarURL
    githubUsername

▫ After you are done, make a createAccount resolver. ✅
  createAccount should:

▫ Create a user ✅
▫ Hash the password ✅
▫ Check that the username / email aren't taken ✅
▫ Return ok:true or ok:false, error:$error if there is an error. ✅
```

<br>

## _Week 3_

```
Task

Now it's time to create the following resolvers:

▫ editProfile: Change the user's profile, this includes changing password and changing the avatarURL. ✅
▫ login: Log the user in by returning a JWT or return an error in case the password is wrong. ✅
▫ seeProfile: See any users profile. ✅

You will also have to write some code to protect your resolvers and inject the logged in user to the resolver's context. ✅

```

<br>

## _Week 4_

```
Task

▫ Implement Follow / Unfollow functionality. ✅
▫ Implement followers & following computed fields with pagination on the seeUser resolver (No extra resolvers). ✅
▫ Implement searchUsers resolver. ✅
```

<br>

## _Week 5_

```
Task One

▫ Create a Category model with a relationshops to CoffeeShop ✅
▫ Create a CoffeeShop model with a relationship to the User that created the CoffeeShop and relationships to Category ✅
▫ Create a CoffeeShopPhoto model with a relationship to the CoffeeShop ✅

Task Two

Create the following resolvers:
- createCoffeeShop,seeCoffeeShops,seeCoffeeShop,seeCategory,seeCategories,editCoffeeShop

▫ createCoffeeShop should create a CoffeeShop, it should create a Category if it does not exist (the same way we created Hashtags on #6.4 and should upload and create a CoffeeShopPhoto for each uploaded file. ✅
▫ seeCoffeeShops should list all the CoffeeShop with pagination. ✅
▫ seeCoffeeShop should get a CoffeeShop by id. ✅
▫ seeCategory should list all the CoffeeShop inside of a Category with pagination. ✅
▫ seeCategories should list all the Category and should have a totalShops computed field that counts all the CoffeeShop inside of the Category, it should also have pagination. ✅
▫ editCoffeeShop should edit a CoffeeShop. ✅
```
