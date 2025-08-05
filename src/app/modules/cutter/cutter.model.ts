import { Schema, model } from 'mongoose';
import { IMp3Cutting } from './cutter.interface';


const Mp3CuttingSchema = new Schema<IMp3Cutting>({
    filename: { type: String, required: true },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    status: { type: String, default: 'processing' },
    outputFilePath: { type: String, required: true },
}, { timestamps: true });


const CutterModel = model<IMp3Cutting>('Mp3Cutting', Mp3CuttingSchema);
export default CutterModel
