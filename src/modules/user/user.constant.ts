import { swaggerSchemaExample } from '../../utils/swagger_schema';
export const USER_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        walletAddress: '1emQmRbXDL2eSzPxmUywHQj5qHAAyMCrna24k1rQy1KPpw5',
        name: 'Long',
        email: 'long2842000@gmail.com',
        _id: '636b0d64a51f4f831f43fa1f',
        createdAt: '2022-11-09T02:16:04.918Z',
        updatedAt: '2022-11-09T02:16:04.918Z',
        __v: 0,
      },
    },
    'Create success',
  ),
  UPDATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        success: true,
      },
    },
    'Update success',
  ),
  BAD_REQUEST_EXCEPTION: swaggerSchemaExample(
    {
      message: 'bad request exception',
      code: 'sys00001',
      statusCode: 400,
    },
    'bad request exception',
  ),
  NOT_FOUND_EXCEPTION: swaggerSchemaExample(
    {
      message: 'not found exception',
      code: 'us00001',
      statusCode: 404,
    },
    'not found exception',
  ),
  DELETE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        success: true,
      },
    },
    'Delete success',
  ),
};
