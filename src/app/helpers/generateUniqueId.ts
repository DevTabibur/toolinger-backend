import { Model } from 'mongoose'

const generateUniqueID = async (
  model: Model<any>,
  prefix: string,
  idField: string,
): Promise<string> => {
  //! Find the last registered document in the collection by sorting by the ID field in descending order
  const lastDocument = await model.findOne().sort({ [idField]: -1 })

  let nextIdNumber = 1

  if (lastDocument) {
    //! Extract the numeric part from the last ID and increment it
    const lastIdNumber = parseInt(lastDocument[idField].split('-')[1], 10)
    nextIdNumber = lastIdNumber + 1
  }

  //! Generate the new ID with the prefix and zero-padded number
  const nextId = `${prefix}-${String(nextIdNumber).padStart(5, '0')}`

  return nextId
}

export default generateUniqueID
