const schema = {
  name: 'stations',
  num_documents: 0,
  fields: [
    {
      name: 'company_id',
      type: 'int32',
      facet: false,
    },
    {
      name: 'name',
      type: 'string',
      facet: false,
    },
    {
      name: 'ancestors',
      type: 'int32[]', // convert to string[]
      facet: false,
      index: true,
    },
    {
      name: 'location',
      type: 'geopoint',
      facet: false,
    },
  ],
  default_sorting_field: 'company_id',
};

export default schema;
