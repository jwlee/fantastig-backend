import { model, Schema, Document, Model} from 'mongoose';

export interface CharacterType extends Document {
    id: string,
    name: string,
    username: string,
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
}

const CharacterSchema: Schema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    strength: { type: Number, min: 1, max: 20, default: 1},
    dexterity: { type: Number, min: 1, max: 20, default: 1},
    constitution: { type: Number, min: 1, max: 20, default: 1},
    intelligence: { type: Number, min: 1, max: 20, default: 1},
    wisdom: { type: Number, min: 1, max: 20, default: 1},
    charisma: { type: Number, min: 1, max: 20, default: 1},
},{
    timestamps: true
});

const Character: Model<CharacterType> = model('Character', CharacterSchema);

export default Character;