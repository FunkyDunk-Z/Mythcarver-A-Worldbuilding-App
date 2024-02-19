import { Schema, model } from 'mongoose';
const codexSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    codexName: String,
    species: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Species',
        },
    ],
    traits: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Traits',
        },
    ],
    nations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Nations',
        },
    ],
    factions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Factions',
        },
    ],
    characters: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Character',
        },
    ],
    locations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Locations',
        },
    ],
    settlements: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Settlements',
        },
    ],
    campaigns: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Campaigns',
        },
    ],
});
// codexSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'characters',
//     select: '-__v ',
//   })
//   next()
// })
// codexSchema.pre('save', async function (next) {
//   try {
//     const user: IUser | null = await User.findById(this.createdBy)
//     if (user) {
//       user.codex.push(this._id)
//       await user.save()
//     }
//     next()
//   } catch (error) {
//     next()
//   }
// })
const Codex = model('Codex', codexSchema);
export default Codex;
