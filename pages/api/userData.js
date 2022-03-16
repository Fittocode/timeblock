import connectDB from '../../lib/mongodb';
import userDataDB from '../../models/UserMetrics.models'

export default async function handler(req, res) {
  const { method } = req
  await connectDB()

  switch (method) {
    case 'GET':
      try {
        const userData = await userDataDB.find({}) /* find all data in database */
        res.status(200).json({success: true, userData: userData})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break;
    case 'POST':
      try {
        const userData = await userDataDB.create(
          req.body
          ) /* create new model in database */
        res.status(201).json({success: true, userData: userData})
      } catch(error) {
        console.log(error.message)
        res.status(400).json({success: false})
      }
      break;
    default:
      res.status(400).json({success: false})
      break
  }
}