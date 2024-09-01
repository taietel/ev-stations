const schema = {
  name: 'companies',
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
      name: 'parent_id',
      type: 'int32',
      facet: false,
      optional: true,
    },
  ],
  default_sorting_field: 'company_id',
};

export default schema;
