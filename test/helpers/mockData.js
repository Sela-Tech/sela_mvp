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
		password: "mypassword",
		activation: "approved",
		
	}
];



/**
 * @description Insert seed data in user model
 *
 * @returns {void} Nothing
 */
const insertUserSeed = async () => {
	let organization_id = await insertOrganisation();
	users[0].organization=organization_id
	let newUser = new User(users[0]);
	let user = await newUser.save();
	return user;
};

const insertOrganisation = async () => {
	const organization = {
		name:"my very own"
	}
	let org = new Organization(organization);
	let obj = await org.save();
	let org_id =  obj._id;
	return org_id;
}





/**
 * @description Generates token from seed data
 *
 * @param {Number} id - User object
 *
 * @returns {string} token - Generated token
 */

const generateToken = (user) => {

	const { isFunder, isEvaluator, isContractor } = user,
		signThis = {
			profilePhoto: user.profilePhoto,
			id: user._id,
			isFunder,
			isEvaluator,
			isContractor,
			firstName: user.firstName,
			phone: user.phone,
			email: user.email,
			organization: {
				name: user.organization.name,
				id: user.organization._id
			},
			lastName: user.lastName
		};

	const tokenValidityPeriod = 86400
	const { SECRET } = process.env;

	const token = jsonwebtoken.sign(signThis, SECRET, {
		expiresIn: tokenValidityPeriod
	});
	return token;
};


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

const validUserUpdateInfo = {
		firstName: "newname",
		lastName: "mylastname",
		username: "userthree",
		password:'mypassword',
		oldPassword:"mypassword",
};


const invalidUserUpdateInfo = {
	firstName: "newname",
	lastName: "mylastname",
	username: "userthree",
	password:'mypassword',//same as the current password
	oldPassword:"mypasswor", //same as the current password
};

const invalidUserUpdateInfo2 = {
	newPassword:'mypasswording',
	verifyPassword:'weirdo',
	oldPassword:"mypassword", //same as the current password
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


const userWithWrongPassword = {
	email: "usertwo@mail.com",
	password: "mypasword"
}

const userWithPendingAccount = {
	email: "user10@mail.com",
	password: "mypassword"
}


module.exports = {
	insertUserSeed, validUser, userWithExistingEmail,
	userWithWrongEmail, userWithWrongPhone, userWithWrongPassword,
	validUser2, userWithPendingAccount,generateToken,validUserUpdateInfo,invalidUserUpdateInfo,
	invalidUserUpdateInfo2
}