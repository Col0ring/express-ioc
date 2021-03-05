import multer from 'multer'
import { pseudoRandomBytes } from 'crypto'
import dayjs from 'dayjs'

const storage = multer.diskStorage({
  destination: `uploads/${dayjs().format('YYYY-MM-DD')}`,
  filename: function (req, file, cb) {
    pseudoRandomBytes(16, (err, raw) => {
      try {
        cb(
          err,
          raw.toString('hex') +
            file.originalname.substr(file.originalname.lastIndexOf('.'))
        )
      } catch (error) {
        cb(error, Date.now() + '-' + file.originalname)
      }
    })
  }
})

export const uploadConfig = {
  dest: 'uploads',
  storage
}
