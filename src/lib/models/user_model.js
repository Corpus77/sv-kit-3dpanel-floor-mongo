/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	credentials: {
		login: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	start: [],
	frames: [],
	twoparts: [],
	roombrick: [],
	laminat: [],
	kitchen: [],
	floorwalls: [],
	uploads: []
});

export const UserProfiles = mongoose.model('Users', userSchema);
