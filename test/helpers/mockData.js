const jsonwebtoken = require('jsonwebtoken');
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Organization = mongoose.model("Organization");
var Project = mongoose.model("Project");
var Transaction = mongoose.model("Transaction");
var Uploads = mongoose.model("Upload");
var tokenValidityPeriod = 86400; // in seconds; 86400 seconds = 24 hours
var bcrypt = require("bcrypt");

const users = [

	{
		email: "somethree@mail.com",
		phone: "894738903584",
		firstName: "userthree",
		lastName: "mylastname",
		username: "userthree",
		isEvaluator: false,
		isContractor: false,
		isFunder: true,
		password: "mypassword"
	}
];




/**
 * @description Insert seed data in user model
 *
 * @returns {void} Nothing
 */
const insertUserSeed = async () => {
	await User.insertMany(users);

};

// const insertOrganisation = async ()=>{
// 	let org= await Organization.create()
// }




/**
 * @description Generates token from seed data
 *
 * @param {Number} id - User object
 *
 * @returns {string} token - Generated token
 */

// const generateToken = (id, email) => {
//  const {JWT_SECRET_KEY, JWT_EXPIRATION } = process.env;
//   const token = jsonwebtoken.sign({
//     sub: id,
//     email: email,
// }, JWT_SECRET_KEY,{expiresIn:Number(JWT_EXPIRATION)});
//   return token;
// };

// export const user1token = generateToken(1, 'convicmusic@gmail.com');
// export const user2token = generateToken(3,'convictmusic@gmail.com');

const validUser = {
	email: "usertwo@mail.com",
	phone: "8949000384",
	organization: { name: "test organisaction2" },
	firstName: "usertwo",
	lastName: "mylastname2",
	username: "usertwo",
	isEvaluator: false,
	isContractor: false,
	isFunder: true,
	password: "mypassword",
	activation: "approved"
};

const validUser2 = {
	email: "user10@mail.com",
	phone: "9309582038",
	organization: { name: "test organisaction2" },
	firstName: "user10",
	lastName: "mylastname10",
	username: "user10",
	isEvaluator: false,
	isContractor: false,
	isFunder: true,
	password: "mypassword",
};

const userWithExistingEmail = {
	email: "usertwo@mail.com",
	phone: "890384",
	organization: { name: "test organisaction2" },
	firstName: "usertwo",
	lastName: "mylastname2",
	username: "usertwo",
	isEvaluator: false,
	isContractor: false,
	isFunder: true,
	password: "mypassword"
};

const userWithWrongEmail = {
	email: "user@mail.com",
	// phone:"890384",
};

const userWithWrongPhone = {
	// email:"user@mail.com",
	phone: "890384",
};


const userWithWrongPassword={
	email: "usertwo@mail.com",
	password: "mypasword"
}

const userWithPendingAccount={
	email: "user10@mail.com",
	password: "mypassword"
}

module.exports = {
	insertUserSeed, validUser, userWithExistingEmail,
	userWithWrongEmail, userWithWrongPhone,userWithWrongPassword,
	validUser2,userWithPendingAccount
}