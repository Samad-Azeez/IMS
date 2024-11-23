import { mongoose } from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
    },
    quantity: {
      type: Number,
      default: 1,
      required: [true, 'Please enter product quantity'],
    },

    category: {
      type: String,

      // The enum option restricts the values of this field to specific allowed values
      enum: {
        // The array of valid company names
        values: [
          'it equipment',
          'furniture',
          'stationery',
          'special equipment',
          'others',
        ],
        // Custom error message when a value outside the enum is provided
        message: '{VALUE} is not supported',
      },

      required: [true, 'Please enter product company'],
    },
    description: {
      type: String,
    },
    createdBy: {
      // user id of the user who created the job
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide a user id'],
    },
  },
  {
    // Add timestamps to the schema to track creation and update times
    timestamps: true,
  }
);

// Create a Mongoose model for the 'Product' collection using the defined productSchema
export const product_model = mongoose.model('Product', productSchema);
