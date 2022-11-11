import { swaggerSchemaExample } from '../../utils/swagger_schema';
export const NFT_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        name: 'project Atama',
        description: '666 unconvention beings',
        image: 'ipfs://QmWxTVdAeC3PVDJ6NWb6HFruiWfXrxBCE1z4Z1M71VgB2P/385.png"',
        external_url: 'https://projectatama.io/',
        attributes: [
          {
            trait_type: 'Gender',
            value: 'Female',
          },
          {
            trait_type: 'BACKGROUND',
            value: 'Background 1',
          },
        ],
        _id: '6368b079f98044345709e0d7',
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
      message: 'bad exception',
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
